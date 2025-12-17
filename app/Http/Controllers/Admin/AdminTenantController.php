<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\Tenant;
use App\Models\Category;
use App\Models\Floor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class AdminTenantController extends Controller
{
    public function tenants(Request $request)
{
    $query = Tenant::with(['category', 'floor'])
        ->orderBy('created_at', 'desc');

    // Apply search filter
    if ($request->has('search') && !empty($request->search)) {
        $search = $request->search;
        $query->where(function ($q) use ($search) {
            $q->where('name', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{$search}%")
                ->orWhere('location', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%")
                ->orWhere('phone', 'like', "%{$search}%")
                ->orWhere('room_no', 'like', "%{$search}%")
                ->orWhereHas('category', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%");
                });
        });
    }

    // Apply category filter
    if ($request->has('category_id') && !empty($request->category_id)) {
        $query->where('category_id', $request->category_id);
    }

    // Get pagination setting; default to 10 unless explicitly set to "all"
    $perPageRaw = $request->get('per_page', 10);
    if ($perPageRaw === 'all') {
        $perPage = PHP_INT_MAX;
    } else {
        $perPage = (int) $perPageRaw;
        if ($perPage <= 0) {
            $perPage = 10;
        }
    }

    $tenants = $query->paginate($perPage)->withQueryString();
    $floors = Floor::all();
    $categories = Category::all();

    // Always return an Inertia response (avoid plain JSON when X-Inertia is present)
    return Inertia::render('Admin/Tenant/AdminTenant', [
        'initialTenants' => $tenants->items(),
        'pagination' => [
            'current_page' => $tenants->currentPage(),
            'last_page' => $tenants->lastPage(),
            'per_page' => $tenants->perPage(),
            'total' => $tenants->total(),
            'has_more' => $tenants->hasMorePages(),
        ],
        'floors' => $floors,
        'count' => $tenants->total(),
        'categories' => $categories,
        'activities' => ActivityLog::latest()->take(5)->get(),
        'filters' => $request->only(['search', 'category_id', 'per_page', 'page']),
    ]);
}
     public function tenantList(Request $request)
    {
        $query = Tenant::with(['category', 'floor'])
            ->orderBy('created_at', 'desc');

        // Apply search filter if search term exists
        if ($request->has('search') && ! empty($request->search)) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('location', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('room_no', 'like', "%{$search}%")
                    ->orWhereHas('category', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%");
                    });
            });
        }

        // FIX: Define $categoryId from the request
        $categoryId = $request->query('category_id');
        if ($categoryId && ! empty($categoryId)) {
            $query->where('category_id', $categoryId);
        }

        $perPageRaw = $request->query('per_page', 10);
        if ($perPageRaw === 'all') {
            $items = $query->get();

            return response()->json([
                'data' => $items,
                'meta' => [
                    'total' => $items->count(),
                    'per_page' => 'all',
                ],
            ]);
        }

        $perPage = (int) $perPageRaw;
        if ($perPage <= 0) {
            $perPage = 10;
        }
        if ($perPage > 1000) {
            $perPage = 1000;
        }
        $paginator = $query->paginate($perPage);

        return response()->json($paginator);
    }

    public function tenantShow(Tenant $tenant)
    {
        $tenant->load(['category', 'floor']);
        return redirect()->back()->with('success', $tenant);
    }

    public function toggleStatus(Tenant $tenant)
    {
        $tenant->update([
            'status' => $tenant->status === 'active' ? 'inactive' : 'active'
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Tenant status updated successfully',
            'tenant' => $tenant->fresh()
        ]);
    }
    public function tenantStore(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'category_id' => ['required', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'logo' => ['nullable', 'image', 'max:5120'], // max 5MB
            'location' => ['nullable', 'string', 'max:255'],
            'hours' => ['nullable', 'string', 'max:255'],
            'fullDescription' => ['nullable', 'string'],
            'floor_id' => ['required', 'exists:floors,id'],
            'building' => ['nullable', 'string', 'max:255'],
            'room_no' => ['nullable', 'string', 'max:50'],
            'phone' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'website' => ['nullable', 'string', 'max:255'],
        ]);

        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->toArray());
        }

        $validated = $validator->validated();

        if ($request->hasFile('logo') && ! $request->file('logo')->isValid()) {
            $file = $request->file('logo');
            Log::error('Logo upload invalid on store', [
                'error_code' => $file->getError(),
                'size' => $file->getSize(),
                'client_mime' => $file->getClientMimeType(),
                'upload_max_filesize' => ini_get('upload_max_filesize'),
                'post_max_size' => ini_get('post_max_size'),
            ]);
            throw ValidationException::withMessages([
                'logo' => 'Logo upload failed (code ' . $file->getError() . '). Check file size limits.',
            ]);
        }

        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('tenants', 'public');
            $validated['logo'] = 'storage/' . $path;
        }

        $tenant = Tenant::create($validated);
        $activity = new ActivityLog;
        $activity->user_id = Auth::user()->id;
        $activity->action = 'created';
        $activity->subject_type = 'tenant';
        $activity->subject_id = $tenant->id;
        $activity->description = 'Tenant created';
        $activity->changes = $validated;
        $activity->save();

        return redirect()->back()->with('success', 'Tenant created successfully');
    }

    public function tenantUpdate(Request $request, Tenant $tenant)
    {
        $validator = Validator::make($request->all(), [
            'category_id' => ['required', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'logo' => ['nullable', 'image', 'max:5120'], // max 5MB
            'location' => ['required', 'string', 'max:255'],
            'hours' => ['required', 'string', 'max:255'],
            'fullDescription' => ['nullable', 'string'],
            'floor_id' => ['required', 'exists:floors,id'],
            'building' => ['required', 'string', 'max:255'],
            'room_no' => ['required', 'string', 'max:50'],
            'phone' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'website' => ['nullable', 'string', 'max:255'],
        ]);

        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->toArray());
        }

        $validated = $validator->validated();

        Log::info('Tenant update validated '.var_export($validated, true));
        if ($request->hasFile('logo') && ! $request->file('logo')->isValid()) {
            $file = $request->file('logo');
            Log::error('Logo upload invalid on update', [
                'error_code' => $file->getError(),
                'size' => $file->getSize(),
                'client_mime' => $file->getClientMimeType(),
                'upload_max_filesize' => ini_get('upload_max_filesize'),
                'post_max_size' => ini_get('post_max_size'),
            ]);
            throw ValidationException::withMessages([
                'logo' => 'Logo upload failed (code '.$file->getError().'). Check file size limits.',
            ]);
        }

        if ($request->hasFile('logo')) {
            $old = $tenant->logo;
            $path = $request->file('logo')->store('tenants', 'public');
            $validated['logo'] = 'storage/'.$path;
            if ($old && str_starts_with($old, 'storage/')) {
                $diskPath = str_replace('storage/', '', $old);
                if (Storage::disk('public')->exists($diskPath)) {
                    Storage::disk('public')->delete($diskPath);
                }
            }
        }

        $original = $tenant->getOriginal();
        $tenant->update($validated);
        $changes = $tenant->getChanges();
        $diff = ['before' => [], 'after' => []];
        foreach ($changes as $key => $value) {
            $diff['before'][$key] = $original[$key] ?? null;
            $diff['after'][$key] = $value;
        }
        $activity = new ActivityLog;
        $activity->user_id = Auth::user()->id;
        $activity->action = 'updated';
        $activity->subject_type = 'tenant';
        $activity->subject_id = $tenant->id;
        $activity->description = 'Tenant updated';
        $activity->changes = $diff;
        $activity->save();

        return redirect()->back()->with('success', 'Tenant updated successfully');
    }

    public function tenantDestroy(Tenant $tenant)
    {
        $old = $tenant->logo;
        if ($old && str_starts_with($old, 'storage/')) {
            $diskPath = str_replace('storage/', '', $old);
            if (Storage::disk('public')->exists($diskPath)) {
                Storage::disk('public')->delete($diskPath);
            }
        }
        $tenant->delete();
        $activity = new ActivityLog;
        $activity->user_id = Auth::user()->id;
        $activity->action = 'deleted';
        $activity->subject_type = 'tenant';
        $activity->subject_id = $tenant->id;
        $activity->description = 'Tenant deleted';
        $activity->changes = $tenant;
        $activity->save();

        return redirect()->back()->with('success', 'Tenant deleted successfully');
    }
}
