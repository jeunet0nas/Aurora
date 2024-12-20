<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // Lưu người dùng mới
    public function store(StoreUserRequest $request){
        if($request->validated()){
            User::create($request->validated());
            return response()->json([
                'message' => 'Tài khoản đã được đăng kí thành công'
            ]);
        }
    }

    // Đăng nhập
    public function auth(AuthUserRequest $request){
        if($request->validated()){
            $user = User::whereEmail($request->email)->first();
            if(!$user || !Hash::check($request->password, $user->password)){
                return response()->json([
                    'error' => 'Thông tin đăng nhập sai. Vui lòng nhập lại!'
                ]);
            }else {
                return response()->json([
                    'user' => UserResource::make($user),
                    'access_token' => $user->createToken('new_user')->plainTextToken
                ]);
            }
        }
    }

    // Đăng xuất
    public function logout(Request $request){
        $request->user()->currentAccessToken()->delete;
        return response()->json([
            'message' => 'Bạn đã đăng xuất',
        ]);
    }

    // Cập nhật thông tin khác hàng
    public function UpdateUserProfile(Request $request){
        $request->validate([
            'profile_img' => 'image|mimes:png,jpg,jpeg|max:2048'
        ]);

        if($request->has('profile_img')){
            if(File::exists(asset($request->user()->profile_img))){
                File::delete(asset($request->user()->profile_img));
            }
            $file = $request->file('profile_img');
            $profile_image_name = time().'_'.$file->getClientOriginalName();
            $file->storeAs('images/users/', $profile_image_name, 'public');
            $request->user()->update([
                'profile_img' => 'storage/images/users/'.$profile_image_name
            ]);

            return response()->json([
                'message' => 'Ảnh đã cập nhật thành công',
                'user' => UserResource::make($request->user())
            ]);
        }else {
            $request->user()->update([
                'email'=> $request->email,
                'city' => $request->city,
                'province' => $request->province,
                'address' => $request->address,
                'phone_number' => $request->phone_number,
                'profile_completed' => 1,
            ]);

            return response()->json([
                'message' => 'Thông tin cá nhân đã được cập nhật!',
                'user' => UserResource::make($request->user())
            ]);
        }
    }
}
