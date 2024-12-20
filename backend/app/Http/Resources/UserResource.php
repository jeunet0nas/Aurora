<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'customer_id' => $this->customer_id,
            'customer_name' => $this->customer_name,
            'email' => $this->email,
            'city' => $this->city,
            'province' => $this->province,
            'address' => $this->address,
            'phone_number' => $this->phone_number,
            'profile_img' => $this->image_path(),
            'profile_completed' => $this->profile_completed,
            'orders' => $this->orders,
        ];
    }
}
