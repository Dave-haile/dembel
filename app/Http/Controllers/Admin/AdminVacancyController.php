<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ActivityLog;
use App\Models\Vacancy;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class AdminVacancyController extends Controller
{
  public function vacancies()
  {
    $vacancies = Vacancy::orderBy('created_at', 'desc')->get();
    $totalVacancies = DB::table('vacancies')->count();
    $openPositions = DB::table('vacancies')->sum('number_of_positions');
    $fullTime = DB::table('vacancies')->where('employment_type', 'Full-time')->count();
    $partTime = DB::table('vacancies')->where('employment_type', 'Part-time')->count();

    $counts = [
      'total' => $totalVacancies,
      'open_positions' => $openPositions,
      'full_time' => $fullTime,
      'part_time' => $partTime,
    ];

    $activities = ActivityLog::with('user')
      ->where('subject_type', 'vacancy')
      ->orderBy('created_at', 'desc')
      ->take(10)
      ->get();

    return Inertia::render('Admin/Vacancy/AdminVacancy', [
      'vacancies' => $vacancies,
      'activities' => $activities,
      'counts' => $counts,
    ]);
  }
  public function vacancyShow(Vacancy $vacancy)
  {
    return response()->json($vacancy);
  }
  public function vacanciesList()
  {
    $query = Vacancy::orderByDesc('created_at');
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

  public function vacancyStore(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'title' => ['required', 'string', 'max:150'],
      'department' => ['nullable', 'string', 'max:100'],
      'employment_type' => ['required', 'string', 'max:30'],
      'work_location' => ['required', 'string', 'max:100'],
      'salary_min' => ['nullable', 'numeric'],
      'salary_max' => ['nullable', 'numeric'],
      'currency' => ['nullable', 'string', 'max:10'],
      'job_description' => ['required', 'string'],
      'requirements' => ['nullable', 'string'],
      'benefits' => ['nullable', 'string'],
      'how_to_apply' => ['required', 'string'],
      'posted_date' => ['required', 'date'],
      'closing_date' => ['required', 'date', 'after_or_equal:posted_date'],
      'number_of_positions' => ['nullable', 'integer', 'min:1'],
      'contact_email' => ['nullable', 'email', 'max:255'],
      'contact_phone' => ['nullable', 'string', 'max:20'],
      'address' => ['nullable', 'string'],
      'is_approved' => ['boolean'],
      'slug' => ['nullable', 'string', 'max:255', 'unique:vacancies,slug'],
      'thumbnail' => ['nullable', 'image'],
    ]);

    if ($validator->fails()) {
      throw ValidationException::withMessages($validator->errors()->toArray());
    }

    $validated = $validator->validated();

    if ($request->hasFile('thumbnail')) {
      $path = $request->file('thumbnail')->store('vacancies', 'public');
      $validated['thumbnail'] = 'storage/' . $path;
    }

    if (empty($validated['slug'] ?? null)) {
      $base = Str::slug($request->input('title', ''));
      if ($base === '') {
        $base = Str::random(6);
      }
      $slug = $base;
      $i = 2;
      while (Vacancy::where('slug', $slug)->exists()) {
        $slug = $base . '-' . $i;
        $i++;
      }
      $validated['slug'] = $slug;
    }

    $vacancy = Vacancy::create($validated);
    $activity = new ActivityLog;
    $activity->user_id = Auth::user()->id;
    $activity->action = 'created';
    $activity->subject_type = 'vacancy';
    $activity->subject_id = $vacancy->id;
    $activity->description = 'Vacancy created';
    $activity->changes = $validated;
    $activity->save();

    Log::info($vacancy);

    return redirect()->back()->with('success', 'Vacancy created successfully');
  }

  public function vacancyUpdate(Request $request, Vacancy $vacancy)
  {
    $validator = Validator::make($request->all(), [
      'title' => ['sometimes', 'required', 'string', 'max:150'],
      'department' => ['nullable', 'string', 'max:100'],
      'employment_type' => ['sometimes', 'required', 'string', 'max:30'],
      'work_location' => ['sometimes', 'required', 'string', 'max:100'],
      'salary_min' => ['nullable', 'numeric'],
      'salary_max' => ['nullable', 'numeric'],
      'currency' => ['nullable', 'string', 'max:10'],
      'job_description' => ['sometimes', 'required', 'string'],
      'requirements' => ['nullable', 'string'],
      'benefits' => ['nullable', 'string'],
      'how_to_apply' => ['sometimes', 'required', 'string'],
      'posted_date' => ['sometimes', 'required', 'date'],
      'closing_date' => ['sometimes', 'required', 'date', 'after_or_equal:posted_date'],
      'number_of_positions' => ['nullable', 'integer', 'min:1'],
      'contact_email' => ['nullable', 'email', 'max:255'],
      'contact_phone' => ['nullable', 'string', 'max:20'],
      'address' => ['nullable', 'string'],
      'is_approved' => ['boolean'],
      'slug' => ['sometimes', 'required', 'string', 'max:255', 'unique:vacancies,slug,' . $vacancy->id],
      'thumbnail' => ['nullable', 'image'],
    ]);

    if ($validator->fails()) {
      throw ValidationException::withMessages($validator->errors()->toArray());
    }

    $validated = $validator->validated();

    if ($request->hasFile('thumbnail')) {
      $old = $vacancy->thumbnail;
      $path = $request->file('thumbnail')->store('vacancies', 'public');
      $validated['thumbnail'] = 'storage/' . $path;
      if ($old && str_starts_with($old, 'storage/')) {
        $diskPath = str_replace('storage/', '', $old);
        if (Storage::disk('public')->exists($diskPath)) {
          Storage::disk('public')->delete($diskPath);
        }
      }
    }

    $original = $vacancy->getOriginal();
    $vacancy->update($validated);
    $changes = $vacancy->getChanges();
    $diff = ['before' => [], 'after' => []];
    foreach ($changes as $key => $value) {
      $diff['before'][$key] = $original[$key] ?? null;
      $diff['after'][$key] = $value;
    }
    $activity = new ActivityLog;
    $activity->user_id = Auth::user()->id;
    $activity->action = 'updated';
    $activity->subject_type = 'vacancy';
    $activity->subject_id = $vacancy->id;
    $activity->description = 'Vacancy updated';
    $activity->changes = $diff;
    $activity->save();

    return redirect()->back()->with('success', 'Vacancy updated successfully');
  }

  public function vacancyDestroy(Vacancy $vacancy)
  {
    $old = $vacancy->thumbnail;
    if ($old && str_starts_with($old, 'storage/')) {
      $diskPath = str_replace('storage/', '', $old);
      if (Storage::disk('public')->exists($diskPath)) {
        Storage::disk('public')->delete($diskPath);
      }
    }
    $vacancy->delete();
    $activity = new ActivityLog;
    $activity->user_id = Auth::user()->id;
    $activity->action = 'deleted';
    $activity->subject_type = 'vacancy';
    $activity->subject_id = $vacancy->id;
    $activity->description = 'Vacancy deleted';
    $activity->changes = $vacancy;
    $activity->save();

    return redirect()->back()->with('success', 'Vacancy deleted successfully');
  }
}
