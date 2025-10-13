<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Tenant;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class TenantController extends Controller
{
    public function index()
    {
        // $tenant = Tenant::with('category')->get();

        // $tenants = Tenant::with('category')
        //     ->orderBy('name')
        //     ->get()
        //     ->map(function ($tenant) {
        //         return [
        //             'id' => $tenant->id,
        //             'name' => $tenant->name,
        //             'description' => $tenant->description,
        //             'fullDescription' => $tenant->fullDescription,
        //             'category' => $tenant->category->slug,
        //             'category_name' => $tenant->category->name,
        //             'logo' => $tenant->logo,
        //             'location' => $tenant->location,
        //             'floor' => $tenant->floor,
        //             'hours' => $tenant->hours,
        //             'phone' => $tenant->phone,
        //             'email' => $tenant->email,
        //             'website' => $tenant->website,
        //         ];
        //     });

        // $categories = Category::orderBy('name')->get()->map(function ($category) {
        //     return [
        //         'id' => $category->slug,
        //         'name' => $category->name,
        //         'icon' => $category->icon,
        //     ];
        // });

        // $allCategories = collect([
        //     ['id' => 'all', 'name' => 'All', 'icon' => '🏬']
        // ])->merge($categories);

        // return Inertia::render('Public/Tenant/Tenant', [
        //     'tenants' => $tenants,
        //     'categories' => $allCategories
        // ]);

        $tenants = Tenant::with('category')
            ->orderBy('name')
            ->get();

        $categories = Category::orderBy('name')->get();

        $allCategories = collect([
            ['id' => 'all', 'name' => 'All', 'icon' => '🏬']
        ])->merge($categories);

        return Inertia::render('Public/Tenant/Tenant', [
            'tenants' => $tenants,
            'categories' => $allCategories
        ]);
    }

    public function show(Tenant $tenant)
    {

        $tenant->load('category');
        // Log::info('Tenant show method called with ID: ' . $tenant->category);
        // return Inertia::render('Public/Tenant/TenantDetail', [
        //     'tenant' => [
        //         'id' => $tenant->id,
        //         'name' => $tenant->name,
        //         'description' => $tenant->description,
        //         'fullDescription' => $tenant->fullDescription,
        //         'category' => $tenant->category->slug,
        //         'logo' => $tenant->logo,
        //         'location' => $tenant->location,
        //         'floor' => $tenant->floor,
        //         'hours' => $tenant->hours,
        //         'phone' => $tenant->phone,
        //         'email' => $tenant->email,
        //         'website' => $tenant->website,
        //     ]
        // ]);
        return Inertia::render('Public/Tenant/TenantDetail', [
            'tenant' => $tenant,
        ]);
    }
}
