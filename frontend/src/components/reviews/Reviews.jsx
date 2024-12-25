import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ReviewContext } from "./context/reviewContext";
import ReviewForm from "./ReviewForm/ReviewForm";
import ReviewsList from "./ReviewsList/ReviewsList";

export default function Reviews({ book, setLoading }) {
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const [review, setReview] = useState({
    book_id: book?.book_id,
    customer_id: user?.customer_id,
    title: "",
    detail: "",
    rating: 0,
  });
  const [updating, setUpdating] = useState(false);

  const handleRating = (rating) => {
    setReview({
      ...review,
      rating,
    });
  };

  const editReview = (data) => {
    setReview(data);
    setUpdating(true);
  };

  const clearReview = () => {
    setReview({
      book_id: book?.book_id,
      customer_id: user?.customer_id,
      title: "",
      detail: "",
      rating: 0,
    });

    if (updating) {
      setUpdating(false);
    }
  };

  const hasPurchased = () => {
    return user?.orders?.some(
      (order) =>
        order?.books?.some((item) => item.book_id === book.book_id) &&
        order?.delivered_at !== null
    );
  };

  return (
    <ReviewContext.Provider
      value={{
        book,
        review,
        setReview,
        setLoading,
        handleRating,
        clearReview,
        updating,
        setUpdating,
        editReview,
      }}
    >
      {isLoggedIn && hasPurchased() && <ReviewForm />}
      <ReviewsList />
    </ReviewContext.Provider>
  );
}
