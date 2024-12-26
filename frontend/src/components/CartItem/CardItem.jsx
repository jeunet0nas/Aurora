import React from "react";
import { ListGroup, Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  incrementQ,
  decrementQ,
  removeFromCart,
} from "../../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import "./CardItem.css";

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  return (
    <>
      <ListGroup.Item className="cart-item d-flex justify-content-between align-items-center">
        <div className="cart-item-details">
          <img src={item.image} alt={item.name} className="cart-item-image" />
          <div>
            <h5>
              <Link to={`/book/${item.slug}`} className="book-item-title">
                {item.name}
              </Link>
            </h5>
            <p className="book-item-detail">{item.author}</p>
            <p className="book-item-detail">{item.price} vnđ</p>
          </div>
        </div>
        <div className="cart-item-actions">
          <div className="cart-item-quantity">
            <Button
              variant="outline-secondary"
              onClick={() => dispatch(decrementQ(item))}
            >
              -
            </Button>
            <span className="quantity">{item.qty}</span>
            <Button
              variant="outline-secondary"
              onClick={() => dispatch(incrementQ(item))}
            >
              +
            </Button>
          </div>
          <div className="cart-item-remove">
            <Button
              variant="danger"
              className="btn-delete-cart-item"
              onClick={() => dispatch(removeFromCart(item))}
            >
              <FaTrash className="icon-trash" />
            </Button>
          </div>
        </div>
      </ListGroup.Item>

      <hr className="cart-item-divider" />
    </>
  );
}
