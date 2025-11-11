<?php

namespace App\Http\Controllers;

use App\Models\AboutContent;
use App\Models\Testimonial;
use Inertia\Inertia;

class AboutContentController extends Controller
{
    public function index()
    {
        $aboutContent = AboutContent::all();
        $testimonials = Testimonial::all();

        return Inertia::render('Public/About/About', [
            'aboutContent' => $aboutContent,
            'testimonials' => $testimonials,
        ]);
    }
}
