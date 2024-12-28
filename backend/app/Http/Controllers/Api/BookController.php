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
            ->take(10)
            ->get();

        return BookResource::collection($bestSellers);
    }

    // Lọc sách
    public function filterBooks(Request $request){
        $query = Book::query();

        if ($request->has('genres') && !empty($request->input('genres'))) {
            $query->whereIn('category', $request->input('genres'));
        }

        if ($request->has('language') && !empty($request->input('language'))) {
            $query->whereIn('language', $request->input('language'));
        }

        if ($request->has('price_min') && $request->has('price_max') && $request->input('price_min') !== "" && $request->input('price_max') !== "") {
            $minPrice = (int) $request->input('price_min');
            $maxPrice = (int) $request->input('price_max');
            $query->whereBetween('book_price', [$minPrice, $maxPrice]);
        }

        $books = $query->with(['author', 'reviews'])->get();

        return BookResource::collection($books);
    }

    public function getBooksByCategory($category, $book_id) {
        $books = Book::where('category', $category)
                 ->where('status', 1)
                 ->where('book_id', '!=', $book_id)
                 ->take(6)
                 ->get();
    return BookResource::collection($books);
    }
}
