<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    use HasFactory;

    protected $primaryKey = 'author_id';
    protected $fillable = [
        'author_name',
        'author_slug',
        'yob',
        'nationality',
        'author_img',
        'author_desc',
    ];

    public function books(){
        return $this->hasMany(Book::class, 'author_id', 'author_id');
    }

    public function getRouteKeyName(){
        return 'author_slug';
    }
}
