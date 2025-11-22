<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ActivityLog;
use App\Models\Service;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class AdminServiceController extends Controller
{
  public function servicesList()
  {
    $query = Service::orderByDesc('created_at');
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

  public function serviceShow(Service $service)
  {
    return response()->json($service);
  }

  public function serviceStore(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'title_en' => ['required', 'string', 'max:255'],
      'title_am' => ['required', 'string', 'max:255'],
      'sub_title_en' => ['nullable', 'string', 'max:255'],
      'sub_title_am' => ['nullable', 'string', 'max:255'],
      'description_en' => ['required', 'string'],
      'description_am' => ['required', 'string'],
      'image' => ['nullable', 'image'],
      'approval' => ['boolean'],
    ]);

    if ($validator->fails()) {
      throw ValidationException::withMessages($validator->errors()->toArray());
    }

    $validated = $validator->validated();

    if ($request->hasFile('image')) {
      $path = $request->file('image')->store('service', 'public');
      $validated['image'] = 'storage/' . $path;
    }
    $validated['created_by'] = Auth::user()->id;

    $service = Service::create($validated);
    $activity = new ActivityLog;
    $activity->user_id = Auth::user()->id;
    $activity->action = 'created';
    $activity->subject_type = 'service';
    $activity->subject_id = $service->id;
    $activity->description = 'Service created';
    $activity->changes = $validated;
    $activity->save();

    return redirect()->back()->with('success', 'Service created successfully');
  }

  public function serviceUpdate(Request $request, Service $service)
  {
    $validator = Validator::make($request->all(), [
      'title_en' => ['sometimes', 'required', 'string', 'max:255'],
      'title_am' => ['sometimes', 'required', 'string', 'max:255'],
      'sub_title_en' => ['nullable', 'string', 'max:255'],
      'sub_title_am' => ['nullable', 'string', 'max:255'],
      'description_en' => ['sometimes', 'required', 'string'],
      'description_am' => ['sometimes', 'required', 'string'],
      'image' => ['nullable', 'image'],
      'approval' => ['boolean'],
    ]);

    if ($validator->fails()) {
      throw ValidationException::withMessages($validator->errors()->toArray());
    }

    $validated = $validator->validated();

    if ($request->hasFile('image')) {
      $old = $service->image;
      $path = $request->file('image')->store('service', 'public');
      $validated['image'] = 'storage/' . $path;
      if ($old && str_starts_with($old, 'storage/')) {
        $diskPath = str_replace('storage/', '', $old);
        if (Storage::disk('public')->exists($diskPath)) {
          Storage::disk('public')->delete($diskPath);
        }
      }
    }

    $original = $service->getOriginal();
    $service->update($validated);
    $changes = $service->getChanges();
    $diff = ['before' => [], 'after' => []];
    foreach ($changes as $key => $value) {
      $diff['before'][$key] = $original[$key] ?? null;
      $diff['after'][$key] = $value;
    }
    $activity = new ActivityLog;
    $activity->user_id = Auth::user()->id;
    $activity->action = 'updated';
    $activity->subject_type = 'service';
    $activity->subject_id = $service->id;
    $activity->description = 'Service updated';
    $activity->changes = $diff;
    $activity->save();

    return redirect()->back()->with('success', 'Service updated successfully');
  }

  public function serviceDestroy(Service $service)
  {
    $old = $service->image;
    if ($old && str_starts_with($old, 'storage/')) {
      $diskPath = str_replace('storage/', '', $old);
      if (Storage::disk('public')->exists($diskPath)) {
        Storage::disk('public')->delete($diskPath);
      }
    }
    $service->delete();
    $activity = new ActivityLog;
    $activity->user_id = Auth::user()->id;
    $activity->action = 'deleted';
    $activity->subject_type = 'service';
    $activity->subject_id = $service->id;
    $activity->description = 'Service deleted';
    $activity->changes = $service;
    $activity->save();

    return redirect()->back()->with('success', 'Service deleted successfully');
  }
  public function services()
  {
    $services = Service::orderByDesc('created_at')->get();
    $total = DB::table('services')->count();
    $approved = DB::table('services')->where('approval', 1)->count();
    $pending = $total - $approved;
    $counts = [
      'total' => $total,
      'approved' => $approved,
      'pending' => $pending,
    ];
    $activities = ActivityLog::with('user')
      ->where('subject_type', 'service')
      ->orderByDesc('created_at')
      ->take(10)
      ->get();

    return Inertia::render('Admin/Service/AdminService', [
      'services' => $services,
      'activities' => $activities,
      'counts' => $counts,
    ]);
  }
}
