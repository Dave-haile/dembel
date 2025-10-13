<?php

namespace App\Http\Controllers;

use App\Models\FreeSpace;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FreeSpaceController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 6);
        $page = $request->get('page', 1);

        $spaces = FreeSpace::with('floor')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage, ['*'], 'page', $page);

        if ($request->expectsJson()) {
            return response()->json([
                'data' => $spaces->items(),
                'current_page' => $spaces->currentPage(),
                'last_page' => $spaces->lastPage(),
                'per_page' => $spaces->perPage(),
                'total' => $spaces->total(),
                'has_more' => $spaces->hasMorePages(),
            ]);
        }

        return Inertia::render('Public/FreeSpace/FreeSpace', [
            'spaces' => $spaces->items(),
            'pagination' => [
                'current_page' => $spaces->currentPage(),
                'last_page' => $spaces->lastPage(),
                'per_page' => $spaces->perPage(),
                'total' => $spaces->total(),
                'has_more' => $spaces->hasMorePages(),
            ],
        ]);
    }

    public function loadMore(Request $request)
    {
        $perPage = $request->get('per_page', 10);
        $page = $request->get('page', 1);
        
        // Handle "All" option - load all remaining items
        if ($perPage === 'all') {
            $totalSpaces = FreeSpace::count();
            $loadedSpaces = ($page - 1) * 10; // Assuming initial load was 10
            $remainingSpaces = $totalSpaces - $loadedSpaces;
            
            $spaces = FreeSpace::with('floor')
                ->orderBy('created_at', 'desc')
                ->skip($loadedSpaces)
                ->take($remainingSpaces)
                ->get();

            return response()->json([
                'data' => $spaces,
                'current_page' => $page,
                'last_page' => $page,
                'per_page' => $remainingSpaces,
                'total' => $totalSpaces,
                'has_more' => false,
            ]);
        }

        $spaces = FreeSpace::with('floor')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage, ['*'], 'page', $page);

        return response()->json([
            'data' => $spaces->items(),
            'current_page' => $spaces->currentPage(),
            'last_page' => $spaces->lastPage(),
            'per_page' => $spaces->perPage(),
            'total' => $spaces->total(),
            'has_more' => $spaces->hasMorePages(),
        ]);
    }
}
