<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $primaryKey = 'order_id';
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
        return $this->belongsTo(User::class, 'customer_id', 'customer_id');
    }

    public function books(){
        return $this->belongsToMany(Book::class, 'book_orders', 'order_id', 'book_id')
                    ->withPivot('item_price', 'item_qty');
    }

    public function coupon() {
        return $this->belongsTo(Coupon::class, 'coupon_id', 'coupon_id');
    }

    public function getCreatedAtAttribute($value){
        return Carbon::parse($value)->diffForHumans();
    }
}
