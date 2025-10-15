<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mall extends Model
{
  protected $table = 'malls';

  protected $fillable = [
    'name',
    'slug',
    'year_built',
    'floors_directory',
    'total_area_sqm',
    'total_shops',
    'description',
    'facilities',
    'gallery',
    'virtual_tour_url',
    'address',
    'contact_phone',
    'contact_email',
  ];

  protected $casts = [
    'gallery' => 'array',
    'floors_directory' => 'array',
    'facilities' => 'array'
  ];
}
