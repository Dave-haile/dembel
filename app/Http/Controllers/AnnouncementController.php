<?php

namespace App\Http\Controllers;

use App\Models\FreeSpace;
use App\Models\News;
use App\Models\Vacancy;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Inertia\Inertia;
use Inertia\Response;


class AnnouncementController extends Controller
{

    // public function index()
    // {
    //     // Fetch data from all three tables
    //     $freeSpaces = FreeSpace::where('availability_status', 'available')
    //         ->where('is_approved', true) // if you have approval field
    //         ->get()
    //         ->map(function ($space) {
    //             return [
    //                 'id' => 'free_space_' . $space->id,
    //                 'type' => 'free_space',
    //                 'title' => $space->name,
    //                 'description' => $space->short_description,
    //                 'thumbnail' => $space->thumbnail,
    //                 'featured' => $space->featured ?? false, // if you have featured field
    //                 'category' => 'Free Space',
    //                 'created_at' => $space->created_at,
    //                 'original_data' => $space // keep original data for details
    //             ];
    //         });

    //     $news = News::where('approval', true)
    //         ->get()
    //         ->map(function ($newsItem) {
    //             return [
    //                 'id' => 'news_' . $newsItem->id,
    //                 'type' => 'news',
    //                 'title' => $newsItem->title_en, // or use current locale
    //                 'description' => $newsItem->excerpt_en,
    //                 'thumbnail' => $newsItem->image,
    //                 'featured' => $newsItem->featured ?? false,
    //                 'category' => $newsItem->category,
    //                 'created_at' => $newsItem->created_at,
    //                 'original_data' => $newsItem
    //             ];
    //         });

    //     $vacancies = Vacancy::where('is_approved', true)
    //         ->get()
    //         ->map(function ($vacancy) {
    //             return [
    //                 'id' => 'vacancy_' . $vacancy->id,
    //                 'type' => 'vacancy',
    //                 'title' => $vacancy->title,
    //                 'description' => $vacancy->job_description,
    //                 'thumbnail' => $vacancy->thumbnail,
    //                 'featured' => $vacancy->featured ?? false,
    //                 'category' => $vacancy->department,
    //                 'created_at' => $vacancy->posted_date,
    //                 'original_data' => $vacancy
    //             ];
    //         });

    //     // Combine all announcements
    //     $allAnnouncements = $freeSpaces->merge($news)->merge($vacancies);

    //     // Shuffle randomly
    //     $shuffledAnnouncements = $allAnnouncements->shuffle();

    //     // Get featured announcement (you might want to implement a proper featured logic)
    //     $featuredAnnouncement = $shuffledAnnouncements->firstWhere('featured', true)
    //         ?? $shuffledAnnouncements->first();
    // }
    public function index()
    {
        $freeSpaces = FreeSpace::with('floor')->select(
            'id',
            'name as title',
            'short_description as description',
            'thumbnail',
            'slug',
            'created_at'
        )->where('availability_status', 'available')
            ->get()
            ->map(function ($item) {
                $item->type = 'free_space';
                return $item;
            });

        $vacancies = Vacancy::select(
            'id',
            'title',
            'job_description as description',
            'thumbnail',
            'slug',
            'posted_date as created_at'
        )->where('is_approved', true)
            ->get()
            ->map(function ($item) {
                $item->type = 'vacancy';
                return $item;
            });

        $news = News::select(
            'id',
            'title_en as title',
            'excerpt_en as description',
            'image as thumbnail',
            'slug',
            'created_at'
        )->where('approval', true)
            ->get()
            ->map(function ($item) {
                $item->type = 'news';
                return $item;
            });

        $announcements = (new Collection)
            ->merge($freeSpaces)
            ->merge($vacancies)
            ->merge($news)
            ->shuffle()
            ->values();

        return Inertia::render('Public/Announcement/Announcement', [
            'announcements' => $announcements,
        ]);
    }
    //     $freeSpaces = FreeSpace::where('availability_status', 'available')
    //         ->select('id', 'name as title', 'short_description as description', 'thumbnail', 'slug')
    //         ->get()
    //         ->map(fn($item) => array_merge($item->toArray(), [
    //             'type' => 'free_space',
    //             'featured' => false,
    //         ]));

