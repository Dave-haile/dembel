<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::approved()->orderBy('id', 'DESC')->get();

        return Inertia::render('Public/Service/Service', [
            'services' => $services
        ]);
    }

    public function show($id)
    {
        $service = Service::approved()->findOrFail($id);
        $allServices = Service::approved()->select('id', 'title_en')->orderBy('id', 'DESC')->get();

        return Inertia::render('Public/Service/ServiceDetail', [
            'service' => $service,
            'allServices' => $allServices
        ]);
    }

    public function contact(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:100',
            'subject' => 'required|string|max:100',
            'message' => 'required|string|max:5000'
        ]);

        // Here you can add your email sending logic
        // Mail::to('your-email@example.com')->send(new ContactFormMail($request->all()));

        return back()->with('success', 'Message has been sent successfully.');
    }
}
