import React, { useContext } from "react";
import { ReviewContext } from "../context/reviewContext";
import ReviewCard from "../ReviewCard/ReviewCard";

export default function ReviewsList() {
  const { book } = useContext(ReviewContext);
  return (
    <ul className="list-group-item my-5">
      {book?.reviews?.map((review) => (
        <ReviewCard key={review.rating_id} review={review} />
      ))}
    </ul>
  );
}
