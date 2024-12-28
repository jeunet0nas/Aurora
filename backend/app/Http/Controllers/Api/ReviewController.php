<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function store(Request $request){
        $review = $this->checkAlreadyReviewed($request->book_id, $request->user()->customer_id);
        if($review){
            return response()->json([
                'error' => 'Bạn đã đánh giá sách này'
            ]);
        }else {
            Review::create([
                'book_id' => $request->book_id,
                'customer_id' => $request->user()->customer_id,
                'title' => $request->title,
                'detail' => $request->detail,
                'rating' => $request->rating,
            ]);
            return response()->json([
                'message' => 'Đánh giá của bạn đã được tạo thành công và sẽ sớm hiển thị'
            ]);
        }
    }

    public function checkAlreadyReviewed($book_id, $customer_id){
        $review = Review::where([
            'book_id' => $book_id,
            'customer_id' => $customer_id
        ])->first();
        return $review;
    }

    public function update(Request $request){
        $review = $this->checkAlreadyReviewed($request->book_id, $request->user()->customer_id);
        if($review){
            $review->update([
                'book_id' => $request->book_id,
                'customer_id' => $request->user()->customer_id,
                'title' => $request->title,
                'detail' => $request->detail,
                'rating' => $request->rating,
                'approved' => 0,
            ]);

            return response()->json([
                'message' => 'Đánh giá đã được cập nhật thành công và sẽ sớm hiển thị!'
            ]);
        }
        else{
            return response()->json([
                'error' => 'Có lỗi xảy ra, vui lòng thử lại sau!'
            ]);
        }
    }

    public function delete(Request $request){
        $review = $this->checkAlreadyReviewed($request->book_id, $request->user()->customer_id);
        if($review){
            $review->delete();
            return response()->json([
                'message' => 'Đánh giá đã được xóa thành công!'
            ]);
        }else {
            return response()->json([
                'error' => 'Có lỗi xảy ra, vui lòng thử lại sau!'
            ]);
        }
    }
}
