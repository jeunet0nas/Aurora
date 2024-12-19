<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\AuthorController;
use App\Http\Controllers\Admin\BookController;
use App\Http\Controllers\Admin\CouponController;
use Illuminate\Support\Facades\Route;

Route::get('/',[AdminController::class,'login'])->name('admin.login');
Route::post('admin/auth', [AdminController::class, 'auth'])->name('admin.auth');



Route::middleware('admin')->group(function(){
    Route::get('admin/dashboard', [AdminController::class, 'index'])->name('admin.index');

    Route::post('admin/logout', [AdminController::class, 'logout'])->name('admin.logout');

    // Routes tác giả
    Route::resource('authors', AuthorController::class, [
            'names' => [
                'index' => 'admin.authors.index',
                'create' => 'admin.authors.create',
                'store' => 'admin.authors.store',
                'edit' => 'admin.authors.edit',
                'update' => 'admin.authors.update',
                'destroy' => 'admin.authors.destroy',
            ]
        ]);

    //Routes sách
    Route::resource('books', BookController::class, [
            'names' => [
                'index' => 'admin.books.index',
                'create' => 'admin.books.create',
                'store' => 'admin.books.store',
                'edit' => 'admin.books.edit',
                'update' => 'admin.books.update',
                'destroy' => 'admin.books.destroy',
            ]
        ]);

    //Routes mã giảm giá
    Route::resource('coupons', CouponController::class, [
            'names' => [
                'index' => 'admin.coupons.index',
                'create' => 'admin.coupons.create',
                'store' => 'admin.coupons.store',
                'edit' => 'admin.coupons.edit',
                'update' => 'admin.coupons.update',
                'destroy' => 'admin.coupons.destroy',
            ]
        ]);
});
