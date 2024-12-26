<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AuthorResource;
use App\Models\Author;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    // Lấy thông tin tất cả các tác giả
    public function index(){
        return AuthorResource::collection(
            Author::with(['books'])->latest()->get()
        );
    }

    // Lấy thông tin tác giả theo slug
    public function show(Author $author){
        if(!$author){
            abort(404);
        } else {
            return AuthorResource::make(
                $author->load(['books.reviews'])
            );
        }
    }
}
