<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBookRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'book_name' => 'required|max:255|unique:books,book_name,' . $this->route('book')->book_id . ',book_id',
            'book_qty' => 'required|numeric',
            'book_price' => 'required|numeric',
            'category' => 'required|max:50',
            'page' => 'required|numeric',
            'publish_year' => 'required|numeric',
            'language' => 'required|max:50',
            'desc' => 'required|max:1500',
            'thumbnail' => 'nullable|image|mimes:png,jpg,jpeg|max:2048',
            'author_id' => 'required',
        ];
    }

    public function messages(){
        return [
            'book_name.required' => 'Tên sách là bắt buộc',
            'book_name.unique' => 'Tên sách đã tồn tại',
            'book_qty.required' => 'Số lượng là bắt buộc',
            'book_qty.numeric' => 'Số lượng phải là số',
            'book_price.required' => 'Giá là bắt buộc',
            'book_price.numeric' => 'Giá phải là số',
            'category.required' => 'Thể loại là bắt buộc',
            'category.max' => 'Thể loại không quá 50 kí tự',
            'page.required' => 'Số trang là bắt buộc',
            'page.numeric' => 'Số trang phải là số',
            'publish_year.required' => 'Năm xuất bản là bắt buộc',
            'publish_year.numeric' => 'Năm xuất bản phải là số',
            'language.required' => 'Ngôn ngữ là bắt buộc',
            'language.max' => 'Ngôn ngữ không quá 50 kí tự',
            'desc.required' => 'Mô tả là bắt buộc',
            'desc.max' => 'Mô tả không quá 1500 kí tự',
            'thumbnail.image' => 'Ảnh sản phẩm phải có định dạng phù hợp',
            'thumbnail.mimes' => 'Ảnh sản phẩm phải có định dạng png, jpg, jpeg',
            'thumbnail.max' => 'Ảnh sản phẩm không vượt quá 2MB',
            'author_id.required' => 'Tác giả là bắt buộc',
        ];
    }
}
