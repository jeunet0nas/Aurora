import React from "react";
import BookListItem from "../BookListItem/BookListItem";
import { Row } from "react-bootstrap";

export default function BookList({ books }) {
  return (
    <Row className="catalog-books mt-5">
      {books?.map((book) => (
        <BookListItem key={book.book_id} book={book} />
      ))}
    </Row>
  );
}
