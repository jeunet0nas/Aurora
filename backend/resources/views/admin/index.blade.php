@extends('admin.layouts.app')

@section('title')
    Dashboard
@endsection

@section('content')
    <div class="row">
        @include('admin.layouts.sidebar')
        <div class="col-md-9">
            <div class="row mt-2">
                <div class="col-md-12">
                    <div class="card-header bg-white">
                        <h3 class="mt-2">Dashboard</h3>
                        <hr>
                    </div>
                    <div class="card-body">
                        <div class="row mb-2">
                            <!-- Today's orders -->
                            <div class="col-md-6 mb-2">
                                <div class="card shadow-sm">
                                    <div class="card-header bg-white">
                                        <div class="d-flex justify-content-between">
                                            <strong style="background-color: #942446; color: white;" class="badge">
                                                Đơn hàng hôm nay
                                            </strong>
                                            <span style="background-color: #942446; color: white;" class="badge">
                                                {{ $todayOrders->count() }}
                                            </span>
                                        </div>
                                    </div>

                                    <div class="card-footer text-center bg-white">
                                        <strong>
                                            {{ $todayOrders->sum('total_price') }} vnđ
                                        </strong>
                                    </div>
                                </div>
                            </div>
                            <!-- Yesterday's Order -->
                            <div class="col-md-6 mb-2">
                                <div class="card shadow-sm">
                                    <div class="card-header bg-white">
                                        <div class="d-flex justify-content-between">
                                            <strong style="background-color: #942446; color: white;" class="badge">
                                                Đơn hàng hôm qua
                                            </strong>
                                            <span style="background-color: #942446; color: white;" class="badge">
                                                {{ $yesterdayOrders->count() }}
                                            </span>
                                        </div>
                                    </div>

                                    <div class="card-footer text-center bg-white">
                                        <strong>
                                            {{ $yesterdayOrders->sum('total_price') }} vnđ
                                        </strong>
                                    </div>
                                </div>
                            </div>
                            <!-- Month's Order -->
                            <div class="col-md-6 mb-2">
                                <div class="card shadow-sm">
                                    <div class="card-header bg-white">
                                        <div class="d-flex justify-content-between">
                                            <strong style="background-color: #942446; color: white;" class="badge">
                                                Đơn hàng tháng này
                                            </strong>
                                            <span style="background-color: #942446; color: white;" class="badge">
                                                {{ $monthOrders->count() }}
                                            </span>
                                        </div>
                                    </div>

                                    <div class="card-footer text-center bg-white">
                                        <strong>
                                            {{ $monthOrders->sum('total_price') }} vnđ
                                        </strong>
                                    </div>
                                </div>
                            </div>
                            <!-- Year's Order -->
                            <div class="col-md-6 mb-2">
                                <div class="card shadow-sm">
                                    <div class="card-header bg-white">
                                        <div class="d-flex justify-content-between">
                                            <strong style="background-color: #942446; color: white;" class="badge">
                                                Đơn hàng năm
                                            </strong>
                                            <span style="background-color: #942446; color: white;" class="badge">
                                                {{ $yearOrders->count() }}
                                            </span>
                                        </div>
                                    </div>

                                    <div class="card-footer text-center bg-white">
                                        <strong>
                                            {{ $yearOrders->sum('total_price') }} vnđ
                                        </strong>
                                    </div>
                                </div>
                            </div>
                            <!-- Combined Chart -->
                            <div class="col-md-12 mb-2">
                                <div class="card shadow-sm">
                                    <div class="card-header bg-white">
                                        <strong style="background-color: #942446; color: white;" class="badge">
                                            Thống kê tổng quan
                                        </strong>
                                    </div>
                                    <div class="card-body">
                                        <canvas id="combinedChart"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('scripts')
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            // Dữ liệu cho biểu đồ
            var newCustomersData = @json($newCustomersByDate);
            var revenueData = @json($revenueByDate);
            var ordersData = @json($ordersByDate);

            var labels = newCustomersData.map(item => item.date);
            var newCustomersCounts = newCustomersData.map(item => item.count);
            var revenueTotals = revenueData.map(item => item.total);
            var ordersCounts = ordersData.map(item => item.count);

            var ctx = document.getElementById('combinedChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Người dùng mới',
                            data: newCustomersCounts,
                            type: 'line',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                            yAxisID: 'y-axis-1'
                        },
                        {
                            label: 'Doanh thu (vnđ)',
                            data: revenueTotals,
                            backgroundColor: 'rgba(153, 102, 255, 0.2)',
                            borderColor: 'rgba(153, 102, 255, 1)',
                            borderWidth: 1,
                            yAxisID: 'y-axis-2'
                        },
                        {
                            label: 'Đơn hàng',
                            data: ordersCounts,
                            type: 'line',
                            backgroundColor: 'rgba(255, 159, 64, 0.2)',
                            borderColor: 'rgba(255, 159, 64, 1)',
                            borderWidth: 1,
                            yAxisID: 'y-axis-1'
                        }
                    ]
                },
                options: {
                    scales: {
                        yAxes: [
                            {
                                id: 'y-axis-1',
                                type: 'linear',
                                position: 'left',
                                ticks: {
                                    beginAtZero: true,
                                    stepSize: 1,
                                }
                            },
                            {
                                id: 'y-axis-2',
                                type: 'linear',
                                position: 'right',
                                ticks: {
                                    beginAtZero: true
                                }
                            }
                        ]
                    }
                }
            });
        });
    </script>
@endsection
