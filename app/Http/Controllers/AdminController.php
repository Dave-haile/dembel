<?php

namespace App\Http\Controllers;

use App\Models\Tenant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
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
        // Get all table names using Laravel's proper method
        $tables = DB::select("
            SELECT name 
            FROM sqlite_master 
            WHERE type='table' 
            AND name NOT LIKE 'sqlite_%'
            AND name NOT IN ('migrations', 'jobs', 'failed_jobs', 'job_batches', 'cache','cache_locks', 'sessions','password_reset_tokens')
        ");

        $tenants = Tenant::with('category')->orderBy('created_at', 'desc')->take(5)->get();
        // $free_spaces = DB::table('free_spaces')->orderBy('created_at', 'desc')->take(5)->get();
        // $vacancies = DB::table('vacancies')->orderBy('created_at', 'desc')->take(5)->get();
        // $services = DB::table('services')->orderBy('created_at', 'desc')->take(5)->get();
        // $gallery = DB::table('galleries')->orderBy('created_at', 'desc')->take(5)->get();
        // $users = DB::table('users')->orderBy('created_at', 'desc')->take(5)->get();
        // $applications = DB::table('applications')->orderBy('created_at', 'desc')->take(5)->get();
        // $categories = DB::table('categories')->orderBy('created_at', 'desc')->take(5)->get();
        // $contacts = DB::table('contacts')->orderBy('created_at', 'desc')->take(5)->get();
        // $departments = DB::table('departments')->orderBy('created_at', 'desc')->take(5)->get();
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
            'tenants' => $tenants
        ]);
    }
}
