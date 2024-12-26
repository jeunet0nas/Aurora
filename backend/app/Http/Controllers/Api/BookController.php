<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookResource;
use App\Models\Book;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class BookController extends Controller
{
    // Lấy thông tin tất cả sách và đánh giá mới nhất
    public function index(){
        return BookResource::collection(
            Book::with(['author','reviews'])->latest()->get()
        );
    }

    // Lấy thông tin sách theo slug
    public function show(Book $book){
        if(!$book){
            abort(404);
        }
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

    public function bestSellers(){
    $bestSellers = Book::select('books.book_id', 'books.book_name', 'books.slug', 'books.category', 'books.language', 'books.publish_year', 'books.page', 'books.book_qty', 'books.book_price', 'books.desc', 'books.thumbnail', 'books.status', 'books.author_id', DB::raw('SUM(book_orders.item_qty) as total_sales'))
        ->join('book_orders', 'books.book_id', '=', 'book_orders.book_id')
        ->groupBy('books.book_id', 'books.book_name', 'books.slug', 'books.category', 'books.language', 'books.publish_year', 'books.page', 'books.book_qty', 'books.book_price', 'books.desc', 'books.thumbnail', 'books.status', 'books.author_id')
        ->orderByDesc('total_sales')
        ->with(['author', 'reviews'])
        ->take(10) // Giới hạn số lượng sách trả về, ví dụ: 10 sách bán chạy nhất
        ->get();

    return BookResource::collection($bestSellers);
    }
}
