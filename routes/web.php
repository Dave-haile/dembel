<?php

use App\Http\Controllers\FreeSpaceController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\TenantController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index']);
// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/about', function () {
    return Inertia::render('Public/About/About');
});
Route::get('/services', [ServiceController::class, 'index'])->name('services.index');
Route::get('/services/{id}', [ServiceController::class, 'show'])->name('services.show');
Route::post('/services/contact', [ServiceController::class, 'contact'])->name('services.contact');

Route::get('/tenant', [TenantController::class, 'index'])->name('tenant.index');
Route::get('/tenant/{tenant}', [TenantController::class, 'show'])->name('tenant.show');

Route::get('/gallery', [GalleryController::class, 'index'])->name('gallery.index');


Route::get('/space', [FreeSpaceController::class, 'index'])->name('free-space.index');
Route::get('/space/{freeSpace:slug}', [FreeSpaceController::class, 'show'])->name('free-space.show');
Route::get('/spaces/load', [FreeSpaceController::class, 'loadMore'])->name('free-spaces.load');

Route::get('/news-events', [NewsController::class, 'index'])->name('news.index');
Route::get('/news-events/load', [NewsController::class, 'loadMore'])->name('news.load');

require __DIR__ . '/auth.php';
