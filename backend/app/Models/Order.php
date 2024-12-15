<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'total_price',
        'order_address',
        'payment_type',
        'payment_status',
        'delivered_at',
        'customer_id',
        'coupon_id'
    ];

    public function setStatus($status)
    {
        $this->payment_status = $status;
    }

    public function customer() {
        return $this->belongsTo(User::class);
    }

    public function books(){
        return $this->belongsToMany(Book::class);
    }

    public function coupon() {
        return $this->belongsTo(Coupon::class);
    }
}
