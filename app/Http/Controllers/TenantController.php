<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Tenant;
use Inertia\Inertia;

class TenantController extends Controller
{
    public function index()
    {
        $tenants = Tenant::with('category')
            ->orderBy('name')
            ->get();

        $categories = Category::orderBy('name')->get();

        $allCategories = collect([
            ['id' => 'all', 'name' => 'All', 'icon' => '🏬'],
        ])->merge($categories);

        return Inertia::render('Public/Tenant/Tenant', [
            'tenants' => $tenants,
            'categories' => $allCategories,
        ]);
    }

    public function show(Tenant $tenant)
    {

        $tenant->load('category');

        return Inertia::render('Public/Tenant/TenantDetail', [
            'tenant' => $tenant,
        ]);
    }
}
