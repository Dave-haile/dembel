<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    protected $fillable = ['title_en', 'title_am', 'sub_title_en', 'sub_title_am', 'body_en', 'body_am', 'icon', 'image', 'created_by', 'approval'];
}
