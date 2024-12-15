<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAuthorRequest extends FormRequest
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
            'author_name' => 'required|max:255|unique:authors,author_name,' . $this->route('author')->author_id . ',author_id',
            'yob' => 'required|numeric|min:1800|max:' . date('Y'),
            'nationality' => 'required|max:30',
            'author_desc' => 'required|max:1500',
            'author_img' => 'nullable|image|mimes:png,jpg,jpeg|max:2048',
        ];
    }

    public function messages(): array
    {
        return [
            'author_name.required' => 'Tên tác giả là bắt buộc',
            'author_name.unique' => 'Tên tác giả đã tồn tại',
            'yob.required' => 'Năm sinh là bắt buộc',
            'yob.numeric' => 'Năm sinh phải là số',
            'yob.min' => 'Năm sinh phải lớn hơn hoặc bằng 1800',
            'yob.max' => 'Năm sinh phải nhỏ hơn hoặc bằng năm hiện tại',
            'nationality.required' => 'Quốc tịch là bắt buộc',
            'nationality.max' => 'Quốc tịch không quá 30 kí tự',
            'author_desc.required' => 'Mô tả là bắt buộc',
            'author_desc.max' => 'Mô tả không quá 1500 kí tự',
            'author_img.image' => 'Ảnh tác giả phải có định dạng phù hợp',
            'author_img.mimes' => 'Ảnh tác giả phải có định dạng png, jpg, jpeg',
            'author_img.max' => 'Ảnh tác giả không vượt quá 2MB',
        ];
    }
}
