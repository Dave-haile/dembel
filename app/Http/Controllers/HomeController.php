<?php

namespace App\Http\Controllers;

use App\Models\Catagory;
use App\Models\Event;
use App\Models\Gallery;
use App\Models\News;
use App\Models\Service;
use App\Models\Slider;
use App\Models\Tenant;
use App\Models\Testimonial;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $sliders = Slider::approved()->ordered()->get();
        $testimonials = Testimonial::approved()->get();
        $news = News::approved()->orderBy('created_at', 'DESC')->limit(3)->get();
        $services = Service::approved()->orderBy('id', 'DESC')->limit(3)->get();
        $gallery = Gallery::approved()->orderBy('id', 'DESC')->limit(6)->get();
        $event = Event::approved()->orderBy('created_at', 'DESC')->limit(3)->get();
        $tenants = Tenant::with('category')->orderBy('id', 'ASC')->limit(3)->get();

        return Inertia::render('Public/Landing/Landing', [
            'sliders' => $sliders,
            'testimonials' => $testimonials,
            'news' => $news,
            'services' => $services,
            'gallery' => $gallery,
            'event' => $event,
            'tenants' => $tenants,
        ]);
    }
    public function main()
    {
        $services = Service::approved()->orderBy('id', 'DESC')->get();
        Log::info($services);
        return Inertia::render('Public/Shared/Header', [
            'services' => $services,
        ]);
    }
}
