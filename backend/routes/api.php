<?php

use App\Http\Controllers\Api\BookController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('books', [BookController::class,'index']);
Route::get('books/{searchTerm}/find', [BookController::class, 'findBookByTerm']);
Route::get('book/{book}/show', [BookController::class, 'show']);
