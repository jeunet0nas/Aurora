<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Coupon extends Model
{
    use HasFactory;

    protected $fillable = ['coupon_name', 'discount', 'valid_until'];

    // Uppercase mã khuyến mãi
    public function setNameAttribute($value){
        $this->attributes['coupon_name'] = Str::upper($value);
    }


    // Kiểm tra valid
    public function checkIfValid(){
        if($this->valid_until > Carbon::now()){
            return true;
        }else {
            return false;
        }
    }
}

