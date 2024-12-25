<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // Lấy danh sách người dùng
    public function index(){
        return view('admin.users.index')->with([
            'users' => User::latest()->get()
        ]);
    }

    // Xóa người dùng
    public function destroy(User $review){
        $review->delete();
        return redirect()->route('admin.users.index')->with([
            'success' => 'Người dùng đã được xóa thành công!'
        ]);
    }
}
