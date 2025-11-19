<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    protected $fillable = ['id', 'title', 'category', 'floor_id', 'sector', 'description', 'image', 'approval', 'created_by', 'created_at', 'updated_at'];

    public function scopeApproved($query)
    {
        return $query->where('approval', 1);
    }

    public function floor()
    {
        return $this->belongsTo(Floor::class);
    }
}
