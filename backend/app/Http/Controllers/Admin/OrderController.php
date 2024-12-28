<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    // Hiển thụ tất cả đơn hàng
    public function index(Request $request){
        $query = Order::query();

        if ($request->has('start_date') && $request->has('end_date')) {
            $start_date = $request->input('start_date');
            $end_date = $request->input('end_date');

            if (Carbon::parse($start_date)->gt(Carbon::parse($end_date))) {
                return redirect()->route('admin.orders.index')
                    ->withErrors(['start_date' => 'Ngày bắt đầu phải nhỏ hơn ngày kết thúc']);
            }

            $query->whereBetween('created_at', [$start_date, $end_date]);
        }

        $orders = $query->with('customer', 'coupon')->orderBy('created_at', 'desc')->get();

        return view('admin.orders.index', compact('orders'));
    }

    // Xác nhận đơn hàng
    public function updateDeliveredAtDate(Order $order){
        $order->update([
            'delivered_at' => Carbon::now(),
        ]);
        return redirect()->route('admin.orders.index')->with([
            'success' => 'Đơn hàng đã được xác nhận thành công'
        ]);
    }

    // Xóa đơn hàng
    public function delete(Order $order){
        $order->delete();
        return redirect()->route('admin.orders.index')->with([
            'success' => "Đơn hàng đã được xóa"
        ]);
    }

    // Xem thông tin chi tiết đơn hàng
    public function show($order_id){
        $order = Order::with('books')->findOrFail($order_id);
        return view('admin.orders.show', compact('order'));
    }
}
