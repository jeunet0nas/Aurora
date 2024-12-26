@extends('admin.layouts.app')

@section('title')
    Sách
@endsection

@section('content')
<div class="row">
    @include('admin.layouts.sidebar')
    <div class="col-md-9">
        <div class="row mt-2">
            <div class="col-md-12">
                <div class="card-header bg-white d-flex justify-content-between align-items-center">
                    <h3 class="mt-2">Sách ({{$books->count()}})</h3>
                    <a href="{{route('admin.books.create')}}" class="btn btn-sm btn-primary">
                        <i class="fas fa-plus"></i>
                    </a>
                </div>
                <hr>
                <div class="card-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Tên sách</th>
                                <th scope="col">Thể loại</th>
                                <th scope="col">Tác giả</th>
                                <th scope="col">Qty</th>
                                <th scope="col">Giá</th>
                                <th scope="col">Ảnh</th>
                                <th scope="col">Trạng thái</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($books as $key => $book)
                                <tr>
                                    <th scope="row">{{$key += 1}}</th>
                                    <td>{{$book->book_name}}</td>
                                    <td>
                                        {{$book->category}}
                                    </td>
                                    <td>
                                        {{ $book->author ? $book->author->author_name : 'N/A' }}
                                    </td>
                                    <td>{{$book->book_qty}}</td>
                                    <td>{{$book->book_price}}</td>
                                    <td>
                                        <img src="{{asset($book->thumbnail)}}" alt="{{$book->thumbnail}}" class="img-fluid rounded" width="60" height="60">
                                    </td>
                                    <td>
                                        @if ($book->status)
                                            <span class="badge bg-success p-2">
                                                Đang bán
                                            </span>
                                        @else
                                            <span class="badge bg-danger p-2">
                                                Tạm ngưng
                                            </span>
                                        @endif
                                    </td>

                                    <td>
                                        <a href="{{route('admin.books.edit', $book->slug)}}" class="btn btn-sm btn-warning">
                                            <i class="fas fa-edit"></i>
                                        </a>
                                        <a href="#" onclick="deleteItem({{$book->book_id}})" class="btn btn-sm btn-danger">
                                            <i class="fas fa-trash"></i>
                                        </a>
                                        <form id="{{$book->book_id}}" action="{{route('admin.books.destroy', $book->slug)}}" method="post">
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
