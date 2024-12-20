import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosRequest, getConfig } from "../../helpers/config";
import { toast } from "react-toastify";
import { Form, Button, Col, Card } from "react-bootstrap";
import Spinner from "../../layouts/Spinner";
import useValidations from "../../components/custom/useValidations";
import { useNavigate } from "react-router-dom";
import "./ChangePassword.css";

export default function ChangePassword() {
  const { token, isLoggedIn } = useSelector((state) => state.user);
  const [passwords, setPasswords] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });
  const [validationErrors, setValidationErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setValidationErrors([]);
    setLoading(true);
    try {
      const response = await axiosRequest.put(
        "user/change-password",
        passwords,
        getConfig(token)
      );
      setLoading(false);
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setPasswords({
          current_password: "",
          new_password: "",
          new_password_confirmation: "",
        });
        toast.success(response.data.message);
        navigate("/profile");
      }
    } catch (error) {
      if (error?.response?.status === 422) {
        setValidationErrors(error.response.data.errors);
      }
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) navigate("/authenticate");
  }, [isLoggedIn]);

  return (
    <Col md={8} className="change-password-container mx-auto">
      <Card className="change-password-card">
        <Card.Header className="change-password-header text-center">
          <h5 className="change-password-header mt-2">Cập nhật mật khẩu</h5>
        </Card.Header>
        <Card.Body className="change-password-body">
          <Form onSubmit={handleChangePassword}>
            <Form.Group
              className="change-password-group mb-3"
              controlId="current_password"
            >
              <Form.Label className="change-password-label">
                Mật khẩu hiện tại
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Nhập mật khẩu hiện tại"
                value={passwords.current_password}
                onChange={(e) =>
                  setPasswords({
                    ...passwords,
                    current_password: e.target.value,
                  })
                }
                className="change-password-control"
              />
              <div className="validation-change-password">
                {useValidations(validationErrors, "current_password")}
              </div>
            </Form.Group>

            <Form.Group
              className="change-password-group mb-3"
              controlId="new_password"
            >
              <Form.Label className="change-password-label">
                Mật khẩu mới
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Nhập mật khẩu mới"
                value={passwords.new_password}
                onChange={(e) =>
                  setPasswords({ ...passwords, new_password: e.target.value })
                }
                className="change-password-control"
              />
              <div className="validation-change-password">
                {useValidations(validationErrors, "new_password")}
              </div>
            </Form.Group>

            <Form.Group
              className="change-password-group mb-3"
              controlId="new_password_confirmation"
            >
              <Form.Label className="change-password-label">
                Xác nhận mật khẩu mới
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Xác nhận mật khẩu mới"
                value={passwords.new_password_confirmation}
                onChange={(e) =>
                  setPasswords({
                    ...passwords,
                    new_password_confirmation: e.target.value,
                  })
                }
                className="change-password-control"
              />
            </Form.Group>

            {loading ? (
              <Spinner />
            ) : (
              <Button
                variant="primary"
                type="submit"
                className="change-password-button"
              >
                Xác nhận
              </Button>
            )}
          </Form>
        </Card.Body>
      </Card>
    </Col>
  );
}
