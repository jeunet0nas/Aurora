<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $primaryKey = 'rating_id'; // Đặt rating_id làm khóa chính

    protected $fillable = [
        'title',
        'detail',
        'rating',
        'approved',
        'customer_id',
        'book_id',
    ];

    public function customer(){
        return $this->belongsTo(User::class, 'customer_id');
    }

    public function book(){
        return $this->belongsTo(Book::class, 'book_id');
    }

    public function getCreatedAtAttribute($value){
        return Carbon::parse($value)->diffForHumans();
    }
}
