import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaShoppingBag, FaBookmark, FaSearch } from "react-icons/fa";
import "./Header.css";
import logo from "../assets/common/aurora_red.svg";
import { useSelector } from "react-redux";
import { axiosRequest, getConfig } from "../helpers/config";
import {
  setCurrentUser,
  setLoggedInOut,
  setToken,
} from "../redux/slices/userSlice";

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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar expand="md" className="header" variant="dark">
      <Container>
        <Navbar.Brand className="header__logo" href="/">
          <img src={logo} alt="Aurora Logo" style={{ height: "4rem" }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto header__nav">
            <Nav.Link as={Link} to="/catalog" className="header__link">
              Books
            </Nav.Link>
            <Nav.Link as={Link} to="/AboutUs" className="header__link">
              About Us
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className="header__link">
              Contacts
            </Nav.Link>
          </Nav>
          <div className="header__icons d-flex align-items-center gap-3">
            <FaSearch className="header__icon" />
            <FaBookmark className="header__icon" />
            <Link to="/cart">
              <FaShoppingBag className="header__icon" /> {cartItems.length}
            </Link>

            {isLoggedIn ? (
              <>
                <Link to="/profile" className="">
                  {user.customer_name}
                </Link>
                <Link
                  to="#"
                  className="header__login"
                  onClick={() => logoutUser()}
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link to="/authenticate" className="header__login">
                  Login
                </Link>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
