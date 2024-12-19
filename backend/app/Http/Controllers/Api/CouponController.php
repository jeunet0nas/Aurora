<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use Illuminate\Http\Request;

class CouponController extends Controller
{
    // Áp mã khuyến mãi
    public function applyCoupon(Request $request)
    {
        $coupon = Coupon::where('coupon_name', $request->coupon_name)->first();
        if ($coupon && $coupon->checkIfValid()) {
            return response()->json([
                'message' => 'Áp dụng mã khuyến mãi thành công!',
                'coupon' => $coupon,
            ]);
        } else {
            return response()->json([
                'error' => 'Mã áp dụng hết hạn hoặc không hợp lệ!',
            ]);
        }
    }
}
