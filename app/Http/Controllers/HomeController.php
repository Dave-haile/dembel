<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use App\Models\News;
use App\Models\Service;
use App\Models\Slider;
use App\Models\Testimonial;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $sliders = Slider::approved()->ordered()->get();
        $testimonials = Testimonial::approved()->get();
        $news = News::approved()->orderBy('created_at', 'DESC')->limit(3)->get();
        $services = Service::approved()->orderBy('id', 'DESC')->get();
        $gallery = Gallery::approved()->orderBy('id', 'DESC')->limit(7)->get();

        return Inertia::render('Public/Landing', [
            'sliders' => $sliders,
            'testimonials' => $testimonials,
            'news' => $news,
            'services' => $services,
            'gallery' => $gallery,
        ]);
    }
}
