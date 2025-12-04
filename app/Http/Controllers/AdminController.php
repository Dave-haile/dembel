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
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
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

        $tableNames = collect($tables)->pluck('name');

        return Inertia::render('Admin/Dashboard/Dashboard', [
            'counts' => $data,
            'tables' => $tableNames,
            'tenants' => $tenants,
            'activities' => $activities,
        ]);
    }



    public function mallStore(Request $request)
    {
        $validator = Validator::make($request->all(), [
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

        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->toArray());
        }

        $validated = $validator->validated();

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
                $slug = $base . '-' . $i;
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
                    $galleryPaths[] = 'storage/' . $path;
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
        $validator = Validator::make($request->all(), [
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
        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->toArray());
        }
        $validated = $validator->validated();

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('applications/photo', 'public');
            $validated['photo'] = 'storage/' . $path;
        }
        if ($request->hasFile('cv')) {
            $path = $request->file('cv')->store('applications/cv', 'public');
            $validated['cv'] = 'storage/' . $path;
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
        $validator = Validator::make($request->all(), [
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

        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->toArray());
        }
        $validated = $validator->validated();

        if ($request->hasFile('photo')) {
            $old = $application->photo;
            $path = $request->file('photo')->store('applications/photo', 'public');
            $validated['photo'] = 'storage/' . $path;
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
            $validated['cv'] = 'storage/' . $path;
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
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'icon' => ['nullable', 'string', 'max:255'],
        ]);

        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->toArray());
        }

        $category = Category::create($validator->validated());

        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'created';
        $activity->subject_type = 'category';
        $activity->subject_id = $category->id;
        $activity->description = 'Category created';
        $activity->changes = $validator->validated();
        $activity->save();

        return redirect()->back()->with('success', 'Category created successfully');
    }

    public function categoryUpdate(Request $request, Category $category)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'icon' => ['nullable', 'string', 'max:255'],
        ]);

        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->toArray());
        }

        $original = $category->getOriginal();
        $category->update($validator->validated());
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

    public function contactStore(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'address' => ['required', 'string', 'max:191'],
            'phone' => ['required', 'string', 'max:191'],
            'fax' => ['nullable', 'string', 'max:191'],
            'email' => ['required', 'email', 'max:191'],
        ]);

        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->toArray());
        }

        $contact = Contact::create($validator->validated());

        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'created';
        $activity->subject_type = 'contact';
        $activity->subject_id = $contact->id;
        $activity->description = 'Contact created';
        $activity->changes = $validator->validated();
        $activity->save();

        return redirect()->back()->with('success', 'Contact created successfully');
    }

    public function contactUpdate(Request $request, Contact $contact)
    {
        $validator = Validator::make($request->all(), [
            'address' => ['sometimes', 'required', 'string', 'max:191'],
            'phone' => ['sometimes', 'required', 'string', 'max:191'],
            'fax' => ['nullable', 'string', 'max:191'],
            'email' => ['sometimes', 'required', 'email', 'max:191'],
        ]);

        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->toArray());
        }

        $original = $contact->getOriginal();
        $contact->update($validator->validated());
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
        $validator = Validator::make($request->all(), [
            'name_en' => ['required', 'string', 'max:191'],
            'name_am' => ['nullable', 'string', 'max:191'],
            'position' => ['nullable', 'string', 'max:191'],
            'email' => ['nullable', 'email', 'max:191'],
            'phone' => ['nullable', 'string', 'max:50'],
            'photo' => ['nullable', 'image', 'max:5120'],
            'approval' => ['boolean'],
        ]);

        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->toArray());
        }
        $validated = $validator->validated();

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('team', 'public');
            $validated['photo'] = 'storage/' . $path;
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
        $validator = Validator::make($request->all(), [
            'name_en' => ['sometimes', 'required', 'string', 'max:191'],
            'name_am' => ['nullable', 'string', 'max:191'],
            'position' => ['nullable', 'string', 'max:191'],
            'email' => ['nullable', 'email', 'max:191'],
            'phone' => ['nullable', 'string', 'max:50'],
            'photo' => ['nullable', 'image', 'max:5120'],
            'approval' => ['boolean'],
        ]);

        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->toArray());
        }
        $validated = $validator->validated();

        if ($request->hasFile('photo')) {
            $old = $team->photo;
            $path = $request->file('photo')->store('team', 'public');
            $validated['photo'] = 'storage/' . $path;
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

    public function slides()
    {
        $slides = Slider::orderByDesc('created_at')->limit(10)->get();
        $total = DB::table('sliders')->count();
        $approved = DB::table('sliders')->where('approval', 1)->count();
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
        $validator = Validator::make($request->all(), [
            'title_en' => ['required', 'string', 'max:255'],
            'title_am' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'priority' => ['nullable', 'integer'],
            'image' => ['nullable', 'image', 'max:5120'],
            'approval' => ['boolean'],
        ]);

        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->toArray());
        }

        $validated = $validator->validated();

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('sliders', 'public');
            $validated['image'] = 'storage/' . $path;
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
        $validator = Validator::make($request->all(), [
            'title_en' => ['sometimes', 'required', 'string', 'max:255'],
            'title_am' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'priority' => ['nullable', 'integer'],
            'image' => ['nullable', 'image', 'max:5120'],
            'approval' => ['boolean'],
        ]);

        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->toArray());
        }

        $validated = $validator->validated();

        if ($request->hasFile('image')) {
            $old = $slider->image;
            $path = $request->file('image')->store('sliders', 'public');
            $validated['image'] = 'storage/' . $path;
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

    public function eventStore(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title_en' => ['required', 'string', 'max:255'],
            'title_am' => ['required', 'string', 'max:255'],
            'sub_title_en' => ['nullable', 'string', 'max:255'],
            'sub_title_am' => ['nullable', 'string', 'max:255'],
            'description_en' => ['required', 'string'],
            'description_am' => ['required', 'string'],
            'event_date' => ['required', 'date'],
            'image' => ['nullable', 'image', 'max:5120'],
            'approval' => ['boolean'],
        ]);

        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->toArray());
        }

        $validated = $validator->validated();

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('events', 'public');
            $validated['image'] = 'storage/' . $path;
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
        $validator = Validator::make($request->all(), [
            'title_en' => ['sometimes', 'required', 'string', 'max:255'],
            'title_am' => ['sometimes', 'required', 'string', 'max:255'],
            'sub_title_en' => ['nullable', 'string', 'max:255'],
            'sub_title_am' => ['nullable', 'string', 'max:255'],
            'description_en' => ['required', 'string'],
            'description_am' => ['required', 'string'],
            'event_date' => ['nullable', 'date'],
            'image' => ['nullable', 'image', 'max:5120'],
            'approval' => ['boolean'],
        ]);

        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->toArray());
        }

        $validated = $validator->validated();

        if ($request->hasFile('image')) {
            $old = $event->image;
            $path = $request->file('image')->store('events', 'public');
            $validated['image'] = 'storage/' . $path;
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

    public function activityPage()
    {
        return Inertia::render('Admin/ActivityLog/ActivityLog');
    }
}
