<?php

use App\Http\Controllers\Api\BookController;
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
});



// books api routes
Route::get('books', [BookController::class,'index']);
Route::get('books/{searchTerm}/find', [BookController::class, 'findBookByTerm']);
Route::get('book/{book}/show', [BookController::class, 'show']);

// user routes
Route::post('user/register', [UserController::class, 'store']);
Route::post('user/login', [UserController::class, 'auth']);
