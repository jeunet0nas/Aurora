import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import { addToCart, clearCart } from "../../redux/slices/cartSlice";

export default function BookDetail() {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(false);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const { slug } = useParams();
  const dispatch = useDispatch();

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

  return (
    <div className="product-page">
      {/* <ProductInfo selBook={book} /> */}

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
                    10
                  </label>
                  <label className="rating-comment">
                    <FaRegStar className="icon" /> 10
                  </label>
                </div>
                <div className="book-info">
                  <div className="info-item">
                    <strong>Thể loại:</strong> {book?.category}
                  </div>
                  <div className="info-item">
                    <strong>Năm phát hành:</strong>
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

                <span id="book-price">{book?.book_price}$</span>

                <div className="book-action d-flex gap-3 mt-3">
                  <Button
                    variant="outline-danger"
                    id="btn-addToCart"
                    disabled={book.book_qty == 0}
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
                    ADD TO CART
                  </Button>
                  <Button
                    variant="danger"
                    id="btn-buy"
                    // disabled={!book.isAvailable}
                  >
                    BUY
                  </Button>
                </div>
              </div>

              <div className="book-description">
                <h3>About</h3>
                <p>{book?.desc}</p>
              </div>
            </div>
            <ToastContainer />
          </div>

          <div className="product-reviews">
            <h2>Customer Reviews</h2>
            {/* <ReviewCard reviews={reviews} onAddReview={handleAddReview} /> */}
          </div>

          <div className="related-products">
            <h2>YOU MAY ALSO LIKE</h2>
            {/* <Container className="book-list-container">
          <Row className="book-list-row">
            {booksData.map((book) => (
              <Col
                key={book.id}
                xs={6} 
                sm={6} 
                md={6} 
                lg={6} 
                xl={3} 
                className="book-list-col"
              >
                <BookCard book={book} />
              </Col>
            ))}
          </Row>
        </Container> */}
          </div>
        </>
      )}
    </div>
  );
}
