import React from "react";
import { useSelector } from "react-redux";
import { Container, Card, Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import CartItem from "../../components/CartItem/CardItem";
import "./Cart.css";

export default function Cart() {
  const { cartItems } = useSelector((state) => state.cart);
  const total = cartItems.reduce(
    (acc, item) => (acc += item.price * item.qty),
    0
  );

  return (
    <Container className="shopping-cart-page">
      {/* Khu vực chứa các CartItem */}
      {cartItems.length > 0 ? (
        <div className="cart-items-list">
          <h2 className="heading-cart-title">
            <FaShoppingCart className="cart-icon" />
            Shopping Cart
          </h2>
          <ListGroup>
            {cartItems.map((item, index) => (
              <CartItem key={index} item={item} />
            ))}
          </ListGroup>
        </div>
      ) : (
        <div className="empty-cart">
          <h2>Your Cart is Empty</h2>
          <p>It looks like you haven't added any items to your cart yet.</p>
          <Link to="/" className="btn btn-primary btn-home">
            Back to Home
          </Link>
        </div>
      )}

      {/* Khu vực chứa thông tin tổng giá tiền và nút thanh toán */}
      {cartItems.length > 0 && (
        <div className="shopping-cart-summary-section">
          <Card className="summary-card">
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item className="total-price-item">
                  <h5 className="total-price">
                    <strong>Total Price:</strong> ${total} vnd
                  </h5>
                </ListGroup.Item>
              </ListGroup>

              <div className="shopping-cart-button-group">
                <Link to="/" className="btn btn-primary btn-home">
                  Continue Shopping
                </Link>
                <Link to="/checkout" className="btn btn-checkout">
                  Checkout
                </Link>
              </div>
            </Card.Body>
          </Card>
        </div>
      )}
    </Container>
  );
}
