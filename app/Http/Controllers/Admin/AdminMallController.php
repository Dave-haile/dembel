<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\Mall;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class AdminMallController extends Controller
{
  public function malls()
  {
    $malls = Mall::orderByDesc('created_at')->limit(10)->get();
    $total = Mall::count();
    $withEmail = Mall::whereNotNull('contact_email')->where('contact_email', '!=', '')->count();
    $withPhone = Mall::whereNotNull('contact_phone')->where('contact_phone', '!=', '')->count();
    $counts = [
      'total' => $total,
      'with_email' => $withEmail,
      'with_phone' => $withPhone,
    ];

    $activities = ActivityLog::with('user')
      ->where('subject_type', 'mall')
      ->orderByDesc('created_at')
      ->take(10)
      ->get();

    return Inertia::render('Admin/AdminMall/AdminMall', [
      'malls' => $malls,
      'activities' => $activities,
      'counts' => $counts,
    ]);
  }

  public function mallsList(Request $request)
  {
    $query = Mall::orderByDesc('created_at');
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

  public function mallUpdate(Request $request, Mall $mall)
  {
    $validator = Validator::make($request->all(), [
      'name' => ['sometimes', 'required', 'string', 'max:255'],
      'slug' => ['nullable', 'string', 'max:255', Rule::unique('malls', 'slug')->ignore($mall->id)],
      'year_built' => ['nullable', 'integer'],
      'floors_directory' => ['nullable'],
      'total_area_sqm' => ['nullable', 'numeric'],
      'total_shops' => ['nullable', 'integer'],
      'description' => ['nullable', 'string'],
      'facilities' => ['nullable'],
      'gallery' => ['nullable'],
      'virtual_tour_url' => ['nullable', 'string', 'max:255'],
      'address' => ['nullable', 'string', 'max:255'],
      'contact_phone' => ['nullable', 'string', 'max:50'],
      'contact_email' => ['nullable', 'email', 'max:255'],
    ]);

    if ($validator->fails()) {
      throw ValidationException::withMessages($validator->errors()->toArray());
    }

    $validated = $validator->validated();

    foreach (['floors_directory', 'facilities', 'gallery'] as $key) {
      if ($request->has($key)) {
        $val = $request->input($key);
        if (is_string($val)) {
          $decoded = json_decode($val, true);
          if (json_last_error() === JSON_ERROR_NONE) {
            $validated[$key] = $decoded;
          }
        }
      }
    }

    // Handle gallery[] file uploads; merge with existing and any provided
    $galleryPaths = [];
    if ($request->hasFile('gallery')) {
      foreach ((array) $request->file('gallery') as $file) {
        if ($file && $file->isValid()) {
          $path = $file->store('mall', 'public');
          $galleryPaths[] = 'storage/' . $path;
        }
      }
    }
    if (! empty($validated['gallery']) && is_array($validated['gallery'])) {
      $galleryPaths = array_merge($galleryPaths, $validated['gallery']);
    }
    // Build existing gallery as array of strings
    $existingGallery = [];
    if (is_array($mall->gallery)) {
      $existingGallery = $mall->gallery;
    } elseif (is_string($mall->gallery) && $mall->gallery !== '') {
      $decoded = json_decode($mall->gallery, true);
      if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
        $existingGallery = $decoded;
      }
    }
    // Sanitize all to strings (support items with 'url')
    $toStrings = function ($arr) {
      $out = [];
      foreach ((array) $arr as $g) {
        if (is_string($g)) {
          $out[] = $g;
        } elseif (is_array($g) && isset($g['url']) && is_string($g['url'])) {
          $out[] = $g['url'];
        }
      }

      return $out;
    };
    $existingStr = $toStrings($existingGallery);
    $newStr = $toStrings($galleryPaths);
    if (! empty($existingStr) || ! empty($newStr)) {
      $validated['gallery'] = array_values(array_unique(array_merge($existingStr, $newStr)));
    }

    $original = $mall->getOriginal();
    $mall->update($validated);
    $changes = $mall->getChanges();
    $diff = ['before' => [], 'after' => []];
    foreach ($changes as $key => $value) {
      $diff['before'][$key] = $original[$key] ?? null;
      $diff['after'][$key] = $value;
    }

    $activity = new ActivityLog;
    $activity->user_id = Auth::user()->id;
    $activity->action = 'updated';
    $activity->subject_type = 'mall';
    $activity->subject_id = $mall->id;
    $activity->description = 'Mall updated';
    $activity->changes = $diff;
    $activity->save();

    return redirect()->back()->with('success', 'Mall updated successfully');
  }

  public function mallDestroy(Mall $mall)
  {
    $mall->delete();

    $activity = new ActivityLog;
    $activity->user_id = Auth::user()->id;
    $activity->action = 'deleted';
    $activity->subject_type = 'mall';
    $activity->subject_id = $mall->id;
    $activity->description = 'Mall deleted';
    $activity->changes = $mall;
    $activity->save();

    return redirect()->back()->with('success', 'Mall deleted successfully');
  }
}
