import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaShoppingBag, FaBookmark, FaSearch, FaUser } from "react-icons/fa";
import { RiLogoutBoxRFill } from "react-icons/ri";
import "./Header.css";
import logo from "../assets/common/aurora_red.svg";
import { useSelector } from "react-redux";
import { axiosRequest, getConfig } from "../helpers/config";
import {
  setCurrentUser,
  setLoggedInOut,
  setToken,
} from "../redux/slices/userSlice";
import { toast } from "react-toastify";

export default function Header() {
  const { isLoggedIn, token, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        const response = await axiosRequest.get("user", getConfig(token));
        dispatch(setCurrentUser(response.data.user));
      } catch (error) {
        if (error?.response?.status === 401) {
          dispatch(setCurrentUser(null));
          dispatch(setToken(""));
          dispatch(setLoggedInOut(false));
        }
        console.log(error);
      }
    };
    if (token) getLoggedInUser();
  }, [token]);

  const logoutUser = async () => {
    try {
      const response = await axiosRequest.post(
        "user/logout",
        null,
        getConfig(token)
      );
      dispatch(setCurrentUser(null));
      dispatch(setToken(""));
      dispatch(setLoggedInOut(false));
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar expand="md" className="header" variant="dark">
      <Container>
        <Navbar.Brand className="header__logo" href="/">
          <img src={logo} alt="Aurora Logo" style={{ height: "4rem", marginLeft:"-1rem" }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto header__nav">
            <Nav.Link as={Link} to="/catalog" className="header__link">
              Danh mục
            </Nav.Link>
            <Nav.Link as={Link} to="/about-us" className="header__link">
              Về chúng tôi
            </Nav.Link>
          </Nav>
          <div className="header__icons d-flex align-items-center gap-3">
            <Link to="/cart" className="header__icon">
              <FaShoppingBag /> {cartItems.length}
            </Link>

            {isLoggedIn ? (
              <>
                <Link to="/profile" className="header__icon">
                  <FaUser /> {user?.customer_name}
                </Link>
                <Link
                  to="#"
                  className="header__icon"
                  onClick={() => logoutUser()}
                >
                  <RiLogoutBoxRFill /> Đăng xuất
                </Link>
              </>
            ) : (
              <>
                <Link to="/authenticate" className="header__login">
                  Đăng nhập
                </Link>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
