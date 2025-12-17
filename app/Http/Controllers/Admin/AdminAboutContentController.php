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
  public function aboutContents(Request $request)
  {
    $activities = ActivityLog::with('user')
      ->where('subject_type', 'about_content')
      ->orderByDesc('created_at')
      ->take(10)
      ->get();
    
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
    $perPage = $request->per_page ?? 10; // default to 10 to avoid undefined variable
    if ($request->per_page === 'all') {
      $perPage = 'all';
      $aboutContents = $query->orderBy('position')->get();
    } else {
      $aboutContents = $query->orderBy('position')->paginate($perPage);
    }

    $counts = [
      'total' => AboutContent::count(), // Use original count for total
      'components' => AboutContent::pluck('component')->unique()->count(),
      'positions' => AboutContent::pluck('position')->unique()->count(),
    ];

    return Inertia::render('Admin/AdminAboutContent/AdminAboutContent', [
      'aboutContents' => $aboutContents,
      'activities' => $activities,
      'counts' => $counts,
      'filters' => [
        'search' => $request->search ?? '',
        'per_page' => $perPage,
      ],
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
    if ($request->per_page === 'all') {
        $contents = $query->orderBy('position')->get();
    } else {
        $perPage = $request->per_page ?? 10;
        $contents = $query->orderBy('position')->paginate($perPage);
    }

    return response()->json($contents);
  }

  public function aboutContentStore(Request $request)
  {
    Log::info('about request' . var_export($request->all(), true));
    if ($request->has('extra_data') && is_string($request->extra_data)) {
        $request->merge(['extra_data' => json_decode($request->extra_data, true)]);
    }
    if ($request->extra_data === null || $request->extra_data === '' || $request->extra_data === '[]') {
      $request->merge(['extra_data' => null]);
    }
    Log::info('about after Merge'. var_export($request->all(), true));
    // In both store and update methods, update the validation rules
    $validator = Validator::make($request->all(), [
      'component' => 'required|string|max:255',
      'title' => 'nullable|string|max:255',
      'subtitle' => 'nullable|string',
      'description' => 'nullable|string',
      'image_url' => 'nullable|string', // Keep image_url as string for external URLs
      'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // For main image upload
      'position' => 'nullable|integer',
      'extra_data' => 'nullable|array',
      // Dynamic validation for extra_data files
      'extra_data_files.video_file' => 'nullable|mimes:mp4,mov,avi,wmv,flv,webm|max:500000', // Max 500MB for video
    ]);

    Log::info('Validated'. var_export($validator, true));
    if ($validator->fails()) {
      throw ValidationException::withMessages($validator->errors()->toArray());
    }

    $validated = $validator->validated();

    if (isset($validated['image'])) {
      $path = $request->file('image')->store('about', 'public');
      $validated['image_url'] = 'storage/' . $path;
    }

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
    Log::info('About Content Requet ' . var_export($request->all(), true));


    if ($request->has('extra_data') && is_string($request->extra_data)) {
        $request->merge(['extra_data' => json_decode($request->extra_data, true)]);
    }

    // Ensure extra_data is null if it's an empty array or string
    if ($request->extra_data === null || (is_array($request->extra_data) && empty($request->extra_data))) {
      $request->merge(['extra_data' => null]);
    }

    $validator = Validator::make($request->all(), [
      'component' => 'sometimes|required|string|max:255',
      'title' => 'nullable|string|max:255',
      'subtitle' => 'nullable|string|max:255',
      'description' => 'nullable|string',
      'image_url' => 'nullable|string',
      'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // For main image upload
      'position' => 'nullable|integer',
      'extra_data' => 'nullable|array',
      // Dynamic validation for extra_data files
      'extra_data_files.video_file' => 'nullable|mimes:mp4,mov,avi,wmv,flv,webm|max:500000', // Max 500MB for video
    ]);
    // Remove debug log
    // Log::info('About Content Validator ' . var_export($validator->validated(), true));

    if ($validator->fails()) {
      throw ValidationException::withMessages($validator->errors()->toArray());
    }

    $validated = $validator->validated();
    $aboutContent->update($validated);

    if ($request->hasFile('image')) {
      $old = $aboutContent->image_url;

      $path = $request->file('image')->store('about', 'public');

      $aboutContent->image_url = 'storage/' . $path;
      $aboutContent->save();

      if ($old && str_starts_with($old, 'storage/')) {
        $diskPath = str_replace('storage/', '', $old);
        Storage::disk('public')->delete($diskPath);
      }
    }

    // Handle extra_data_files for video
    if ($request->hasFile('extra_data_files.video_file')) {
        $videoFile = $request->file('extra_data_files.video_file');
        $path = $videoFile->store('videos', 'public'); // Store videos in a 'videos' folder

        // Retrieve existing extra_data, ensure it's an array, and update the video_url
        $currentExtraData = is_array($aboutContent->extra_data) ? $aboutContent->extra_data : (json_decode($aboutContent->extra_data, true) ?? []);
        
        // Assuming video_file data is always in the first element for non-array types (VideoSection)
        if (!empty($currentExtraData) && isset($currentExtraData[0])) {
            $currentExtraData[0]['video_url'] = 'storage/' . $path;
            // Set video_file to null as it's now stored and not part of the JSON data directly
            $currentExtraData[0]['video_file'] = null;
        } else {
            // If extra_data was empty, create a new entry
            $currentExtraData = [['video_url' => 'storage/' . $path, 'video_file' => null]];
        }
        
        $aboutContent->extra_data = $currentExtraData;
        $aboutContent->save();
    } else if ($request->has('extra_data') && is_array($request->extra_data) && !empty($request->extra_data)) {
        // If extra_data was sent as an array (without a new file upload) and it's for VideoSection
        // We need to ensure existing video_file path is retained if not updated by new file
        $componentConfig = app(\App\Http\Controllers\Admin\AdminAboutContentController::class)->getComponentConfig($aboutContent->component);
        if ($componentConfig && ($componentConfig['name'] ?? null) === 'Cinematic Tour') { // Check if it's the VideoSection component
            $currentExtraData = is_array($aboutContent->extra_data) ? $aboutContent->extra_data : (json_decode($aboutContent->extra_data, true) ?? []);
            if (!empty($currentExtraData) && isset($currentExtraData[0]) && isset($currentExtraData[0]['video_url'])) {
                // If new extra_data doesn't have video_url or it's null, retain the old one
                if (!isset($request->extra_data[0]['video_url']) || empty($request->extra_data[0]['video_url'])) {
                    $request->extra_data[0]['video_url'] = $currentExtraData[0]['video_url'];
                }
            }
        }
        $aboutContent->extra_data = $request->extra_data;
        $aboutContent->save();
    } else if ($request->has('extra_data') && is_array($request->extra_data) && empty($request->extra_data)) {
        // If extra_data is an empty array, set it to null
        $aboutContent->extra_data = null;
        $aboutContent->save();
    }

    // Log activity
    $activity = new ActivityLog;
    $activity->user_id = Auth::user()->id;
    $activity->action = 'updated';
    $activity->subject_type = 'about_content';
    $activity->subject_id = $aboutContent->id;
    $activity->description = 'About content updated';
    $activity->changes = $validated;
    $activity->save();

    return redirect()->back()->with('success', 'About content updated successfully');
  }

  // Add a helper method to get component config by name for internal use
  private function getComponentConfig(string $componentName)
  {
    $configs = [ // This should ideally be moved to a shared config or a dedicated service
        'AboutHero' => ['name' => 'Hero Section', 'description' => 'Main banner with slideshow'],
        'MallStory' => ['name' => 'Mall Story Timeline', 'description' => 'Timeline of mall history'],
        'MissionValues' => ['name' => 'Mission & Values', 'description' => 'Company values with icons'],
        'Facilities' => ['name' => 'Facilities', 'description' => 'Mall facilities and amenities'],
        'Stats' => ['name' => 'Statistics', 'description' => 'Achievement statistics'],
        'Team' => ['name' => 'Team Members', 'description' => 'Leadership team'],
        'Location' => ['name' => 'Location Info', 'description' => 'Contact and location details'],
        'MissionVisionValues' => ['name' => 'Mission Vision Values', 'description' => 'Company mission, vision and values'],
        'ManagementTeam' => ['name' => 'Management Team', 'description' => 'Management team members'],
        'WhoWeAre' => ['name' => 'Who We Are', 'description' => 'Basic information about the company'],
        'OrganizationalStructure' => ['name' => 'Organizational Structure', 'description' => 'Company organizational chart'],
        'MallHighlights' => ['name' => 'Mall Highlights', 'description' => 'Key statistics and features of the mall'],
        'VideoSection' => ['name' => 'Cinematic Tour', 'description' => 'Immerse yourself in the vibrant atmosphere of Addis Ababa\'s premier lifestyle destination. From luxury shopping to fine dining, experience it all before you arrive.'],
    ];
    // This is a simplified example. In a real application, you would load this from a more robust source.
    return $configs[$componentName] ?? null;
  }


  public function aboutContentDestroy(AboutContent $aboutContent)
  {
    $old = $aboutContent->image_url;
    if ($old && str_starts_with($old, 'storage/')) {
      $diskPath = str_replace('storage/', '', $old);
      if (Storage::disk('public')->exists($diskPath)) {
        Storage::disk('public')->delete($diskPath);
      }
    }
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