import React, { useContext } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { ReviewContext } from "../context/reviewContext";
import { Rating } from "react-simple-star-rating";
import { axiosRequest, getConfig } from "../../../helpers/config";
import { Button, Form, Card, Row, Col } from "react-bootstrap";
import "./ReviewForm.css";

export default function ReviewForm() {
  const { token, user } = useSelector((state) => state.user);
  const {
    book,
    review,
    setReview,
    setLoading,
    handleRating,
    clearReview,
    updating,
  } = useContext(ReviewContext);

  const addReview = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosRequest.post(
        "review/store",
        review,
        getConfig(token)
      );
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success(response.data.message);
        clearReview();
      }
    } catch (error) {
      console.log(error);
      toast.error("Thêm đánh giá không thành công");
    }
  };

  const updateReview = async (e) => {
    e.preventDefault();
    // setLoading(true);
    try {
      const response = await axiosRequest.put(
        "review/update",
        review,
        getConfig(token)
      );
      if (response.data.error) {
        toast.error(response.data.error);
        setLoading(false);
      } else {
        book.reviews = book.reviews.filter(
          (item) => item.rating_id !== review.rating_id
        );
        toast.success(response.data.message);
        clearReview();
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Cập nhật đánh giá không thành công");
      setLoading(false);
    }
  };

  return (
    <Row className="review-form-container my-5">
      <Col md={8} className="mx-auto">
        <Card className="review-form-card ">
          <Card.Header className="review-form-header ">
            <h4 className="review-header text-center mt-2">
              {!updating ? "Thêm " : "Cập nhật "}đánh giá
            </h4>
          </Card.Header>
          <Card.Body className="review-form-body">
            <Form onSubmit={updating ? updateReview : addReview}>
              <Form.Group className="review-detail mb-3" controlId="title">
                <Form.Label className="review-detail-label">Tiêu đề</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập tiêu đề"
                  value={review.title}
                  onChange={(e) =>
                    setReview({
                      ...review,
                      title: e.target.value,
                    })
                  }
                  required
                  className="review-detail-control"
                />
              </Form.Group>

              <Form.Group className="review-detail mb-3" controlId="detail">
                <Form.Label className="review-detail-label">
                  Chi tiết
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Hãy nêu cảm nhận của bạn"
                  value={review.detail}
                  onChange={(e) =>
                    setReview({
                      ...review,
                      detail: e.target.value,
                    })
                  }
                  className="review-detail-control"
                />
              </Form.Group>

              <div className="review-form-rating mb-3">
                <Rating
                  initialValue={review.rating}
                  onClick={handleRating}
                  size={32}
                  fillColor="#ff9855"
                />

                <div>
                  {!updating ? (
                    <Button
                      disabled={
                        !review.title || !review.detail || review.rating === 0
                      }
                      variant="primary"
                      type="submit"
                      className="review-submit-btn"
                    >
                      Gửi
                    </Button>
                  ) : (
                    <>
                      <Button
                        disabled={
                          !review.title || !review.detail || review.rating === 0
                        }
                        variant="primary"
                        type="submit"
                        className="review-update-btn"
                      >
                        Cập nhật
                      </Button>
                      <Button
                        variant="secondary"
                        type="button"
                        onClick={() => clearReview()}
                        className="review-delete-btn"
                      >
                        Hủy
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
