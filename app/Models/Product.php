<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $guarded = ['created at', 'updated at'];

    protected $fillable = [
        'category_id',
        'image',
        'title',
        'description',
        'price',
        'stock',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
