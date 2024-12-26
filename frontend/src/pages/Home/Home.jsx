import React, { useEffect, useState } from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import MultiItemSlider from "../../components/MutltiItemSlider/MultiItemSlider";
import Slider from "../../components/Slider/Slider";
import { axiosRequest } from "../../helpers/config";
import "./Home.css";

export default function Home() {
  const [booksNewArrival, setBooksNewArrival] = useState([]);
  const [booksBestSeller, setBooksBestSeller] = useState([]);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchNewArrivalBooks = async () => {
      try {
        const response = await axiosRequest.get("books");
        setBooksNewArrival(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchBestSellerBooks = async () => {
      try {
        const response = await axiosRequest.get("best-sellers");
        setBooksBestSeller(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchAuthors = async () => {
      try {
        const response = await axiosRequest.get("authors");
        setAuthors(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNewArrivalBooks();
    fetchBestSellerBooks();
    fetchAuthors();
    console.log(booksNewArrival);
    console.log(authors);
  }, []);

  return (
    <Container fluid className="home-page">
      <Row>
        <Col>
          {/* Khu vực Carousel */}
          <Slider />
        </Col>
      </Row>

      <Row className="home-new-arrival-row">
        <Col className="home-new-arrival-col">
          {/* Khu vực MultiItem Slider cho New Arrival */}
          <h2 className="home-page-tilte">New Arrival</h2>
          <MultiItemSlider items={booksNewArrival} itemType="book" />
        </Col>
      </Row>

      <Row className="home-best-seller-row">
        <Col>
          {/* Khu vực MultiItem Slider cho Best Seller */}
          <h2 className="home-page-tilte">Best Seller</h2>
          <MultiItemSlider items={booksBestSeller} itemType="book" />
        </Col>
      </Row>

      <Row className="home-authors-row">
        <Col>
          {/* Khu vực MultiItem Slider cho Tác giả */}
          <h2 className="home-page-tilte">Tác giả</h2>
          <MultiItemSlider items={authors} itemType="author" />
        </Col>
      </Row>
    </Container>
  );
}
