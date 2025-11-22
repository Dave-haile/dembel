<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\AboutContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class AdminAboutContentController extends Controller
{
  public function aboutContents()
  {
    $activities = ActivityLog::with('user')
      ->where('subject_type', 'about_content')
      ->orderByDesc('created_at')
      ->take(10)
      ->get();
    $aboutContents = AboutContent::all();
    $counts = [
      'total' => $aboutContents->count(),
      'components' => $aboutContents->pluck('component')->unique()->count(),
      'positions' => $aboutContents->pluck('position')->unique()->count(),
    ];

    return Inertia::render('Admin/AdminAboutContent/AdminAboutContent', [
      'aboutContents' => $aboutContents,
      'activities' => $activities,
      'counts' => $counts,
    ]);
  }

  public function aboutContentsList(Request $request)
  {
    $query = AboutContent::query();

    // Search
    if ($request->has('search') && ! empty($request->search)) {
      $search = $request->search;
      $query->where(function ($q) use ($search) {
        $q->where('title', 'like', "%{$search}%")
          ->orWhere('component', 'like', "%{$search}%")
          ->orWhere('subtitle', 'like', "%{$search}%");
      });
    }

    // Filter by component
    if ($request->has('component') && ! empty($request->component)) {
      $query->where('component', $request->component);
    }

    // Pagination
    $perPage = $request->per_page === 'all' ? 1000 : ($request->per_page ?? 10);
    $contents = $query->orderBy('position')->paginate($perPage);

    return response()->json($contents);
  }

  public function aboutContentStore(Request $request)
  {
    if ($request->extra_data === null || $request->extra_data === '' || $request->extra_data === '[]') {
      $request->merge(['extra_data' => null]);
    }
    $validator = Validator::make($request->all(), [
      'component' => 'required|string|max:255',
      'title' => 'nullable|string|max:255',
      'subtitle' => 'nullable|string|max:255',
      'description' => 'nullable|string',
      'image_url' => 'nullable|string',
      'position' => 'nullable|integer',
      'extra_data' => 'nullable|array',
    ]);

    if ($validator->fails()) {
      throw ValidationException::withMessages($validator->errors()->toArray());
    }

    $validated = $validator->validated();

    $aboutContent = AboutContent::create($validated);

    // Log activity
    $activity = new ActivityLog;
    $activity->user_id = Auth::user()->id;
    $activity->action = 'created';
    $activity->subject_type = 'about_content';
    $activity->subject_id = $aboutContent->id;
    $activity->description = 'About content created';
    $activity->changes = $validated;
    $activity->save();

    return redirect()->back()->with('success', 'About content created successfully');
  }

  public function aboutContentUpdate(Request $request, AboutContent $aboutContent)
  {
    if ($request->extra_data === null || $request->extra_data === '' || $request->extra_data === '[]') {
      $request->merge(['extra_data' => null]);
    }
    $validator = Validator::make($request->all(), [
      'component' => 'sometimes|required|string|max:255',
      'title' => 'nullable|string|max:255',
      'subtitle' => 'nullable|string|max:255',
      'description' => 'nullable|string',
      'image_url' => 'nullable|string',
      'position' => 'nullable|integer',
      'extra_data' => 'nullable|array',
    ]);

    if ($validator->fails()) {
      throw ValidationException::withMessages($validator->errors()->toArray());
    }

    $aboutContent->update($validator->validated());

    // Log activity
    $activity = new ActivityLog;
    $activity->user_id = Auth::user()->id;
    $activity->action = 'updated';
    $activity->subject_type = 'about_content';
    $activity->subject_id = $aboutContent->id;
    $activity->description = 'About content updated';
    $activity->changes = $validator->validated();
    $activity->save();

    return redirect()->back()->with('success', 'About content updated successfully');
  }

  public function aboutContentDestroy(AboutContent $aboutContent)
  {
    $aboutContent->delete();

    // Log activity
    $activity = new ActivityLog;
    $activity->user_id = Auth::user()->id;
    $activity->action = 'deleted';
    $activity->subject_type = 'about_content';
    $activity->subject_id = $aboutContent->id;
    $activity->description = 'About content deleted';
    $activity->changes = $aboutContent->toArray();
    $activity->save();

    return redirect()->back()->with('success', 'About content deleted successfully');
  }
}
