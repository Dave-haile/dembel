<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsController extends Controller
{
    function index(Request $request)
    {
        // return Inertia::render('Public/News/News', [
        //     'news' => $news,
        // ]);
        $perPage = $request->get('per_page', 6);
        $page = $request->get('page', 1);
        $news = News::approved()->orderBy('created_at', 'DESC')->paginate($perPage, ['*'], 'page', $page);

        if ($request->expectsJson()) {
            return response()->json([
                'data' => $news->items(),
                'current_page' => $news->currentPage(),
                'last_page' => $news->lastPage(),
                'per_page' => $news->perPage(),
                'total' => $news->total(),
                'has_more' => $news->hasMorePages(),
            ]);
        }

        return Inertia::render('Public/News/News', [
            'news' => $news->items(),
            'pagination' => [
                'current_page' => $news->currentPage(),
                'last_page' => $news->lastPage(),
                'per_page' => $news->perPage(),
                'total' => $news->total(),
                'has_more' => $news->hasMorePages(),
            ],
        ]);
    }
    public function loadMore(Request $request)
    {
        $perPage = $request->get('per_page', 10);
        $page = $request->get('page', 1);

        $news = News::approved()
            ->orderBy('created_at', 'desc')
            ->paginate($perPage, ['*'], 'page', $page);

        return response()->json([
            'data' => $news->items(),
            'current_page' => $news->currentPage(),
            'last_page' => $news->lastPage(),
            'per_page' => $news->perPage(),
            'total' => $news->total(),
            'has_more' => $news->hasMorePages(),
        ]);
    }
}
