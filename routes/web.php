<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\FreeSpaceController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MallController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\TenantController;
use App\Http\Controllers\VacancyController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index']);
// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Admin routes - protected by authentication
Route::middleware(['auth'])->prefix('admin')->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('admin.dashboard');
    Route::get('/tenants', [AdminController::class, 'tenants'])->name('admin.tenants');
    Route::get('/free-spaces', [AdminController::class, 'freeSpaces'])->name('admin.free-spaces');
    Route::get('/vacancies', [AdminController::class, 'vacancies'])->name('admin.vacancies');
    Route::get('/gallery', [AdminController::class, 'gallery'])->name('admin.gallery');
    // Tenants CRUD (JSON API)
    Route::get('/tenants/list', [AdminController::class, 'tenantList'])->name('admin.tenants.list');
    Route::get('/tenants/{tenant}', [AdminController::class, 'tenantShow'])->name('admin.tenants.show');
    Route::post('/tenants', [AdminController::class, 'tenantStore'])->name('admin.tenants.store');
    Route::match(['put', 'patch'], '/tenants/{tenant}', [AdminController::class, 'tenantUpdate'])->name('admin.tenants.update');
    Route::delete('/tenants/{tenant}', [AdminController::class, 'tenantDestroy'])->name('admin.tenants.destroy');
    // Free Spaces CRUD (JSON API)
    Route::get('/free-spaces/list', [AdminController::class, 'freeSpacesList'])->name('admin.free-spaces.list');
    Route::get('/free-spaces/{freeSpace}', [AdminController::class, 'freeSpaceShow'])->name('admin.free-spaces.show');
    Route::post('/free-spaces', [AdminController::class, 'freeSpaceStore'])->name('admin.free-spaces.store');
    Route::match(['put', 'patch'], '/free-spaces/{freeSpace}', [AdminController::class, 'freeSpaceUpdate'])->name('admin.free-spaces.update');
    Route::delete('/free-spaces/{freeSpace}', [AdminController::class, 'freeSpaceDestroy'])->name('admin.free-spaces.destroy');
    // Vacancies CRUD (JSON API)
    Route::get('/vacancies/list', [AdminController::class, 'vacanciesList'])->name('admin.vacancies.list');
    Route::get('/vacancies/{vacancy}', [AdminController::class, 'vacancyShow'])->name('admin.vacancies.show');
    Route::post('/vacancies', [AdminController::class, 'vacancyStore'])->name('admin.vacancies.store');
    Route::match(['put', 'patch'], '/vacancies/{vacancy}', [AdminController::class, 'vacancyUpdate'])->name('admin.vacancies.update');
    Route::delete('/vacancies/{vacancy}', [AdminController::class, 'vacancyDestroy'])->name('admin.vacancies.destroy');
    // Add other admin routes here as needed
    Route::get('/activity', [AdminController::class, 'activity'])->name('admin.activity.index');
    Route::get('/activity/{subject}', [AdminController::class, 'activity'])->name('admin.activity.show');
});


// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

Route::get('/about', function () {
    return Inertia::render('Public/About/About');
});
Route::get('/services', [ServiceController::class, 'index'])->name('services.index');
Route::get('/services/{id}', [ServiceController::class, 'show'])->name('services.show');
Route::post('/services/contact', [ServiceController::class, 'contact'])->name('services.contact');

Route::get('/tenant', [TenantController::class, 'index'])->name('tenant.index');
Route::get('/tenant/{tenant}', [TenantController::class, 'show'])->name('tenant.show');

Route::get('/gallery', [GalleryController::class, 'index'])->name('gallery.index');

Route::get('/announcement', [FreeSpaceController::class, 'index'])->name('free-space.index');
Route::get('/space', [FreeSpaceController::class, 'index'])->name('free-space.index');
Route::get('/space/{freeSpace:slug}', [FreeSpaceController::class, 'show'])->name('free-space.show');
Route::get('/spaces/load', [FreeSpaceController::class, 'loadMore'])->name('free-spaces.load');

Route::get('/news-events', [NewsController::class, 'index'])->name('news.index');
Route::get('/news-events/load', [NewsController::class, 'loadMore'])->name('news.load');

Route::get('/vacancies', [VacancyController::class, 'index'])->name('vacancies.index');
// Route::prefix('admin')->middleware(['auth'])->group(function() {
//     Route::resource('tenants', AdminTenantController::class);
//     Route::resource('news', AdminNewsController::class);
// });

Route::get('/mall', [MallController::class, 'index'])->name('mall.index');

Route::get('/contact', fn() => Inertia::render('Public/Contact/ContactUs'))->name('contact.index');

Route::get('/announcement', [AnnouncementController::class, 'index'])->name('announcements.index');

require __DIR__ . '/auth.php';
