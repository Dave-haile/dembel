<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    protected $fillable = ['id', 'category', 'title_en', 'title_am', 'sub_title_en', 'sub_title_am', 'description_en', 'description_am', 'image', 'pdf_file', 'created_by', 'approval', 'created_at', 'updated_at'];

    public function scopeApproved($query)
    {
        return $query->where('approval', 1);
    }
}
