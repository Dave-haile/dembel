<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FreeSpace extends Model
{
    protected $fillable = [
        'name',
        'floor_id',
        'wing_or_zone',
        'area_sqm',
        'dimensions',
        'has_window',
        'has_ventilation',
        'has_plumbing',
        'has_electricity',
        'features',
        'monthly_rent',
        'rent_currency',
        'rent_includes',
        'negotiable',
        'thumbnail',
        'gallery',
        'virtual_tour_url',
        'short_description',
        'full_description',
        'contact_person',
        'contact_phone',
        'contact_email',
        'meta_title',
        'meta_description',
        'slug',
        'availability_status',
    ];

    protected $casts = [
        'gallery' => 'array',
        'monthly_rent' => 'decimal:2',
        'area_sqm' => 'decimal:2',
        'negotiable' => 'boolean',
        'has_window' => 'boolean',
        'has_ventilation' => 'boolean',
        'has_plumbing' => 'boolean',
        'has_electricity' => 'boolean',
    ];

    // Relationships
    public function floor(): BelongsTo
    {
        return $this->belongsTo(Floor::class);
    }
}
