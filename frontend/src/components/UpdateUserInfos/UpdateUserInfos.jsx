import React, { useState } from "react";
import {
  Button,
  Form,
  Card,
  Col,
  Spinner as BootstrapSpinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { axiosRequest, getConfig } from "../../helpers/config";
import { setCurrentUser } from "../../redux/slices/userSlice";
import Spinner from "../../layouts/Spinner";
import "./UpdateUserInfos.css";

export default function UpdateUserInfos({ profile }) {
  const { user, token } = useSelector((state) => state.user);
  const [userInfos, setUserInfos] = useState({
    email: user?.email,
    phone_number: user?.phone_number,
    address: user?.address,
    city: user?.city,
    province: user?.province,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const updateUserInfos = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosRequest.put(
        "user/profile/update",
        userInfos,
        getConfig(token)
      );
      dispatch(setCurrentUser(response.data.user));
      setLoading(false);
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Col md={8} className="update-user-infos mx-auto">
      <Card className="update-user-infos-card shadow-sm border-0">
        <Card.Header className="update-user-infos-header text-center border-0">
          <h5 className="user-infos-header ">
            {profile ? "Thông tin khách hàng" : "Thông tin thanh toán"}
          </h5>
        </Card.Header>
        <Card.Body className="update-user-infos-body">
          <Form onSubmit={updateUserInfos} className="update-user-infos-form">
            <Form.Group
              className="update-user-infos-group mb-3"
              controlId="email"
            >
              <Form.Label className="user-infos-label">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Nhập email"
                value={userInfos.email || ""}
                onChange={(e) =>
                  setUserInfos({
                    ...userInfos,
                    email: e.target.value,
                  })
                }
                required
                className="update-user-infos-control"
              />
            </Form.Group>

            <Form.Group
              className="update-user-infos-group mb-3"
              controlId="phone_number"
            >
              <Form.Label className="user-infos-label">
                Số điện thoại
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập số điện thoại"
                value={userInfos.phone_number || ""}
                onChange={(e) =>
                  setUserInfos({
                    ...userInfos,
                    phone_number: e.target.value,
                  })
                }
                required
                className="update-user-infos-control"
              />
            </Form.Group>

            <Form.Group
              className="update-user-infos-group mb-3"
              controlId="city"
            >
              <Form.Label className="user-infos-label">Thành phố</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tên thành phố"
                value={userInfos.city || ""}
                onChange={(e) =>
                  setUserInfos({
                    ...userInfos,
                    city: e.target.value,
                  })
                }
                required
                className="update-user-infos-control"
              />
            </Form.Group>

            <Form.Group
              className="update-user-infos-group mb-3"
              controlId="province"
            >
              <Form.Label className="user-infos-label">Phường/Xã</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập phường, xã"
                value={userInfos.province || ""}
                onChange={(e) =>
                  setUserInfos({
                    ...userInfos,
                    province: e.target.value,
                  })
                }
                required
                className="update-user-infos-control"
              />
            </Form.Group>

            <Form.Group
              className="update-user-infos-group mb-3"
              controlId="address"
            >
              <Form.Label className="user-infos-label">Địa chỉ</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập địa chỉ"
                value={userInfos.address || ""}
                onChange={(e) =>
                  setUserInfos({
                    ...userInfos,
                    address: e.target.value,
                  })
                }
                required
                className="update-user-infos-control"
              />
            </Form.Group>

            {loading ? (
              <BootstrapSpinner animation="border" />
            ) : (
              <Button
                variant="primary"
                type="submit"
                className="update-user-infos-button"
              >
                Cập nhật
              </Button>
            )}
          </Form>
        </Card.Body>
      </Card>
    </Col>
  );
}
