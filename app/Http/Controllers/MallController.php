<?php

namespace App\Http\Controllers;

use App\Models\Mall;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MallController extends Controller
{
    function index()
    {
        $malls = Mall::all();
        return Inertia::render('Public/Mall/Mall', [
            'malls' => $malls
        ]);
    }
}
