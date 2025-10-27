<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use App\Models\Tenant;
use App\Models\FreeSpace;
use App\Models\Vacancy;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        $data = [
            'tenants' => DB::table('tenants')->count(),
            'free_spaces' => DB::table('free_spaces')->count(),
            'vacancies' => DB::table('vacancies')->count(),
            'services' => DB::table('services')->count(),
            'gallery' => DB::table('galleries')->count(),
            'users' => DB::table('users')->count(),
            'applications' => DB::table('applications')->count(),
            'categories' => DB::table('categories')->count(),
            'contacts' => DB::table('contacts')->count(),
            'departments' => DB::table('departments')->count(),
            'news' => DB::table('news')->count(),
            'events' => DB::table('events')->count(),
            'slides' => DB::table('sliders')->count(),
            'team' => DB::table('teams')->count(),
            'malls' => DB::table('malls')->count(),
            'floors' => DB::table('floors')->count(),
            'testimonials' => DB::table('testimonials')->count(),
            'clients' => DB::table('clients')->count(),
            'meqs_readings' => DB::table('meqs_readings')->count(),
        ];
        $tables = DB::select("
            SELECT name 
            FROM sqlite_master 
            WHERE type='table' 
            AND name NOT LIKE 'sqlite_%'
            AND name NOT IN ('migrations', 'jobs', 'failed_jobs', 'job_batches', 'cache','cache_locks', 'sessions','password_reset_tokens')
        ");

        $tenants = Tenant::with('category')->orderBy('created_at', 'desc')->take(5)->get();
        $activities = ActivityLog::with('user')
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get();
        // $news = DB::table('news')->orderBy('created_at', 'desc')->take(5)->get();
        // $events = DB::table('events')->orderBy('created_at', 'desc')->take(5)->get();
        // $slides = DB::table('sliders')->orderBy('created_at', 'desc')->take(5)->get();
        // $team = DB::table('teams')->orderBy('created_at', 'desc')->take(5)->get();
        // $malls = DB::table('malls')->orderBy('created_at', 'desc')->take(5)->get();
        // $floors = DB::table('floors')->orderBy('created_at', 'desc')->take(5)->get();
        // $testimonials = DB::table('testimonials')->orderBy('created_at', 'desc')->take(5)->get();
        // $clients = DB::table('clients')->orderBy('created_at', 'desc')->take(5)->get();
        // $meqs_readings = DB::table('meqs_readings')->orderBy('created_at', 'desc')->take(5)->get();

        $tableNames = collect($tables)->pluck('name');
        return Inertia::render('Admin/Dashboard/Dashboard', [
            'counts' => $data,
            'tables' => $tableNames,
            'tenants' => $tenants,
            'activities' => $activities
        ]);
    }
    public function tenants()
    {
        $tenants = Tenant::with('category')->orderBy('created_at', 'desc')->limit(10)->get();
        $count = DB::table('tenants')->count();
        $categories = Category::all();
        $activities = ActivityLog::with('user')
            ->where('subject_type', "Tenant")
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get();
        return Inertia::render('Admin/Tenant/AdminTenant', [
            'tenants' => $tenants,
            'count' => $count,
            'categories' => $categories,
            'activities' => $activities
        ]);
    }

    public function freeSpaces()
    {
        $freeSpaces = FreeSpace::with('floor')->orderBy('created_at', 'desc')->get();
        $count = DB::table('free_spaces')->count();
        $counts = FreeSpace::select('availability_status', DB::raw('count(*) as total'))
              ->groupBy('availability_status')
              ->pluck('total', 'availability_status')
              ->toArray();
        $counts['count'] = $count;
        $floors = DB::table('floors')->select('id','name')->orderBy('name')->get();
        $activities = ActivityLog::with('user')
            ->where('subject_type', 'free_space')
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get();
        return Inertia::render('Admin/FreeSpace/AdminFreeSpace', [
            'freeSpaces' => $freeSpaces,
            'floors' => $floors,
            'activities' => $activities,
            'counts' => $counts,
        ]);
    }

    public function vacancies()
    {
        $vacancies = Vacancy::orderBy('created_at', 'desc')->get();
        $count = DB::table('vacancies')->count();
        $activities = ActivityLog::with('user')
            ->where('subject_type', 'vacancy')
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get();
        return Inertia::render('Admin/Vacancy/AdminVacancy', [
            'vacancies' => $vacancies,
            'activities' => $activities,
            'counts' => $count,
        ]);
    }

    public function gallery()
    {
        return Inertia::render('Admin/Gallery/Gallery');
    }

    public function tenantShow(Tenant $tenant)
    {
        $tenant->load('category');
        return response()->json($tenant);
    }

    public function tenantStore(Request $request)
    {
        $validated = $request->validate([
            'category_id' => ['nullable', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'logo' => ['nullable','image','max:5120'], // max 5MB
            'location' => ['nullable', 'string', 'max:255'],
            'hours' => ['nullable', 'string', 'max:255'],
            'fullDescription' => ['nullable', 'string'],
            'floor' => ['nullable', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'website' => ['nullable', 'string', 'max:255'],
        ]);

        if ($request->hasFile('logo') && ! $request->file('logo')->isValid()) {
            $file = $request->file('logo');
            Log::error('Logo upload invalid on store', [
                'error_code' => $file->getError(),
                'size' => $file->getSize(),
                'client_mime' => $file->getClientMimeType(),
                'upload_max_filesize' => ini_get('upload_max_filesize'),
                'post_max_size' => ini_get('post_max_size'),
            ]);
            return back()->withErrors(['logo' => 'Logo upload failed (code '.$file->getError().'). Check file size limits.'])->withInput();
        }

        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('tenants', 'public');
            $validated['logo'] = 'storage/' . $path;
        }

        $tenant = Tenant::create($validated);
        $activity = new ActivityLog();
        $activity->user_id = auth()->user()->id;
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
        $validated = $request->validate([
            'category_id' => ['nullable', 'exists:categories,id'],
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'logo' => ['nullable','image','max:5120'], // max 5MB
            'location' => ['nullable', 'string', 'max:255'],
            'hours' => ['nullable', 'string', 'max:255'],
            'fullDescription' => ['nullable', 'string'],
            'floor' => ['nullable', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'website' => ['nullable', 'string', 'max:255'],
        ]);

        if ($request->hasFile('logo') && ! $request->file('logo')->isValid()) {
            $file = $request->file('logo');
            Log::error('Logo upload invalid on update', [
                'error_code' => $file->getError(),
                'size' => $file->getSize(),
                'client_mime' => $file->getClientMimeType(),
                'upload_max_filesize' => ini_get('upload_max_filesize'),
                'post_max_size' => ini_get('post_max_size'),
            ]);
            return back()->withErrors(['logo' => 'Logo upload failed (code '.$file->getError().'). Check file size limits.'])->withInput();
        }

        if ($request->hasFile('logo')) {
            $old = $tenant->logo;
            $path = $request->file('logo')->store('tenants', 'public');
            $validated['logo'] = 'storage/' . $path;
            if ($old && str_starts_with($old, 'storage/')) {
                $diskPath = str_replace('storage/', '', $old);
                if (Storage::disk('public')->exists($diskPath)) {
                    Storage::disk('public')->delete($diskPath);
                }
            }
        }

        $tenant->update($validated);
        $activity = new ActivityLog();
        $activity->user_id = auth()->user()->id;
        $activity->action = 'updated';
        $activity->subject_type = 'tenant';
        $activity->subject_id = $tenant->id;
        $activity->description = 'Tenant updated';
        $activity->changes = $validated;
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
        $activity = new ActivityLog();
        $activity->user_id = auth()->user()->id;
        $activity->action = 'deleted';
        $activity->subject_type = 'tenant';
        $activity->subject_id = $tenant->id;
        $activity->description = 'Tenant deleted';
        $activity->changes = $tenant;
        $activity->save();
        return redirect()->back()->with('success', 'Tenant deleted successfully');
    }

    // FreeSpaces JSON CRUD
    public function freeSpacesList()
    {
        return response()->json(FreeSpace::with('floor')->latest()->get());
    }

    public function freeSpaceShow(FreeSpace $freeSpace)
    {
        return response()->json($freeSpace->load('floor'));
    }

    public function freeSpaceStore(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required','string','max:255'],
            'floor_id' => ['nullable','exists:floors,id'],
            'wing_or_zone' => ['nullable','string','max:255'],
            'area_sqm' => ['nullable','numeric'],
            'dimensions' => ['nullable','string','max:255'],
            'has_window' => ['boolean'],
            'has_ventilation' => ['boolean'],
            'has_plumbing' => ['boolean'],
            'has_electricity' => ['boolean'],
            'features' => ['nullable','string'],
            'monthly_rent' => ['nullable','numeric'],
            'rent_currency' => ['nullable','string','max:10'],
            'rent_includes' => ['nullable','string'],
            'negotiable' => ['boolean'],
            'thumbnail' => ['nullable','image'],
            'gallery' => ['nullable','array'],
            'virtual_tour_url' => ['nullable','string','max:255'],
            'short_description' => ['nullable','string'],
            'full_description' => ['nullable','string'],
            'contact_person' => ['nullable','string','max:255'],
            'contact_phone' => ['nullable','string','max:50'],
            'contact_email' => ['nullable','email','max:255'],
            'meta_title' => ['nullable','string','max:255'],
            'meta_description' => ['nullable','string','max:255'],
            'slug' => ['required','string','max:255','unique:free_spaces,slug'],
            'availability_status' => ['required','in:available,reserved,occupied'],
        ]);

        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('free-spaces', 'public');
            $validated['thumbnail'] = 'storage/' . $path;
        }
        if ($request->has('gallery') && is_array($request->gallery)) {
            $validated['gallery'] = $request->gallery;
        }

        $space = FreeSpace::create($validated);
        $activity = new ActivityLog();
        $activity->user_id = auth()->user()->id;
        $activity->action = 'created';
        $activity->subject_type = 'free_space';
        $activity->subject_id = $space->id;
        $activity->description = 'Free space created';
        $activity->changes = $validated;
        $activity->save();
        return redirect()->back()->with('success', 'Free space created successfully');
    }

    public function freeSpaceUpdate(Request $request, FreeSpace $freeSpace)
    {
        $validated = $request->validate([
            'name' => ['sometimes','required','string','max:255'],
            'floor_id' => ['nullable','exists:floors,id'],
            'wing_or_zone' => ['nullable','string','max:255'],
            'area_sqm' => ['nullable','numeric'],
            'dimensions' => ['nullable','string','max:255'],
            'has_window' => ['boolean'],
            'has_ventilation' => ['boolean'],
            'has_plumbing' => ['boolean'],
            'has_electricity' => ['boolean'],
            'features' => ['nullable','string'],
            'monthly_rent' => ['nullable','numeric'],
            'rent_currency' => ['nullable','string','max:10'],
            'rent_includes' => ['nullable','string'],
            'negotiable' => ['boolean'],
            'thumbnail' => ['nullable','image'],
            'gallery' => ['nullable','array'],
            'virtual_tour_url' => ['nullable','string','max:255'],
            'short_description' => ['nullable','string'],
            'full_description' => ['nullable','string'],
            'contact_person' => ['nullable','string','max:255'],
            'contact_phone' => ['nullable','string','max:50'],
            'contact_email' => ['nullable','email','max:255'],
            'meta_title' => ['nullable','string','max:255'],
            'meta_description' => ['nullable','string','max:255'],
            'slug' => ['sometimes','required','string','max:255','unique:free_spaces,slug,'.$freeSpace->id],
            'availability_status' => ['nullable','in:available,reserved,occupied'],
        ]);

        if ($request->hasFile('thumbnail')) {
            $old = $freeSpace->thumbnail;
            $path = $request->file('thumbnail')->store('free-spaces', 'public');
            $validated['thumbnail'] = 'storage/' . $path;
            if ($old && str_starts_with($old, 'storage/')) {
                $diskPath = str_replace('storage/', '', $old);
                if (Storage::disk('public')->exists($diskPath)) {
                    Storage::disk('public')->delete($diskPath);
                }
            }
        }
        if ($request->has('gallery') && is_array($request->gallery)) {
            $validated['gallery'] = $request->gallery;
        }

        $freeSpace->update($validated);
        $activity = new ActivityLog();
        $activity->user_id = auth()->user()->id;
        $activity->action = 'updated';
        $activity->subject_type = 'free_space';
        $activity->subject_id = $freeSpace->id;
        $activity->description = 'Free space updated';
        $activity->changes = $validated;
        $activity->save();
        return redirect()->back()->with('success', 'Free space updated successfully');
    }

    public function freeSpaceDestroy(FreeSpace $freeSpace)
    {
        $old = $freeSpace->thumbnail;
        if ($old && str_starts_with($old, 'storage/')) {
            $diskPath = str_replace('storage/', '', $old);
            if (Storage::disk('public')->exists($diskPath)) {
                Storage::disk('public')->delete($diskPath);
            }
        }
        $freeSpace->delete();
        $activity = new ActivityLog();
        $activity->user_id = auth()->user()->id;
        $activity->action = 'deleted';
        $activity->subject_type = 'free_space';
        $activity->subject_id = $freeSpace->id;
        $activity->description = 'Free space deleted';
        $activity->changes = $freeSpace;
        $activity->save();
        return redirect()->back()->with('success', 'Free space deleted successfully');
    }

    // Vacancies JSON CRUD
    public function vacanciesList()
    {
        return response()->json(Vacancy::latest()->get());
    }

    public function vacancyShow(Vacancy $vacancy)
    {
        return response()->json($vacancy);
    }

    public function vacancyStore(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required','string','max:150'],
            'department' => ['nullable','string','max:100'],
            'employment_type' => ['required','string','max:30'],
            'work_location' => ['required','string','max:100'],
            'salary_min' => ['nullable','numeric'],
            'salary_max' => ['nullable','numeric'],
            'currency' => ['nullable','string','max:10'],
            'job_description' => ['required','string'],
            'requirements' => ['nullable','string'],
            'benefits' => ['nullable','string'],
            'how_to_apply' => ['required','string'],
            'posted_date' => ['required','date'],
            'closing_date' => ['required','date','after_or_equal:posted_date'],
            'number_of_positions' => ['nullable','integer','min:1'],
            'contact_email' => ['nullable','email','max:255'],
            'contact_phone' => ['nullable','string','max:20'],
            'address' => ['nullable','string'],
            'is_approved' => ['boolean'],
            'slug' => ['required','string','max:255','unique:vacancies,slug'],
            'thumbnail' => ['nullable','image'],
        ]);

        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('vacancies', 'public');
            $validated['thumbnail'] = 'storage/' . $path;
        }

        $vacancy = Vacancy::create($validated);
        $activity = new ActivityLog();
        $activity->user_id = auth()->user()->id;
        $activity->action = 'created';
        $activity->subject_type = 'vacancy';
        $activity->subject_id = $vacancy->id;
        $activity->description = 'Vacancy created';
        $activity->changes = $validated;
        $activity->save();
        return redirect()->back()->with('success', 'Vacancy created successfully');
    }

    public function vacancyUpdate(Request $request, Vacancy $vacancy)
    {
        $validated = $request->validate([
            'title' => ['sometimes','required','string','max:150'],
            'department' => ['nullable','string','max:100'],
            'employment_type' => ['sometimes','required','string','max:30'],
            'work_location' => ['sometimes','required','string','max:100'],
            'salary_min' => ['nullable','numeric'],
            'salary_max' => ['nullable','numeric'],
            'currency' => ['nullable','string','max:10'],
            'job_description' => ['sometimes','required','string'],
            'requirements' => ['nullable','string'],
            'benefits' => ['nullable','string'],
            'how_to_apply' => ['sometimes','required','string'],
            'posted_date' => ['sometimes','required','date'],
            'closing_date' => ['sometimes','required','date','after_or_equal:posted_date'],
            'number_of_positions' => ['nullable','integer','min:1'],
            'contact_email' => ['nullable','email','max:255'],
            'contact_phone' => ['nullable','string','max:20'],
            'address' => ['nullable','string'],
            'is_approved' => ['boolean'],
            'slug' => ['sometimes','required','string','max:255','unique:vacancies,slug,'.$vacancy->id],
            'thumbnail' => ['nullable','image'],
        ]);

        if ($request->hasFile('thumbnail')) {
            $old = $vacancy->thumbnail;
            $path = $request->file('thumbnail')->store('vacancies', 'public');
            $validated['thumbnail'] = 'storage/' . $path;
            if ($old && str_starts_with($old, 'storage/')) {
                $diskPath = str_replace('storage/', '', $old);
                if (Storage::disk('public')->exists($diskPath)) {
                    Storage::disk('public')->delete($diskPath);
                }
            }
        }

        $vacancy->update($validated);
        $activity = new ActivityLog();
        $activity->user_id = auth()->user()->id;
        $activity->action = 'updated';
        $activity->subject_type = 'vacancy';
        $activity->subject_id = $vacancy->id;
        $activity->description = 'Vacancy updated';
        $activity->changes = $validated;
        $activity->save();
        return redirect()->back()->with('success', 'Vacancy updated successfully');
    }

    public function vacancyDestroy(Vacancy $vacancy)
    {
        $old = $vacancy->thumbnail;
        if ($old && str_starts_with($old, 'storage/')) {
            $diskPath = str_replace('storage/', '', $old);
            if (Storage::disk('public')->exists($diskPath)) {
                Storage::disk('public')->delete($diskPath);
            }
        }
        $vacancy->delete();
        $activity = new ActivityLog();
        $activity->user_id = auth()->user()->id;
        $activity->action = 'deleted';
        $activity->subject_type = 'vacancy';
        $activity->subject_id = $vacancy->id;
        $activity->description = 'Vacancy deleted';
        $activity->changes = $vacancy;
        $activity->save();
        return redirect()->back()->with('success', 'Vacancy deleted successfully');
    }
    public function activity(\Illuminate\Http\Request $request, $subject = null)
    {
        $query = ActivityLog::with('user')->orderByDesc('created_at');
        $subjectType = $subject ?: $request->query('subject');
        if ($subjectType) {
            $query->where('subject_type', $subjectType);
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
        if ($perPage <= 0) { $perPage = 10; }
        if ($perPage > 1000) { $perPage = 1000; }

        $paginator = $query->paginate($perPage);
        return response()->json($paginator);
    }

    public function tenantList(\Illuminate\Http\Request $request)
    {
        $query = Tenant::with('category')->orderByDesc('created_at');
        $search = $request->query('search');
        $categoryId = $request->query('category_id');
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%$search%")
                  ->orWhere('description', 'like', "%$search%")
                  ->orWhere('location', 'like', "%$search%");
            });
        }
        if ($categoryId) {
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
        if ($perPage <= 0) { $perPage = 10; }
        if ($perPage > 1000) { $perPage = 1000; }
        $paginator = $query->paginate($perPage);
        return response()->json($paginator);
    }
}

