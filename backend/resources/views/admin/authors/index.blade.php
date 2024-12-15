@extends('admin.layouts.app')

@section('title')
    Tác giả
@endsection

@section('content')
<div class="row">
    @include('admin.layouts.sidebar')
    <div class="col-md-9">
        <div class="row mt-2">
            <div class="col-md-12">
                <div class="card-header bg-white d-flex justify-content-between align-items-center">
                    <h3 class="mt-2">Tác giả ({{$authors->count()}})</h3>
                    <a href="{{route('admin.authors.create')}}" class="btn btn-sm btn-primary">
                        <i class="fas fa-plus"></i>
                    </a>
                </div>
                <hr>
                <div class="card-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Tên tác giả</th>
                                <th scope="col">Quốc tịch</th>
                                <th scope="col">Năm sinh</th>
                                <th scope="col">Ảnh</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($authors as $key => $author)
                                <tr>
                                    <th scope="row">{{$key += 1}}</th>
                                    <td>{{$author->author_name}}</td>
                                    <td>
                                        {{$author->nationality}}
                                    </td>
                                    <td>
                                        {{$author->yob}}
                                    </td>
                                    <td>
                                        <img src="{{asset($author->author_img)}}" alt="{{$author->author_img}}" class="img-fluid rounded" width="60" height="60">
                                    </td>

                                    <td>
                                        <a href="{{route('admin.authors.edit', $author->author_slug)}}" class="btn btn-sm btn-warning">
                                            <i class="fas fa-edit"></i>
                                        </a>
                                        <a href="#" onclick="deleteItem({{$author->author_id}})" class="btn btn-sm btn-danger">
                                            <i class="fas fa-trash"></i>
                                        </a>
                                        <form id="{{$author->author_id}}" action="{{route('admin.authors.destroy', $author->author_slug)}}" method="post">
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
