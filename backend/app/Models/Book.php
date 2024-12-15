<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $primaryKey = 'book_id';

    protected $fillable = [
        'book_name',
        'slug',
        'category',
        'language',
        'publish_year',
        'page',
        'book_qty',
        'book_price',
        'desc',
        'thumbnail',
        'status',
        'author_id'
    ];

    public function author(){
        return $this->belongsTo(Author::class, 'author_id', 'author_id');
    }

    public function orders(){
        return $this->belongsToMany(Order::class);
    }

    public function reviews(){
        return $this->hasMany(Review::class)->with('customer')->where('approved',1)->latest();
    }

    public function getRouteKeyName(){
        return 'slug';
    }
}
