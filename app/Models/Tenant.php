<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Tenant extends Model
{
    protected $fillable = [
        'category_id',
        'name',
        'description',
        'logo',
        'location',
        'hours',
        'fullDescription',
        'floor',
        'phone',
        'email',
        'website'
    ];
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
