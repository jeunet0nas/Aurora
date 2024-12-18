import React from "react";
import { Card, Row, Col, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa"; // Import biểu tượng từ react-icons
import "./Checkout.css"; // Import CSS cho component này

export default function Checkout() {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <Card className="checkout-card">
      <Card.Body>
        <Row className="checkout-row my-5">
          <Col md={7}>{/* User Infomations */}</Col>
          <Col md={5} className="checkout-sumary">
            <div className="checkout-summary-header">
              <h5 className="checkout-summary-title">Order Summary</h5>
              <Link to="/edit" className="checkout-edit">
                <FaEdit className="me-1" /> edit
              </Link>
            </div>
            <Table className="checkout-table">
              <thead>
                <tr>
                  <th className="text-start">
                    <strong>Books</strong>
                  </th>
                  <th className="text-center">
                    <strong>QTY</strong>
                  </th>
                  <th className="text-end">
                    <strong>Price</strong>
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.book_id}>
                    <td className="text-start">{item.name}</td>
                    <td className="text-center">{item.qty}</td>
                    <td className="text-end">{item.price * item.qty} vnđ</td>
                  </tr>
                ))}
                <tr>
                  <td
                    colSpan="2"
                    className="checkout-total-label fw-bold text-start"
                  >
                    Total
                  </td>
                  <td className="checkout-total-value fw-bold text-end">
                    - 32
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" className="checkout-coupon-label text-start">
                    Coupon
                  </td>
                  <td className="checkout-coupon-value text-end">200</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
