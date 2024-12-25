@extends('admin.layouts.app')

@section('title')
    - Người dùng
@endsection

@section('content')
<div class="row">
    @include('admin.layouts.sidebar')
    <div class="col-md-9">
        <div class="row mt-2">
            <div class="col-md-12">
                <div class="card-header bg-white d-flex justify-content-between align-items-center">
                    <h3 class="mt-2">Người dùng ({{$users->count()}})</h3>
                </div>
                <hr>
                <div class="card-body">
                    <!-- Form lọc thời gian -->
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Tên</th>
                                <th scope="col">Email</th>
                                <th scope="col">Ngày đăng kí</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($users as $key => $user)
                                <tr>
                                    <td scope="col">{{$key += 1}}</td>
                                    <td scope="col">{{$user->customer_name}}</td>
                                    <td scope="col">{{$user->email}}</td>
                                    <td scope="col">{{$user->created_at->diffForHumans()}}</td>
                                    <td>
                                        <a href="#" onclick="deleteItem({{$user->customer_id}})" class="btn btn-sm btn-danger">
                                            <i class="fas fa-trash"></i>
                                        </a>
                                        <form id="{{$user->customer_id}}" action="{{route('admin.users.delete', $user->customer_id)}}" method="post">
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
