<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class GalleryController extends Controller
{
    public function index()
    {
        $gallery = Gallery::approved()->orderBy('id', 'DESC')->get();
        Log::info($gallery);
        return inertia('Public/Gallery/Gallery', [
            'gallery' => $gallery
        ]);
    }
}
