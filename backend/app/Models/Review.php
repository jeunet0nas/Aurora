<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'detail',
        'rating',
        'approved',
        'customer_id',
        'book_id',
    ];

    public function customer(){
        return $this->belongsTo(User::class);
    }

    public function book(){
        return $this->belongsTo(Book::class);
    }

    public function gerCreatedAttribute($value){
        return Carbon::parse($value)->diffForHumans();
    }
}
