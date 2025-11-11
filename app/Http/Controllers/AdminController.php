<?php

namespace App\Http\Controllers;

use App\Models\AboutContent;
use App\Models\ActivityLog;
use App\Models\Application;
use App\Models\Category;
use App\Models\Contact;
use App\Models\Department;
use App\Models\Event;
use App\Models\Floor;
use App\Models\FreeSpace;
use App\Models\Gallery;
use App\Models\Mall;
use App\Models\News;
use App\Models\Service;
use App\Models\Slider;
use App\Models\Team;
use App\Models\Tenant;
use App\Models\User;
use App\Models\Vacancy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        $data = [
            'tenants' => DB::table('tenants')->count(),
            'free_spaces' => DB::table('free_spaces')->count(),
            'vacancies' => DB::table('vacancies')->count(),
            'services' => DB::table('services')->count(),
            'gallery' => DB::table('galleries')->count(),
            'users' => DB::table('users')->count(),
            'applications' => DB::table('applications')->count(),
            'categories' => DB::table('categories')->count(),
            'contacts' => DB::table('contacts')->count(),
            'departments' => DB::table('departments')->count(),
            'news' => DB::table('news')->count(),
            'events' => DB::table('events')->count(),
            'slides' => DB::table('sliders')->count(),
            'team' => DB::table('teams')->count(),
            'malls' => DB::table('malls')->count(),
            'floors' => DB::table('floors')->count(),
            'testimonials' => DB::table('testimonials')->count(),
            'clients' => DB::table('clients')->count(),
            'meqs_readings' => DB::table('meqs_readings')->count(),
        ];
        $tables = DB::select("
            SELECT name 
            FROM sqlite_master 
            WHERE type='table' 
            AND name NOT LIKE 'sqlite_%'
            AND name NOT IN ('migrations', 'jobs', 'failed_jobs', 'job_batches', 'cache','cache_locks', 'sessions','password_reset_tokens')
        ");

        $tenants = Tenant::with('category')->orderBy('created_at', 'desc')->take(5)->get();
        $activities = ActivityLog::with('user')
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get();
        // $news = DB::table('news')->orderBy('created_at', 'desc')->take(5)->get();
        // $events = DB::table('events')->orderBy('created_at', 'desc')->take(5)->get();
        // $slides = DB::table('sliders')->orderBy('created_at', 'desc')->take(5)->get();
        // $team = DB::table('teams')->orderBy('created_at', 'desc')->take(5)->get();
        // $malls = DB::table('malls')->orderBy('created_at', 'desc')->take(5)->get();
        // $floors = DB::table('floors')->orderBy('created_at', 'desc')->take(5)->get();
        // $testimonials = DB::table('testimonials')->orderBy('created_at', 'desc')->take(5)->get();
        // $clients = DB::table('clients')->orderBy('created_at', 'desc')->take(5)->get();
        // $meqs_readings = DB::table('meqs_readings')->orderBy('created_at', 'desc')->take(5)->get();

        $tableNames = collect($tables)->pluck('name');

        return Inertia::render('Admin/Dashboard/Dashboard', [
            'counts' => $data,
            'tables' => $tableNames,
            'tenants' => $tenants,
            'activities' => $activities,
        ]);
    }

    public function settings()
    {
        $user = auth()->user();

        return Inertia::render('Admin/AdminSettings/AdminSettings', [
            'user' => $user,
        ]);
    }

    public function settingsUpdate(Request $request)
    {
        $user = auth()->user();

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
            'phone' => ['nullable', 'string', 'max:30'],
            'avatar' => ['nullable', 'image', 'max:5120'],
            'current_password' => ['nullable', 'required_with:password', 'current_password'],
            'password' => ['nullable', 'confirmed', 'min:8'],
        ]);

        $dataToUpdate = [
            'name' => $validated['name'],
            'email' => $validated['email'],
        ];
        if (array_key_exists('phone', $validated)) {
            $dataToUpdate['phone'] = $validated['phone'];
        }

        if ($request->hasFile('avatar')) {
            $old = $user->avatar;
            $path = $request->file('avatar')->store('user', 'public');
            $dataToUpdate['avatar'] = 'storage/'.$path;
            if ($old && str_starts_with($old, 'storage/') && $old !== 'storage/user/default.png') {
                $diskPath = str_replace('storage/', '', $old);
                if (Storage::disk('public')->exists($diskPath)) {
                    Storage::disk('public')->delete($diskPath);
                }
            }
        }

        $original = $user->getOriginal();
        $user->fill($dataToUpdate);

        if (! empty($validated['password'] ?? null)) {
            // Ensure current password was provided and valid (already validated by rule)
            $user->password = Hash::make($validated['password']);
        }

        $user->save();

        $changes = $user->getChanges();
        $diff = ['before' => [], 'after' => []];
        foreach ($changes as $key => $value) {
            if ($key === 'password') {
                // Do not log raw password values
                $diff['before'][$key] = '***';
                $diff['after'][$key] = '***';

                continue;
            }
            $diff['before'][$key] = $original[$key] ?? null;
            $diff['after'][$key] = $value;
        }

        if (! empty($diff['after'])) {
            $activity = new ActivityLog;
            $activity->user_id = $user->id;
            $activity->action = 'updated';
            $activity->subject_type = 'user';
            $activity->subject_id = $user->id;
            $activity->description = 'Profile updated';
            $activity->changes = $diff;
            $activity->save();
        }

        return redirect()->back()->with('success', 'Profile updated successfully');
    }

    public function tenants(Request $request)
    {
        $query = Tenant::with(['category', 'floor'])
            ->orderBy('created_at', 'desc');

        // Apply search filter if search term exists
        if ($request->has('search') && ! empty($request->search)) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('location', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('room_no', 'like', "%{$search}%")
                    ->orWhereHas('category', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%");
                    });
            });
        }

        // Apply category filter if category_id exists
        if ($request->has('category_id') && ! empty($request->category_id)) {
            $query->where('category_id', $request->category_id);
        }

        // Get pagination setting or default to 10
        $perPage = $request->per_page === 'all' ? PHP_INT_MAX : ($request->per_page ?? 10);

        // Check if this is an AJAX request for pagination/search
        if ($request->ajax() || $request->wantsJson()) {
            $tenants = $perPage === PHP_INT_MAX
                ? $query->get()
                : $query->paginate($perPage);

            return response()->json($tenants);
        }

        // Initial page load with default pagination
        $tenants = $query->paginate($perPage);
        $floors = Floor::all();
        $count = $query->count();
        $categories = Category::all();

        return Inertia::render('Admin/Tenant/AdminTenant', [
            'tenants' => $tenants,
            'floors' => $floors,
            'count' => $count,
            'categories' => $categories,
            'activities' => ActivityLog::latest()->take(5)->get(),
        ]);
    }

    public function freeSpaces()
    {
        $freeSpaces = FreeSpace::with('floor')->orderBy('created_at', 'desc')->get();
        $count = DB::table('free_spaces')->count();
        $counts = FreeSpace::select('availability_status', DB::raw('count(*) as total'))
            ->groupBy('availability_status')
            ->pluck('total', 'availability_status')
            ->toArray();
        $counts['count'] = $count;
        $floors = DB::table('floors')->select('id', 'name')->orderBy('name')->get();
        $activities = ActivityLog::with('user')
            ->where('subject_type', 'free_space')
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get();

        return Inertia::render('Admin/FreeSpace/AdminFreeSpace', [
            'freeSpaces' => $freeSpaces,
            'floors' => $floors,
            'activities' => $activities,
            'counts' => $counts,
        ]);
    }

    public function vacancies()
    {
        $vacancies = Vacancy::orderBy('created_at', 'desc')->get();
        $totalVacancies = DB::table('vacancies')->count();
        $openPositions = DB::table('vacancies')->sum('number_of_positions');
        $fullTime = DB::table('vacancies')->where('employment_type', 'Full-time')->count();
        $partTime = DB::table('vacancies')->where('employment_type', 'Part-time')->count();

        $counts = [
            'total' => $totalVacancies,
            'open_positions' => $openPositions,
            'full_time' => $fullTime,
            'part_time' => $partTime,
        ];

        $activities = ActivityLog::with('user')
            ->where('subject_type', 'vacancy')
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get();

        return Inertia::render('Admin/Vacancy/AdminVacancy', [
            'vacancies' => $vacancies,
            'activities' => $activities,
            'counts' => $counts,
        ]);
    }

    public function services()
    {
        $services = Service::orderByDesc('created_at')->get();
        $total = DB::table('services')->count();
        $approved = DB::table('services')->where('approval', 1)->count();
        $pending = $total - $approved;
        $counts = [
            'total' => $total,
            'approved' => $approved,
            'pending' => $pending,
        ];
        $activities = ActivityLog::with('user')
            ->where('subject_type', 'service')
            ->orderByDesc('created_at')
            ->take(10)
            ->get();

        return Inertia::render('Admin/Service/AdminService', [
            'services' => $services,
            'activities' => $activities,
            'counts' => $counts,
        ]);
    }

    public function gallery()
    {
        $galleries = Gallery::orderByDesc('created_at')->get();
        $total = DB::table('galleries')->count();
        $approved = DB::table('galleries')->where('approval', 1)->count();
        $pending = $total - $approved;
        $counts = [
            'total' => $total,
            'approved' => $approved,
            'pending' => $pending,
        ];
        $activities = ActivityLog::with('user')
            ->where('subject_type', 'gallery')
            ->orderByDesc('created_at')
            ->take(10)
            ->get();

        return Inertia::render('Admin/Gallery/AdminGallery', [
            'galleries' => $galleries,
            'activities' => $activities,
            'counts' => $counts,
        ]);
    }

    // Galleries JSON list for client-side pagination/loads
    public function galleriesList()
    {
        $query = Gallery::orderByDesc('created_at');
        $perPageRaw = request()->query('per_page', 10);
        if ($perPageRaw === 'all') {
            $items = $query->get();

            return response()->json([
                'data' => $items,
                'meta' => [
                    'total' => $items->count(),
                    'per_page' => 'all',
                ],
            ]);
        }
        $perPage = (int) $perPageRaw;
        if ($perPage <= 0) {
            $perPage = 10;
        }
        if ($perPage > 1000) {
            $perPage = 1000;
        }
        $paginator = $query->paginate($perPage);

        return response()->json($paginator);
    }

    public function mallStore(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:malls,slug'],
            'year_built' => ['nullable', 'integer'],
            'floors_directory' => ['nullable'],
            'total_area_sqm' => ['nullable', 'numeric'],
            'total_shops' => ['nullable', 'integer'],
            'description' => ['nullable', 'string'],
            'facilities' => ['nullable'],
            'gallery' => ['nullable'],
            'virtual_tour_url' => ['nullable', 'string', 'max:255'],
            'address' => ['nullable', 'string', 'max:255'],
            'contact_phone' => ['nullable', 'string', 'max:50'],
            'contact_email' => ['nullable', 'email', 'max:255'],
        ]);

        // Normalize JSON-like inputs if sent as strings
        foreach (['floors_directory', 'facilities', 'gallery'] as $key) {
            if ($request->has($key)) {
                $val = $request->input($key);
                if (is_string($val)) {
                    $decoded = json_decode($val, true);
                    if (json_last_error() === JSON_ERROR_NONE) {
                        $validated[$key] = $decoded;
                    }
                }
            }
        }

        // Slug auto-generate
        if (empty($validated['slug'] ?? null)) {
            $base = Str::slug($request->input('name', ''));
            if ($base === '') {
                $base = Str::random(6);
            }
            $slug = $base;
            $i = 2;
            while (Mall::where('slug', $slug)->exists()) {
                $slug = $base.'-'.$i;
                $i++;
            }
            $validated['slug'] = $slug;
        }

        // Handle gallery[] file uploads
        $galleryPaths = [];
        if ($request->hasFile('gallery')) {
            foreach ((array) $request->file('gallery') as $file) {
                if ($file && $file->isValid()) {
                    $path = $file->store('mall', 'public');
                    $galleryPaths[] = 'storage/'.$path;
                }
            }
        }
        if (! empty($validated['gallery']) && is_array($validated['gallery'])) {
            $galleryPaths = array_merge($galleryPaths, $validated['gallery']);
        }
        if (! empty($galleryPaths)) {
            // keep only strings; if array items have 'url', use it
            $onlyStrings = [];
            foreach ($galleryPaths as $g) {
                if (is_string($g)) {
                    $onlyStrings[] = $g;
                } elseif (is_array($g) && isset($g['url']) && is_string($g['url'])) {
                    $onlyStrings[] = $g['url'];
                }
            }
            $validated['gallery'] = array_values(array_unique($onlyStrings));
        }

        $mall = Mall::create($validated);

        // Activity log
        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'created';
        $activity->subject_type = 'mall';
        $activity->subject_id = $mall->id;
        $activity->description = 'Mall created';
        $activity->changes = $validated;
        $activity->save();

        return redirect()->back()->with('success', 'Mall created successfully');
    }

    public function galleryShow(Gallery $gallery)
    {
        return response()->json($gallery);
    }

    public function galleryStore(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category' => ['nullable', 'string', 'max:100'],
            'floor_id' => ['nullable', 'exists:floors,id'],
            'sector' => ['nullable', 'integer'],
            'description' => ['nullable', 'string'],
            'image' => ['required', 'image', 'max:5120'],
            'approval' => ['boolean'],
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('gallery', 'public');
            $validated['image'] = 'storage/'.$path;
        }
        $validated['created_by'] = auth()->id();

        $gallery = Gallery::create($validated);

        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'created';
        $activity->subject_type = 'gallery';
        $activity->subject_id = $gallery->id;
        $activity->description = 'Gallery image created';
        $activity->changes = $validated;
        $activity->save();

        return redirect()->back()->with('success', 'Gallery created successfully');
    }

    public function galleryUpdate(Request $request, Gallery $gallery)
    {
        $validated = $request->validate([
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'category' => ['nullable', 'string', 'max:100'],
            'floor_id' => ['nullable', 'exists:floors,id'],
            'sector' => ['nullable', 'integer'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'max:5120'],
            'approval' => ['boolean'],
        ]);

        if ($request->hasFile('image')) {
            $old = $gallery->image;
            $path = $request->file('image')->store('gallery', 'public');
            $validated['image'] = 'storage/'.$path;
            if ($old && str_starts_with($old, 'storage/')) {
                $diskPath = str_replace('storage/', '', $old);
                if (Storage::disk('public')->exists($diskPath)) {
                    Storage::disk('public')->delete($diskPath);
                }
            }
        }

        $original = $gallery->getOriginal();
        $gallery->update($validated);
        $changes = $gallery->getChanges();
        $diff = ['before' => [], 'after' => []];
        foreach ($changes as $key => $value) {
            $diff['before'][$key] = $original[$key] ?? null;
            $diff['after'][$key] = $value;
        }
        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'updated';
        $activity->subject_type = 'gallery';
        $activity->subject_id = $gallery->id;
        $activity->description = 'Gallery image updated';
        $activity->changes = $diff;
        $activity->save();

        return redirect()->back()->with('success', 'Gallery updated successfully');
    }

    public function galleryDestroy(Gallery $gallery)
    {
        $old = $gallery->image;
        if ($old && str_starts_with($old, 'storage/')) {
            $diskPath = str_replace('storage/', '', $old);
            if (Storage::disk('public')->exists($diskPath)) {
                Storage::disk('public')->delete($diskPath);
            }
        }
        $gallery->delete();

        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'deleted';
        $activity->subject_type = 'gallery';
        $activity->subject_id = $gallery->id;
        $activity->description = 'Gallery image deleted';
        $activity->changes = $gallery;
        $activity->save();

        return redirect()->back()->with('success', 'Gallery deleted successfully');
    }

    // Floors page & CRUD
    public function floors()
    {
        $floors = Floor::orderByDesc('created_at')->limit(10)->get();
        $total = DB::table('floors')->count();
        $withDescription = DB::table('floors')->whereNotNull('description')->where('description', '!=', '')->count();
        $counts = [
            'total' => $total,
            'with_description' => $withDescription,
        ];
        $activities = ActivityLog::with('user')
            ->where('subject_type', 'floor')
            ->orderByDesc('created_at')
            ->take(10)
            ->get();

        return Inertia::render('AdminFloor/AdminFloor', [
            'floors' => $floors,
            'activities' => $activities,
            'counts' => $counts,
        ]);
    }

    public function floorsList(Request $request)
    {
        $query = Floor::orderByDesc('created_at');
        $perPageRaw = $request->query('per_page', 10);
        if ($perPageRaw === 'all') {
            $items = $query->get();

            return response()->json([
                'data' => $items,
                'meta' => [
                    'total' => $items->count(),
                    'per_page' => 'all',
                ],
            ]);
        }
        $perPage = (int) $perPageRaw;
        if ($perPage <= 0) {
            $perPage = 10;
        }
        if ($perPage > 1000) {
            $perPage = 1000;
        }
        $paginator = $query->paginate($perPage);

        return response()->json($paginator);
    }

    public function floorShow(Floor $floor)
    {
        return response()->json($floor);
    }

    public function floorStore(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
        ]);

        $floor = Floor::create($validated);

        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'created';
        $activity->subject_type = 'floor';
        $activity->subject_id = $floor->id;
        $activity->description = 'Floor created';
        $activity->changes = $validated;
        $activity->save();

        return redirect()->back()->with('success', 'Floor created successfully');
    }

    public function floorUpdate(Request $request, Floor $floor)
    {
        $validated = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
        ]);

        $original = $floor->getOriginal();
        $floor->update($validated);
        $changes = $floor->getChanges();
        $diff = ['before' => [], 'after' => []];
        foreach ($changes as $key => $value) {
            $diff['before'][$key] = $original[$key] ?? null;
            $diff['after'][$key] = $value;
        }

        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'updated';
        $activity->subject_type = 'floor';
        $activity->subject_id = $floor->id;
        $activity->description = 'Floor updated';
        $activity->changes = $diff;
        $activity->save();

        return redirect()->back()->with('success', 'Floor updated successfully');
    }

    public function floorDestroy(Floor $floor)
    {
        $floor->delete();

        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'deleted';
        $activity->subject_type = 'floor';
        $activity->subject_id = $floor->id;
        $activity->description = 'Floor deleted';
        $activity->changes = $floor;
        $activity->save();

        return redirect()->back()->with('success', 'Floor deleted successfully');
    }

    public function applications()
    {
        $applications = Application::orderByDesc('created_at')->get();
        $total = DB::table('applications')->count();
        $withCv = DB::table('applications')->whereNotNull('cv')->count();
        $counts = [
            'total' => $total,
            'with_cv' => $withCv,
        ];
        $activities = ActivityLog::with('user')
            ->where('subject_type', 'application')
            ->orderByDesc('created_at')
            ->take(10)
            ->get();
        $vacancies = Vacancy::select('id', 'title')->orderBy('title')->get();

        return Inertia::render('Admin/Application/AdminAplication', [
            'applications' => $applications,
            'activities' => $activities,
            'counts' => $counts,
            'vacancies' => $vacancies,
        ]);
    }

    public function applicationsList(Request $request)
    {
        $query = Application::orderByDesc('created_at');
        $perPageRaw = $request->query('per_page', 10);
        if ($perPageRaw === 'all') {
            $items = $query->get();

            return response()->json([
                'data' => $items,
                'meta' => [
                    'total' => $items->count(),
                    'per_page' => 'all',
                ],
            ]);
        }

        $perPage = (int) $perPageRaw;
        if ($perPage <= 0) {
            $perPage = 10;
        }
        if ($perPage > 1000) {
            $perPage = 1000;
        }
        $paginator = $query->paginate($perPage);

        return response()->json($paginator);
    }

    public function applicationShow(Application $application)
    {
        return response()->json($application);
    }

    public function applicationStore(Request $request)
    {
        $validated = $request->validate([
            'first_name' => ['required', 'string', 'max:100'],
            'last_name' => ['required', 'string', 'max:100'],
            'phone' => ['required', 'string', 'max:30'],
            'alt_phone' => ['nullable', 'string', 'max:30'],
            'birth_date' => ['nullable', 'date'],
            'email' => ['nullable', 'email', 'max:255'],
            'photo' => ['nullable', 'image', 'max:5120'],
            'subcity' => ['nullable', 'string', 'max:100'],
            'woreda' => ['nullable', 'string', 'max:100'],
            'city' => ['nullable', 'string', 'max:100'],
            'marital_status' => ['nullable', 'string', 'max:50'],
            'education_background' => ['nullable', 'string'],
            'vacancy_id' => ['nullable', 'exists:vacancies,id'],
            'cv' => ['nullable', 'file', 'max:10240'],
        ]);

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('applications/photo', 'public');
            $validated['photo'] = 'storage/'.$path;
        }
        if ($request->hasFile('cv')) {
            $path = $request->file('cv')->store('applications/cv', 'public');
            $validated['cv'] = 'storage/'.$path;
        }

        $application = Application::create($validated);

        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'created';
        $activity->subject_type = 'application';
        $activity->subject_id = $application->id;
        $activity->description = 'Application created';
        $activity->changes = $validated;
        $activity->save();

        return redirect()->back()->with('success', 'Application created successfully');
    }

    public function applicationUpdate(Request $request, Application $application)
    {
        $validated = $request->validate([
            'first_name' => ['sometimes', 'required', 'string', 'max:100'],
            'last_name' => ['sometimes', 'required', 'string', 'max:100'],
            'phone' => ['sometimes', 'required', 'string', 'max:30'],
            'alt_phone' => ['nullable', 'string', 'max:30'],
            'birth_date' => ['nullable', 'date'],
            'email' => ['nullable', 'email', 'max:255'],
            'photo' => ['nullable', 'image', 'max:5120'],
            'subcity' => ['nullable', 'string', 'max:100'],
            'woreda' => ['nullable', 'string', 'max:100'],
            'city' => ['nullable', 'string', 'max:100'],
            'marital_status' => ['nullable', 'string', 'max:50'],
            'education_background' => ['nullable', 'string'],
            'vacancy_id' => ['nullable', 'exists:vacancies,id'],
            'cv' => ['nullable', 'file', 'max:10240'],
        ]);

        if ($request->hasFile('photo')) {
            $old = $application->photo;
            $path = $request->file('photo')->store('applications/photo', 'public');
            $validated['photo'] = 'storage/'.$path;
            if ($old && str_starts_with($old, 'storage/')) {
                $diskPath = str_replace('storage/', '', $old);
                if (Storage::disk('public')->exists($diskPath)) {
                    Storage::disk('public')->delete($diskPath);
                }
            }
        }
        if ($request->hasFile('cv')) {
            $old = $application->cv;
            $path = $request->file('cv')->store('applications/cv', 'public');
            $validated['cv'] = 'storage/'.$path;
            if ($old && str_starts_with($old, 'storage/')) {
                $diskPath = str_replace('storage/', '', $old);
                if (Storage::disk('public')->exists($diskPath)) {
                    Storage::disk('public')->delete($diskPath);
                }
            }
        }

        $original = $application->getOriginal();
        $application->update($validated);
        $changes = $application->getChanges();
        $diff = ['before' => [], 'after' => []];
        foreach ($changes as $key => $value) {
            $diff['before'][$key] = $original[$key] ?? null;
            $diff['after'][$key] = $value;
        }
        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'updated';
        $activity->subject_type = 'application';
        $activity->subject_id = $application->id;
        $activity->description = 'Application updated';
        $activity->changes = $diff;
        $activity->save();

        return redirect()->back()->with('success', 'Application updated successfully');
    }

    public function applicationDestroy(Application $application)
    {
        $oldPhoto = $application->photo;
        if ($oldPhoto && str_starts_with($oldPhoto, 'storage/')) {
            $diskPath = str_replace('storage/', '', $oldPhoto);
            if (Storage::disk('public')->exists($diskPath)) {
                Storage::disk('public')->delete($diskPath);
            }
        }
        $oldCv = $application->cv;
        if ($oldCv && str_starts_with($oldCv, 'storage/')) {
            $diskPath = str_replace('storage/', '', $oldCv);
            if (Storage::disk('public')->exists($diskPath)) {
                Storage::disk('public')->delete($diskPath);
            }
        }
        $application->delete();

        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'deleted';
        $activity->subject_type = 'application';
        $activity->subject_id = $application->id;
        $activity->description = 'Application deleted';
        $activity->changes = $application;
        $activity->save();

        return redirect()->back()->with('success', 'Application deleted successfully');
    }

    public function categories()
    {
        $categories = Category::withCount('tenants')->orderByDesc('created_at')->limit(10)->get();
        $total = DB::table('categories')->count();
        $withIcon = DB::table('categories')->whereNotNull('icon')->where('icon', '!=', '')->count();
        $counts = [
            'total' => $total,
            'with_icon' => $withIcon,
        ];
        $activities = ActivityLog::with('user')
            ->where('subject_type', 'category')
            ->orderByDesc('created_at')
            ->take(10)
            ->get();

        return Inertia::render('Admin/AdminCategory/AdminCategory', [
            'categories' => $categories,
            'activities' => $activities,
            'counts' => $counts,
        ]);
    }

    public function categoriesList(Request $request)
    {
        $query = Category::withCount('tenants')->orderByDesc('created_at');
        $perPageRaw = $request->query('per_page', 10);
        if ($perPageRaw === 'all') {
            $items = $query->get();

            return response()->json([
                'data' => $items,
                'meta' => [
                    'total' => $items->count(),
                    'per_page' => 'all',
                ],
            ]);
        }
        $perPage = (int) $perPageRaw;
        if ($perPage <= 0) {
            $perPage = 10;
        }
        if ($perPage > 1000) {
            $perPage = 1000;
        }
        $paginator = $query->paginate($perPage);

        return response()->json($paginator);
    }

    public function categoryShow(Category $category)
    {
        return response()->json($category);
    }

    public function categoryStore(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'icon' => ['nullable', 'string', 'max:255'],
        ]);

        $category = Category::create($validated);

        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'created';
        $activity->subject_type = 'category';
        $activity->subject_id = $category->id;
        $activity->description = 'Category created';
        $activity->changes = $validated;
        $activity->save();

        return redirect()->back()->with('success', 'Category created successfully');
    }

    public function categoryUpdate(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'icon' => ['nullable', 'string', 'max:255'],
        ]);

        $original = $category->getOriginal();
        $category->update($validated);
        $changes = $category->getChanges();
        $diff = ['before' => [], 'after' => []];
        foreach ($changes as $key => $value) {
            $diff['before'][$key] = $original[$key] ?? null;
            $diff['after'][$key] = $value;
        }
        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'updated';
        $activity->subject_type = 'category';
        $activity->subject_id = $category->id;
        $activity->description = 'Category updated';
        $activity->changes = $diff;
        $activity->save();

        return redirect()->back()->with('success', 'Category updated successfully');
    }

    public function categoryDestroy(Category $category)
    {
        $old = $category->icon;
        if ($old && str_starts_with($old, 'storage/')) {
            $diskPath = str_replace('storage/', '', $old);
            if (Storage::disk('public')->exists($diskPath)) {
                Storage::disk('public')->delete($diskPath);
            }
        }
        $category->delete();

        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'deleted';
        $activity->subject_type = 'category';
        $activity->subject_id = $category->id;
        $activity->description = 'Category deleted';
        $activity->changes = $category;
        $activity->save();

        return redirect()->back()->with('success', 'Category deleted successfully');
    }

    // Contacts page & CRUD
    public function contacts()
    {
        $contacts = Contact::orderByDesc('created_at')->limit(10)->get();
        $total = DB::table('contacts')->count();
        $withEmail = DB::table('contacts')->whereNotNull('email')->where('email', '!=', '')->count();
        $counts = [
            'total' => $total,
            'with_email' => $withEmail,
        ];
        $activities = ActivityLog::with('user')
            ->where('subject_type', 'contact')
            ->orderByDesc('created_at')
            ->take(10)
            ->get();

        return Inertia::render('Admin/AdminContact/AdminContact', [
            'contacts' => $contacts,
            'activities' => $activities,
            'counts' => $counts,
        ]);
    }

    public function contactsList(Request $request)
    {
        $query = Contact::orderByDesc('created_at');
        $perPageRaw = $request->query('per_page', 10);
        if ($perPageRaw === 'all') {
            $items = $query->get();

            return response()->json([
                'data' => $items,
                'meta' => [
                    'total' => $items->count(),
                    'per_page' => 'all',
                ],
            ]);
        }
        $perPage = (int) $perPageRaw;
        if ($perPage <= 0) {
            $perPage = 10;
        }
        if ($perPage > 1000) {
            $perPage = 1000;
        }
        $paginator = $query->paginate($perPage);

        return response()->json($paginator);
    }

    public function contactShow(Contact $contact)
    {
        return response()->json($contact);
    }

    public function contactStore(Request $request)
    {
        $validated = $request->validate([
            'address' => ['required', 'string', 'max:191'],
            'phone' => ['required', 'string', 'max:191'],
            'fax' => ['nullable', 'string', 'max:191'],
            'email' => ['required', 'email', 'max:191'],
        ]);

        $contact = Contact::create($validated);

        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'created';
        $activity->subject_type = 'contact';
        $activity->subject_id = $contact->id;
        $activity->description = 'Contact created';
        $activity->changes = $validated;
        $activity->save();

        return redirect()->back()->with('success', 'Contact created successfully');
    }

    public function contactUpdate(Request $request, Contact $contact)
    {
        $validated = $request->validate([
            'address' => ['sometimes', 'required', 'string', 'max:191'],
            'phone' => ['sometimes', 'required', 'string', 'max:191'],
            'fax' => ['nullable', 'string', 'max:191'],
            'email' => ['sometimes', 'required', 'email', 'max:191'],
        ]);

        $original = $contact->getOriginal();
        $contact->update($validated);
        $changes = $contact->getChanges();
        $diff = ['before' => [], 'after' => []];
        foreach ($changes as $key => $value) {
            $diff['before'][$key] = $original[$key] ?? null;
            $diff['after'][$key] = $value;
        }

        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'updated';
        $activity->subject_type = 'contact';
        $activity->subject_id = $contact->id;
        $activity->description = 'Contact updated';
        $activity->changes = $diff;
        $activity->save();

        return redirect()->back()->with('success', 'Contact updated successfully');
    }

    public function contactDestroy(Contact $contact)
    {
        $contact->delete();

        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'deleted';
        $activity->subject_type = 'contact';
        $activity->subject_id = $contact->id;
        $activity->description = 'Contact deleted';
        $activity->changes = $contact;
        $activity->save();

        return redirect()->back()->with('success', 'Contact deleted successfully');
    }

    // Teams page & CRUD
    public function teams()
    {
        $teams = Team::orderByDesc('created_at')->limit(10)->get();
        $total = DB::table('teams')->count();
        $approved = DB::table('teams')->where('approval', 1)->count();
        $counts = [
            'total' => $total,
            'approved' => $approved,
            'pending' => $total - $approved,
        ];
        $activities = ActivityLog::with('user')
            ->where('subject_type', 'team')
            ->orderByDesc('created_at')
            ->take(10)
            ->get();

        return Inertia::render('Admin/AdminTeam/AdminTeam', [
            'teams' => $teams,
            'activities' => $activities,
            'counts' => $counts,
        ]);
    }

    public function teamsList(Request $request)
    {
        $query = Team::orderByDesc('created_at');
        $perPageRaw = $request->query('per_page', 10);
        if ($perPageRaw === 'all') {
            $items = $query->get();

            return response()->json([
                'data' => $items,
                'meta' => [
                    'total' => $items->count(),
                    'per_page' => 'all',
                ],
            ]);
        }
        $perPage = (int) $perPageRaw;
        if ($perPage <= 0) {
            $perPage = 10;
        }
        if ($perPage > 1000) {
            $perPage = 1000;
        }
        $paginator = $query->paginate($perPage);

        return response()->json($paginator);
    }

    public function teamShow(Team $team)
    {
        return response()->json($team);
    }

    public function teamStore(Request $request)
    {
        $validated = $request->validate([
            'name_en' => ['required', 'string', 'max:191'],
            'name_am' => ['nullable', 'string', 'max:191'],
            'position' => ['nullable', 'string', 'max:191'],
            'email' => ['nullable', 'email', 'max:191'],
            'phone' => ['nullable', 'string', 'max:50'],
            'photo' => ['nullable', 'image', 'max:5120'],
            'approval' => ['boolean'],
        ]);

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('team', 'public');
            $validated['photo'] = 'storage/'.$path;
        }
        $validated['created_by'] = auth()->id();

        $team = Team::create($validated);

        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'created';
        $activity->subject_type = 'team';
        $activity->subject_id = $team->id;
        $activity->description = 'Team member created';
        $activity->changes = $validated;
        $activity->save();

        return redirect()->back()->with('success', 'Team member created successfully');
    }

    public function teamUpdate(Request $request, Team $team)
    {
        $validated = $request->validate([
            'name_en' => ['sometimes', 'required', 'string', 'max:191'],
            'name_am' => ['nullable', 'string', 'max:191'],
            'position' => ['nullable', 'string', 'max:191'],
            'email' => ['nullable', 'email', 'max:191'],
            'phone' => ['nullable', 'string', 'max:50'],
            'photo' => ['nullable', 'image', 'max:5120'],
            'approval' => ['boolean'],
        ]);

        if ($request->hasFile('photo')) {
            $old = $team->photo;
            $path = $request->file('photo')->store('team', 'public');
            $validated['photo'] = 'storage/'.$path;
            if ($old && str_starts_with($old, 'storage/')) {
                $diskPath = str_replace('storage/', '', $old);
                if (Storage::disk('public')->exists($diskPath)) {
                    Storage::disk('public')->delete($diskPath);
                }
            }
        }

        $original = $team->getOriginal();
        $team->update($validated);
        $changes = $team->getChanges();
        $diff = ['before' => [], 'after' => []];
        foreach ($changes as $key => $value) {
            $diff['before'][$key] = $original[$key] ?? null;
            $diff['after'][$key] = $value;
        }

        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'updated';
        $activity->subject_type = 'team';
        $activity->subject_id = $team->id;
        $activity->description = 'Team member updated';
        $activity->changes = $diff;
        $activity->save();

        return redirect()->back()->with('success', 'Team member updated successfully');
    }

    public function teamDestroy(Team $team)
    {
        $old = $team->photo;
        if ($old && str_starts_with($old, 'storage/')) {
            $diskPath = str_replace('storage/', '', $old);
            if (Storage::disk('public')->exists($diskPath)) {
                Storage::disk('public')->delete($diskPath);
            }
        }
        $team->delete();

        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'deleted';
        $activity->subject_type = 'team';
        $activity->subject_id = $team->id;
        $activity->description = 'Team member deleted';
        $activity->changes = $team;
        $activity->save();

        return redirect()->back()->with('success', 'Team member deleted successfully');
    }

    // Departments page & CRUD
    public function departments()
    {
        $departments = Department::orderByDesc('created_at')->limit(10)->get();
        $total = \DB::table('departments')->count();
        $approved = \DB::table('departments')->where('approval', 1)->count();
        $counts = [
            'total' => $total,
            'approved' => $approved,
            'pending' => $total - $approved,
        ];
        $activities = ActivityLog::with('user')
            ->where('subject_type', 'department')
            ->orderByDesc('created_at')
            ->take(10)
            ->get();

        return Inertia::render('Admin/AdminDepartment/AdminDepartment', [
            'departments' => $departments,
            'activities' => $activities,
            'counts' => $counts,
        ]);
    }

    public function departmentsList(Request $request)
    {
        $query = Department::orderByDesc('created_at');
        $perPageRaw = $request->query('per_page', 10);
        if ($perPageRaw === 'all') {
            $items = $query->get();

            return response()->json([
                'data' => $items,
                'meta' => [
                    'total' => $items->count(),
                    'per_page' => 'all',
                ],
            ]);
        }
        $perPage = (int) $perPageRaw;
        if ($perPage <= 0) {
            $perPage = 10;
        }
        if ($perPage > 1000) {
            $perPage = 1000;
        }
        $paginator = $query->paginate($perPage);

        return response()->json($paginator);
    }

    public function departmentShow(Department $department)
    {
        return response()->json($department);
    }

    public function departmentStore(Request $request)
    {
        $validated = $request->validate([
            'title_en' => ['required', 'string', 'max:255'],
            'title_am' => ['nullable', 'string', 'max:255'],
            'sub_title_en' => ['nullable', 'string', 'max:255'],
            'sub_title_am' => ['nullable', 'string', 'max:255'],
            'body_en' => ['nullable', 'string'],
            'body_am' => ['nullable', 'string'],
            'icon' => ['nullable', 'string', 'max:255'],
            'image' => ['nullable', 'image', 'max:5120'],
            'approval' => ['boolean'],
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('departments', 'public');
            $validated['image'] = 'storage/'.$path;
        }
        $validated['created_by'] = auth()->id();

        $department = Department::create($validated);

        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'created';
        $activity->subject_type = 'department';
        $activity->subject_id = $department->id;
        $activity->description = 'Department created';
        $activity->changes = $validated;
        $activity->save();

        return redirect()->back()->with('success', 'Department created successfully');
    }

    public function departmentUpdate(Request $request, Department $department)
    {
        $validated = $request->validate([
            'title_en' => ['sometimes', 'required', 'string', 'max:255'],
            'title_am' => ['nullable', 'string', 'max:255'],
            'sub_title_en' => ['nullable', 'string', 'max:255'],
            'sub_title_am' => ['nullable', 'string', 'max:255'],
            'body_en' => ['nullable', 'string'],
            'body_am' => ['nullable', 'string'],
            'icon' => ['nullable', 'string', 'max:255'],
            'image' => ['nullable', 'image', 'max:5120'],
            'approval' => ['boolean'],
        ]);

        if ($request->hasFile('image')) {
            $old = $department->image;
            $path = $request->file('image')->store('departments', 'public');
            $validated['image'] = 'storage/'.$path;
            if ($old && str_starts_with($old, 'storage/')) {
                $diskPath = str_replace('storage/', '', $old);
                if (Storage::disk('public')->exists($diskPath)) {
                    Storage::disk('public')->delete($diskPath);
                }
            }
        }

        $original = $department->getOriginal();
        $department->update($validated);
        $changes = $department->getChanges();
        $diff = ['before' => [], 'after' => []];
        foreach ($changes as $key => $value) {
            $diff['before'][$key] = $original[$key] ?? null;
            $diff['after'][$key] = $value;
        }

        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'updated';
        $activity->subject_type = 'department';
        $activity->subject_id = $department->id;
        $activity->description = 'Department updated';
        $activity->changes = $diff;
        $activity->save();

        return redirect()->back()->with('success', 'Department updated successfully');
    }

    public function departmentDestroy(Department $department)
    {
        $old = $department->image;
        if ($old && str_starts_with($old, 'storage/')) {
            $diskPath = str_replace('storage/', '', $old);
            if (Storage::disk('public')->exists($diskPath)) {
                Storage::disk('public')->delete($diskPath);
            }
        }
        $department->delete();

        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'deleted';
        $activity->subject_type = 'department';
        $activity->subject_id = $department->id;
        $activity->description = 'Department deleted';
        $activity->changes = $department;
        $activity->save();

        return redirect()->back()->with('success', 'Department deleted successfully');
    }

    // News page & CRUD
    public function news()
    {
        $news = News::orderByDesc('created_at')->limit(10)->get();
        $total = \DB::table('news')->count();
        $approved = \DB::table('news')->where('approval', 1)->count();
        $counts = [
            'total' => $total,
            'approved' => $approved,
            'pending' => $total - $approved,
        ];
        $activities = ActivityLog::with('user')
            ->where('subject_type', 'news')
            ->orderByDesc('created_at')
            ->take(10)
            ->get();

        return Inertia::render('Admin/AdminNews/AdminNews', [
            'news' => $news,
            'activities' => $activities,
            'counts' => $counts,
        ]);
    }

    public function newsList(Request $request)
    {
        $query = News::orderByDesc('created_at');
        $perPageRaw = $request->query('per_page', 10);
        if ($perPageRaw === 'all') {
            $items = $query->get();

            return response()->json([
                'data' => $items,
                'meta' => [
                    'total' => $items->count(),
                    'per_page' => 'all',
                ],
            ]);
        }
        $perPage = (int) $perPageRaw;
        if ($perPage <= 0) {
            $perPage = 10;
        }
        if ($perPage > 1000) {
            $perPage = 1000;
        }
        $paginator = $query->paginate($perPage);

        return response()->json($paginator);
    }

    public function newsShow(News $news)
    {
        return response()->json($news);
    }

    public function newsStore(Request $request)
    {
        $validated = $request->validate([
            'category' => ['required', 'string', 'max:50'],
            'title_en' => ['required', 'string', 'max:255'],
            'title_am' => ['required', 'string', 'max:255'],
            'sub_title_en' => ['nullable', 'string', 'max:255'],
            'sub_title_am' => ['nullable', 'string', 'max:255'],
            'excerpt_en' => ['nullable', 'string'],
            'excerpt_am' => ['nullable', 'string'],
            'content_en' => ['nullable', 'string'],
            'content_am' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'max:5120'],
            'pdf_file' => ['nullable', 'file', 'max:10240'],
            'approval' => ['boolean'],
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('news', 'public');
            $validated['image'] = 'storage/'.$path;
        }
        if ($request->hasFile('pdf_file')) {
            $path = $request->file('pdf_file')->store('news', 'public');
            $validated['pdf_file'] = 'storage/'.$path;
        }
        $validated['created_by'] = auth()->id();

        $news = News::create($validated);

        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'created';
        $activity->subject_type = 'news';
        $activity->subject_id = $news->id;
        $activity->description = 'News created';
        $activity->changes = $validated;
        $activity->save();

        return redirect()->back()->with('success', 'News created successfully');
    }

    public function newsUpdate(Request $request, News $news)
    {
        $validated = $request->validate([
            'category' => ['sometimes', 'required', 'string', 'max:50'],
            'title_en' => ['sometimes', 'required', 'string', 'max:255'],
            'title_am' => ['sometimes', 'required', 'string', 'max:255'],
            'sub_title_en' => ['nullable', 'string', 'max:255'],
            'sub_title_am' => ['nullable', 'string', 'max:255'],
            'excerpt_en' => ['nullable', 'string'],
            'excerpt_am' => ['nullable', 'string'],
            'content_en' => ['nullable', 'string'],
            'content_am' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'max:5120'],
            'pdf_file' => ['nullable', 'file', 'max:10240'],
            'approval' => ['boolean'],
        ]);

        if ($request->hasFile('image')) {
            $old = $news->image;
            $path = $request->file('image')->store('news', 'public');
            $validated['image'] = 'storage/'.$path;
            if ($old && str_starts_with($old, 'storage/')) {
                $diskPath = str_replace('storage/', '', $old);
                if (Storage::disk('public')->exists($diskPath)) {
                    Storage::disk('public')->delete($diskPath);
                }
            }
        }
        if ($request->hasFile('pdf_file')) {
            $old = $news->pdf_file;
            $path = $request->file('pdf_file')->store('news', 'public');
            $validated['pdf_file'] = 'storage/'.$path;
            if ($old && str_starts_with($old, 'storage/')) {
                $diskPath = str_replace('storage/', '', $old);
                if (Storage::disk('public')->exists($diskPath)) {
                    Storage::disk('public')->delete($diskPath);
                }
            }
        }

        $original = $news->getOriginal();
        $news->update($validated);
        $changes = $news->getChanges();
        $diff = ['before' => [], 'after' => []];
        foreach ($changes as $key => $value) {
            $diff['before'][$key] = $original[$key] ?? null;
            $diff['after'][$key] = $value;
        }
        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'updated';
        $activity->subject_type = 'news';
        $activity->subject_id = $news->id;
        $activity->description = 'News updated';
        $activity->changes = $diff;
        $activity->save();

        return redirect()->back()->with('success', 'News updated successfully');
    }

    public function newsDestroy(News $news)
    {
        $oldImg = $news->image;
        if ($oldImg && str_starts_with($oldImg, 'storage/')) {
            $diskPath = str_replace('storage/', '', $oldImg);
            if (Storage::disk('public')->exists($diskPath)) {
                Storage::disk('public')->delete($diskPath);
            }
        }
        $oldPdf = $news->pdf_file;
        if ($oldPdf && str_starts_with($oldPdf, 'storage/')) {
            $diskPath = str_replace('storage/', '', $oldPdf);
            if (Storage::disk('public')->exists($diskPath)) {
                Storage::disk('public')->delete($diskPath);
            }
        }
        $news->delete();

        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'deleted';
        $activity->subject_type = 'news';
        $activity->subject_id = $news->id;
        $activity->description = 'News deleted';
        $activity->changes = $news;
        $activity->save();

        return redirect()->back()->with('success', 'News deleted successfully');
    }

    // Slides page & CRUD
    public function slides()
    {
        $slides = Slider::orderByDesc('created_at')->limit(10)->get();
        $total = \DB::table('sliders')->count();
        $approved = \DB::table('sliders')->where('approval', 1)->count();
        $counts = [
            'total' => $total,
            'approved' => $approved,
            'pending' => $total - $approved,
        ];
        $activities = ActivityLog::with('user')
            ->where('subject_type', 'slider')
            ->orderByDesc('created_at')
            ->take(10)
            ->get();

        return Inertia::render('Admin/AdminSlides/AdminSlides', [
            'slides' => $slides,
            'activities' => $activities,
            'counts' => $counts,
        ]);
    }

    public function slidesList(Request $request)
    {
        $query = Slider::orderByDesc('created_at');
        $perPageRaw = $request->query('per_page', 10);
        if ($perPageRaw === 'all') {
            $items = $query->get();

            return response()->json([
                'data' => $items,
                'meta' => [
                    'total' => $items->count(),
                    'per_page' => 'all',
                ],
            ]);
        }
        $perPage = (int) $perPageRaw;
        if ($perPage <= 0) {
            $perPage = 10;
        }
        if ($perPage > 1000) {
            $perPage = 1000;
        }
        $paginator = $query->paginate($perPage);

        return response()->json($paginator);
    }

    public function slideShow(Slider $slider)
    {
        return response()->json($slider);
    }

    public function slideStore(Request $request)
    {
        $validated = $request->validate([
            'title_en' => ['required', 'string', 'max:255'],
            'title_am' => ['nullable', 'string', 'max:255'],
            'priority' => ['nullable', 'integer'],
            'image' => ['nullable', 'image', 'max:5120'],
            'approval' => ['boolean'],
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('sliders', 'public');
            $validated['image'] = 'storage/'.$path;
        }
        $validated['created_by'] = auth()->id();

        $slider = Slider::create($validated);

        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'created';
        $activity->subject_type = 'slider';
        $activity->subject_id = $slider->id;
        $activity->description = 'Slide created';
        $activity->changes = $validated;
        $activity->save();

        return redirect()->back()->with('success', 'Slide created successfully');
    }

    public function slideUpdate(Request $request, Slider $slider)
    {
        $validated = $request->validate([
            'title_en' => ['sometimes', 'required', 'string', 'max:255'],
            'title_am' => ['nullable', 'string', 'max:255'],
            'priority' => ['nullable', 'integer'],
            'image' => ['nullable', 'image', 'max:5120'],
            'approval' => ['boolean'],
        ]);

        if ($request->hasFile('image')) {
            $old = $slider->image;
            $path = $request->file('image')->store('sliders', 'public');
            $validated['image'] = 'storage/'.$path;
            if ($old && str_starts_with($old, 'storage/')) {
                $diskPath = str_replace('storage/', '', $old);
                if (Storage::disk('public')->exists($diskPath)) {
                    Storage::disk('public')->delete($diskPath);
                }
            }
        }

        $original = $slider->getOriginal();
        $slider->update($validated);
        $changes = $slider->getChanges();
        $diff = ['before' => [], 'after' => []];
        foreach ($changes as $key => $value) {
            $diff['before'][$key] = $original[$key] ?? null;
            $diff['after'][$key] = $value;
        }

        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'updated';
        $activity->subject_type = 'slider';
        $activity->subject_id = $slider->id;
        $activity->description = 'Slide updated';
        $activity->changes = $diff;
        $activity->save();

        return redirect()->back()->with('success', 'Slide updated successfully');
    }

    public function slideDestroy(Slider $slider)
    {
        $old = $slider->image;
        if ($old && str_starts_with($old, 'storage/')) {
            $diskPath = str_replace('storage/', '', $old);
            if (Storage::disk('public')->exists($diskPath)) {
                Storage::disk('public')->delete($diskPath);
            }
        }
        $slider->delete();

        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'deleted';
        $activity->subject_type = 'slider';
        $activity->subject_id = $slider->id;
        $activity->description = 'Slide deleted';
        $activity->changes = $slider;
        $activity->save();

        return redirect()->back()->with('success', 'Slide deleted successfully');
    }

    // Events page & CRUD
    public function events()
    {
        $events = Event::orderByDesc('created_at')->limit(10)->get();
        $total = \DB::table('events')->count();
        $approved = \DB::table('events')->where('approval', 1)->count();
        $counts = [
            'total' => $total,
            'approved' => $approved,
            'pending' => $total - $approved,
        ];
        $activities = ActivityLog::with('user')
            ->where('subject_type', 'event')
            ->orderByDesc('created_at')
            ->take(10)
            ->get();

        return Inertia::render('Admin/AdminEvent/AdminEvent', [
            'events' => $events,
            'activities' => $activities,
            'counts' => $counts,
        ]);
    }

    public function eventsList(Request $request)
    {
        $query = Event::orderByDesc('created_at');
        $perPageRaw = $request->query('per_page', 10);
        if ($perPageRaw === 'all') {
            $items = $query->get();

            return response()->json([
                'data' => $items,
                'meta' => [
                    'total' => $items->count(),
                    'per_page' => 'all',
                ],
            ]);
        }
        $perPage = (int) $perPageRaw;
        if ($perPage <= 0) {
            $perPage = 10;
        }
        if ($perPage > 1000) {
            $perPage = 1000;
        }
        $paginator = $query->paginate($perPage);

        return response()->json($paginator);
    }

    public function eventShow(Event $event)
    {
        return response()->json($event);
    }

    public function eventStore(Request $request)
    {
        $validated = $request->validate([
            'title_en' => ['required', 'string', 'max:255'],
            'title_am' => ['nullable', 'string', 'max:255'],
            'sub_title_en' => ['nullable', 'string', 'max:255'],
            'sub_title_am' => ['nullable', 'string', 'max:255'],
            'description_en' => ['nullable', 'string'],
            'description_am' => ['nullable', 'string'],
            'event_date' => ['nullable', 'date'],
            'image' => ['nullable', 'image', 'max:5120'],
            'approval' => ['boolean'],
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('events', 'public');
            $validated['image'] = 'storage/'.$path;
        }
        $validated['created_by'] = auth()->id();

        $event = Event::create($validated);

        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'created';
        $activity->subject_type = 'event';
        $activity->subject_id = $event->id;
        $activity->description = 'Event created';
        $activity->changes = $validated;
        $activity->save();

        return redirect()->back()->with('success', 'Event created successfully');
    }

    public function eventUpdate(Request $request, Event $event)
    {
        $validated = $request->validate([
            'title_en' => ['sometimes', 'required', 'string', 'max:255'],
            'title_am' => ['nullable', 'string', 'max:255'],
            'sub_title_en' => ['nullable', 'string', 'max:255'],
            'sub_title_am' => ['nullable', 'string', 'max:255'],
            'description_en' => ['nullable', 'string'],
            'description_am' => ['nullable', 'string'],
            'event_date' => ['nullable', 'date'],
            'image' => ['nullable', 'image', 'max:5120'],
            'approval' => ['boolean'],
        ]);

        if ($request->hasFile('image')) {
            $old = $event->image;
            $path = $request->file('image')->store('events', 'public');
            $validated['image'] = 'storage/'.$path;
            if ($old && str_starts_with($old, 'storage/')) {
                $diskPath = str_replace('storage/', '', $old);
                if (Storage::disk('public')->exists($diskPath)) {
                    Storage::disk('public')->delete($diskPath);
                }
            }
        }

        $original = $event->getOriginal();
        $event->update($validated);
        $changes = $event->getChanges();
        $diff = ['before' => [], 'after' => []];
        foreach ($changes as $key => $value) {
            $diff['before'][$key] = $original[$key] ?? null;
            $diff['after'][$key] = $value;
        }
        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'updated';
        $activity->subject_type = 'event';
        $activity->subject_id = $event->id;
        $activity->description = 'Event updated';
        $activity->changes = $diff;
        $activity->save();

        return redirect()->back()->with('success', 'Event updated successfully');
    }

    public function eventDestroy(Event $event)
    {
        $oldImg = $event->image;
        if ($oldImg && str_starts_with($oldImg, 'storage/')) {
            $diskPath = str_replace('storage/', '', $oldImg);
            if (Storage::disk('public')->exists($diskPath)) {
                Storage::disk('public')->delete($diskPath);
            }
        }
        $event->delete();

        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'deleted';
        $activity->subject_type = 'event';
        $activity->subject_id = $event->id;
        $activity->description = 'Event deleted';
        $activity->changes = $event;
        $activity->save();

        return redirect()->back()->with('success', 'Event deleted successfully');
    }

    public function tenantShow(Tenant $tenant)
    {
        $tenant->load('category');

        return response()->json($tenant);
    }

    public function tenantStore(Request $request)
    {
        $validated = $request->validate([
            'category_id' => ['required', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'logo' => ['nullable', 'image', 'max:5120'], // max 5MB
            'location' => ['required', 'string', 'max:255'],
            'hours' => ['required', 'string', 'max:255'],
            'fullDescription' => ['nullable', 'string'],
            'floor_id' => ['required', 'exists:floors,id'],
            'building' => ['required', 'string', 'max:255'],
            'room_no' => ['required', 'string', 'max:50'],
            'phone' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'website' => ['nullable', 'string', 'max:255'],
        ]);

        if ($request->hasFile('logo') && ! $request->file('logo')->isValid()) {
            $file = $request->file('logo');
            Log::error('Logo upload invalid on store', [
                'error_code' => $file->getError(),
                'size' => $file->getSize(),
                'client_mime' => $file->getClientMimeType(),
                'upload_max_filesize' => ini_get('upload_max_filesize'),
                'post_max_size' => ini_get('post_max_size'),
            ]);

            return back()->withErrors(['logo' => 'Logo upload failed (code '.$file->getError().'). Check file size limits.'])->withInput();
        }

        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('tenants', 'public');
            $validated['logo'] = 'storage/'.$path;
        }

        $tenant = Tenant::create($validated);
        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'created';
        $activity->subject_type = 'tenant';
        $activity->subject_id = $tenant->id;
        $activity->description = 'Tenant created';
        $activity->changes = $validated;
        $activity->save();

        return redirect()->back()->with('success', 'Tenant created successfully');
    }

    public function tenantUpdate(Request $request, Tenant $tenant)
    {
        Log::info('Tenant update request'.var_export($request->all(), true));
        $validated = $request->validate([
            'category_id' => ['required', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'logo' => ['nullable', 'image', 'max:5120'], // max 5MB
            'location' => ['required', 'string', 'max:255'],
            'hours' => ['required', 'string', 'max:255'],
            'fullDescription' => ['nullable', 'string'],
            'floor_id' => ['required', 'exists:floors,id'],
            'building' => ['required', 'string', 'max:255'],
            'room_no' => ['required', 'string', 'max:50'],
            'phone' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'website' => ['nullable', 'string', 'max:255'],
        ]);

        Log::info('Tenant update validated '.var_export($validated, true));
        if ($request->hasFile('logo') && ! $request->file('logo')->isValid()) {
            $file = $request->file('logo');
            Log::error('Logo upload invalid on update', [
                'error_code' => $file->getError(),
                'size' => $file->getSize(),
                'client_mime' => $file->getClientMimeType(),
                'upload_max_filesize' => ini_get('upload_max_filesize'),
                'post_max_size' => ini_get('post_max_size'),
            ]);

            return back()->withErrors(['logo' => 'Logo upload failed (code '.$file->getError().'). Check file size limits.'])->withInput();
        }

        if ($request->hasFile('logo')) {
            $old = $tenant->logo;
            $path = $request->file('logo')->store('tenants', 'public');
            $validated['logo'] = 'storage/'.$path;
            if ($old && str_starts_with($old, 'storage/')) {
                $diskPath = str_replace('storage/', '', $old);
                if (Storage::disk('public')->exists($diskPath)) {
                    Storage::disk('public')->delete($diskPath);
                }
            }
        }

        $original = $tenant->getOriginal();
        $tenant->update($validated);
        $changes = $tenant->getChanges();
        $diff = ['before' => [], 'after' => []];
        foreach ($changes as $key => $value) {
            $diff['before'][$key] = $original[$key] ?? null;
            $diff['after'][$key] = $value;
        }
        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'updated';
        $activity->subject_type = 'tenant';
        $activity->subject_id = $tenant->id;
        $activity->description = 'Tenant updated';
        $activity->changes = $diff;
        $activity->save();

        return redirect()->back()->with('success', 'Tenant updated successfully');
    }

    public function tenantDestroy(Tenant $tenant)
    {
        $old = $tenant->logo;
        if ($old && str_starts_with($old, 'storage/')) {
            $diskPath = str_replace('storage/', '', $old);
            if (Storage::disk('public')->exists($diskPath)) {
                Storage::disk('public')->delete($diskPath);
            }
        }
        $tenant->delete();
        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'deleted';
        $activity->subject_type = 'tenant';
        $activity->subject_id = $tenant->id;
        $activity->description = 'Tenant deleted';
        $activity->changes = $tenant;
        $activity->save();

        return redirect()->back()->with('success', 'Tenant deleted successfully');
    }

    // FreeSpaces JSON CRUD
    public function freeSpacesList()
    {
        return response()->json(FreeSpace::with('floor')->latest()->get());
    }

    public function freeSpaceShow(FreeSpace $freeSpace)
    {
        return response()->json($freeSpace->load('floor'));
    }

    public function freeSpaceStore(Request $request)
    {
        // Convert string booleans to actual booleans
        $request->merge([
            'has_window' => filter_var($request->has_window, FILTER_VALIDATE_BOOLEAN),
            'has_ventilation' => filter_var($request->has_ventilation, FILTER_VALIDATE_BOOLEAN),
            'has_plumbing' => filter_var($request->has_plumbing, FILTER_VALIDATE_BOOLEAN),
            'has_electricity' => filter_var($request->has_electricity, FILTER_VALIDATE_BOOLEAN),
            'negotiable' => filter_var($request->negotiable, FILTER_VALIDATE_BOOLEAN),
        ]);

        // First validate the slug separately to show a user-friendly error
        $slug = Str::slug($request->slug);
        if (FreeSpace::where('slug', $slug)->exists()) {
            return redirect()->back()
                ->withInput()
                ->with('error', 'This URL slug is already in use. Please choose a different one.');
        }
        $request->merge(['slug' => $slug]);

        Log::info('Free space store request '.var_export($request->all(), true));
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'floor_id' => ['nullable', 'exists:floors,id'],
            'wing_or_zone' => ['nullable', 'string', 'max:255'],
            'area_sqm' => ['nullable', 'numeric'],
            'dimensions' => ['nullable', 'string', 'max:255'],
            'has_window' => ['boolean'],
            'has_ventilation' => ['boolean'],
            'has_plumbing' => ['boolean'],
            'has_electricity' => ['boolean'],
            'features' => ['nullable', 'string'],
            'monthly_rent' => ['nullable', 'numeric'],
            'rent_currency' => ['nullable', 'string', 'max:10'],
            'rent_includes' => ['nullable', 'string'],
            'negotiable' => ['boolean'],
            'thumbnail' => ['nullable', 'image'],
            'gallery' => ['nullable', 'array'],
            'virtual_tour_url' => ['nullable', 'string', 'max:255'],
            'short_description' => ['nullable', 'string'],
            'full_description' => ['nullable', 'string'],
            'contact_person' => ['nullable', 'string', 'max:255'],
            'contact_phone' => ['nullable', 'string', 'max:50'],
            'contact_email' => ['nullable', 'email', 'max:255'],
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:free_spaces,slug'],
            'availability_status' => ['required', 'in:available,reserved,occupied'],
        ]);

        // Log::info('Free space store validated', var_export($validated, true));

        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('free_spaces', 'public');
            $validated['thumbnail'] = 'storage/'.$path;
        }
        if ($request->has('gallery') && is_array($request->gallery)) {
            $validated['gallery'] = $request->gallery;
        }

        $space = FreeSpace::create($validated);
        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'created';
        $activity->subject_type = 'free_space';
        $activity->subject_id = $space->id;
        $activity->description = 'Free space created';
        $activity->changes = $validated;
        $activity->save();

        return redirect()->back()->with('success', 'Free space created successfully');
    }

    public function freeSpaceUpdate(Request $request, FreeSpace $freeSpace)
    {
        $validated = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'floor_id' => ['nullable', 'exists:floors,id'],
            'wing_or_zone' => ['nullable', 'string', 'max:255'],
            'area_sqm' => ['nullable', 'numeric'],
            'dimensions' => ['nullable', 'string', 'max:255'],
            'has_window' => ['boolean'],
            'has_ventilation' => ['boolean'],
            'has_plumbing' => ['boolean'],
            'has_electricity' => ['boolean'],
            'features' => ['nullable', 'string'],
            'monthly_rent' => ['nullable', 'numeric'],
            'rent_currency' => ['nullable', 'string', 'max:10'],
            'rent_includes' => ['nullable', 'string'],
            'negotiable' => ['boolean'],
            'thumbnail' => ['nullable', 'image'],
            'gallery' => ['nullable', 'array'],
            'virtual_tour_url' => ['nullable', 'string', 'max:255'],
            'short_description' => ['nullable', 'string'],
            'full_description' => ['nullable', 'string'],
            'contact_person' => ['nullable', 'string', 'max:255'],
            'contact_phone' => ['nullable', 'string', 'max:50'],
            'contact_email' => ['nullable', 'email', 'max:255'],
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string', 'max:255'],
            'slug' => ['sometimes', 'required', 'string', 'max:255', 'unique:free_spaces,slug,'.$freeSpace->id],
            'availability_status' => ['nullable', 'in:available,reserved,occupied'],
        ]);

        if ($request->hasFile('thumbnail')) {
            $old = $freeSpace->thumbnail;
            $path = $request->file('thumbnail')->store('free_spaces', 'public');
            $validated['thumbnail'] = 'storage/'.$path;
            if ($old && str_starts_with($old, 'storage/')) {
                $diskPath = str_replace('storage/', '', $old);
                if (Storage::disk('public')->exists($diskPath)) {
                    Storage::disk('public')->delete($diskPath);
                }
            }
        }
        if ($request->has('gallery') && is_array($request->gallery)) {
            $validated['gallery'] = $request->gallery;
        }

        $original = $freeSpace->getOriginal();
        $freeSpace->update($validated);
        $changes = $freeSpace->getChanges();
        $diff = ['before' => [], 'after' => []];
        foreach ($changes as $key => $value) {
            $diff['before'][$key] = $original[$key] ?? null;
            $diff['after'][$key] = $value;
        }
        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'updated';
        $activity->subject_type = 'free_space';
        $activity->subject_id = $freeSpace->id;
        $activity->description = 'Free space updated';
        $activity->changes = $diff;
        $activity->save();

        return redirect()->back()->with('success', 'Free space updated successfully');
    }

    public function freeSpaceDestroy(FreeSpace $freeSpace)
    {
        $old = $freeSpace->thumbnail;
        if ($old && str_starts_with($old, 'storage/')) {
            $diskPath = str_replace('storage/', '', $old);
            if (Storage::disk('public')->exists($diskPath)) {
                Storage::disk('public')->delete($diskPath);
            }
        }
        $freeSpace->delete();
        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'deleted';
        $activity->subject_type = 'free_space';
        $activity->subject_id = $freeSpace->id;
        $activity->description = 'Free space deleted';
        $activity->changes = $freeSpace;
        $activity->save();

        return redirect()->back()->with('success', 'Free space deleted successfully');
    }

    // Vacancies JSON CRUD
    public function vacanciesList()
    {
        $query = Vacancy::orderByDesc('created_at');
        $perPageRaw = request()->query('per_page', 10);
        if ($perPageRaw === 'all') {
            $items = $query->get();

            return response()->json([
                'data' => $items,
                'meta' => [
                    'total' => $items->count(),
                    'per_page' => 'all',
                ],
            ]);
        }
        $perPage = (int) $perPageRaw;
        if ($perPage <= 0) {
            $perPage = 10;
        }
        if ($perPage > 1000) {
            $perPage = 1000;
        }
        $paginator = $query->paginate($perPage);

        return response()->json($paginator);
    }

    public function vacancyShow(Vacancy $vacancy)
    {
        return response()->json($vacancy);
    }

    public function vacancyStore(Request $request)
    {
        Log::info($request->all());
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:150'],
            'department' => ['nullable', 'string', 'max:100'],
            'employment_type' => ['required', 'string', 'max:30'],
            'work_location' => ['required', 'string', 'max:100'],
            'salary_min' => ['nullable', 'numeric'],
            'salary_max' => ['nullable', 'numeric'],
            'currency' => ['nullable', 'string', 'max:10'],
            'job_description' => ['required', 'string'],
            'requirements' => ['nullable', 'string'],
            'benefits' => ['nullable', 'string'],
            'how_to_apply' => ['required', 'string'],
            'posted_date' => ['required', 'date'],
            'closing_date' => ['required', 'date', 'after_or_equal:posted_date'],
            'number_of_positions' => ['nullable', 'integer', 'min:1'],
            'contact_email' => ['nullable', 'email', 'max:255'],
            'contact_phone' => ['nullable', 'string', 'max:20'],
            'address' => ['nullable', 'string'],
            'is_approved' => ['boolean'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:vacancies,slug'],
            'thumbnail' => ['nullable', 'image'],
        ]);

        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('vacancies', 'public');
            $validated['thumbnail'] = 'storage/'.$path;
        }

        if (empty($validated['slug'] ?? null)) {
            $base = Str::slug($request->input('title', ''));
            if ($base === '') {
                $base = Str::random(6);
            }
            $slug = $base;
            $i = 2;
            while (Vacancy::where('slug', $slug)->exists()) {
                $slug = $base.'-'.$i;
                $i++;
            }
            $validated['slug'] = $slug;
        }

        Log::info($validated);
        $vacancy = Vacancy::create($validated);
        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'created';
        $activity->subject_type = 'vacancy';
        $activity->subject_id = $vacancy->id;
        $activity->description = 'Vacancy created';
        $activity->changes = $validated;
        $activity->save();

        Log::info($vacancy);

        return redirect()->back()->with('success', 'Vacancy created successfully');
    }

    public function vacancyUpdate(Request $request, Vacancy $vacancy)
    {
        $validated = $request->validate([
            'title' => ['sometimes', 'required', 'string', 'max:150'],
            'department' => ['nullable', 'string', 'max:100'],
            'employment_type' => ['sometimes', 'required', 'string', 'max:30'],
            'work_location' => ['sometimes', 'required', 'string', 'max:100'],
            'salary_min' => ['nullable', 'numeric'],
            'salary_max' => ['nullable', 'numeric'],
            'currency' => ['nullable', 'string', 'max:10'],
            'job_description' => ['sometimes', 'required', 'string'],
            'requirements' => ['nullable', 'string'],
            'benefits' => ['nullable', 'string'],
            'how_to_apply' => ['sometimes', 'required', 'string'],
            'posted_date' => ['sometimes', 'required', 'date'],
            'closing_date' => ['sometimes', 'required', 'date', 'after_or_equal:posted_date'],
            'number_of_positions' => ['nullable', 'integer', 'min:1'],
            'contact_email' => ['nullable', 'email', 'max:255'],
            'contact_phone' => ['nullable', 'string', 'max:20'],
            'address' => ['nullable', 'string'],
            'is_approved' => ['boolean'],
            'slug' => ['sometimes', 'required', 'string', 'max:255', 'unique:vacancies,slug,'.$vacancy->id],
            'thumbnail' => ['nullable', 'image'],
        ]);

        if ($request->hasFile('thumbnail')) {
            $old = $vacancy->thumbnail;
            $path = $request->file('thumbnail')->store('vacancies', 'public');
            $validated['thumbnail'] = 'storage/'.$path;
            if ($old && str_starts_with($old, 'storage/')) {
                $diskPath = str_replace('storage/', '', $old);
                if (Storage::disk('public')->exists($diskPath)) {
                    Storage::disk('public')->delete($diskPath);
                }
            }
        }

        $original = $vacancy->getOriginal();
        $vacancy->update($validated);
        $changes = $vacancy->getChanges();
        $diff = ['before' => [], 'after' => []];
        foreach ($changes as $key => $value) {
            $diff['before'][$key] = $original[$key] ?? null;
            $diff['after'][$key] = $value;
        }
        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'updated';
        $activity->subject_type = 'vacancy';
        $activity->subject_id = $vacancy->id;
        $activity->description = 'Vacancy updated';
        $activity->changes = $diff;
        $activity->save();

        return redirect()->back()->with('success', 'Vacancy updated successfully');
    }

    public function vacancyDestroy(Vacancy $vacancy)
    {
        $old = $vacancy->thumbnail;
        if ($old && str_starts_with($old, 'storage/')) {
            $diskPath = str_replace('storage/', '', $old);
            if (Storage::disk('public')->exists($diskPath)) {
                Storage::disk('public')->delete($diskPath);
            }
        }
        $vacancy->delete();
        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'deleted';
        $activity->subject_type = 'vacancy';
        $activity->subject_id = $vacancy->id;
        $activity->description = 'Vacancy deleted';
        $activity->changes = $vacancy;
        $activity->save();

        return redirect()->back()->with('success', 'Vacancy deleted successfully');
    }

    // Services JSON CRUD
    public function servicesList()
    {
        $query = Service::orderByDesc('created_at');
        $perPageRaw = request()->query('per_page', 10);
        if ($perPageRaw === 'all') {
            $items = $query->get();

            return response()->json([
                'data' => $items,
                'meta' => [
                    'total' => $items->count(),
                    'per_page' => 'all',
                ],
            ]);
        }
        $perPage = (int) $perPageRaw;
        if ($perPage <= 0) {
            $perPage = 10;
        }
        if ($perPage > 1000) {
            $perPage = 1000;
        }
        $paginator = $query->paginate($perPage);

        return response()->json($paginator);
    }

    public function serviceShow(Service $service)
    {
        return response()->json($service);
    }

    public function serviceStore(Request $request)
    {
        $validated = $request->validate([
            'title_en' => ['required', 'string', 'max:255'],
            'title_am' => ['required', 'string', 'max:255'],
            'sub_title_en' => ['nullable', 'string', 'max:255'],
            'sub_title_am' => ['nullable', 'string', 'max:255'],
            'description_en' => ['required', 'string'],
            'description_am' => ['required', 'string'],
            'image' => ['nullable', 'image'],
            'approval' => ['boolean'],
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('service', 'public');
            $validated['image'] = 'storage/'.$path;
        }
        $validated['created_by'] = auth()->id();

        $service = Service::create($validated);
        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'created';
        $activity->subject_type = 'service';
        $activity->subject_id = $service->id;
        $activity->description = 'Service created';
        $activity->changes = $validated;
        $activity->save();

        return redirect()->back()->with('success', 'Service created successfully');
    }

    public function serviceUpdate(Request $request, Service $service)
    {
        $validated = $request->validate([
            'title_en' => ['sometimes', 'required', 'string', 'max:255'],
            'title_am' => ['sometimes', 'required', 'string', 'max:255'],
            'sub_title_en' => ['nullable', 'string', 'max:255'],
            'sub_title_am' => ['nullable', 'string', 'max:255'],
            'description_en' => ['sometimes', 'required', 'string'],
            'description_am' => ['sometimes', 'required', 'string'],
            'image' => ['nullable', 'image'],
            'approval' => ['boolean'],
        ]);

        if ($request->hasFile('image')) {
            $old = $service->image;
            $path = $request->file('image')->store('service', 'public');
            $validated['image'] = 'storage/'.$path;
            if ($old && str_starts_with($old, 'storage/')) {
                $diskPath = str_replace('storage/', '', $old);
                if (Storage::disk('public')->exists($diskPath)) {
                    Storage::disk('public')->delete($diskPath);
                }
            }
        }

        $original = $service->getOriginal();
        $service->update($validated);
        $changes = $service->getChanges();
        $diff = ['before' => [], 'after' => []];
        foreach ($changes as $key => $value) {
            $diff['before'][$key] = $original[$key] ?? null;
            $diff['after'][$key] = $value;
        }
        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'updated';
        $activity->subject_type = 'service';
        $activity->subject_id = $service->id;
        $activity->description = 'Service updated';
        $activity->changes = $diff;
        $activity->save();

        return redirect()->back()->with('success', 'Service updated successfully');
    }

    public function serviceDestroy(Service $service)
    {
        $old = $service->image;
        if ($old && str_starts_with($old, 'storage/')) {
            $diskPath = str_replace('storage/', '', $old);
            if (Storage::disk('public')->exists($diskPath)) {
                Storage::disk('public')->delete($diskPath);
            }
        }
        $service->delete();
        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'deleted';
        $activity->subject_type = 'service';
        $activity->subject_id = $service->id;
        $activity->description = 'Service deleted';
        $activity->changes = $service;
        $activity->save();

        return redirect()->back()->with('success', 'Service deleted successfully');
    }

    public function activity(Request $request)
    {
        $query = ActivityLog::with('user')
            ->orderBy('created_at', 'desc');

        // Apply filters if provided
        if ($request->has('action') && $request->action) {
            $query->where('action', $request->action);
        }

        if ($request->has('subject_type') && $request->subject_type) {
            $query->where('subject_type', $request->subject_type);
        }

        if ($request->has('user_id') && $request->user_id) {
            $query->where('user_id', $request->user_id);
        }

        if ($request->has('start_date') && $request->start_date) {
            $query->whereDate('created_at', '>=', $request->start_date);
        }

        if ($request->has('end_date') && $request->end_date) {
            $query->whereDate('created_at', '<=', $request->end_date);
        }

        // Handle per_page parameter
        $perPage = $request->per_page && is_numeric($request->per_page)
            ? (int) $request->per_page
            : 15;

        $perPage = max(1, min(100, $perPage)); // Ensure per_page is between 1 and 100

        // Return paginated results
        return $query->paginate($perPage);
    }

    /**
     * Display the Activity Log page.
     *
     * @return \Inertia\Response
     */
    public function activityPage()
    {
        return Inertia::render('Admin/ActivityLog/ActivityLog');
    }

    public function tenantList(Request $request)
    {
        $query = Tenant::with(['category', 'floor'])
            ->orderBy('created_at', 'desc');

        // Apply search filter if search term exists
        if ($request->has('search') && ! empty($request->search)) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('location', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('room_no', 'like', "%{$search}%")
                    ->orWhereHas('category', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%");
                    });
            });
        }

        // FIX: Define $categoryId from the request
        $categoryId = $request->query('category_id');
        if ($categoryId && ! empty($categoryId)) {
            $query->where('category_id', $categoryId);
        }

        $perPageRaw = $request->query('per_page', 10);
        if ($perPageRaw === 'all') {
            $items = $query->get();

            return response()->json([
                'data' => $items,
                'meta' => [
                    'total' => $items->count(),
                    'per_page' => 'all',
                ],
            ]);
        }

        $perPage = (int) $perPageRaw;
        if ($perPage <= 0) {
            $perPage = 10;
        }
        if ($perPage > 1000) {
            $perPage = 1000;
        }
        $paginator = $query->paginate($perPage);

        return response()->json($paginator);
    }

    // Users page & JSON CRUD
    public function users()
    {
        $users = User::orderByDesc('created_at')->get();
        $total = DB::table('users')->count();
        $admins = DB::table('users')->where('role', 'admin')->count();
        $verified = DB::table('users')->whereNotNull('email_verified_at')->count();
        $counts = [
            'total' => $total,
            'admins' => $admins,
            'verified' => $verified,
        ];
        $activities = ActivityLog::with('user')
            ->where('subject_type', 'user')
            ->orderByDesc('created_at')
            ->take(10)
            ->get();

        return Inertia::render('Admin/Users/User', [
            'users' => $users,
            'activities' => $activities,
            'counts' => $counts,
        ]);
    }

    public function usersList(Request $request)
    {
        $query = User::orderByDesc('created_at');
        $perPageRaw = $request->query('per_page', 10);
        if ($perPageRaw === 'all') {
            $items = $query->get();

            return response()->json([
                'data' => $items,
                'meta' => [
                    'total' => $items->count(),
                    'per_page' => 'all',
                ],
            ]);
        }
        $perPage = (int) $perPageRaw;
        if ($perPage <= 0) {
            $perPage = 10;
        }
        if ($perPage > 1000) {
            $perPage = 1000;
        }
        $paginator = $query->paginate($perPage);

        return response()->json($paginator);
    }

    public function userShow(User $user)
    {
        return response()->json($user);
    }

    public function userStore(Request $request)
    {
        $currentUser = auth()->user();

        if ($currentUser->role !== 'admin') {
            return redirect()->back()->with('error', 'You are not authorized to create users.');
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'phone' => ['nullable', 'string', 'max:30'],
            'role' => ['nullable', 'string', 'max:50'],
            'check' => ['boolean'],
            'password' => ['required', 'string', 'min:6'],
            'avatar' => ['nullable', 'image', 'max:5120'],
        ]);

        if ($request->hasFile('avatar')) {
            $path = $request->file('avatar')->store('user', 'public');
            $validated['avatar'] = 'storage/'.$path;
        }
        $validated['password'] = Hash::make($validated['password']);

        $user = User::create($validated);

        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'created';
        $activity->subject_type = 'user';
        $activity->subject_id = $user->id;
        $activity->description = 'User created';
        $activity->changes = $validated;
        $activity->save();

        return redirect()->back()->with('success', 'User created successfully');
    }

    public function userUpdate(Request $request, User $user)
    {
        $currentUser = auth()->user();

        if ($currentUser->role !== 'admin') {
            return redirect()->back()->with('error', 'You are not authorized to create users.');
        }
        $validated = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'email' => ['sometimes', 'required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
            'phone' => ['nullable', 'string', 'max:30'],
            'role' => ['nullable', 'string', 'max:50'],
            'check' => ['boolean'],
            'password' => ['nullable', 'string', 'min:6'],
            'avatar' => ['nullable', 'image', 'max:5120'],
        ]);

        if ($request->hasFile('avatar')) {
            $old = $user->avatar;
            $path = $request->file('avatar')->store('user', 'public');
            $validated['avatar'] = 'storage/'.$path;
            if ($old && str_starts_with($old, 'storage/')) {
                $diskPath = str_replace('storage/', '', $old);
                if (Storage::disk('public')->exists($diskPath)) {
                    Storage::disk('public')->delete($diskPath);
                }
            }
        }

        if (! empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $original = $user->getOriginal();
        $user->update($validated);
        $changes = $user->getChanges();
        $diff = ['before' => [], 'after' => []];
        foreach ($changes as $key => $value) {
            $diff['before'][$key] = $original[$key] ?? null;
            $diff['after'][$key] = $value;
        }
        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'updated';
        $activity->subject_type = 'user';
        $activity->subject_id = $user->id;
        $activity->description = 'User updated';
        $activity->changes = $diff;
        $activity->save();

        return redirect()->back()->with('success', 'User updated successfully');
    }

    public function userDestroy(User $user)
    {
        $currentUser = auth()->user();

        if ($currentUser->role !== 'admin') {
            return redirect()->back()->with('error', 'You are not authorized to create users.');
        }
        $old = $user->avatar;
        if ($old && str_starts_with($old, 'storage/')) {
            $diskPath = str_replace('storage/', '', $old);
            if (Storage::disk('public')->exists($diskPath)) {
                Storage::disk('public')->delete($diskPath);
            }
        }
        $user->delete();

        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'deleted';
        $activity->subject_type = 'user';
        $activity->subject_id = $user->id;
        $activity->description = 'User deleted';
        $activity->changes = $user;
        $activity->save();

        return redirect()->back()->with('success', 'User deleted successfully');
    }

    // Malls page & CRUD
    public function malls()
    {
        $malls = Mall::orderByDesc('created_at')->limit(10)->get();
        $total = Mall::count();
        $withEmail = Mall::whereNotNull('contact_email')->where('contact_email', '!=', '')->count();
        $withPhone = Mall::whereNotNull('contact_phone')->where('contact_phone', '!=', '')->count();
        $counts = [
            'total' => $total,
            'with_email' => $withEmail,
            'with_phone' => $withPhone,
        ];

        $activities = ActivityLog::with('user')
            ->where('subject_type', 'mall')
            ->orderByDesc('created_at')
            ->take(10)
            ->get();

        return Inertia::render('Admin/AdminMall/AdminMall', [
            'malls' => $malls,
            'activities' => $activities,
            'counts' => $counts,
        ]);
    }

    public function mallsList(\Illuminate\Http\Request $request)
    {
        $query = Mall::orderByDesc('created_at');
        $perPageRaw = $request->query('per_page', 10);
        if ($perPageRaw === 'all') {
            $items = $query->get();

            return response()->json([
                'data' => $items,
                'meta' => [
                    'total' => $items->count(),
                    'per_page' => 'all',
                ],
            ]);
        }

        $perPage = (int) $perPageRaw;
        if ($perPage <= 0) {
            $perPage = 10;
        }
        if ($perPage > 1000) {
            $perPage = 1000;
        }
        $paginator = $query->paginate($perPage);

        return response()->json($paginator);
    }

    public function mallUpdate(\Illuminate\Http\Request $request, \App\Models\Mall $mall)
    {
        $validated = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', Rule::unique('malls', 'slug')->ignore($mall->id)],
            'year_built' => ['nullable', 'integer'],
            'floors_directory' => ['nullable'],
            'total_area_sqm' => ['nullable', 'numeric'],
            'total_shops' => ['nullable', 'integer'],
            'description' => ['nullable', 'string'],
            'facilities' => ['nullable'],
            'gallery' => ['nullable'],
            'virtual_tour_url' => ['nullable', 'string', 'max:255'],
            'address' => ['nullable', 'string', 'max:255'],
            'contact_phone' => ['nullable', 'string', 'max:50'],
            'contact_email' => ['nullable', 'email', 'max:255'],
        ]);

        foreach (['floors_directory', 'facilities', 'gallery'] as $key) {
            if ($request->has($key)) {
                $val = $request->input($key);
                if (is_string($val)) {
                    $decoded = json_decode($val, true);
                    if (json_last_error() === JSON_ERROR_NONE) {
                        $validated[$key] = $decoded;
                    }
                }
            }
        }

        // Handle gallery[] file uploads; merge with existing and any provided
        $galleryPaths = [];
        if ($request->hasFile('gallery')) {
            foreach ((array) $request->file('gallery') as $file) {
                if ($file && $file->isValid()) {
                    $path = $file->store('mall', 'public');
                    $galleryPaths[] = 'storage/'.$path;
                }
            }
        }
        if (! empty($validated['gallery']) && is_array($validated['gallery'])) {
            $galleryPaths = array_merge($galleryPaths, $validated['gallery']);
        }
        // Build existing gallery as array of strings
        $existingGallery = [];
        if (is_array($mall->gallery)) {
            $existingGallery = $mall->gallery;
        } elseif (is_string($mall->gallery) && $mall->gallery !== '') {
            $decoded = json_decode($mall->gallery, true);
            if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
                $existingGallery = $decoded;
            }
        }
        // Sanitize all to strings (support items with 'url')
        $toStrings = function ($arr) {
            $out = [];
            foreach ((array) $arr as $g) {
                if (is_string($g)) {
                    $out[] = $g;
                } elseif (is_array($g) && isset($g['url']) && is_string($g['url'])) {
                    $out[] = $g['url'];
                }
            }

            return $out;
        };
        $existingStr = $toStrings($existingGallery);
        $newStr = $toStrings($galleryPaths);
        if (! empty($existingStr) || ! empty($newStr)) {
            $validated['gallery'] = array_values(array_unique(array_merge($existingStr, $newStr)));
        }

        $original = $mall->getOriginal();
        $mall->update($validated);
        $changes = $mall->getChanges();
        $diff = ['before' => [], 'after' => []];
        foreach ($changes as $key => $value) {
            $diff['before'][$key] = $original[$key] ?? null;
            $diff['after'][$key] = $value;
        }

        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'updated';
        $activity->subject_type = 'mall';
        $activity->subject_id = $mall->id;
        $activity->description = 'Mall updated';
        $activity->changes = $diff;
        $activity->save();

        return redirect()->back()->with('success', 'Mall updated successfully');
    }

    public function mallDestroy(Mall $mall)
    {
        $mall->delete();

        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'deleted';
        $activity->subject_type = 'mall';
        $activity->subject_id = $mall->id;
        $activity->description = 'Mall deleted';
        $activity->changes = $mall;
        $activity->save();

        return redirect()->back()->with('success', 'Mall deleted successfully');
    }

    // About Contents
    public function aboutContents()
    {
        $activities = ActivityLog::with('user')
            ->where('subject_type', 'about_content')
            ->orderByDesc('created_at')
            ->take(10)
            ->get();
        $aboutContents = AboutContent::all();
        $counts = [
            'total' => $aboutContents->count(),
            'components' => $aboutContents->pluck('component')->unique()->count(),
            'positions' => $aboutContents->pluck('position')->unique()->count(),
        ];

        return Inertia::render('Admin/AdminAboutContent/AdminAboutContent', [
            'aboutContents' => $aboutContents,
            'activities' => $activities,
            'counts' => $counts,
        ]);
    }

    public function aboutContentsList(Request $request)
    {
        $query = AboutContent::query();

        // Search
        if ($request->has('search') && ! empty($request->search)) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('component', 'like', "%{$search}%")
                    ->orWhere('subtitle', 'like', "%{$search}%");
            });
        }

        // Filter by component
        if ($request->has('component') && ! empty($request->component)) {
            $query->where('component', $request->component);
        }

        // Pagination
        $perPage = $request->per_page === 'all' ? 1000 : ($request->per_page ?? 10);
        $contents = $query->orderBy('position')->paginate($perPage);

        return response()->json($contents);
    }

    public function aboutContentStore(Request $request)
    {
        $validated = $request->validate([
            'component' => 'required|string|max:255',
            'title' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image_url' => 'nullable|string',
            'position' => 'nullable|integer',
            'extra_data' => 'nullable|array',
        ]);

        $aboutContent = AboutContent::create($validated);

        // Log activity
        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'created';
        $activity->subject_type = 'about_content';
        $activity->subject_id = $aboutContent->id;
        $activity->description = 'About content created';
        $activity->changes = $validated;
        $activity->save();

        return redirect()->back()->with('success', 'About content created successfully');
    }

    public function aboutContentUpdate(Request $request, AboutContent $aboutContent)
    {
        $validated = $request->validate([
            'component' => 'sometimes|required|string|max:255',
            'title' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image_url' => 'nullable|string',
            'position' => 'nullable|integer',
            'extra_data' => 'nullable|array',
        ]);

        $aboutContent->update($validated);

        // Log activity
        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'updated';
        $activity->subject_type = 'about_content';
        $activity->subject_id = $aboutContent->id;
        $activity->description = 'About content updated';
        $activity->changes = $validated;
        $activity->save();

        return redirect()->back()->with('success', 'About content updated successfully');
    }

    public function aboutContentDestroy(AboutContent $aboutContent)
    {
        $aboutContent->delete();

        // Log activity
        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'deleted';
        $activity->subject_type = 'about_content';
        $activity->subject_id = $aboutContent->id;
        $activity->description = 'About content deleted';
        $activity->changes = $aboutContent->toArray();
        $activity->save();

        return redirect()->back()->with('success', 'About content deleted successfully');
    }
}
