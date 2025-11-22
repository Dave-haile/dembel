<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\Gallery;
use App\Models\Floor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class AdminGalleryController extends Controller
{
    public function gallery()
    {
        $galleries = Gallery::with('floor')->orderByDesc('created_at')->get();
        $floors = Floor::all();
        $total = DB::table('galleries')->count();
        $instagramImages = DB::table('instagram_images')->orderByDesc('id')->get();
        $approved = DB::table('galleries')->where('approval', 1)->count();
        $pending = $total - $approved;
        $counts = [
            'total' => $total,
            'approved' => $approved,
            'pending' => $pending,
        ];
        $activities = ActivityLog::with('user')
            ->where('subject_type', 'gallery')
            ->orWhere('subject_type', 'instagram')
            ->orderByDesc('created_at')
            ->take(10)
            ->get();

        return Inertia::render('Admin/Gallery/AdminGallery', [
            'galleries' => $galleries,
            'floors' => $floors,
            'instagrams' => $instagramImages,
            'activities' => $activities,
            'counts' => $counts,
        ]);
    }

    public function galleriesList()
    {
        $query = Gallery::with('floor')->orderByDesc('created_at');
        $perPageRaw = request()->query('per_page', 10);
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
    public function galleryShow(Gallery $gallery)
    {
        return response()->json($gallery);
    }

    public function galleryStore(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'string', 'max:255'],
            'category' => ['nullable', 'string', 'max:100'],
            'floor_id' => ['nullable', 'exists:floors,id'],
            'sector' => ['nullable', 'integer'],
            'description' => ['nullable', 'string'],
            'image' => ['required', 'image', 'max:5120'],
            'approval' => ['boolean'],
        ]);
        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->toArray());
        }

        $validated = $validator->validated();

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('gallery', 'public');
            $validated['image'] = 'storage/' . $path;
        }
        $validated['created_by'] = auth()->id();

        $gallery = Gallery::create($validated);

        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'created';
        $activity->subject_type = 'gallery';
        $activity->subject_id = $gallery->id;
        $activity->description = 'Gallery image created';
        $activity->changes = $validated;
        $activity->save();

        return redirect()->back()->with('success', 'Gallery created successfully');
    }

    public function galleryUpdate(Request $request, Gallery $gallery)
    {
        $validator = Validator::make($request->all(), [
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'category' => ['nullable', 'string', 'max:100'],
            'floor_id' => ['nullable', 'exists:floors,id'],
            'sector' => ['nullable', 'integer'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'max:5120'],
            'approval' => ['boolean'],
        ]);
        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->toArray());
        }

        $validated = $validator->validated();

        if ($request->hasFile('image')) {
            $old = $gallery->image;
            $path = $request->file('image')->store('gallery', 'public');
            $validated['image'] = 'storage/' . $path;
            if ($old && str_starts_with($old, 'storage/')) {
                $diskPath = str_replace('storage/', '', $old);
                if (Storage::disk('public')->exists($diskPath)) {
                    Storage::disk('public')->delete($diskPath);
                }
            }
        }

        $original = $gallery->getOriginal();
        $gallery->update($validated);
        $changes = $gallery->getChanges();
        $diff = ['before' => [], 'after' => []];
        foreach ($changes as $key => $value) {
            $diff['before'][$key] = $original[$key] ?? null;
            $diff['after'][$key] = $value;
        }
        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'updated';
        $activity->subject_type = 'gallery';
        $activity->subject_id = $gallery->id;
        $activity->description = 'Gallery image updated';
        $activity->changes = $diff;
        $activity->save();

        return redirect()->back()->with('success', 'Gallery updated successfully');
    }

    public function galleryDestroy(Gallery $gallery)
    {
        $old = $gallery->image;
        if ($old && str_starts_with($old, 'storage/')) {
            $diskPath = str_replace('storage/', '', $old);
            if (Storage::disk('public')->exists($diskPath)) {
                Storage::disk('public')->delete($diskPath);
            }
        }
        $gallery->delete();

        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'deleted';
        $activity->subject_type = 'gallery';
        $activity->subject_id = $gallery->id;
        $activity->description = 'Gallery image deleted';
        $activity->changes = $gallery;
        $activity->save();

        return redirect()->back()->with('success', 'Gallery deleted successfully');
    }

    // Instagram Image Management
    public function instagramStore(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'caption' => 'nullable|string|max:255',
            'hashtags' => 'nullable|string|max:255',
            'approval' => 'boolean',
            'image' => 'required|image|max:5120',
        ]);
        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->toArray());
        }

        $validated = $validator->validated();

        $path = $validated['image']->store('instagram', 'public');
        $validated['image'] = 'storage/' . $path;
        $validated['created_at'] = now();
        $validated['updated_at'] = now();

        DB::table('instagram_images')->insert($validated);
        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->subject_type = 'instagram';
        $activity->subject_id = DB::table('instagram_images')->latest('id')->first()->id;
        $activity->action = 'created';
        $activity->save();

        return redirect()->back()->with('success', 'Image added');
    }

    public function instagramUpdate(Request $req, $id)
    {
        $row = DB::table('instagram_images')->find($id);
        if (! $row) {
            abort(404);
        }

        $validator = Validator::make($req->all(), [
            'caption' => 'nullable|string|max:255',
            'hashtags' => 'nullable|string|max:255',
            'approval' => 'boolean',
            'image' => 'nullable|image|max:5120',
        ]);
        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->toArray());
        }

        $validated = $validator->validated();

        if ($req->hasFile('image')) {
            // delete old
            if ($row->image && str_starts_with($row->image, 'storage/')) {
                $diskPath = Str::after($row->image, 'storage/');
                Storage::disk('public')->delete($diskPath);
            }
            $path = $req->file('image')->store('instagram', 'public');
            $validated['image'] = 'storage/' . $path;
        }

        $validated['updated_at'] = now();
        DB::table('instagram_images')->where('id', $id)->update($validated);
        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->subject_type = 'instagram';
        $activity->subject_id = $id;
        $activity->action = 'updated';
        $activity->save();

        return redirect()->back()->with('success', 'Updated');
    }

    public function instagramDestroy($id)
    {
        $row = DB::table('instagram_images')->find($id);
        if ($row && $row->image && str_starts_with($row->image, 'storage/')) {
            Storage::disk('public')->delete(Str::after($row->image, 'storage/'));
        }
        DB::table('instagram_images')->where('id', $id)->delete();
        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->subject_type = 'instagram';
        $activity->subject_id = $id;
        $activity->action = 'deleted';
        $activity->save();

        return redirect()->back()->with('success', 'Deleted');
    }
}
