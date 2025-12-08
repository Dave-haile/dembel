<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\ActivityLog;
use App\Models\Vacancy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class AdminApplicationController extends Controller
{
    public function applications()
    {
        $applications = Application::orderByDesc('created_at')->get();
        $total = DB::table('applications')->count();
        $withCv = DB::table('applications')->whereNotNull('cv')->count();
        $counts = [
            'total' => $total,
            'with_cv' => $withCv,
        ];
        $activities = ActivityLog::with('user')
            ->where('subject_type', 'application')
            ->orderByDesc('created_at')
            ->take(10)
            ->get();
        $vacancies = Vacancy::select('id', 'title')->orderBy('title')->get();

        return Inertia::render('Admin/Application/AdminAplication', [
            'applications' => $applications,
            'activities' => $activities,
            'counts' => $counts,
            'vacancies' => $vacancies,
        ]);
    }

    public function applicationsList(Request $request)
    {
        $query = Application::orderByDesc('created_at');
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

    public function applicationShow(Application $application)
    {
        return response()->json($application);
    }

    public function applicationStore(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => ['required', 'string', 'max:100'],
            'last_name' => ['required', 'string', 'max:100'],
            'phone' => ['required', 'string', 'max:30'],
            'alt_phone' => ['nullable', 'string', 'max:30'],
            'birth_date' => ['nullable', 'date'],
            'email' => ['nullable', 'email', 'max:255'],
            'photo' => ['nullable', 'image', 'max:5120'],
            'subcity' => ['nullable', 'string', 'max:100'],
            'woreda' => ['nullable', 'string', 'max:100'],
            'city' => ['nullable', 'string', 'max:100'],
            'marital_status' => ['nullable', 'string', 'max:50'],
            'education_background' => ['nullable', 'string'],
            'vacancy_id' => ['nullable', 'exists:vacancies,id'],
            'cv' => ['nullable', 'file', 'max:10240'],
        ]);
        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->toArray());
        }
        $validated = $validator->validated();

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('applications/photo', 'public');
            $validated['photo'] = 'storage/'.$path;
        }
        if ($request->hasFile('cv')) {
            $path = $request->file('cv')->store('applications/cv', 'public');
            $validated['cv'] = 'storage/'.$path;
        }

        $application = Application::create($validated);

        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'created';
        $activity->subject_type = 'application';
        $activity->subject_id = $application->id;
        $activity->description = 'Application created';
        $activity->changes = $validated;
        $activity->save();

        return redirect()->back()->with('success', 'Application created successfully');
    }

    public function applicationUpdate(Request $request, Application $application)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => ['sometimes', 'required', 'string', 'max:100'],
            'last_name' => ['sometimes', 'required', 'string', 'max:100'],
            'phone' => ['sometimes', 'required', 'string', 'max:30'],
            'alt_phone' => ['nullable', 'string', 'max:30'],
            'birth_date' => ['nullable', 'date'],
            'email' => ['nullable', 'email', 'max:255'],
            'photo' => ['nullable', 'image', 'max:5120'],
            'subcity' => ['nullable', 'string', 'max:100'],
            'woreda' => ['nullable', 'string', 'max:100'],
            'city' => ['nullable', 'string', 'max:100'],
            'marital_status' => ['nullable', 'string', 'max:50'],
            'education_background' => ['nullable', 'string'],
            'vacancy_id' => ['nullable', 'exists:vacancies,id'],
            'cv' => ['nullable', 'file', 'max:10240'],
        ]);

        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->toArray());
        }
        $validated = $validator->validated();

        if ($request->hasFile('photo')) {
            $old = $application->photo;
            $path = $request->file('photo')->store('applications/photo', 'public');
            $validated['photo'] = 'storage/'.$path;
            if ($old && str_starts_with($old, 'storage/')) {
                $diskPath = str_replace('storage/', '', $old);
                if (Storage::disk('public')->exists($diskPath)) {
                    Storage::disk('public')->delete($diskPath);
                }
            }
        }
        if ($request->hasFile('cv')) {
            $old = $application->cv;
            $path = $request->file('cv')->store('applications/cv', 'public');
            $validated['cv'] = 'storage/'.$path;
            if ($old && str_starts_with($old, 'storage/')) {
                $diskPath = str_replace('storage/', '', $old);
                if (Storage::disk('public')->exists($diskPath)) {
                    Storage::disk('public')->delete($diskPath);
                }
            }
        }

        $original = $application->getOriginal();
        $application->update($validated);
        $changes = $application->getChanges();
        $diff = ['before' => [], 'after' => []];
        foreach ($changes as $key => $value) {
            $diff['before'][$key] = $original[$key] ?? null;
            $diff['after'][$key] = $value;
        }
        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'updated';
        $activity->subject_type = 'application';
        $activity->subject_id = $application->id;
        $activity->description = 'Application updated';
        $activity->changes = $diff;
        $activity->save();

        return redirect()->back()->with('success', 'Application updated successfully');
    }

    public function applicationDestroy(Application $application)
    {
        $oldPhoto = $application->photo;
        if ($oldPhoto && str_starts_with($oldPhoto, 'storage/')) {
            $diskPath = str_replace('storage/', '', $oldPhoto);
            if (Storage::disk('public')->exists($diskPath)) {
                Storage::disk('public')->delete($diskPath);
            }
        }
        $oldCv = $application->cv;
        if ($oldCv && str_starts_with($oldCv, 'storage/')) {
            $diskPath = str_replace('storage/', '', $oldCv);
            if (Storage::disk('public')->exists($diskPath)) {
                Storage::disk('public')->delete($diskPath);
            }
        }
        $application->delete();

        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'deleted';
        $activity->subject_type = 'application';
        $activity->subject_id = $application->id;
        $activity->description = 'Application deleted';
        $activity->changes = $application;
        $activity->save();

        return redirect()->back()->with('success', 'Application deleted successfully');
    }

    public function downloadResume(Application $application)
    {
        if (!$application->resume_path) {
            return redirect()->back()->with('error', 'Resume not found');
        }

        $path = storage_path('app/public/' . $application->resume_path);
        
        if (!file_exists($path)) {
            return redirect()->back()->with('error', 'Resume file not found');
        }

        return response()->download($path);
    }

    public function updateStatus(Request $request, Application $application)
    {
        $validated = $request->validate([
            'status' => ['required', 'in:pending,reviewed,contacted,hired,rejected'],
            'notes' => ['nullable', 'string'],
        ]);

        $application->update($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Application status updated',
            'application' => $application->fresh()
        ]);
    }
}
