import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container">
          <div className="footer__logo">AURORA</div>
          <div className="footer__social">
            <FaInstagram className="footer__icon" />
            <FaFacebook className="footer__icon" />
            <FaTwitter className="footer__icon" />
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container">
          <nav className="footer__nav">
            <Link to="/terms" className="footer__link">
              Terms and conditions
            </Link>
            <Link to="/privacy" className="footer__link">
              Privacy policy
            </Link>
          </nav>
          <div className="footer__contact">support@aurora.com</div>
        </div>
      </div>
    </footer>
  );
}
