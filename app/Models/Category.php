<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $guarded = ['created_at', 'updated_at'];

    // Many-to-many products
    public function products()
    {
        return $this->belongsToMany(Product::class)->withTimestamps();
    }
}
