<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookResource;
use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    // Lấy thông tin tất cả sách và đánh giá
    public function index(){
        return BookResource::collection(
            Book::with(['author','reviews'])->latest()->get()
        );
    }

    // Lấy thông tin sách theo slug
    public function show(Book $book){
        return BookResource::make(
            $book->load(['author','reviews'])
        );
    }

    // Tìm kiếm sách theo tên
    public function findBookByTerm($searchTerm){
        return BookResource::collection(
            Book::where('book_name', 'LIKE', '%'.$searchTerm.'%')->with(['author','reviews'])->latest()->get()
        );
    }
}
