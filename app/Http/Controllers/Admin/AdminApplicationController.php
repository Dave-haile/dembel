<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminApplicationController extends Controller
{
    public function index()
    {
        $applications = Application::orderByDesc('created_at')->get();
        $total = Application::count();
        
        return Inertia::render('Admin/Applications/Index', [
            'applications' => $applications,
            'total' => $total,
        ]);
    }

    public function list(Request $request)
    {
        $query = Application::orderByDesc('created_at');
        $perPageRaw = $request->query('per_page', 10);
        $perPage = is_numeric($perPageRaw) ? (int)$perPageRaw : 10;
        $perPage = max(1, min(100, $perPage));

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('first_name', 'like', "%$search%")
                  ->orWhere('last_name', 'like', "%$search%")
                  ->orWhere('email', 'like', "%$search%")
                  ->orWhere('phone', 'like', "%$search%");
            });
        }

        $applications = $query->paginate($perPage);
        
        return response()->json($applications);
    }

    public function show(Application $application)
    {
        return response()->json($application);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => ['required', 'string', 'max:100'],
            'last_name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:20'],
            'position' => ['required', 'string', 'max:255'],
            'resume' => ['required', 'file', 'mimes:pdf,doc,docx', 'max:5120'],
            'cover_letter' => ['nullable', 'string'],
            'status' => ['required', 'in:pending,reviewed,contacted,hired,rejected'],
        ]);

        if ($request->hasFile('resume')) {
            $validated['resume_path'] = $request->file('resume')->store('resumes', 'public');
        }

        $application = Application::create($validated);

        return redirect()->back()->with('success', 'Application submitted successfully');
    }

    public function update(Request $request, Application $application)
    {
        $validated = $request->validate([
            'first_name' => ['sometimes', 'required', 'string', 'max:100'],
            'last_name' => ['sometimes', 'required', 'string', 'max:100'],
            'email' => ['sometimes', 'required', 'email', 'max:255'],
            'phone' => ['sometimes', 'required', 'string', 'max:20'],
            'position' => ['sometimes', 'required', 'string', 'max:255'],
            'resume' => ['sometimes', 'file', 'mimes:pdf,doc,docx', 'max:5120'],
            'cover_letter' => ['nullable', 'string'],
            'status' => ['sometimes', 'required', 'in:pending,reviewed,contacted,hired,rejected'],
            'notes' => ['nullable', 'string'],
            '_method' => 'sometimes|in:PUT',
        ]);

        if ($request->hasFile('resume')) {
            // Delete old resume if exists
            if ($application->resume_path) {
                Storage::disk('public')->delete($application->resume_path);
            }
            $validated['resume_path'] = $request->file('resume')->store('resumes', 'public');
        }

        $application->update($validated);

        return redirect()->back()->with('success', 'Application updated successfully');
    }

    public function destroy(Application $application)
    {
        // Delete associated resume file if exists
        if ($application->resume_path) {
            Storage::disk('public')->delete($application->resume_path);
        }

        $application->delete();

        return redirect()->back()->with('success', 'Application deleted successfully');
    }

    public function downloadResume(Application $application)
    {
        if (!$application->resume_path) {
            return redirect()->back()->with('error', 'Resume not found');
        }

        $path = storage_path('app/public/' . $application->resume_path);
        
        if (!file_exists($path)) {
            return redirect()->back()->with('error', 'Resume file not found');
        }

        return response()->download($path);
    }

    public function updateStatus(Request $request, Application $application)
    {
        $validated = $request->validate([
            'status' => ['required', 'in:pending,reviewed,contacted,hired,rejected'],
            'notes' => ['nullable', 'string'],
        ]);

        $application->update($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Application status updated',
            'application' => $application->fresh()
        ]);
    }
}