    //     $vacancies = Vacancy::where('is_approved', true)
    //         ->select('id', 'title', 'job_description as description', 'thumbnail', 'slug')
    //         ->get()
    //         ->map(fn($item) => array_merge($item->toArray(), [
    //             'type' => 'vacancy',
    //             'featured' => false,
    //         ]));

    //     // Mark first news as featured
    //     $news = News::where('approval', true)
    //         ->select('id', 'title_en as title', 'excerpt_en as description', 'image as thumbnail', 'slug')
    //         ->get()
    //         ->map(fn($item, $index) => array_merge($item->toArray(), [
    //             'type' => 'news',
    //             'featured' => $index === 0,
    //         ]));

    //     $all = $freeSpaces->concat($vacancies)->concat($news)->values();

    //     return inertia('Public/Announcement/Announcement', [
    //         'announcements' => $all,
    //     ]);
    // }
    // public function index(Request $request)
    // {
    //     $page = $request->get('page', 1);
    //     $perPage = 9;

    //     $freeSpaces = FreeSpace::select(
    //         'id',
    //         'name as title',
    //         'short_description as description',
    //         'thumbnail',
    //         'slug',
    //         'created_at'
    //     )->where('availability_status', 'available')
    //      ->get()
    //      ->map(fn($item) => $item->type = 'free_space' ? $item : $item);

    //     $vacancies = Vacancy::select(
    //         'id',
    //         'title',
    //         'job_description as description',
    //         'thumbnail',
    //         'slug',
    //         'posted_date as created_at'
    //     )->where('is_approved', true)
    //      ->get()
    //      ->map(fn($item) => $item->type = 'vacancy' ? $item : $item);

    //     $news = News::select(
    //         'id',
    //         'title_en as title',
    //         'excerpt_en as description',
    //         'image as thumbnail',
    //         'slug',
    //         'created_at'
    //     )->where('approval', true)
    //      ->get()
    //      ->map(fn($item) => $item->type = 'news' ? $item : $item);

    //     // Merge and randomize
    //     $all = (new Collection)
    //         ->merge($freeSpaces)
    //         ->merge($vacancies)
    //         ->merge($news)
    //         ->shuffle()
    //         ->values();

    //     // Paginate manually from collection
    //     $total = $all->count();
    //     $paginated = new LengthAwarePaginator(
    //         $all->forPage($page, $perPage)->values(),
    //         $total,
    //         $perPage,
    //         $page,
    //         ['path' => $request->url(), 'query' => $request->query()]
    //     );

    //     return response()->json($paginated);
    // }
    // public function fetchData(Request $request)
    // {
    //     $filter = $request->get('filter', 'all');
    //     $search = $request->get('search', '');
    //     $page = $request->get('page', 1);
    //     $perPage = 6;

    //     // === Fetch Data from Each Table ===
    //     $freeSpaces = FreeSpace::select(
    //         'id',
    //         'name as title',
    //         'short_description as description',
    //         'thumbnail',
    //         'slug',
    //         'created_at'
    //     )->when($search, function ($query, $search) {
    //         $query->where('name', 'like', "%{$search}%")
    //             ->orWhere('short_description', 'like', "%{$search}%");
    //     })->get()->map(function ($item) {
    //         $item->type = 'free_space';
    //         return $item;
    //     });

    //     $vacancies = Vacancy::select(
    //         'id',
    //         'title',
    //         'job_description as description',
    //         'thumbnail',
    //         'slug',
    //         'posted_date as created_at'
    //     )->where('is_approved', true)
    //         ->when($search, function ($query, $search) {
    //             $query->where('title', 'like', "%{$search}%")
    //                 ->orWhere('job_description', 'like', "%{$search}%");
    //         })->get()->map(function ($item) {
    //             $item->type = 'vacancy';
    //             return $item;
    //         });

