<?php

namespace App\Http\Controllers;

use App\Models\Vacancy;
use Illuminate\Http\Request;

class VacancyController extends Controller
{
    function index()
    {
        $vacancies = Vacancy::where('is_approved', true)
            ->whereDate('closing_date', '>=', now())
            ->orderBy('posted_date', 'desc')
            ->get();
        return inertia('Public/Vacancies/Vacancies', compact('vacancies'));
    }
}
