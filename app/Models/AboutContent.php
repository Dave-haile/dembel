<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AboutContent extends Model
{
    use HasFactory;

    protected $fillable = [
        'component', 'title', 'subtitle', 'description', 'image_url', 'extra_data', 'position',
    ];
}
