<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class GalleryController extends Controller
{
    public function index()
    {
        $gallery = Gallery::approved()->orderBy('id', 'DESC')->get();
        $instagram = DB::table('instagram_images')->where('approval', true)->orderBy('id', 'DESC')->get();
        Log::info($gallery);

        return inertia('Public/Gallery/Gallery', [
            'gallery' => $gallery,
            'instagram' => $instagram,
        ]);
    }
}
