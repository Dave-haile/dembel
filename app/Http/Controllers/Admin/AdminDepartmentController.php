<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;


class AdminDepartmentController extends Controller
{
  public function departments()
  {
    $departments = Department::orderByDesc('created_at')->limit(10)->get();
    $total = DB::table('departments')->count();
    $approved = DB::table('departments')->where('approval', 1)->count();
    $counts = [
      'total' => $total,
      'approved' => $approved,
      'pending' => $total - $approved,
    ];
    $activities = ActivityLog::with('user')
      ->where('subject_type', 'department')
      ->orderByDesc('created_at')
      ->take(10)
      ->get();

    return Inertia::render('Admin/AdminDepartment/AdminDepartment', [
      'departments' => $departments,
      'activities' => $activities,
      'counts' => $counts,
    ]);
  }

  public function departmentsList(Request $request)
  {
    $query = Department::orderByDesc('created_at');
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

  public function departmentShow(Department $department)
  {
    return response()->json($department);
  }

  public function departmentStore(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'title_en' => ['required', 'string', 'max:255'],
      'title_am' => ['required', 'string', 'max:255'],
      'sub_title_en' => ['required', 'string', 'max:255'],
      'sub_title_am' => ['required', 'string', 'max:255'],
      'body_en' => ['required', 'string'],
      'body_am' => ['required', 'string'],
      'icon' => ['nullable', 'string', 'max:255'],
      'image' => ['nullable', 'image', 'max:5120'],
      'approval' => ['boolean'],
    ]);

    if ($validator->fails()) {
      throw ValidationException::withMessages($validator->errors()->toArray());
    }

    $validated = $validator->validated();

    if ($request->hasFile('image')) {
      $path = $request->file('image')->store('departments', 'public');
      $validated['image'] = 'storage/' . $path;
    }
    $validated['created_by'] = Auth::user()->id();

    $department = Department::create($validated);

    $activity = new ActivityLog;
    $activity->user_id = Auth::user()->id;
    $activity->action = 'created';
    $activity->subject_type = 'department';
    $activity->subject_id = $department->id;
    $activity->description = 'Department created';
    $activity->changes = $validated;
    $activity->save();

    return redirect()->back()->with('success', 'Department created successfully');
  }

  public function departmentUpdate(Request $request, Department $department)
  {
    $validator = Validator::make($request->all(), [
      'title_en' => ['sometimes', 'required', 'string', 'max:255'],
      'title_am' => ['sometimes', 'required', 'string', 'max:255'],
      'sub_title_en' => ['sometimes', 'required', 'string', 'max:255'],
      'sub_title_am' => ['sometimes', 'required', 'string', 'max:255'],
      'body_en' => ['sometimes', 'required', 'string'],
      'body_am' => ['sometimes', 'required', 'string'],
      'icon' => ['nullable', 'string', 'max:255'],
      'image' => ['nullable', 'image', 'max:5120'],
      'approval' => ['boolean'],
    ]);

    if ($validator->fails()) {
      throw ValidationException::withMessages($validator->errors()->toArray());
    }

    $validated = $validator->validated();

    if ($request->hasFile('image')) {
      $old = $department->image;
      $path = $request->file('image')->store('departments', 'public');
      $validated['image'] = 'storage/' . $path;
      if ($old && str_starts_with($old, 'storage/')) {
        $diskPath = str_replace('storage/', '', $old);
        if (Storage::disk('public')->exists($diskPath)) {
          Storage::disk('public')->delete($diskPath);
        }
      }
    }

    $original = $department->getOriginal();
    $department->update($validated);
    $changes = $department->getChanges();
    $diff = ['before' => [], 'after' => []];
    foreach ($changes as $key => $value) {
      $diff['before'][$key] = $original[$key] ?? null;
      $diff['after'][$key] = $value;
    }

    $activity = new ActivityLog;
    $activity->user_id = Auth::user()->id;
    $activity->action = 'updated';
    $activity->subject_type = 'department';
    $activity->subject_id = $department->id;
    $activity->description = 'Department updated';
    $activity->changes = $diff;
    $activity->save();

    return redirect()->back()->with('success', 'Department updated successfully');
  }

  public function departmentDestroy(Department $department)
  {
    $old = $department->image;
    if ($old && str_starts_with($old, 'storage/')) {
      $diskPath = str_replace('storage/', '', $old);
      if (Storage::disk('public')->exists($diskPath)) {
        Storage::disk('public')->delete($diskPath);
      }
    }
    $department->delete();

    $activity = new ActivityLog;
    $activity->user_id = Auth::user()->id;
    $activity->action = 'deleted';
    $activity->subject_type = 'department';
    $activity->subject_id = $department->id;
    $activity->description = 'Department deleted';
    $activity->changes = $department;
    $activity->save();

    return redirect()->back()->with('success', 'Department deleted successfully');
  }
}
