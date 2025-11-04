<?php

namespace App\Models;

use App\Models\Traits\LogsActivity;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    use LogsActivity;
    protected $fillable = ['category', 'title_en', 'title_am', 'sub_title_en', 'sub_title_am', 'image', 'pdf_file', 'created_by', 'approval', 'excerpt_en', 'excerpt_am', 'gallery', 'content_en', 'content_am'];

    public function scopeApproved($query)
    {
        return $query->where('approval', 1);
    }
}
