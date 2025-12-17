<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class AdminSettingController extends Controller
{
  public function settings()
  {
    $user = Auth::user();

    return Inertia::render('Admin/AdminSettings/AdminSettings', [
      'user' => $user,
    ]);
  }

  public function settingsUpdate(Request $request)
  {
    $user = Auth::user();

    Log::info('User Request '. var_export($request->all(), true));
    $validator = Validator::make($request->all(), [
      'name' => ['required', 'string', 'max:255'],
      'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
      'phone' => ['nullable', 'string', 'max:30'],
      'avatar' => ['nullable', 'image', 'max:5120'],
      'current_password' => ['nullable', 'required_with:password', 'current_password'],
      'password' => ['nullable', 'confirmed', 'min:8'],
    ]);
    Log::info('validated', $validator->errors()->toArray());
    if ($validator->fails()) {
      throw ValidationException::withMessages($validator->errors()->toArray());
    }
    $validated = $validator->validated();

    // Handle avatar upload errors early (e.g., size exceeds php.ini limits -> error code 1)
    if ($request->hasFile('avatar') && ! $request->file('avatar')->isValid()) {
      $file = $request->file('avatar');
      Log::error('Avatar upload invalid on settings update', [
        'error_code' => $file->getError(),
        'size' => $file->getSize(),
        'client_mime' => $file->getClientMimeType(),
        'upload_max_filesize' => ini_get('upload_max_filesize'),
        'post_max_size' => ini_get('post_max_size'),
      ]);

      throw ValidationException::withMessages([
        'avatar' => 'Avatar upload failed (code '.$file->getError().'). Please check the file size limits.',
      ]);
    }

    $dataToUpdate = [
      'name' => $validated['name'],
      'email' => $validated['email'],
    ];
    if (array_key_exists('phone', $validated)) {
      $dataToUpdate['phone'] = $validated['phone'];
    }

    if ($validated['avatar'] ?? null) {
      $old = $user->avatar;
      $path = $validated['avatar']->store('user', 'public');
      $dataToUpdate['avatar'] = 'storage/' . $path;
      if ($old && str_starts_with($old, 'storage/') && $old !== 'storage/user/default.png') {
        $diskPath = str_replace('storage/', '', $old);
        if (Storage::disk('public')->exists($diskPath)) {
          Storage::disk('public')->delete($diskPath);
        }
      }
    }

    $original = $user->getOriginal();
    $user->fill($dataToUpdate);

    if (! empty($validated['password'] ?? null)) {
      // Ensure current password was provided and valid (already validated by rule)
      $user->password = Hash::make($validated['password']);
    }

    $user->save();

    $changes = $user->getChanges();
    $diff = ['before' => [], 'after' => []];
    foreach ($changes as $key => $value) {
      if ($key === 'password') {
        // Do not log raw password values
        $diff['before'][$key] = '***';
        $diff['after'][$key] = '***';

        continue;
      }
      $diff['before'][$key] = $original[$key] ?? null;
      $diff['after'][$key] = $value;
    }

    if (! empty($diff['after'])) {
      $activity = new ActivityLog;
      $activity->user_id = $user->id;
      $activity->action = 'updated';
      $activity->subject_type = 'user';
      $activity->subject_id = $user->id;
      $activity->description = 'Profile updated';
      $activity->changes = $diff;
      $activity->save();
    }

    return redirect()->back()->with('success', 'Profile updated successfully');
  }
}
