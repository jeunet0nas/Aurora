import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaComment, FaStar } from "react-icons/fa";
import "./BookListItem.css";

export default function BookListItem({ book }) {
  return (
    <Col key={book.id} xs={12} sm={6} md={6} lg={4} className="mb-2">
      <Link className="text-decoration-none text-dark" to="/detail">
        <Card key={book.book_id} className="book-card">
          <div className="card-image">
            <Card.Img
              variant="top"
              src={book.thumbnail}
              alt={book.book_name}
              className="book-card-img"
            />
          </div>
          <Card.Body className="card-body">
            <div className="book-card-title">
              <Card.Title>{book.book_name}</Card.Title>
            </div>
            <div className="book-card-author">
              <Card.Text>{book.author_name}</Card.Text>
            </div>
            <div className="book-card-rating">
              <div className="comment-icon">
                <FaComment /> 10
              </div>
              <div className="star-icon">
                <FaStar className="start" /> 10
              </div>
            </div>
            <p className="book-card-price" style={{ fontWeight: "bold" }}>
              {book.book_price}
            </p>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
}
