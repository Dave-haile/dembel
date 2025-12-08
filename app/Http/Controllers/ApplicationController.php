<?php

namespace App\Http\Controllers;

use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
class ApplicationController extends Controller
{
    public function store(Request $request)
    {
        Log::info("Request ". var_export($request->all(), true));    
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
            'phone' => 'required|string|max:20',
            'alt_phone' => 'nullable|string|max:20',
            'birth_date' => 'nullable|date',
            'email' => 'required|string|email|max:100|',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'subcity' => 'nullable|string|max:50',
            'woreda' => 'nullable|string|max:50',
            'city' => 'nullable|string|max:100',
            'marital_status' => 'nullable|in:Single,Married,Divorced,Widowed',
            'education_background' => 'nullable|string|max:100',
            'vacancy_id' => 'required|exists:vacancies,id',
            'cv' => 'required|file|mimes:pdf,doc,docx|max:2048',
            'company' => 'nullable|string|max:150',
            'position' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        if ($validator->fails()) {
            Log::info('Errors'. var_export($validator->errors(), true));
            throw ValidationException::withMessages($validator->errors()->toArray());
        }
        $validatedData = $validator->validated();
        Log::info('Validated '. var_export($validatedData, true));

        if ($request->hasFile('photo')) {
            $validatedData['photo'] = $request->file('photo')->store('photos', 'public');
        }

        if ($request->hasFile('cv')) {
            $validatedData['cv'] = $request->file('cv')->store('cvs', 'public');
        }

        Application::create($validatedData);

        return redirect()->back()->with('success','Application submitted successfully!');
    }
}
