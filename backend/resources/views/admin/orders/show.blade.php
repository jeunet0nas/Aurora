@extends('admin.layouts.app')

@section('title')
    Chi tiết đơn hàng #{{$order->order_id}}
@endsection

@section('content')
<div class="row">
    @include('admin.layouts.sidebar')
    <div class="col-md-9">
        <div class="row mt-2">
            <div class="col-md-12">
                <div class="card-header bg-white d-flex justify-content-between align-items-center">
                    <h3 class="mt-2">Chi tiết đơn hàng #{{$order->order_id}}</h3>
                </div>
                <hr>
                <div class="card-body">
                    <h5>Thông tin đơn hàng</h5>
                    <p><strong>Mã đơn:</strong> {{$order->order_id}}</p>
                    <p><strong>Tổng tiền:</strong> {{$order->total_price}} vnđ</p>
                    <p><strong>Mã giảm giá:</strong>
                        @if ($order->coupon)
                            <span class="badge bg-success">
                                {{$order->coupon->coupon_name}} ({{$order->coupon->discount}}%)
                            </span>
                        @else
                            <span class="badge bg-danger">
                                N/A
                            </span>
                        @endif
                    </p>
                    <p><strong>Khách hàng:</strong> {{$order->customer->customer_name}}</p>
                    <p><strong>Ngày đặt:</strong> {{$order->created_at}}</p>
                    <p><strong>Ngày xác nhận:</strong> {{$order->delivered_at ? \Carbon\Carbon::parse($order->delivered_at)->diffForHumans() : 'Chưa xác nhận'}}</p>
                    <hr>
                    <h5>Chi tiết sách</h5>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Tên sách</th>
                                <th scope="col">Ảnh bìa</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col">Giá</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($order->books as $key => $book)
                                <tr>
                                    <th scope="row">{{$key + 1}}</th>
                                    <td>{{$book->book_name}}</td>
                                    <td>
                                        <img src="{{asset($book->thumbnail)}}" alt="{{$book->thumbnail}}" class="img-fluid rounded" width="60" height="60">
                                    </td>
                                    <td>{{$book->pivot->item_qty}}</td>
                                    <td>{{$book->pivot->item_price}} vnđ</td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                    <a href="{{ route('admin.orders.index') }}" class="btn btn-primary">Quay lại</a>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
