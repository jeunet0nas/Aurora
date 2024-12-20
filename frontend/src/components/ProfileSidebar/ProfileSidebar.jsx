import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useValidations from "../custom/useValidations";
import { axiosRequest, getConfig } from "../../helpers/config";
import { setCurrentUser } from "../../redux/slices/userSlice";
import { toast } from "react-toastify";
import {
  Card,
  Col,
  Image,
  Form,
  Button,
  ListGroup,
  Spinner as BootstrapSpinner,
} from "react-bootstrap";
import { FaIdCardAlt, FaClipboardList, FaUserLock } from "react-icons/fa";
import "./ProfileSidebar.css";

export default function ProfileSidebar() {
  const { user, token } = useSelector((state) => state.user);
  const [image, setImage] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const fileInput = useRef();

  const updateProfileImage = async () => {
    setValidationErrors([]);
    setLoading(true);

    const formData = new FormData();
    formData.append("profile_img", image);
    formData.append("_method", "PUT");

    try {
      const response = await axiosRequest.post(
        "user/profile/update",
        formData,
        getConfig(token, "multipart/form-data")
      );
      dispatch(setCurrentUser(response.data.user));
      setImage("");
      setLoading(false);
      fileInput.current.value = "";
      toast.success(response.data.message);
    } catch (error) {
      if (error?.response?.status === 422) {
        setValidationErrors(error.response.data.errors);
      }
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Col md={4} className="profile-sidebar">
      <Card className="profile-sidebar-card p-2 border-0">
        <div className="profile-sidebar-content d-flex flex-column justify-content-center align-items-center">
          <Image
            src={user?.profile_img}
            alt={user?.customer_name}
            width={150}
            height={150}
            roundedCircle
          />
          <Form.Group className="profile-sidebar-form-group my-3">
            <Form.Control
              type="file"
              accept="image/*"
              ref={fileInput}
              onChange={(e) => setImage(e.target.files[0])}
              className="profile-sidebar-input form-control"
            />
            {useValidations(validationErrors, "profile_img")}
            {loading ? (
              <span className="profile-sidebar-loading text-dark fw-bold mx-1 mt-1">
                Đang tải
              </span>
            ) : (
              <div className="d-flex justify-content-center">
                <Button
                  size="sm"
                  variant="primary"
                  onClick={updateProfileImage}
                  disabled={!image}
                  className="profile-sidebar-button"
                >
                  Tải ảnh
                </Button>
              </div>
            )}
          </Form.Group>
        </div>
      </Card>

      <ListGroup className="profile-sidebar-list w-100 mt-2">
        <ListGroup.Item className="profile-sidebar-list-item">
          <FaIdCardAlt className="profile-user-icon" /> {user?.customer_name}
        </ListGroup.Item>
        <ListGroup.Item className="profile-sidebar-list-item">
          <FaUserLock className="profile-user-icon" /> {user?.email}
        </ListGroup.Item>
        <ListGroup.Item className="profile-sidebar-list-item">
          <Link
            to="/user/orders"
            className="profile-sidebar-link text-decoration-none text-dark"
          >
            <FaClipboardList className="profile-user-icon" /> Đơn hàng của tôi
          </Link>
        </ListGroup.Item>
      </ListGroup>
    </Col>
  );
}
