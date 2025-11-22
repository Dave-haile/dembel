<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class AdminUserController extends Controller
{
  public function users()
  {
    $users = User::orderByDesc('created_at')->get();
    $total = DB::table('users')->count();
    $admins = DB::table('users')->where('role', 'admin')->count();
    $verified = DB::table('users')->whereNotNull('email_verified_at')->count();
    $counts = [
      'total' => $total,
      'admins' => $admins,
      'verified' => $verified,
    ];
    $activities = ActivityLog::with('user')
      ->where('subject_type', 'user')
      ->orderByDesc('created_at')
      ->take(10)
      ->get();

    return Inertia::render('Admin/Users/User', [
      'users' => $users,
      'activities' => $activities,
      'counts' => $counts,
    ]);
  }

  public function usersList(Request $request)
  {
    $query = User::orderByDesc('created_at');
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

  public function userShow(User $user)
  {
    return response()->json($user);
  }

  public function userStore(Request $request)
  {
    $currentUser = Auth::user();

    if ($currentUser->role !== 'admin') {
      return redirect()->back()->with('error', 'You are not authorized to create users.');
    }

    $validator = Validator::make($request->all(), [
      'name' => ['required', 'string', 'max:255'],
      'email' => ['required', 'email', 'max:255', 'unique:users,email'],
      'phone' => ['nullable', 'string', 'max:30'],
      'role' => ['nullable', 'string', 'max:50'],
      'check' => ['boolean'],
      'password' => ['required', 'string', 'min:6'],
      'avatar' => ['nullable', 'image', 'max:5120'],
    ]);

    if ($validator->fails()) {
      throw ValidationException::withMessages($validator->errors()->toArray());
    }

    $validated = $validator->validated();

    if ($request->hasFile('avatar')) {
      $path = $request->file('avatar')->store('user', 'public');
      $validated['avatar'] = 'storage/' . $path;
    }
    $validated['password'] = Hash::make($validated['password']);

    $user = User::create($validated);

    $activity = new ActivityLog;
    $activity->user_id = auth()->user()->id;
    $activity->action = 'created';
    $activity->subject_type = 'user';
    $activity->subject_id = $user->id;
    $activity->description = 'User created';
    $activity->changes = $validated;
    $activity->save();

    return redirect()->back()->with('success', 'User created successfully');
  }

  public function userUpdate(Request $request, User $user)
  {
    $currentUser = auth()->user();

    if ($currentUser->role !== 'admin') {
      return redirect()->back()->with('error', 'You are not authorized to create users.');
    }
    $validator = Validator::make($request->all(), [
      'name' => ['sometimes', 'required', 'string', 'max:255'],
      'email' => ['sometimes', 'required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
      'phone' => ['nullable', 'string', 'max:30'],
      'role' => ['nullable', 'string', 'max:50'],
      'check' => ['boolean'],
      'password' => ['nullable', 'string', 'min:6'],
      'avatar' => ['nullable', 'image', 'max:5120'],
    ]);

    if ($validator->fails()) {
      throw ValidationException::withMessages($validator->errors()->toArray());
    }

    $validated = $validator->validated();

    if ($request->hasFile('avatar')) {
      $old = $user->avatar;
      $path = $request->file('avatar')->store('user', 'public');
      $validated['avatar'] = 'storage/' . $path;
      if ($old && str_starts_with($old, 'storage/')) {
        $diskPath = str_replace('storage/', '', $old);
        if (Storage::disk('public')->exists($diskPath)) {
          Storage::disk('public')->delete($diskPath);
        }
      }
    }

    if (! empty($validated['password'])) {
      $validated['password'] = Hash::make($validated['password']);
    } else {
      unset($validated['password']);
    }

    $original = $user->getOriginal();
    $user->update($validated);
    $changes = $user->getChanges();
    $diff = ['before' => [], 'after' => []];
    foreach ($changes as $key => $value) {
      $diff['before'][$key] = $original[$key] ?? null;
      $diff['after'][$key] = $value;
    }
    $activity = new ActivityLog;
    $activity->user_id = auth()->user()->id;
    $activity->action = 'updated';
    $activity->subject_type = 'user';
    $activity->subject_id = $user->id;
    $activity->description = 'User updated';
    $activity->changes = $diff;
    $activity->save();

    return redirect()->back()->with('success', 'User updated successfully');
  }

  public function userDestroy(User $user)
  {
    $currentUser = auth()->user();

    if ($currentUser->role !== 'admin') {
      return redirect()->back()->with('error', 'You are not authorized to create users.');
    }
    $old = $user->avatar;
    if ($old && str_starts_with($old, 'storage/')) {
      $diskPath = str_replace('storage/', '', $old);
      if (Storage::disk('public')->exists($diskPath)) {
        Storage::disk('public')->delete($diskPath);
      }
    }
    $user->delete();

    $activity = new ActivityLog;
    $activity->user_id = auth()->user()->id;
    $activity->action = 'deleted';
    $activity->subject_type = 'user';
    $activity->subject_id = $user->id;
    $activity->description = 'User deleted';
    $activity->changes = $user;
    $activity->save();

    return redirect()->back()->with('success', 'User deleted successfully');
  }
}
