@extends('admin.layouts.app')

@section('title')
    Update Book
@endsection

@section('content')
<div class="row">
    @include('admin.layouts.sidebar')
    <div class="col-md-9">
        <div class="row mt-2">
            <div class="col-md-12">
                <div class="card-header bg-white">
                    <h3 class="mt-2">Cập nhật</h3>
                    <hr>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6 mx-auto">
                            <form action="{{route('admin.books.update', $book->slug)}}" method="post" enctype="multipart/form-data">
                                @csrf
                                @method('PUT')
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control @error('book_name') is-invalid @enderror" id="floatingInput" name="book_name" placeholder="Tên sách"
                                    value="{{old('book_name', $book->book_name)}}">
                                    <label for="floatingInput">Tên sách*</label>
                                    @error('book_name')
                                        <span class="invalid-feedback">
                                            <strong>{{$message}}</strong>
                                        </span>
                                    @enderror
                                </div>

                                <div class="form-floating mb-3">
                                    <select class="form-control @error('author_id') is-invalid @enderror" id="floatingSelect" name="author_id">
                                        <option value="">Chọn tác giả</option>
                                        @foreach($authors as $author)
                                            <option value="{{ $author->author_id }}" {{ old('author_id', $book->author_id) == $author->author_id ? 'selected' : '' }}>
                                                {{ $author->author_name }}
                                            </option>
                                        @endforeach
                                    </select>
                                    <label for="floatingSelect">Tác giả*</label>
                                    @error('author_id')
                                        <span class="invalid-feedback">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>

                                <div class="form-floating mb-3">
                                    <input type="number" class="form-control @error('book_qty') is-invalid @enderror" id="floatingInput" name="book_qty" placeholder="Quantity"
                                    value="{{old('book_qty', $book->book_qty)}}">
                                    <label for="floatingInput">Số lượng*</label>
                                    @error('book_qty')
                                        <span class="invalid-feedback">
                                            <strong>{{$message}}</strong>
                                        </span>
                                    @enderror
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="number" class="form-control @error('book_price') is-invalid @enderror" id="floatingInput" name="book_price" placeholder="Price"
                                    value="{{old('book_price', $book->book_price)}}">
                                    <label for="floatingInput">Giá*</label>
                                    @error('book_price')
                                        <span class="invalid-feedback">
                                            <strong>{{$message}}</strong>
                                        </span>
                                    @enderror
                                </div>

                                <div class="mb-3">
                                    <label for="category" class="my-2">Thể loại*</label>
                                    <select name="category" id="category" class="form-control @error('category') is-invalid @enderror">
                                        <option value="Giả tưởng" {{ old('category', $book->category) == 'Giả tưởng' ? 'selected' : '' }}>Giả tưởng</option>
                                        <option value="Lãng mạn" {{ old('category', $book->category) == 'Lãng mạn' ? 'selected' : '' }}>Lãng mạn</option>
                                        <option value="Khoa học viễn tưởng" {{ old('category', $book->category) == 'Khoa học viễn tưởng' ? 'selected' : '' }}>Khoa học viễn tưởng</option>
                                        <option value="Kinh dị" {{ old('category', $book->category) == 'Kinh dị' ? 'selected' : '' }}>Kinh dị</option>
                                        <option value="Phiêu lưu" {{ old('category', $book->category) == 'Phiêu lưu' ? 'selected' : '' }}>Phiêu lưu</option>
                                        <option value="Trinh thám" {{ old('category', $book->category) == 'Trinh thám' ? 'selected' : '' }}>Trinh thám</option>
                                        <option value="Tâm lý" {{ old('category', $book->category) == 'Tâm lý' ? 'selected' : '' }}>Tâm lý</option>
                                        <option value="Văn học cổ điển" {{ old('category', $book->category) == 'Văn học cổ điển' ? 'selected' : '' }}>Văn học cổ điển</option>
                                    </select>
                                    @error('category')
                                        <span class="invalid-feedback">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>

                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control @error('language') is-invalid @enderror" id="floatingInput" name="language" placeholder="Ngôn ngữ"
                                    value="{{old('language', $book->language)}}">
                                    <label for="floatingInput">Ngôn ngữ*</label>
                                    @error('language')
                                        <span class="invalid-feedback">
                                            <strong>{{$message}}</strong>
                                        </span>
                                    @enderror
                                </div>

                                <div class="form-floating mb-3">
                                    <input type="number" class="form-control @error('publish_year') is-invalid @enderror" id="floatingInput" name="publish_year" placeholder="Năm xuất bản"
                                    value="{{old('publish_year', $book->publish_year)}}">
                                    <label for="floatingInput">Năm xuất bản*</label>
                                    @error('publish_year')
                                        <span class="invalid-feedback">
                                            <strong>{{$message}}</strong>
                                        </span>
                                    @enderror
                                </div>

                                <div class="form-floating mb-3">
                                    <input type="number" class="form-control @error('page') is-invalid @enderror" id="floatingInput" name="page" placeholder="Số trang"
                                    value="{{old('page', $book->page)}}">
                                    <label for="floatingInput">Số trang*</label>
                                    @error('page')
                                        <span class="invalid-feedback">
                                            <strong>{{$message}}</strong>
                                        </span>
                                    @enderror
                                </div>


                                <div class="mb-3">
                                    <label for="desc">Mô tả chung*</label>
                                    <textarea rows="10" class="form-control @error('desc') is-invalid @enderror" id="floatingInput" name="desc" placeholder="Description">
                                        {{old('desc', $book->desc)}}
                                    </textarea>
                                    @error('desc')
                                        <span class="invalid-feedback">
                                            <strong>{{$message}}</strong>
                                        </span>
                                    @enderror
                                </div>
                                <div class="mb-3">
                                    <label for="thumbnail">Ảnh bìa*</label>
                                    <input type="file" class="form-control @error('thumbnail') is-invalid @enderror" id="thumbnail" name="thumbnail">
                                    @error('thumbnail')
                                        <span class="invalid-feedback">
                                            <strong>{{$message}}</strong>
                                        </span>
                                    @enderror
                                </div>
                                <div class="mt-2">
                                    <img src="{{asset($book->thumbnail)}}" alt="" id="thumbnail_preview" class="image-fluid rounded mb-2" width="100" height="150">
                                </div>

                                <div class="mb-2">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" value="1" name="status" id="status_instock" @checked($book->status == 1)>
                                        <label class="form-check-label" for="status_instock">
                                            Đang bán
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" value="0" name="status" id="status_outofstock" @checked($book->status == 0)>
                                        <label class="form-check-label" for="status_outofstock">
                                            Tạm ngưng
                                        </label>
                                    </div>
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
