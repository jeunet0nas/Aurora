import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosRequest } from "../../helpers/config";
import { GoComment } from "react-icons/go";
import { FaRegStar } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Alert from "../../layouts/Alert";
import { ToastContainer, toast } from "react-toastify";
import "./BookDetail.css";
import "./ProductInfo.css";
import Spinner from "../../layouts/Spinner";
import { useDispatch } from "react-redux";
import { addToCart, clearCartItems } from "../../redux/slices/cartSlice";
import Reviews from "../../components/reviews/Reviews";

export default function BookDetail() {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(false);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookBySlug = async () => {
      setLoading(true);
      try {
        const response = await axiosRequest.get(`book/${slug}/show`);
        setBook(response.data.data);
        setLoading(false);
      } catch (error) {
        if (error?.response?.status === 404) {
          setError("Sách bạn truy cập không tồn tại");
        }
        console.log(error);
        setLoading(false);
      }
    };
    fetchBookBySlug();
  }, [slug]);

  const handleBuy = () => {
    dispatch(clearCartItems());
    dispatch(
      addToCart({
        book_id: book.book_id,
        name: book.book_name,
        slug: book.slug,
        qty: parseInt(qty),
        price: parseInt(book.book_price),
        author: book.author_name,
        maxQty: parseInt(book.book_qty),
        image: book.thumbnail,
        coupon_id: null,
      })
    );
    navigate("/checkout");
  };

  const calReviewAVG = () => {
    let average = book?.reviews?.reduce((acc, review) => {
      return (acc += review.rating / book.reviews.length);
    }, 0);

    return average > 0 ? average.toFixed(1) : 0;
  };

  return (
    <div className="product-page">
      {error ? (
        <Alert conten={error} type="danger" />
      ) : loading ? (
        <Spinner />
      ) : (
        <>
          <div className="product-info-container">
            <div className="product-info d-flex">
              <div className="product-image">
                <div className="book-image">
                  <Image
                    src={book?.thumbnail}
                    alt="Hình ảnh sách"
                    className="custom-image"
                    fluid
                  />
                </div>
              </div>

              <div className="product-details flex-grow-1">
                <div className="book-introduction">
                  <h2>{book?.book_name}</h2>
                  <p>{book?.author_name}</p>
                </div>
                <div className="rating-info">
                  <label className="rating-comment">
                    <GoComment className="icon" />
                    {calReviewAVG() > 0 ? book?.reviews.length : 0}
                  </label>
                  <label className="rating-comment">
                    <FaRegStar className="icon" />{" "}
                    {calReviewAVG() > 0 ? calReviewAVG() : "N/A"}
                  </label>
                </div>
                <div className="book-info">
                  <div className="info-item">
                    <strong>Thể loại:</strong> {book?.category}
                  </div>
                  <div className="info-item">
                    <strong>Năm xuất bản:</strong>
                    {book?.publish_year}
                  </div>
                  <div className="info-item">
                    <strong>Ngôn ngữ:</strong>
                    {book?.language}
                  </div>
                  <div className="info-item">
                    <strong>Số trang:</strong>
                    {book?.page}
                  </div>
                </div>

                <span id="book-price">{book?.book_price} vnđ</span>

                <div className="book-action d-flex gap-3 mt-3">
                  {book.book_qty == 0 || book.status == 0 ? (
                    <div className="not-available">
                      <span
                        className="badge my-1 rounded-0"
                        style={{ background: "#942446", color: "#fefefe" }}
                      >
                        Tạm ngưng bán
                      </span>
                    </div>
                  ) : (
                    <>
                      <Button
                        variant="outline-danger"
                        id="btn-addToCart"
                        onClick={() =>
                          dispatch(
                            addToCart({
                              book_id: book.book_id,
                              name: book.book_name,
                              slug: book.slug,
                              qty: parseInt(qty),
                              price: parseInt(book.book_price),
                              author: book.author_name,
                              maxQty: parseInt(book.book_qty),
                              image: book.thumbnail,
                              coupon_id: null,
                            })
                          )
                        }
                      >
                        Thêm vào giỏ
                      </Button>
                      <Button variant="danger" id="btn-buy" onClick={handleBuy}>
                        Mua
                      </Button>
                    </>
                  )}
                </div>
              </div>

              <div className="book-description">
                <h3>About</h3>
                <p>{book?.desc}</p>
              </div>
            </div>
          </div>

          {book?.reviews?.length > 0 && (
            <div className="product-reviews">
              <h2>Đánh giá khách hàng ({book?.reviews?.length})</h2>
              <Reviews book={book} setLoading={setLoading} />
            </div>
          )}

          <div className="related-products">
            <h2>CÓ THỂ BẠN SẼ THÍCH</h2>
          </div>
        </>
      )}
    </div>
  );
}
