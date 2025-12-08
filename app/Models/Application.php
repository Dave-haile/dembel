<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    protected $fillable = ['first_name', 'last_name', 'phone', 'alt_phone', 'birth_date', 'email', 'photo', 'subcity', 'woreda', 'city', 'marital_status', 'education_background', 'vacancy_id', 'cv', 'company', 'position', 'description', 'start_date', 'end_date'];
}
