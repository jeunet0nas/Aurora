<?php

use App\Http\Controllers\Api\AuthorController;
use App\Http\Controllers\Api\BookController;
use App\Http\Controllers\Api\CouponController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\UserController;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function(){
    Route::get('user', function (Request $request){
        return [
            'user' => UserResource::make($request->user()),
            'access_token' => $request->bearerToken()
        ];
    });
    Route::post('user/logout', [UserController::class,'logout']);
    Route::put('user/profile/update', [UserController::class, 'UpdateUserProfile']);

    // Coupon route
    Route::post('apply/coupon', [CouponController::class, 'applyCoupon']);

    // Đổi mật khẩu
    Route::put('user/change-password', [UserController::class, 'changePassword']);

    // Hóa đơn
    Route::post('store/order', [OrderController::class, 'store']);

    // Đánh giá
    Route::post('review/store', [ReviewController::class, 'store']);
    Route::put('review/update', [ReviewController::class, 'update']);
    Route::post('review/delete', [ReviewController::class, 'delete']);
});


// Sách
Route::get('books', [BookController::class,'index']);
Route::get('books/{searchTerm}/find', [BookController::class, 'findBookByTerm']);
Route::get('book/{book}/show', [BookController::class, 'show']);
Route::get('best-sellers', [BookController::class, 'bestSellers']);

// Xác thực người dùng
Route::post('user/register', [UserController::class, 'store']);
Route::post('user/login', [UserController::class, 'auth']);

// Tác giả
Route::get('authors', [AuthorController::class, 'index']);
Route::get('author/{author}/show', [AuthorController::class, 'show']);
