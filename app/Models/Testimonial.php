<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $fillable = ['id', 'name', 'position', 'testimonial', 'approval', 'created_at', 'updated_at'];

    public function scopeApproved($query)
    {
        return $query->where('approval', 1);
    }
}
