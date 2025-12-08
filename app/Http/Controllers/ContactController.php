<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Contact;

class ContactController extends Controller
{
    public function index()
    {
        $contact = Contact::all();
        return Inertia::render('Public/Contact/ContactUs', [
            'contact' => $contact
        ]);
    }
}
