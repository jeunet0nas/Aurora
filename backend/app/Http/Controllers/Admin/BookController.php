<?php

namespace App\Http\Controllers\Admin;

use App\Models\Book;
use App\Http\Controllers\Controller;
use App\Http\Requests\AddBookRequest;
use App\Http\Requests\UpdateBookRequest;
use App\Models\Author;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $books = Book::with('author')->latest()->get();
        return view('admin.books.index')->with([
            'books' => Book::latest()->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $authors = Author::all();
        return view('admin.books.create')->with([
            'authors' => $authors
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AddBookRequest $request)
    {
        if($request->validated()){
            $data = $request->all();
            $data['thumbnail'] = $this->saveImage($request->file('thumbnail'));
            $data['slug'] = Str::slug($request->book_name);
            $book = Book::create($data);

            return redirect()->route('admin.books.index')->with([
                'success' => 'Sách mới đã được thêm thành công'
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Book $book)
    {
        abort(404);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Book $book)
    {
        $authors = Author::all();
        return view('admin.books.edit')->with([
            'authors' => $authors,
            'book' => $book
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookRequest $request, Book $book)
    {
        if($request->validated()){
            $data = $request->all();

            if($request->has('thumbnail')){
                $this->removeProductImageFromStorage($book->thumbnail);
                $data['thumbnail'] = $this->saveImage($request->file('thumbnail'));
            }

            // add slug
            $data['slug'] = Str::slug($request->book_name);
            $data['status'] = $request->status;
            $book->update($data);

            return redirect()->route('admin.books.index')->with([
                'success' => 'Sách đã được cập nhật thành công'
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book)
    {
        $this->removeProductImageFromStorage($book->thumbnail);

        $book->delete();

        return redirect()->route('admin.books.index')->with([
                'success' => 'Sách đã được xóa thành công'
            ]);
    }

    public function saveImage($file){
        $image_name = time().'_'.$file->getClientOriginalName();
        $file->storeAs('images/products/', $image_name, 'public');
        return 'storage/images/products/'.$image_name;
    }

    public function removeProductImageFromStorage($file){
        $path = public_path($file);

        if(File::exists($path)){
            File::delete($path);
        }
    }
}
