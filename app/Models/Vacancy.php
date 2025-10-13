<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vacancy extends Model
{
    protected $fillable = ['title', 'place_of_work', 'category', 'employment_type', 'posted_date', 'closing_date', 'job_description', 'how_to_apply', 'qualification', 'skill_req', 'salary', 'term_of_employment', 'contact', 'address', 'required_candidates', 'approval'];
}
