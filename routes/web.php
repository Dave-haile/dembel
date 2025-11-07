<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\FreeSpaceController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MallController;
use App\Http\Controllers\NewsController;
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
    Route::get('/services', [AdminController::class, 'services'])->name('admin.services');
    Route::get('/gallery', [AdminController::class, 'gallery'])->name('admin.gallery');
    Route::get('/galleries/list', [AdminController::class, 'galleriesList'])->name('admin.galleries.list');
    Route::get('/galleries/{gallery}', [AdminController::class, 'galleryShow'])->name('admin.galleries.show');
    Route::post('/galleries', [AdminController::class, 'galleryStore'])->name('admin.galleries.store');
    Route::match(['put', 'patch'], '/galleries/{gallery}', [AdminController::class, 'galleryUpdate'])->name('admin.galleries.update');
    Route::delete('/galleries/{gallery}', [AdminController::class, 'galleryDestroy'])->name('admin.galleries.destroy');
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
    // Services CRUD (JSON API)
    Route::get('/services/list', [AdminController::class, 'servicesList'])->name('admin.services.list');
    Route::get('/services/{service}', [AdminController::class, 'serviceShow'])->name('admin.services.show');
    Route::post('/services', [AdminController::class, 'serviceStore'])->name('admin.services.store');
    Route::match(['put', 'patch'], '/services/{service}', [AdminController::class, 'serviceUpdate'])->name('admin.services.update');
    Route::delete('/services/{service}', [AdminController::class, 'serviceDestroy'])->name('admin.services.destroy');
    // Users page & CRUD (JSON API)
    Route::get('/users', [AdminController::class, 'users'])->name('admin.users');
    Route::get('/users/list', [AdminController::class, 'usersList'])->name('admin.users.list');
    Route::get('/users/{user}', [AdminController::class, 'userShow'])->name('admin.users.show');
    Route::post('/users', [AdminController::class, 'userStore'])->name('admin.users.store');
    Route::match(['put', 'patch'], '/users/{user}', [AdminController::class, 'userUpdate'])->name('admin.users.update');
    Route::delete('/users/{user}', [AdminController::class, 'userDestroy'])->name('admin.users.destroy');
    Route::get('/applications', [AdminController::class, 'applications'])->name('admin.applications');
    Route::get('/applications/list', [AdminController::class, 'applicationsList'])->name('admin.applications.list');
    Route::get('/applications/{application}', [AdminController::class, 'applicationShow'])->name('admin.applications.show');
    Route::post('/applications', [AdminController::class, 'applicationStore'])->name('admin.applications.store');
    Route::match(['put', 'patch'], '/applications/{application}', [AdminController::class, 'applicationUpdate'])->name('admin.applications.update');
    Route::delete('/applications/{application}', [AdminController::class, 'applicationDestroy'])->name('admin.applications.destroy');
    // Categories page & CRUD (JSON API)
    Route::get('/categories', [AdminController::class, 'categories'])->name('admin.categories');
    Route::get('/categories/list', [AdminController::class, 'categoriesList'])->name('admin.categories.list');
    Route::get('/categories/{category}', [AdminController::class, 'categoryShow'])->name('admin.categories.show');
    Route::post('/categories', [AdminController::class, 'categoryStore'])->name('admin.categories.store');
    Route::match(['put', 'patch'], '/categories/{category}', [AdminController::class, 'categoryUpdate'])->name('admin.categories.update');
    Route::delete('/categories/{category}', [AdminController::class, 'categoryDestroy'])->name('admin.categories.destroy');
    // Contacts page & CRUD (JSON API)
    Route::get('/contacts', [AdminController::class, 'contacts'])->name('admin.contacts');
    Route::get('/contacts/list', [AdminController::class, 'contactsList'])->name('admin.contacts.list');
    Route::get('/contacts/{contact}', [AdminController::class, 'contactShow'])->name('admin.contacts.show');
    Route::post('/contacts', [AdminController::class, 'contactStore'])->name('admin.contacts.store');
    Route::match(['put', 'patch'], '/contacts/{contact}', [AdminController::class, 'contactUpdate'])->name('admin.contacts.update');
    Route::delete('/contacts/{contact}', [AdminController::class, 'contactDestroy'])->name('admin.contacts.destroy');
    // Departments page & CRUD (JSON API)
    Route::get('/departments', [AdminController::class, 'departments'])->name('admin.departments');
    Route::get('/departments/list', [AdminController::class, 'departmentsList'])->name('admin.departments.list');
    Route::get('/departments/{department}', [AdminController::class, 'departmentShow'])->name('admin.departments.show');
    Route::post('/departments', [AdminController::class, 'departmentStore'])->name('admin.departments.store');
    Route::match(['put', 'patch'], '/departments/{department}', [AdminController::class, 'departmentUpdate'])->name('admin.departments.update');
    Route::delete('/departments/{department}', [AdminController::class, 'departmentDestroy'])->name('admin.departments.destroy');
    // News page & CRUD (JSON API)
    Route::get('/news', [AdminController::class, 'news'])->name('admin.news');
    Route::get('/news/list', [AdminController::class, 'newsList'])->name('admin.news.list');
    Route::get('/news/{news}', [AdminController::class, 'newsShow'])->name('admin.news.show');
    Route::post('/news', [AdminController::class, 'newsStore'])->name('admin.news.store');
    Route::match(['put', 'patch'], '/news/{news}', [AdminController::class, 'newsUpdate'])->name('admin.news.update');
    Route::delete('/news/{news}', [AdminController::class, 'newsDestroy'])->name('admin.news.destroy');
    // Slides page & CRUD (JSON API)
    Route::get('/slides', [AdminController::class, 'slides'])->name('admin.slides');
    Route::get('/slides/list', [AdminController::class, 'slidesList'])->name('admin.slides.list');
    Route::get('/slides/{slider}', [AdminController::class, 'slideShow'])->name('admin.slides.show');
    Route::post('/slides', [AdminController::class, 'slideStore'])->name('admin.slides.store');
    Route::match(['put', 'patch'], '/slides/{slider}', [AdminController::class, 'slideUpdate'])->name('admin.slides.update');
    Route::delete('/slides/{slider}', [AdminController::class, 'slideDestroy'])->name('admin.slides.destroy');
    // Events page & CRUD (JSON API)
    Route::get('/events', [AdminController::class, 'events'])->name('admin.events');
    Route::get('/events/list', [AdminController::class, 'eventsList'])->name('admin.events.list');
    Route::get('/events/{event}', [AdminController::class, 'eventShow'])->name('admin.events.show');
    Route::post('/events', [AdminController::class, 'eventStore'])->name('admin.events.store');
    Route::match(['put', 'patch'], '/events/{event}', [AdminController::class, 'eventUpdate'])->name('admin.events.update');
    Route::delete('/events/{event}', [AdminController::class, 'eventDestroy'])->name('admin.events.destroy');
    // Floors page & CRUD (JSON API)
    Route::get('/floors', [AdminController::class, 'floors'])->name('admin.floors');
    Route::get('/floors/list', [AdminController::class, 'floorsList'])->name('admin.floors.list');
    Route::get('/floors/{floor}', [AdminController::class, 'floorShow'])->name('admin.floors.show');
    Route::post('/floors', [AdminController::class, 'floorStore'])->name('admin.floors.store');
    Route::match(['put', 'patch'], '/floors/{floor}', [AdminController::class, 'floorUpdate'])->name('admin.floors.update');
    Route::delete('/floors/{floor}', [AdminController::class, 'floorDestroy'])->name('admin.floors.destroy');
    // Settings page & update
    Route::get('/settings', [AdminController::class, 'settings'])->name('admin.settings');
    Route::post('/settings', [AdminController::class, 'settingsUpdate'])->name('admin.settings.update');
    // Activity Log
    Route::get('/activity-log', [AdminController::class, 'activityPage'])->name('admin.activity-log.index');
    Route::get('/api/activity', [AdminController::class, 'activity'])->name('admin.activity.index');
    
    // Add other admin routes here as needed
    Route::get('/activity/{subject}', [AdminController::class, 'activity'])->name('admin.activity.show');

    // Teams page & CRUD (JSON API)
    Route::get('/teams', [AdminController::class, 'teams'])->name('admin.teams');
    Route::get('/teams/list', [AdminController::class, 'teamsList'])->name('admin.teams.list');
    Route::get('/teams/{team}', [AdminController::class, 'teamShow'])->name('admin.teams.show');
    Route::post('/teams', [AdminController::class, 'teamStore'])->name('admin.teams.store');
    Route::match(['put', 'patch'], '/teams/{team}', [AdminController::class, 'teamUpdate'])->name('admin.teams.update');
    Route::delete('/teams/{team}', [AdminController::class, 'teamDestroy'])->name('admin.teams.destroy');

    // Malls page & CRUD (JSON API)
    Route::get('/malls', [AdminController::class, 'malls'])->name('admin.malls');
    Route::get('/malls/list', [AdminController::class, 'mallsList'])->name('admin.malls.list');
    Route::get('/malls/{mall}', [AdminController::class, 'mallShow'])->name('admin.malls.show');
    Route::post('/malls', [AdminController::class, 'mallStore'])->name('admin.malls.store');
    Route::match(['put', 'patch'], '/malls/{mall}', [AdminController::class, 'mallUpdate'])->name('admin.malls.update');
    Route::delete('/malls/{mall}', [AdminController::class, 'mallDestroy'])->name('admin.malls.destroy');

});

Route::get('/about', function () {
    return Inertia::render('Public/About/About');
});
Route::get('/services', [ServiceController::class, 'index'])->name('services.index');
Route::get('/services/{id}', [ServiceController::class, 'show'])->name('services.show');
Route::post('/services/contact', [ServiceController::class, 'contact'])->name('services.contact');

Route::get('/tenant', [TenantController::class, 'index'])->name('tenant.index');
Route::get('/tenant/load-more', [TenantController::class, 'loadMore'])->name('tenant.load-more');
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

Route::get('/contact', fn () => Inertia::render('Public/Contact/ContactUs'))->name('contact.index');

Route::get('/announcement', [AnnouncementController::class, 'index'])->name('announcements.index');

require __DIR__.'/auth.php';
