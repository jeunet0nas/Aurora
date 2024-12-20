import React, { useEffect } from "react";
import { Card, Row, Col, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import "./Checkout.css";
import Coupon from "../../components/Coupon/Coupon";
import Alert from "../../layouts/Alert";
import {
  addCouponIdToCartItem,
  setValidCoupon,
} from "../../redux/slices/cartSlice";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import UpdateUserInfos from "../../components/UpdateUserInfos/UpdateUserInfos";

export default function Checkout() {
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const { cartItems, validCoupon } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate("/authenticate");
  }, [isLoggedIn]);

  const totalOfCartItems = cartItems.reduce(
    (acc, item) => (acc += item.price * item.qty),
    0
  );

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
        <Row className="checkout-row my-2">
          <Col md={7}>
            <UpdateUserInfos profile={false} />
          </Col>
          <Col md={5}>
            <div className="checkout-sumary">
              <div className="checkout-summary-header">
                <h5 className="checkout-summary-title">Hóa đơn</h5>
                <Link to="/cart" className="checkout-edit">
                  <FaEdit className="me-1" /> Chỉnh sửa
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
            </div>
            <div className="my-3">
              {user?.profile_completed ? (
                <Link to="/" className="btn btn-primary rounded-0">
                  Mua hàng
                </Link>
              ) : (
                <Alert
                  content="Hãy nhập thông tin để thanh toán"
                  type="warning"
                />
              )}
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
