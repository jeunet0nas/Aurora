<?php

namespace App\Http\Controllers\Admin;

use App\Models\Author;
use App\Http\Controllers\Controller;
use App\Http\Requests\AddAuthorRequest;
use App\Http\Requests\UpdateAuthorRequest;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;


class AuthorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('admin.authors.index')->with([
            'authors' => Author::latest()->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('admin.authors.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AddAuthorRequest $request)
    {
        if($request->validated()){
            $data = $request->all();
            $data['author_img'] = $this->saveAuthorImage($request->file('author_img'));
            $data['author_slug'] = Str::slug($request->author_name);
            $author = Author::create($data);

            Author::created($request->validated());
            return redirect()->route('admin.authors.index')->with([
                'success' => 'Tác giả mới đã được thêm thành công'
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Author $author)
    {
        abort(404);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Author $author)
    {
        return view('admin.authors.edit')->with([
            'author' => $author
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAuthorRequest $request, Author $author)
    {
        if($request->validated()){
            $data = $request->all();

            if($request->has('author_img')){
                $this->removeAuthorImageFromStorage($author->thumnail);
                $data['author_img'] = $this->saveAuthorImage($request->file('author_img'));
            }

            $data['author_slug'] = Str::slug($request->author_name);
            $author->update($data);

            return redirect()->route('admin.authors.index')->with([
                'success' => 'tác giả đã được cập nhật thành công'
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Author $author)
    {
        $this->removeAuthorImageFromStorage($author->author_img);

        $author->delete();

        return redirect()->route('admin.authors.index')->with([
                'success' => 'Tác giả đã được xóa thành công'
            ]);
    }


    public function saveAuthorImage($file){
        $image_name = time().'_'.$file->getClientOriginalName();
        $file->storeAs('images/authors/', $image_name, 'public');
        return 'storage/images/authors/'.$image_name;
    }

    public function removeAuthorImageFromStorage($file){
        $path = public_path($file);

        if(File::exists($path)){
            File::delete($path);
        }
    }

}
