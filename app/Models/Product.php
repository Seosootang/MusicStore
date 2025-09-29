<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $guarded = ['created_at', 'updated_at'];

    // Legacy single category relation (kept for backward compatibility)
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // New many-to-many relation
    public function categories()
    {
        return $this->belongsToMany(Category::class)->withTimestamps();
    }
}
