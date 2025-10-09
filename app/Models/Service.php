<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = ['id', 'title_en', 'title_am', 'sub_title_en', 'sub_title_am', 'description_en', 'description_am', 'image', 'approval', 'created_by', 'created_at', 'updated_at'];

    public function scopeApproved($query)
    {
        return $query->where('approval', 1);
    }
}
