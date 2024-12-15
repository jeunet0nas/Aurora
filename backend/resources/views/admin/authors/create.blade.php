@extends('admin.layouts.app')

@section('title')
    Thêm tác giả
@endsection

@section('content')
<div class="row">
    @include('admin.layouts.sidebar')
    <div class="col-md-9">
        <div class="row mt-2">
            <div class="col-md-12">
                <div class="card-header bg-white">
                    <h3 class="mt-2">Thêm tác giả mới</h3>
                    <hr>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6 mx-auto">
                            <form action="{{route('admin.authors.store')}}" method="post" enctype="multipart/form-data">
                                @csrf
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control @error('author_name') is-invalid @enderror" id="floatingInput" name="author_name" placeholder="Tên sách"
                                    value="{{old('author_name')}}">
                                    <label for="floatingInput">Tên tác giả*</label>
                                    @error('author_name')
                                        <span class="invalid-feedback">
                                            <strong>{{$message}}</strong>
                                        </span>
                                    @enderror
                                </div>

                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control @error('nationality') is-invalid @enderror" id="floatingInput" name="nationality" placeholder="Quốc tịch"
                                    value="{{old('nationality')}}">
                                    <label for="floatingInput">Quốc tịch*</label>
                                    @error('nationality')
                                        <span class="invalid-feedback">
                                            <strong>{{$message}}</strong>
                                        </span>
                                    @enderror
                                </div>

                                <div class="form-floating mb-3">
                                    <input type="number" class="form-control @error('yob') is-invalid @enderror" id="floatingInput" name="yob" placeholder="Năm sinh"
                                    value="{{old('yob')}}">
                                    <label for="floatingInput">Năm sinh*</label>
                                    @error('yob')
                                        <span class="invalid-feedback">
                                            <strong>{{$message}}</strong>
                                        </span>
                                    @enderror
                                </div>

                                <div class="mb-3">
                                    <label for="author_desc">Mô tả tác giả*</label>
                                    <textarea rows="10" class="form-control @error('author_desc') is-invalid @enderror" id="floatingInput" name="author_desc" placeholder="Mô tả">
                                        {{old('author_desc')}}
                                    </textarea>
                                    @error('author_desc')
                                        <span class="invalid-feedback">
                                            <strong>{{$message}}</strong>
                                        </span>
                                    @enderror
                                </div>

                                <div class="mb-3">
                                    <label for="author_img">Ảnh tác giả*</label>
                                    <input type="file" class="form-control @error('author_img') is-invalid @enderror" id="author_img" name="author_img">
                                    @error('author_img')
                                        <span class="invalid-feedback">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                                <div class="mt-2">
                                    <img src="#" alt="Image Preview" id="author_img_preview" class="d-none img-fluid rounded mb-2" width="100" height="150">
                                </div>


                                <div class="mb-2">
                                    <button type="submit" class="btn btn-sm btn-dark">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection
