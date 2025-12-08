<?php

use App\Http\Controllers\AboutContentController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\Admin\AdminAboutContentController;
use App\Http\Controllers\Admin\AdminApplicationController;
use App\Http\Controllers\Admin\AdminDepartmentController;
use App\Http\Controllers\Admin\AdminFloorController;
use App\Http\Controllers\Admin\AdminFreeSpaceController;
use App\Http\Controllers\Admin\AdminGalleryController;
use App\Http\Controllers\Admin\AdminMallController;
use App\Http\Controllers\Admin\AdminNewsController;
use App\Http\Controllers\Admin\AdminServiceController;
use App\Http\Controllers\Admin\AdminSettingController;
use App\Http\Controllers\Admin\AdminTenantController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Admin\AdminVacancyController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\ContactController;
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
    // Gallery CRUD
    Route::get('/gallery', [AdminGalleryController::class, 'gallery'])->name('admin.gallery');
    Route::get('/galleries/list', [AdminGalleryController::class, 'galleriesList'])->name('admin.galleries.list');
    Route::get('/galleries/{gallery}', [AdminGalleryController::class, 'galleryShow'])->name('admin.galleries.show');
    Route::post('/galleries', [AdminGalleryController::class, 'galleryStore'])->name('admin.galleries.store');
    Route::match(['put', 'patch'], '/galleries/{gallery}', [AdminGalleryController::class, 'galleryUpdate'])->name('admin.galleries.update');
    Route::delete('/galleries/{gallery}', [AdminGalleryController::class, 'galleryDestroy'])->name('admin.galleries.destroy');
    // Tenants CRUD (JSON API)
    Route::get('/tenants', [AdminTenantController::class, 'tenants'])->name('admin.tenants');
    Route::get('/tenants/list', [AdminTenantController::class, 'tenantList'])->name('admin.tenants.list');
    Route::get('/tenants/{tenant}', [AdminTenantController::class, 'tenantShow'])->name('admin.tenants.show');
    Route::post('/tenants', [AdminTenantController::class, 'tenantStore'])->name('admin.tenants.store');
    Route::match(['put', 'patch'], '/tenants/{tenant}', [AdminTenantController::class, 'tenantUpdate'])->name('admin.tenants.update');
    Route::delete('/tenants/{tenant}', [AdminTenantController::class, 'tenantDestroy'])->name('admin.tenants.destroy');
    // Free Spaces CRUD (JSON API)
    Route::get('/free-spaces', [AdminFreeSpaceController::class, 'freeSpaces'])->name('admin.free-spaces');
    Route::get('/free-spaces/list', [AdminFreeSpaceController::class, 'freeSpacesList'])->name('admin.free-spaces.list');
    Route::get('/free-spaces/{freeSpace}', [AdminFreeSpaceController::class, 'freeSpaceShow'])->name('admin.free-spaces.show');
    Route::post('/free-spaces', [AdminFreeSpaceController::class, 'freeSpaceStore'])->name('admin.free-spaces.store');
    Route::match(['put', 'patch'], '/free-spaces/{freeSpace}', [AdminFreeSpaceController::class, 'freeSpaceUpdate'])->name('admin.free-spaces.update');
    Route::delete('/free-spaces/{freeSpace}', [AdminFreeSpaceController::class, 'freeSpaceDestroy'])->name('admin.free-spaces.destroy');
    // Vacancies CRUD (JSON API)
    Route::get('/vacancies', [AdminVacancyController::class, 'vacancies'])->name('admin.vacancies');
    Route::get('/vacancies/list', [AdminVacancyController::class, 'vacanciesList'])->name('admin.vacancies.list');
    Route::get('/vacancies/{vacancy}', [AdminVacancyController::class, 'vacancyShow'])->name('admin.vacancies.show');
    Route::post('/vacancies', [AdminVacancyController::class, 'vacancyStore'])->name('admin.vacancies.store');
    Route::match(['put', 'patch'], '/vacancies/{vacancy}', [AdminVacancyController::class, 'vacancyUpdate'])->name('admin.vacancies.update');
    Route::delete('/vacancies/{vacancy}', [AdminVacancyController::class, 'vacancyDestroy'])->name('admin.vacancies.destroy');
    // Services CRUD (JSON API)
    Route::get('/services', [AdminServiceController::class, 'services'])->name('admin.services');
    Route::get('/services/list', [AdminServiceController::class, 'servicesList'])->name('admin.services.list');
    Route::get('/services/{service}', [AdminServiceController::class, 'serviceShow'])->name('admin.services.show');
    Route::post('/services', [AdminServiceController::class, 'serviceStore'])->name('admin.services.store');
    Route::match(['put', 'patch'], '/services/{service}', [AdminServiceController::class, 'serviceUpdate'])->name('admin.services.update');
    Route::delete('/services/{service}', [AdminServiceController::class, 'serviceDestroy'])->name('admin.services.destroy');
    // Users page & CRUD (JSON API)
    Route::get('/users', [AdminUserController::class, 'users'])->name('admin.users');
    Route::get('/users/list', [AdminUserController::class, 'usersList'])->name('admin.users.list');
    Route::get('/users/{user}', [AdminUserController::class, 'userShow'])->name('admin.users.show');
    Route::post('/users', [AdminUserController::class, 'userStore'])->name('admin.users.store');
    Route::match(['put', 'patch'], '/users/{user}', [AdminUserController::class, 'userUpdate'])->name('admin.users.update');
    Route::delete('/users/{user}', [AdminUserController::class, 'userDestroy'])->name('admin.users.destroy');
    // Applications page & CRUD (JSON API)
    Route::get('/applications', [AdminApplicationController::class, 'applications'])->name('admin.applications');
    Route::get('/applications/list', [AdminApplicationController::class, 'applicationsList'])->name('admin.applications.list');
    Route::get('/applications/{application}', [AdminApplicationController::class, 'applicationShow'])->name('admin.applications.show');
    Route::post('/applications', [AdminApplicationController::class, 'applicationStore'])->name('admin.applications.store');
    Route::match(['put', 'patch'], '/applications/{application}', [AdminApplicationController::class, 'applicationUpdate'])->name('admin.applications.update');
    Route::delete('/applications/{application}', [AdminApplicationController::class, 'applicationDestroy'])->name('admin.applications.destroy');
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
    Route::get('/departments', [AdminDepartmentController::class, 'departments'])->name('admin.departments');
    Route::get('/departments/list', [AdminDepartmentController::class, 'departmentsList'])->name('admin.departments.list');
    Route::get('/departments/{department}', [AdminDepartmentController::class, 'departmentShow'])->name('admin.departments.show');
    Route::post('/departments', [AdminDepartmentController::class, 'departmentStore'])->name('admin.departments.store');
    Route::match(['put', 'patch'], '/departments/{department}', [AdminDepartmentController::class, 'departmentUpdate'])->name('admin.departments.update');
    Route::delete('/departments/{department}', [AdminDepartmentController::class, 'departmentDestroy'])->name('admin.departments.destroy');
    // News page & CRUD (JSON API)
    Route::get('/news', [AdminNewsController::class, 'news'])->name('admin.news');
    Route::get('/news/list', [AdminNewsController::class, 'newsList'])->name('admin.news.list');
    Route::get('/news/{news}', [AdminNewsController::class, 'newsShow'])->name('admin.news.show');
    Route::post('/news', [AdminNewsController::class, 'newsStore'])->name('admin.news.store');
    Route::match(['put', 'patch'], '/news/{news}', [AdminNewsController::class, 'newsUpdate'])->name('admin.news.update');
    Route::delete('/news/{news}', [AdminNewsController::class, 'newsDestroy'])->name('admin.news.destroy');
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
    Route::get('/floors', [AdminFloorController::class, 'floors'])->name('admin.floors');
    Route::get('/floors/list', [AdminFloorController::class, 'floorsList'])->name('admin.floors.list');
    Route::get('/floors/{floor}', [AdminFloorController::class, 'floorShow'])->name('admin.floors.show');
    Route::post('/floors', [AdminFloorController::class, 'floorStore'])->name('admin.floors.store');
    Route::match(['put', 'patch'], '/floors/{floor}', [AdminFloorController::class, 'floorUpdate'])->name('admin.floors.update');
    Route::delete('/floors/{floor}', [AdminFloorController::class, 'floorDestroy'])->name('admin.floors.destroy');
    // Settings page & update
    Route::get('/settings', [AdminSettingController::class, 'settings'])->name('admin.settings');
    Route::post('/settings', [AdminSettingController::class, 'settingsUpdate'])->name('admin.settings.update');
    // About Contents CRUD (JSON API)
    Route::get('/about-contents', [AdminAboutContentController::class, 'aboutContents'])->name('admin.about-contents');
    Route::get('/about-contents/list', [AdminAboutContentController::class, 'aboutContentsList'])->name('admin.about-contents.list');
    Route::post('/about-contents', [AdminAboutContentController::class, 'aboutContentStore'])->name('admin.about-contents.store');
    Route::match(['post', 'put'], '/about-contents/{aboutContent}', [AdminAboutContentController::class, 'aboutContentUpdate'])->name('admin.about-contents.update');
    Route::delete('/about-contents/{aboutContent}', [AdminAboutContentController::class, 'aboutContentDestroy'])->name('admin.about-contents.destroy');

    // Activity Log
    Route::get('/activity-log', [AdminController::class, 'activityPage'])->name('admin.activity-log.index');
    Route::get('/api/activity', [AdminController::class, 'activity'])->name('admin.activity.index');
    Route::get('/activity/{subject}', [AdminController::class, 'activity'])->name('admin.activity.show');

    // Teams page & CRUD (JSON API)
    Route::get('/teams', [AdminController::class, 'teams'])->name('admin.teams');
    Route::get('/teams/list', [AdminController::class, 'teamsList'])->name('admin.teams.list');
    Route::get('/teams/{team}', [AdminController::class, 'teamShow'])->name('admin.teams.show');
    Route::post('/teams', [AdminController::class, 'teamStore'])->name('admin.teams.store');
    Route::match(['put', 'patch'], '/teams/{team}', [AdminController::class, 'teamUpdate'])->name('admin.teams.update');
    Route::delete('/teams/{team}', [AdminController::class, 'teamDestroy'])->name('admin.teams.destroy');

    // Malls page & CRUD (JSON API)
    Route::get('/malls', [AdminMallController::class, 'malls'])->name('admin.malls');
    Route::get('/malls/list', [AdminMallController::class, 'mallsList'])->name('admin.malls.list');
    Route::get('/malls/{mall}', [AdminMallController::class, 'mallShow'])->name('admin.malls.show');
    Route::post('/malls', [AdminMallController::class, 'mallStore'])->name('admin.malls.store');
    Route::match(['put', 'patch'], '/malls/{mall}', [AdminMallController::class, 'mallUpdate'])->name('admin.malls.update');
    Route::delete('/malls/{mall}', [AdminMallController::class, 'mallDestroy'])->name('admin.malls.destroy');

    // Instagram page & CRUD (JSON API)
    Route::post('instagram-images', [AdminGalleryController::class, 'instagramStore'])->name('admin.instagram.store');
    Route::put('instagram-images/{id}', [AdminGalleryController::class, 'instagramUpdate'])->name('admin.instagram.update');
    Route::delete('instagram-images/{id}', [AdminGalleryController::class, 'instagramDestroy'])->name('admin.instagram.destroy');
});

Route::get('/about', [AboutContentController::class, 'index'])->name('about.index');

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

Route::get('/contact', [ContactController::class, 'index'])->name('contact.index');

Route::get('/announcement', [AnnouncementController::class, 'index'])->name('announcements.index');

Route::post('/applications', [ApplicationController::class, 'store'])->name('applications.store');

require __DIR__ . '/auth.php';
