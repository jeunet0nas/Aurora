import React from "react";
import { Card, Row, Col, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa"; // Import biểu tượng từ react-icons
import { useDispatch } from "react-redux";
import "./Checkout.css"; // Import CSS cho component này
import Coupon from "../../components/Coupon/Coupon";
import {
  addCouponIdToCartItem,
  setValidCoupon,
} from "../../redux/slices/cartSlice";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

export default function Checkout() {
  const { cartItems, validCoupon } = useSelector((state) => state.cart);
  const totalOfCartItems = cartItems.reduce(
    (acc, item) => (acc += item.price * item.qty),
    0
  );
  const dispatch = useDispatch();

  const calculateDiscount = () => {
    return (
      validCoupon?.discount && (totalOfCartItems * validCoupon?.discount) / 100
    );
  };

  const totalAfterDiscount = () => {
    return totalOfCartItems - calculateDiscount();
  };

  const removeCoupon = () => {
    dispatch(
      setValidCoupon({
        coupon_name: "",
        discount: 0,
      })
    );
    dispatch(addCouponIdToCartItem(null));
    toast.success("Đã hủy áp dụng mã giảm giá");
  };

  return (
    <Card className="checkout-card">
      <Card.Body>
        <Row className="checkout-row my-5">
          <Col md={7}>{/* User Infomations */}</Col>
          <Col md={5} className="checkout-sumary">
            <div className="checkout-summary-header">
              <h5 className="checkout-summary-title">Order Summary</h5>
              <Link to="/cart" className="checkout-edit">
                <FaEdit className="me-1" /> Edit
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
                    {totalAfterDiscount()} vnđ
                  </td>
                </tr>
                {validCoupon?.coupon_name && (
                  <tr>
                    <td className="checkout-coupon-label text-start">
                      <FaTrashAlt
                        style={{ cursor: "pointer" }}
                        onClick={() => removeCoupon()}
                      />
                    </td>
                    <td>
                      {validCoupon?.coupon_name} (-{validCoupon?.discount}%)
                    </td>
                    <td className="checkout-coupon-value text-end">
                      -{calculateDiscount()} vnđ
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
            <Coupon />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
