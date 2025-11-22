<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ActivityLog;
use App\Models\FreeSpace;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class AdminFreeSpaceController extends Controller
{
  public function freeSpaces()
  {
    $freeSpaces = FreeSpace::with('floor')->orderBy('created_at', 'desc')->get();
    $count = DB::table('free_spaces')->count();
    $counts = FreeSpace::select('availability_status', DB::raw('count(*) as total'))
      ->groupBy('availability_status')
      ->pluck('total', 'availability_status')
      ->toArray();
    $counts['count'] = $count;
    $floors = DB::table('floors')->select('id', 'name')->orderBy('name')->get();
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
    Log::info('Free space store request ' . var_export($request->all(), true));
    // Convert string booleans to actual booleans
    $request->merge([
      'has_window' => filter_var($request->has_window, FILTER_VALIDATE_BOOLEAN),
      'has_ventilation' => filter_var($request->has_ventilation, FILTER_VALIDATE_BOOLEAN),
      'has_plumbing' => filter_var($request->has_plumbing, FILTER_VALIDATE_BOOLEAN),
      'has_electricity' => filter_var($request->has_electricity, FILTER_VALIDATE_BOOLEAN),
      'negotiable' => filter_var($request->negotiable, FILTER_VALIDATE_BOOLEAN),
    ]);
    Log::info('Free space store val ' . var_export($request->all(), true));

    // First validate the slug separately to show a user-friendly error
    $slug = Str::slug($request->slug);
    if (FreeSpace::where('slug', $slug)->exists()) {
      throw ValidationException::withMessages([
        'slug' => ['This URL slug is already in use. Please choose a different one.']
      ]);
    }
    $request->merge(['slug' => $slug]);

    Log::info('Free space store request 2 ' . var_export($request->all(), true));
    $validator = Validator::make($request->all(), [
      'name' => ['required', 'string', 'max:255'],
      'floor_id' => ['nullable', 'exists:floors,id'],
      'wing_or_zone' => ['nullable', 'string', 'max:255'],
      'area_sqm' => ['nullable', 'numeric'],
      'dimensions' => ['nullable', 'string', 'max:255'],
      'has_window' => ['boolean'],
      'has_ventilation' => ['boolean'],
      'has_plumbing' => ['boolean'],
      'has_electricity' => ['boolean'],
      'features' => ['nullable', 'string'],
      'monthly_rent' => ['nullable', 'numeric'],
      'rent_currency' => ['nullable', 'string', 'max:10'],
      'rent_includes' => ['nullable', 'string'],
      'negotiable' => ['boolean'],
      'thumbnail' => ['nullable', 'image'],
      'gallery' => ['nullable', 'array'],
      'virtual_tour_url' => ['nullable', 'string', 'max:255'],
      'short_description' => ['nullable', 'string'],
      'full_description' => ['nullable', 'string'],
      'contact_person' => ['nullable', 'string', 'max:255'],
      'contact_phone' => ['nullable', 'string', 'max:50'],
      'contact_email' => ['nullable', 'email', 'max:255'],
      'meta_title' => ['nullable', 'string', 'max:255'],
      'meta_description' => ['nullable', 'string', 'max:255'],
      'slug' => ['required', 'string', 'max:255', 'unique:free_spaces,slug'],
      'availability_status' => ['required', 'in:available,reserved,occupied'],
    ]);

    if ($validator->fails()) {
      throw ValidationException::withMessages($validator->errors()->toArray());
    }

    $validated = $validator->validated();

    if ($request->hasFile('thumbnail')) {
      $path = $request->file('thumbnail')->store('free_spaces', 'public');
      $validated['thumbnail'] = 'storage/' . $path;
    }
    if ($request->has('gallery') && is_array($request->gallery)) {
      $validated['gallery'] = $request->gallery;
    }

    $space = FreeSpace::create($validated);
    Log::info('Free space created ' . $space->id);
    $activity = new ActivityLog;
    $activity->user_id = Auth::user()->id;
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
    Log::info('Free space update request ' . var_export($request->all(), true));
    $validator = Validator::make($request->all(), [
      'name' => ['sometimes', 'required', 'string', 'max:255'],
      'floor_id' => ['nullable', 'exists:floors,id'],
      'wing_or_zone' => ['nullable', 'string', 'max:255'],
      'area_sqm' => ['nullable', 'numeric'],
      'dimensions' => ['nullable', 'string', 'max:255'],
      'has_window' => ['boolean'],
      'has_ventilation' => ['boolean'],
      'has_plumbing' => ['boolean'],
      'has_electricity' => ['boolean'],
      'features' => ['nullable', 'string'],
      'monthly_rent' => ['nullable', 'numeric'],
      'rent_currency' => ['nullable', 'string', 'max:10'],
      'rent_includes' => ['nullable', 'string'],
      'negotiable' => ['boolean'],
      'thumbnail' => ['nullable', 'image'],
      'gallery' => ['nullable', 'array'],
      'virtual_tour_url' => ['nullable', 'string', 'max:255'],
      'short_description' => ['nullable', 'string'],
      'full_description' => ['nullable', 'string'],
      'contact_person' => ['nullable', 'string', 'max:255'],
      'contact_phone' => ['nullable', 'string', 'max:50'],
      'contact_email' => ['nullable', 'email', 'max:255'],
      'meta_title' => ['nullable', 'string', 'max:255'],
      'meta_description' => ['nullable', 'string', 'max:255'],
      'slug' => ['nullable', 'string', 'max:255', 'unique:free_spaces,slug,' . $freeSpace->id],
      'availability_status' => ['nullable', 'in:available,reserved,occupied'],
    ]);
    Log::info('Free space update validator ' . var_export($validator->errors()->toArray(), true));
    if ($validator->fails()) {
      throw ValidationException::withMessages($validator->errors()->toArray());
    }
    $validated = $validator->validated();
    Log::info('Free space update validated ' . var_export($validated, true));

    if ($request->hasFile('thumbnail')) {
      $old = $freeSpace->thumbnail;
      $path = $request->file('thumbnail')->store('free_spaces', 'public');
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

    $original = $freeSpace->getOriginal();
    $freeSpace->update($validated);
    $changes = $freeSpace->getChanges();
    $diff = ['before' => [], 'after' => []];
    foreach ($changes as $key => $value) {
      $diff['before'][$key] = $original[$key] ?? null;
      $diff['after'][$key] = $value;
    }
    $activity = new ActivityLog;
    $activity->user_id = Auth::user()->id;
    $activity->action = 'updated';
    $activity->subject_type = 'free_space';
    $activity->subject_id = $freeSpace->id;
    $activity->description = 'Free space updated';
    $activity->changes = $diff;
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
    $activity = new ActivityLog;
    $activity->user_id = Auth::user()->id;
    $activity->action = 'deleted';
    $activity->subject_type = 'free_space';
    $activity->subject_id = $freeSpace->id;
    $activity->description = 'Free space deleted';
    $activity->changes = $freeSpace;
    $activity->save();

    return redirect()->back()->with('success', 'Free space deleted successfully');
  }
}
