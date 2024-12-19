<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCouponRequest extends FormRequest
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
            'coupon_name' => 'required|max:20|unique:coupons,coupon_name,' . $this->route('coupon')->coupon_id . ',coupon_id',
            'discount' => 'required|min:0|max:100',
            'valid_until' => 'required',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'coupon_name.required' => 'Tên mã giảm giá là bắt buộc.',
            'coupon_name.max' => 'Tên mã giảm giá không được vượt quá 20 ký tự.',
            'coupon_name.unique' => 'Tên mã giảm giá đã tồn tại.',
            'discount.required' => 'Giá trị giảm giá là bắt buộc.',
            'discount.min' => 'Giá trị giảm giá phải ít nhất là 0.',
            'discount.max' => 'Giá trị giảm giá không được vượt quá 100.',
            'valid_until.required' => 'Ngày hết hạn là bắt buộc.',
        ];
    }
}