    //     $news = News::select(
    //         'id',
    //         'title_en as title',
    //         'excerpt_en as description',
    //         'image as thumbnail',
    //         'slug',
    //         'created_at'
    //     )->where('approval', true)
    //         ->when($search, function ($query, $search) {
    //             $query->where('title_en', 'like', "%{$search}%")
    //                 ->orWhere('excerpt_en', 'like', "%{$search}%");
    //         })->get()->map(function ($item) {
    //             $item->type = 'news';
    //             return $item;
    //         });

    //     // === Merge + Filter Type ===
    //     $merged = (new Collection)
    //         ->merge($freeSpaces)
    //         ->merge($vacancies)
    //         ->merge($news);

    //     if ($filter !== 'all') {
    //         $merged = $merged->where('type', $filter);
    //     }

    //     // === Randomize ===
    //     $merged = $merged->shuffle()->values();

    //     // === Manual Pagination ===
    //     $total = $merged->count();
    //     $items = $merged->forPage($page, $perPage)->values();

    //     return response()->json([
    //         'data' => $items,
    //         'total' => $total,
    //         'per_page' => $perPage,
    //         'current_page' => (int) $page,
    //     ]);
    // }

    // app/Http/Controllers/AnnouncementController.php


    // public function index(Request $request): Response
    // {
    //     $perPage = 12;
    //     $page = (int) $request->input('page', 1);
    //     $buffer = $perPage * 3; // fetch extra to ensure enough after merge

    //     // Get counts for tabs
    //     $counts = [
    //         'all' => FreeSpace::where('availability_status', 'available')->count()
    //             + Vacancy::where('is_approved', true)->count()
    //             + News::where('approval', true)->count(),
    //         'free_space' => FreeSpace::where('availability_status', 'available')->count(),
    //         'vacancy' => Vacancy::where('is_approved', true)->count(),
    //         'news' => News::where('approval', true)->count(),
    //     ];

    //     // Fetch latest from each table (with buffer)
    //     $freeSpaces = FreeSpace::where('availability_status', 'available')
    //         ->selectRaw('id, name as title, short_description as description, thumbnail, slug, created_at, "free_space" as type')
    //         ->orderByDesc('created_at')
    //         ->limit($buffer)
    //         ->get();

    //     $vacancies = Vacancy::where('is_approved', true)
    //         ->selectRaw('id, title, job_description as description, thumbnail, slug, created_at, "vacancy" as type')
    //         ->orderByDesc('created_at')
    //         ->limit($buffer)
    //         ->get();

    //     $news = News::where('approval', true)
    //         ->selectRaw('id, title_en as title, excerpt_en as description, image as thumbnail, slug, created_at, "news" as type')
    //         ->orderByDesc('created_at')
    //         ->limit($buffer)
    //         ->get();

    //     // Merge and sort globally by created_at
    //     $all = $freeSpaces->concat($vacancies)->concat($news)
    //         ->sortByDesc('created_at')
    //         ->values();

    //     $total = $all->count();
    //     $offset = ($page - 1) * $perPage;
    //     $paginated = $all->slice($offset, $perPage);

    //     // Convert to array + add featured + fix thumbnail
    //     $announcements = $paginated->map(function ($item, $index) use ($page) {
    //         $array = $item->toArray();
    //         $array['featured'] = ($page === 1 && $index === 0);

    //         // Fix thumbnail path
    //         if (!empty($array['thumbnail'])) {
    //             // Trim whitespace and ensure no double slashes
    //             $path = trim($array['thumbnail']);
    //             $array['thumbnail'] = asset('storage/' . ltrim($path, '/'));
    //         }

    //         return $array;
    //     })->values();

    //     $hasMorePages = $offset + $perPage < $total;

    //     return Inertia::render('Public/Announcement/Announcement', [
    //         'announcements' => $announcements,
    //         'counts' => $counts,
    //         'hasMorePages' => $hasMorePages,
    //         'currentPage' => $page,
    //     ]);
    // }
}
