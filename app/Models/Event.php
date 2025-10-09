<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'title_en',
        'title_am',
        'sub_title_en',
        'sub_title_am',
        'description_en',
        'description_am',
        'image',
        'event_date',
        'created_by',
        'approval',
    ];
    public function scopeApproved($query)
    {
        return $query->where('approval', 1);
    }
}
