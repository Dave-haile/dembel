<?php

namespace App\Models;

use App\Models\Traits\LogsActivity;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Tenant extends Model
{
    use LogsActivity;

    protected $fillable = [
        'category_id',
        'name',
        'description',
        'logo',
        'location',
        'hours',
        'fullDescription',
        'floor_id',
        'building',
        'room_no',
        'phone',
        'email',
        'website',
    ];

    protected $casts = [
        'floor_id' => 'integer',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function floor(): BelongsTo
    {
        return $this->belongsTo(Floor::class);
    }
}
