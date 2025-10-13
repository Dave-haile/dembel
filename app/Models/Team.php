<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $fillable = ['name_en', 'name_am', 'position', 'email', 'phone', 'photo', 'created_by', 'approval'];
}
