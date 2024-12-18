import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaShoppingBag, FaBookmark, FaSearch } from "react-icons/fa";
import "./Header.css";
import logo from "../assets/common/aurora_red.svg";
import { useSelector } from "react-redux";

export default function Header() {
  const { cartItems } = useSelector((state) => state.cart);
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
            {/* <Button className="header__login">Login</Button> */}
            <Link to="/login" className="header__login">
              Login
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
