<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'book_id' => $this->book_id,
            'book_name' => $this->book_name,
            'slug' => $this->slug,
            'category' => $this->category,
            'language' => $this->language,
            'publish_year' => $this->publish_year,
            'page' => $this->page,
            'book_qty' => $this->book_qty,
            'book_price' => $this->book_price,
            'desc' => $this->desc,
            'thumbnail' => asset($this->thumbnail),
            'status' => $this->status,
            'author_id' => $this->author_id,
            'author_name' => $this->author->author_name,
            'reviews' => $this->reviews,
        ];
    }
}
