<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\Coupon;
use App\Models\Order;
use App\Models\Book;
use App\Models\User;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    // Tạo đơn hàng của người dùng
    public function store(Request $request)
    {
        $validated = $request->validate([
            'books' => 'required|array',
            'books.*.book_id' => 'required|exists:books,book_id',
            'books.*.price' => 'required',
            'books.*.qty' => 'required|integer',
            'books.*.coupon_id' => 'nullable|exists:coupons,coupon_id',
        ]);

        $customer = User::find($request->user()->customer_id);

        $order_address = $customer->address . ', ' . $customer->province . ', ' . $customer->city;

        $totalOrderAmount = $this->calculateOrderTotal($validated['books']);
        $order = Order::create([
            'customer_id' => $request->user()->customer_id,
            'total_price' => $totalOrderAmount,
            'order_address' => $order_address,
            'payment_type' => 'COD',
            'payment_status' => 'Chưa thanh toán',
            'coupon_id' => $validated['books'][0]['coupon_id'] ?? null,
        ]);

        foreach ($validated['books'] as $book) {
        $bookModel = Book::find($book['book_id']);
        if ($bookModel) {
            $bookModel->book_qty -= $book['qty'];
            $bookModel->save();
        }

        $calculatedPrice = $this->calculateDiscountedPrice($book['price'], $book['coupon_id']);

        $order->books()->attach($book['book_id'], [
            'item_price' => $calculatedPrice,
            'item_qty' => $book['qty'],
        ]);
    }

        return response()->json([
            'user' => UserResource::make($request->user()),
        ]);
    }

    public function calculateOrderTotal($items)
    {
        $total = 0;
        foreach ($items as $item) {
            $total += $this->calculateTotal($item['price'], $item['qty'], $item['coupon_id']);
        }
        return $total;
    }

    public function calculateTotal($price, $qty, $coupon_id)
    {
        $discount = 0;
        $total = $price * $qty;
        $coupon = Coupon::find($coupon_id);
        if ($coupon && $coupon->checkIfValid()) {
            $discount = $total * $coupon->discount / 100;
        }
        return $total - $discount;
    }

    public function calculateDiscountedPrice($price, $coupon_id){
        $discount = 0;
        $coupon = Coupon::find($coupon_id);
        if ($coupon && $coupon->checkIfValid()) {
            $discount = $price * $coupon->discount / 100;
        }
        return $price - $discount;
    }
}
