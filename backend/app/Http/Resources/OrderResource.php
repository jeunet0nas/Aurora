<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'order_id' => $this->order_id,
            'total_price' => $this->total_price,
            'created_at' => $this->created_at,
            'delivered_at' => $this->delivered_at ? $this->delivered_at : null,
            'payment_type' => $this->payment_type,
            'payment_status' => $this->payment_status,
            'books' => $this->books,
        ];
    }
}
