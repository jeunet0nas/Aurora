<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    // Lấy danh sách reviews
    public function index(){
        return view('admin.reviews.index')->with([
            'reviews' => Review::latest()->get()
        ]);
    }

    // Cập nhật trang thái review
    public function toggleApprovedStatus(Review $review, $status){
        $review->update([
            'approved' => $status
        ]);

        return redirect()->route('admin.reviews.index')->with([
            'success' => 'Bình luận đã được cập nhật trạng thái!'
        ]);
    }

    // Xóa review
    public function destroy(Review $review){
        $review->delete();
        return redirect()->route('admin.reviews.index')->with([
            'success' => 'Bình luận đã được xóa!'
        ]);
    }
}
