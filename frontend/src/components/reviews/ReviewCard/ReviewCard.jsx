import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
import { Dropdown } from "react-bootstrap";
import { FaAlignJustify, FaPen, FaTrash } from "react-icons/fa";
import { IoStar } from "react-icons/io5";
import { axiosRequest, getConfig } from "../../../helpers/config";
import { toast } from "react-toastify";
import { ReviewContext } from "../context/reviewContext";
import "./ReviewCard.css";

export default function ReviewCard({ review }) {
  const { user, token } = useSelector((state) => state.user);
  const { book, setLoading, clearReview, editReview } =
    useContext(ReviewContext);

  const renderReviewActions = () =>
    review?.customer_id === user?.customer_id && (
      <Dropdown className="ms-auto review-card-dropdown">
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          <FaAlignJustify />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => editReview(review)}>
            <FaPen className="mx-2" /> Update
          </Dropdown.Item>
          <Dropdown.Item onClick={() => deleteReview(review)}>
            <FaTrash className="mx-2" /> Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );

  const deleteReview = async (review) => {
    if (confirm("Bạn muốn xóa bình luận ?")) {
      setLoading(true);
      try {
        const response = await axiosRequest.post(
          "review/delete",
          review,
          getConfig(token)
        );
        if (response.data.error) {
          setLoading(false);
          toast.error(response.data.error);
        } else {
          book.reviews = book.reviews.filter(
            (item) => item.rating_id !== review.rating_id
          );
          toast.success(response.data.message);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  return (
    <li className="review-card list-group-item bg-light d-flex justify-content-start align-items-center p-2 mb-2">
      <div className="review-card-image me-2">
        <img
          src={review?.customer?.image_path}
          alt={review?.customer?.customer_name}
          className="rounded-circle"
          width={60}
          height={60}
        />
      </div>
      <div className="review-card-content d-flex flex-column">
        <h6 className="review-title">{review?.title}</h6>
        <Rating
          initialValue={review?.rating}
          readonly
          size={20}
          className="review-rating"
          fillColor="#942446"
        />
        <p className="review-detail">{review?.detail}</p>
        <span className="review-info text-muted">
          {review?.created_at} bởi{" "}
          <span className="fw-bold">{review?.customer?.customer_name}</span>
        </span>
      </div>
      {renderReviewActions()}
    </li>
  );
}
