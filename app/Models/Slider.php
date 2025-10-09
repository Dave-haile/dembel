<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Slider extends Model
{
    protected $fillable = ['id', 'title_en', 'title_am', 'image', 'priority', 'created_by', 'approval', 'created_at', 'updated_at'];


    public function scopeApproved($query)
    {
        return $query->where('approval', 1);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('priority')->orderBy('created_at', 'DESC');
    }
}
