import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaBookDead } from "react-icons/fa";
import "./NotFound.css";

export default function NotFound() {
  return (
    <Container className="not-found-page text-center my-5">
      <Row>
        <Col>
          <FaBookDead className="not-found-icon" />
          <h2 className="not-found-title">404 Not Found</h2>
          <p className="not-found-text">Nội dung bạn truy cập không tồn tại</p>
          <Link to="/">
            <Button variant="primary" className="not-found-btn">
              Quay trở lại trang chủ
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
