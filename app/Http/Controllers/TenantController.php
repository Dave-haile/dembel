<?php

// namespace App\Http\Controllers;

// use App\Models\Category;
// use App\Models\Tenant;
// use Illuminate\Http\Request;
// use Inertia\Inertia;

// class TenantController extends Controller
// {
//     public function index(Request $request)
//     {
//         $perPage = $request->get('per_page', 12);
//         $page = $request->get('page', 1);
//         $category = $request->get('category', 'all');
//         $building = $request->get('building', 'all');
//         $search = $request->get('search', '');

//         $query = Tenant::with('category', 'floor')
//             ->orderBy('name');

//         if ($category !== 'all') {
//             $query->where('category_id', $category);
//         }

//         if ($building !== 'all') {
//             if ($building === 'Dembel') {
//                 // If 'Dembel' is selected, show both 'Dembel' and 'Dembel Extension'
//                 $query->where(function($q) {
//                     $q->where('building', 'Dembel')
//                       ->orWhere('building', 'Dembel Extension');
//                 });
//             } else {
//                 // For other buildings, do exact match
//                 $query->where('building', $building);
//             }
//         }

//         if (!empty($search)) {
//             $query->where(function($q) use ($search) {
//                 $q->where('name', 'like', "%{$search}%")
//                   ->orWhere('description', 'like', "%{$search}%");
//             });
//         }

//         $tenants = $query->paginate($perPage, ['*'], 'page', $page);
//         $categories = Category::orderBy('name')->get();

//         // For AJAX requests (load more)
//         if ($request->expectsJson()) {
//             return response()->json([
//                 'data' => $tenants->items(),
//                 'current_page' => $tenants->currentPage(),
//                 'last_page' => $tenants->lastPage(),
//                 'per_page' => $tenants->perPage(),
//                 'total' => $tenants->total(),
//                 'has_more' => $tenants->hasMorePages(),
//             ]);
//         }

//         // For initial page load
//         return Inertia::render('Public/Tenant/Tenant', [
//             'initialTenants' => $tenants->items(),
//             'pagination' => [
//                 'current_page' => $tenants->currentPage(),
//                 'last_page' => $tenants->lastPage(),
//                 'per_page' => $tenants->perPage(),
//                 'total' => $tenants->total(),
//                 'has_more' => $tenants->hasMorePages(),
//             ],
//             'categories' => collect([
//                 ['id' => 'all', 'name' => 'All', 'icon' => '🏬']
//             ])->merge($categories)
//         ]);
//     }

//     public function show(Tenant $tenant)
//     {
//         $tenant->load('category', 'floor');
//         return Inertia::render('Public/Tenant/TenantDetail', [
//             'tenant' => $tenant,
//         ]);
//     }

//     public function loadMore(Request $request)
//     {
//         $perPage = $request->get('per_page', 12);
//         $page = $request->get('page', 1);
//         $category = $request->get('category', 'all');
//         $building = $request->get('building', 'all');
//         $search = $request->get('search', '');

//         $query = Tenant::with('category', 'floor')
//             ->orderBy('name');

//         if ($category !== 'all') {
//             $query->where('category_id', $category);
//         }

//         if ($building !== 'all') {
//             if ($building === 'Dembel') {
//                 // If 'Dembel' is selected, show both 'Dembel' and 'Dembel Extension'
//                 $query->where(function($q) {
//                     $q->where('building', 'Dembel')
//                       ->orWhere('building', 'Dembel Extension');
//                 });
//             } else {
//                 // For other buildings, do exact match
//                 $query->where('building', $building);
//             }
//         }

//         if (!empty($search)) {
//             $query->where(function($q) use ($search) {
//                 $q->where('name', 'like', "%{$search}%")
//                   ->orWhere('description', 'like', "%{$search}%");
//             });
//         }

//         $tenants = $query->paginate($perPage, ['*'], 'page', $page);

//         return response()->json([
//             'data' => $tenants->items(),
//             'current_page' => $tenants->currentPage(),
//             'last_page' => $tenants->lastPage(),
//             'per_page' => $tenants->perPage(),
//             'total' => $tenants->total(),
//             'has_more' => $tenants->hasMorePages(),
//         ]);
//     }
// }

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Tenant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TenantController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 12);
        $page = $request->get('page', 1);
        $category = $request->get('category', 'all');
        $building = $request->get('building', 'all');
        $search = $request->get('search', '');

        $query = Tenant::with('category', 'floor')
            ->orderBy('name');

        if ($category !== 'all') {
            $query->where('category_id', $category);
        }

        if ($building !== 'all') {
            $query->where('building', $building);
        }

        if (! empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $tenants = $query->paginate($perPage, ['*'], 'page', $page);
        $categories = Category::orderBy('name')->get();

        // For AJAX requests (load more)
        if ($request->expectsJson()) {
            return response()->json([
                'data' => $tenants->items(),
                'current_page' => $tenants->currentPage(),
                'last_page' => $tenants->lastPage(),
                'per_page' => $tenants->perPage(),
                'total' => $tenants->total(),
                'has_more' => $tenants->hasMorePages(),
            ]);
        }

        // For initial page load
        return Inertia::render('Public/Tenant/Tenant', [
            'initialTenants' => $tenants->items(),
            'pagination' => [
                'current_page' => $tenants->currentPage(),
                'last_page' => $tenants->lastPage(),
                'per_page' => $tenants->perPage(),
                'total' => $tenants->total(),
                'has_more' => $tenants->hasMorePages(),
            ],
            'categories' => collect([
                ['id' => 'all', 'name' => 'All', 'icon' => '🏬'],
            ])->merge($categories),
        ]);
    }

    public function show(Tenant $tenant)
    {
        $tenant->load('category', 'floor');

        return Inertia::render('Public/Tenant/TenantDetail', [
            'tenant' => $tenant,
        ]);
    }

    public function loadMore(Request $request)
    {
        $perPage = $request->get('per_page', 12);
        $page = $request->get('page', 1);
        $category = $request->get('category', 'all');
        $building = $request->get('building', 'all');
        $search = $request->get('search', '');

        $query = Tenant::with('category', 'floor')
            ->orderBy('name');

        if ($category !== 'all') {
            $query->where('category_id', $category);
        }

        if ($building !== 'all') {
            $query->where('building', $building);
        }

        if (! empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $tenants = $query->paginate($perPage, ['*'], 'page', $page);

        return response()->json([
            'data' => $tenants->items(),
            'current_page' => $tenants->currentPage(),
            'last_page' => $tenants->lastPage(),
            'per_page' => $tenants->perPage(),
            'total' => $tenants->total(),
            'has_more' => $tenants->hasMorePages(),
        ]);
    }
}
