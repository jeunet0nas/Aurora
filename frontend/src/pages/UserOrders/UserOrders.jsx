import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Table, Button, Row, Col, Card } from "react-bootstrap";
import { FaShoppingBasket } from "react-icons/fa";
import Alert from "../../layouts/Alert";
import { FaIdCardAlt, FaClipboardList, FaUserLock } from "react-icons/fa";
import "./UserOrders.css";

export default function UserOrders() {
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [ordersToShow, setOrdersToShow] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate("/authenticate");
  }, [isLoggedIn, navigate]);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const loadMoreOrders = () => {
    if (ordersToShow >= user?.orders?.length) {
      return;
    } else {
      setOrdersToShow((preOrdersToShow) => preOrdersToShow + 5);
    }
  };

  return (
    <Row className="user-orders-page my-5">
      <Col md={7}>
        <Card className="user-orders-page-list">
          <Card.Body>
            <h3
              style={{
                marginLeft: "1rem",
                marginTop: "1rem",
                marginBottom: "1.5rem",
                color: "#942446",
              }}
            >
              <FaClipboardList className="profile-user-icon" />
              Danh sách hóa đơn
            </h3>
            {user?.orders?.length > 0 ? (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Mã đơn</th>
                    <th>Tổng tiền</th>
                    <th>Ngày đặt</th>
                    <th>Phương thức</th>
                    <th>Xác nhận</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {user.orders.slice(0, ordersToShow).map((order, index) => (
                    <tr key={index}>
                      <td>{(index += 1)}</td>
                      <td>Đơn hàng #{order.order_id}</td>
                      <td>{order.total_price} vnđ</td>
                      <td>{order.created_at}</td>
                      <td>{order.payment_type}</td>
                      <td>
                        {order.delivered_at ? (
                          <span
                            className="badge my-1 rounded-0"
                            style={{ background: "#942446" }}
                          >
                            {order.delivered_at}
                          </span>
                        ) : (
                          <span
                            className="badge my-1 rounded-0"
                            style={{ background: "#e8d4c0", color: "black" }}
                          >
                            Đang xử lý
                          </span>
                        )}
                      </td>
                      <td>
                        <Button
                          variant="primary"
                          onClick={() => handleOrderClick(order)}
                        >
                          Chi tiết
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <Alert content="Bạn không có hóa đơn nào" type="primary" />
            )}
            {ordersToShow < user?.orders?.length && (
              <div className="d-flex justify-content-center my-3">
                <Button
                  className="btn btn-sm btn-dark"
                  onClick={loadMoreOrders}
                >
                  Tải thêm
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>
      </Col>

      <Col md={5}>
        {user?.orders?.length > 0 ? (
          selectedOrder ? (
            <Card style={{ border: "none" }}>
              <Card.Body className="user-orders-page-detail">
                <h4 style={{ marginLeft: "1rem" }}>
                  Chi tiết hóa đơn #{selectedOrder.order_id}
                </h4>
                <p className="user-order-detail-info">
                  <strong>Tổng tiền:</strong> {selectedOrder.total_price} vnđ
                </p>
                <p className="user-order-detail-info">
                  <strong>Thời gian đặt:</strong> {selectedOrder.created_at}
                </p>
                <p className="user-order-detail-info">
                  <strong>Trạng thái:</strong> {selectedOrder.payment_status}
                </p>
                <p className="user-order-detail-info">
                  <strong>Phương thức thanh toán:</strong>{" "}
                  {selectedOrder.payment_type}
                </p>
                <p className="user-order-detail-info">
                  <strong>Ngày xác nhận:</strong>{" "}
                  {selectedOrder.delivered_at
                    ? selectedOrder.delivered_at
                    : "Chưa xác nhận"}
                </p>
                <h5 style={{ marginLeft: "1rem", marginTop: "2rem" }}>
                  Danh sách sách
                </h5>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Mã sách</th>
                      <th>Tên sách</th>
                      <th>Giá</th>
                      <th>Số lượng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.books.map((book, index) => (
                      <tr key={index}>
                        <td>{(index += 1)}</td>
                        <td>
                          <Link
                            to={`/book/${book.slug}`}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            {book.book_name}
                          </Link>
                        </td>
                        <td>{book.pivot.item_price} vnđ</td>
                        <td>{book.pivot.item_qty}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          ) : (
            <Card style={{ border: "none" }}>
              <Card.Body>
                <h4>Chọn một hóa đơn để xem chi tiết</h4>
              </Card.Body>
            </Card>
          )
        ) : (
          <div className="no-orders">
            <FaShoppingBasket className="order-detail-icon" />
            <h2>Bạn không có đơn hàng nào!</h2>
            <p>Có vẻ đã đến lúc bạn tìm cho mình những cuốn sách </p>
            <Link to="/catalog" style={{ color: "#942446" }}>
              {" "}
              Khám phá
            </Link>
          </div>
        )}
      </Col>
    </Row>
  );
}
