import React from "react";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Card } from "react-bootstrap";
import { GoComment } from "react-icons/go";
import { FaRegStar } from "react-icons/fa";
import "./MultiItemSlider.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function MultiItemSlider({ items, itemType, limit = 7 }) {
  const limitedItems = items.slice(0, limit);

  const calReviewAVG = (item) => {
    let average = item?.reviews?.reduce((acc, review) => {
      return (acc += review.rating / item.reviews.length);
    }, 0);

    return average > 0 ? average.toFixed(1) : 0;
  };

  const calAuthorBook = (author) => {
    let totalBooks = author?.books.length;
    return totalBooks > 0 ? totalBooks : 0;
  };

  return (
    <Carousel
      responsive={responsive}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={3000}
      className="item-slider"
    >
      {limitedItems.map((item) =>
        itemType === "book" ? (
          <Link
            key={item.book_id}
            className="text-decoration-none text-dark"
            to={`/book/${item.slug}`}
          >
            <Card key={item.book_id} className="book-card">
              <div className="card-image">
                <Card.Img
                  variant="top"
                  src={item.thumbnail}
                  alt={item.book_name}
                  className="book-card-img"
                />
              </div>
              <Card.Body className="card-body">
                <div className="book-card-title">
                  <Card.Title>{item.book_name}</Card.Title>
                </div>
                <div className="book-card-author">
                  <Card.Text>{item.author_name}</Card.Text>
                </div>
                <div className="book-card-rating">
                  <div className="comment-icon">
                    <GoComment />{" "}
                    {calReviewAVG(item) > 0 ? item?.reviews.length : 0}
                  </div>
                  <div className="star-icon">
                    <FaRegStar className="start" />{" "}
                    {calReviewAVG(item) > 0 ? calReviewAVG(item) : "N/A"}
                  </div>
                </div>
                <p className="book-card-price" style={{ fontWeight: "bold" }}>
                  {item.book_price} vnđ
                </p>
              </Card.Body>
            </Card>
          </Link>
        ) : itemType === "author" ? (
          <Link
            key={item.author_id}
            className="text-decoration-none text-dark"
            to={`/author/${item.author_slug}`}
          >
            <Card key={item.author_id} className="book-card">
              <div className="author-image">
                <Card.Img
                  variant="top"
                  src={item.author_img}
                  alt={item.author_name}
                  className="author-card-img"
                />
              </div>
              <Card.Body className="card-body">
                <div className="author-card-title">
                  <Card.Title>{item.author_name}</Card.Title>
                </div>
                <div className="author-card-book">
                  <Card.Text>{calAuthorBook(item)} tác phẩm</Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Link>
        ) : null
      )}
    </Carousel>
  );
}
