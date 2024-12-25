@extends('admin.layouts.app')

@section('title')
    - Đánh giá
@endsection

@section('content')
<div class="row">
    @include('admin.layouts.sidebar')
    <div class="col-md-9">
        <div class="row mt-2">
            <div class="col-md-12">
                <div class="card-header bg-white d-flex justify-content-between align-items-center">
                    <h3 class="mt-2">Đánh giá ({{$reviews->count()}})</h3>
                </div>
                <hr>
                <div class="card-body">
                    <!-- Form lọc thời gian -->
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Tiêu đề</th>
                                <th scope="col">Nội dung</th>
                                <th scope="col">Điểm</th>
                                <th scope="col">Duyệt</th>
                                <th scope="col">Bởi</th>
                                <th scope="col">Sách</th>
                                <th scope="col">Thời gian</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($reviews as $key => $review)
                                <tr>
                                    <td scope="col">{{$key += 1}}</td>
                                    <td scope="col">{{$review->title}}</td>
                                    <td scope="col">{{$review->detail}}</td>
                                    <td scope="col">{{$review->rating}}</td>
                                    <td scope="col">
                                        @if ($review->approved)
                                            <spam class="badge bg-success">
                                                Yes
                                            </spam>
                                        @else
                                            <spam class="badge bg-danger">
                                                No
                                            </spam>
                                        @endif
                                    </td>
                                    <td scope="col">{{$review->customer->customer_name}}</td>
                                    <td scope="col">
                                        <img src="{{asset($review->book->thumbnail)}}" class="rounded" width="60" height="100" alt="{{$review->book->book_name}}">
                                    </td>
                                    <td scope="col">{{$review->created_at}}</td>
                                    <td> <!-- Thêm cột Actions -->
                                        @if ($review->approved)
                                            <a href="{{route('admin.reviews.update', ['review' => $review->rating_id, 'status' => 0])}}" class="btn btn-sm btn-warning">
                                                <i class="fas fa-eye-slash"></i>
                                            </a>
                                        @else
                                            <a href="{{route('admin.reviews.update', ['review' => $review->rating_id, 'status' => 1])}}" class="btn btn-sm btn-success">
                                                <i class="fas fa-check"></i>
                                            </a>
                                        @endif
                                        <a href="#" onclick="deleteItem({{$review->rating_id}})" class="btn btn-sm btn-danger">
                                            <i class="fas fa-trash"></i>
                                        </a>
                                        <form id="{{$review->rating_id}}" action="{{route('admin.reviews.delete', $review->rating_id)}}" method="post">
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
