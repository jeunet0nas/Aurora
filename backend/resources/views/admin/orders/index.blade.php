@extends('admin.layouts.app')

@section('title')
    Hóa đơn
@endsection

@section('content')
<div class="row">
    @include('admin.layouts.sidebar')
    <div class="col-md-9">
        <div class="row mt-2">
            <div class="col-md-12">
                <div class="card-header bg-white d-flex justify-content-between align-items-center">
                    <h3 class="mt-2">Hóa đơn ({{$orders->count()}})</h3>
                </div>
                <hr>
                <div class="card-body">
                    <!-- Form tìm kiếm -->
                    <form method="GET" action="{{ route('admin.orders.index') }}" class="mb-4">
                        <div class="row">
                            <div class="col-md-5">
                                <label for="start_date">Từ ngày:</label>
                                <input type="date" name="start_date" id="start_date" class="form-control" value="{{ request('start_date') }}">
                            </div>
                            <div class="col-md-5">
                                <label for="end_date">Đến ngày:</label>
                                <input type="date" name="end_date" id="end_date" class="form-control" value="{{ request('end_date') }}">
                            </div>
                            <div class="col-md-2 d-flex align-items-end">
                                <button type="submit" class="btn btn-primary">Tìm kiếm</button>
                            </div>
                        </div>
                    </form>
                    <!-- Kết thúc form tìm kiếm -->

                    <!-- Hiển thị thông báo lỗi -->
                    @if ($errors->any())
                        <div class="alert alert-danger">
                            <ul>
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif
                    <!-- Kết thúc hiển thị thông báo lỗi -->

                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Mã đơn</th>
                                <th scope="col">Tổng tiền</th>
                                <th scope="col">Mã giảm giá</th>
                                <th scope="col">Khách</th>
                                <th scope="col">Ngày đặt</th>
                                <th scope="col">Ngày xác nhận</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($orders as $key => $order)
                                <tr>
                                    <th scope="row">{{$key + 1}}</th>
                                    <td scope="col">
                                        <a href="{{ route('admin.orders.show', $order->order_id) }}">
                                            Đơn hàng #{{$order->order_id}}
                                        </a>
                                    </td>
                                    <td>
                                        {{$order->total_price}} vnđ
                                    </td>
                                    <td scope="col">
                                        @if ($order->coupon()->exists() )
                                            <span class="badge bg-success">
                                                {{$order->coupon->coupon_name}}
                                            </span>
                                        @else
                                            <span class="badge bg-danger">
                                                N/A
                                            </span>
                                        @endif
                                    </td>
                                    <td scope="col">
                                        {{$order->customer->customer_name}}
                                    </td>
                                    <td scope="col">
                                        {{$order->created_at}}
                                    </td>
                                    <td scope="col">
                                        @if ($order->delivered_at)
                                            <span class="badge bg-success">
                                                {{\Carbon\Carbon::parse($order->delivered_at)->diffForHumans()}}
                                            </span>
                                        @else
                                            <a href="{{route('admin.orders.update',$order->order_id)}}">
                                                <i class="fas fa-pencil mx-2"></i>
                                            </a>
                                        @endif
                                    </td>
                                    <td>
                                        <a href="#" onclick="deleteItem({{$order->order_id}})" class="btn btn-sm btn-danger">
                                            <i class="fas fa-trash"></i>
                                        </a>
                                        <form id="{{$order->order_id}}" action="{{route('admin.orders.delete', $order->order_id)}}" method="post">
                                        @csrf
                                        @method('DELETE')
                                        </form>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
