import React, { useEffect, useState } from "react";
import { Image, Container, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { axiosRequest } from "../../helpers/config";
import {
  setCurrentUser,
  setLoggedInOut,
  setToken,
} from "../../redux/slices/userSlice";
import Spinner from "../../layouts/Spinner";
import useValidations from "../../components/custom/useValidations";
import bgImage from "../../assets/common/login-bg.jpg";
import logo from "../../assets/common/aurora_red.svg";
import "./LoginSignup.css";

export default function LoginSignup() {
  const { isLoggedIn } = useSelector((state) => state.user);
  const [action, setAction] = useState("Login");
  const [user, setUser] = useState({
    customer_name: "",
    email: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangeAction = () => {
    setValidationErrors([]);
    setAction(action === "Login" ? "Sign Up" : "Login");
  };

  const handleSubmit = (e) => {
    if (action === "Login") {
      handleLogin();
    } else {
      handleSignUp();
    }
  };

  const handleLogin = (e) => {
    loginUser(e);
  };

  const handleSignUp = (e) => {
    registerNewUser(e);
  };

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  const registerNewUser = async (e) => {
    setValidationErrors([]);
    setLoading(true);
    try {
      console.log(user);
      const response = await axiosRequest.post("user/register", user);
      setLoading(false);
      toast.success(response.data.message);
      setAction("Login");
    } catch (error) {
      if (error?.response?.status === 422) {
        setValidationErrors(error.response.data.errors);
      }
      console.log(error);
      setLoading(false);
    }
  };

  const loginUser = async (e) => {
    setValidationErrors([]);
    setLoading(true);
    console.log(user);
    try {
      const response = await axiosRequest.post("user/login", user);
      setLoading(false);
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        dispatch(setCurrentUser(response.data.user));
        dispatch(setToken(response.data.access_token));
        dispatch(setLoggedInOut(true));
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      if (error?.response?.status === 422) {
        setValidationErrors(error.response.data.errors);
      }
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Container fluid className="login-signup-container">
      <Row className="login-signup-row">
        <Col xs={12} md={7} lg={8} className="login-signup-image-col">
          <Image src={bgImage} fluid className="login-signup-image" />
        </Col>
        <Col xs={12} md={5} lg={4} className="login-signup-form-col">
          <div className="login-signup-form">
            {/* Logo */}
            <div className="login-signup-logo">
              <div className="login-signup-logo-inner">
                <Link to="/">
                  <img
                    src={logo}
                    alt="Aurora Logo"
                    className="login-signup-logo-image"
                  />
                </Link>
              </div>
            </div>

            {/* Header */}
            <div className="login-signup-header">
              <h1 className="login-signup-title">
                {action === "Login"
                  ? "Login To Get Start"
                  : "Nice To Meet You, Friend"}
              </h1>
              <p className="login-signup-subtitle">
                {action === "Login"
                  ? "Welcome Back! Let's Groove"
                  : "Together from now!"}
              </p>
            </div>

            {/* Login Form */}
            <form className="login-signup-form-inner">
              {action === "Sign Up" && (
                <>
                  <div className="login-signup-input-group">
                    <input
                      id="name"
                      type="text"
                      placeholder="Tên người dùng"
                      className="login-signup-input"
                      value={user.customer_name}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          customer_name: e.target.value,
                        })
                      }
                    />
                  </div>
                  {useValidations(validationErrors, "customer_name")}
                </>
              )}
              <div className="login-signup-input-group">
                <input
                  type="email"
                  placeholder="Email"
                  className="login-signup-input"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>
              {useValidations(validationErrors, "email")}

              <div className="login-signup-input-group">
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  className="login-signup-input"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </div>
              {useValidations(validationErrors, "password")}

              {/* Divider */}
              <div className="login-signup-divider">
                <div className="login-signup-divider-line"></div>
              </div>

              {loading ? (
                <Spinner />
              ) : (
                <div className="login-signup-submit-group">
                  <Button
                    type="button"
                    className={
                      action === "Login"
                        ? "login-signup-enable"
                        : "login-signup-disable"
                    }
                    onClick={
                      action === "Login" ? handleSubmit : handleChangeAction
                    }
                  >
                    Đăng nhập
                  </Button>
                  <Button
                    type="button"
                    className={
                      action === "Sign Up"
                        ? "login-signup-enable"
                        : "login-signup-disable"
                    }
                    onClick={
                      action === "Sign Up" ? handleSubmit : handleChangeAction
                    }
                  >
                    Đăng ký
                  </Button>
                </div>
              )}
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
