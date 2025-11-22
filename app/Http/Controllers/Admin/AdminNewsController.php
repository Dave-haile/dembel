<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class AdminNewsController extends Controller
{
  public function news()
  {
    $news = News::orderByDesc('created_at')->limit(10)->get();
    $total = DB::table('news')->count();
    $approved = DB::table('news')->where('approval', 1)->count();
    $counts = [
      'total' => $total,
      'approved' => $approved,
      'pending' => $total - $approved,
    ];
    $activities = ActivityLog::with('user')
      ->where('subject_type', 'news')
      ->orderByDesc('created_at')
      ->take(10)
      ->get();

    return Inertia::render('Admin/AdminNews/AdminNews', [
      'news' => $news,
      'activities' => $activities,
      'counts' => $counts,
    ]);
  }
  public function newsList(Request $request)
  {
    $query = News::orderByDesc('created_at');
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

  public function newsShow(News $news)
  {
    return response()->json($news);
  }

  public function newsStore(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'category' => ['required', 'string', 'max:50'],
      'title_en' => ['required', 'string', 'max:255'],
      'title_am' => ['required', 'string', 'max:255'],
      'sub_title_en' => ['nullable', 'string', 'max:255'],
      'sub_title_am' => ['nullable', 'string', 'max:255'],
      'excerpt_en' => ['nullable', 'string'],
      'excerpt_am' => ['nullable', 'string'],
      'content_en' => ['nullable', 'string'],
      'content_am' => ['nullable', 'string'],
      'image' => ['nullable', 'image', 'max:5120'],
      'pdf_file' => ['nullable', 'file', 'max:10240'],
      'approval' => ['boolean'],
    ]);

    if ($validator->fails()) {
      throw ValidationException::withMessages($validator->errors()->toArray());
    }

    $validated = $validator->validated();

    if ($request->hasFile('image')) {
      $path = $request->file('image')->store('news', 'public');
      $validated['image'] = 'storage/' . $path;
    }
    if ($request->hasFile('pdf_file')) {
      $path = $request->file('pdf_file')->store('news', 'public');
      $validated['pdf_file'] = 'storage/' . $path;
    }
    $validated['created_by'] = Auth::user()->id;

    $news = News::create($validated);

    $activity = new ActivityLog;
    $activity->user_id = Auth::user()->id;
    $activity->action = 'created';
    $activity->subject_type = 'news';
    $activity->subject_id = $news->id;
    $activity->description = 'News created';
    $activity->changes = $validated;
    $activity->save();

    return redirect()->back()->with('success', 'News created successfully');
  }

  public function newsUpdate(Request $request, News $news)
  {
    $validator = Validator::make($request->all(), [
      'category' => ['sometimes', 'required', 'string', 'max:50'],
      'title_en' => ['sometimes', 'required', 'string', 'max:255'],
      'title_am' => ['sometimes', 'required', 'string', 'max:255'],
      'sub_title_en' => ['nullable', 'string', 'max:255'],
      'sub_title_am' => ['nullable', 'string', 'max:255'],
      'excerpt_en' => ['nullable', 'string'],
      'excerpt_am' => ['nullable', 'string'],
      'content_en' => ['nullable', 'string'],
      'content_am' => ['nullable', 'string'],
      'image' => ['nullable', 'image', 'max:5120'],
      'pdf_file' => ['nullable', 'file', 'max:10240'],
      'approval' => ['boolean'],
    ]);

    if ($validator->fails()) {
      throw ValidationException::withMessages($validator->errors()->toArray());
    }

    $validated = $validator->validated();

    if ($request->hasFile('image')) {
      $old = $news->image;
      $path = $request->file('image')->store('news', 'public');
      $validated['image'] = 'storage/' . $path;
      if ($old && str_starts_with($old, 'storage/')) {
        $diskPath = str_replace('storage/', '', $old);
        if (Storage::disk('public')->exists($diskPath)) {
          Storage::disk('public')->delete($diskPath);
        }
      }
    }
    if ($request->hasFile('pdf_file')) {
      $old = $news->pdf_file;
      $path = $request->file('pdf_file')->store('news', 'public');
      $validated['pdf_file'] = 'storage/' . $path;
      if ($old && str_starts_with($old, 'storage/')) {
        $diskPath = str_replace('storage/', '', $old);
        if (Storage::disk('public')->exists($diskPath)) {
          Storage::disk('public')->delete($diskPath);
        }
      }
    }

    $original = $news->getOriginal();
    $news->update($validated);
    $changes = $news->getChanges();
    $diff = ['before' => [], 'after' => []];
    foreach ($changes as $key => $value) {
      $diff['before'][$key] = $original[$key] ?? null;
      $diff['after'][$key] = $value;
    }
    $activity = new ActivityLog;
    $activity->user_id = Auth::user()->id;
    $activity->action = 'updated';
    $activity->subject_type = 'news';
    $activity->subject_id = $news->id;
    $activity->description = 'News updated';
    $activity->changes = $diff;
    $activity->save();

    return redirect()->back()->with('success', 'News updated successfully');
  }

  public function newsDestroy(News $news)
  {
    $oldImg = $news->image;
    if ($oldImg && str_starts_with($oldImg, 'storage/')) {
      $diskPath = str_replace('storage/', '', $oldImg);
      if (Storage::disk('public')->exists($diskPath)) {
        Storage::disk('public')->delete($diskPath);
      }
    }
    $oldPdf = $news->pdf_file;
    if ($oldPdf && str_starts_with($oldPdf, 'storage/')) {
      $diskPath = str_replace('storage/', '', $oldPdf);
      if (Storage::disk('public')->exists($diskPath)) {
        Storage::disk('public')->delete($diskPath);
      }
    }
    $news->delete();

    $activity = new ActivityLog;
    $activity->user_id = Auth::user()->id;
    $activity->action = 'deleted';
    $activity->subject_type = 'news';
    $activity->subject_id = $news->id;
    $activity->description = 'News deleted';
    $activity->changes = $news;
    $activity->save();

    return redirect()->back()->with('success', 'News deleted successfully');
  }
}
