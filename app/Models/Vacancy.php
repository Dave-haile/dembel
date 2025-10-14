<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vacancy extends Model
{
    protected $fillable = [
        'title',
        'department',
        'employment_type',
        'work_location',
        'salary_min',
        'salary_max',
        'currency',
        'job_description',
        'requirements',
        'benefits',
        'how_to_apply',
        'posted_date',
        'closing_date',
        'number_of_positions',
        'contact_email',
        'contact_phone',
        'address',
        'is_approved',
        'slug',
        'thumbnail',
    ];
}
