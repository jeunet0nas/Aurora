import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import { useDebounce } from "use-debounce";
import { FaAngleDown } from "react-icons/fa";
import { GrCatalog } from "react-icons/gr";
import { axiosRequest } from "../../helpers/config";
import BookList from "../../components/BookList/BookList";
import Alert from "../../layouts/Alert";
import Spinner from "../../layouts/Spinner";
import "./Catalog.css";

const languages = ["Tiếng Việt", "Tiếng Anh"];
const genres = [
  "Giả tưởng",
  "Kinh dị",
  "Phiêu lưu",
  "Tâm lý",
  "Trinh thám",
  "Văn học cổ điển",
  "Viễn tưởng",
];

export default function Catalog() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [filters, setFilters] = useState({
    GENRES: [],
    LANGUAGE: [],
    PRICE: { min: "100000", max: "1000000" },
  });
  const [showAllGenres, setShowAllGenres] = useState(false);
  const [showAllLanguages, setShowAllLanguages] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(6);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchAllBooks = async () => {
      setMessage("");
      setLoading(true);
      try {
        if (debouncedSearchTerm[0]) {
          const response = await axiosRequest.get(`books/${searchTerm}/find`);
          if (response.data.data.length > 0) {
            console.log(response.data);
            setBooks(response.data.data);
            setLoading(false);
          } else {
            setMessage("Không có sách phù hợp");
            setLoading(false);
          }
        } else {
          const response = await axiosRequest.get("books");
          console.log(response.data);
          setBooks(response.data.data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchAllBooks();
  }, [debouncedSearchTerm[0]]);

  const handleFilterChange = (type, value) => {
    setFilters((prevFilters) => {
      switch (type) {
        case "GENRES":
          return {
            ...prevFilters,
            GENRES: prevFilters.GENRES.includes(value)
              ? prevFilters.GENRES.filter((genre) => genre !== value)
              : [...prevFilters.GENRES, value],
          };
        case "LANGUAGE":
          return {
            ...prevFilters,
            LANGUAGE: prevFilters.LANGUAGE.includes(value)
              ? prevFilters.LANGUAGE.filter((lang) => lang !== value)
              : [...prevFilters.LANGUAGE, value],
          };
        case "PRICE":
          return { ...prevFilters, PRICE: { ...prevFilters.PRICE, ...value } };
        default:
          return prevFilters;
      }
    });
  };

  const applyFilters = async () => {
    setMessage("");
    setLoading(true);
    console.log(filters);
    try {
      const response = await axiosRequest.get("books/filter", {
        params: {
          genres: filters.GENRES,
          language: filters.LANGUAGE,
          price_min: filters.PRICE.min,
          price_max: filters.PRICE.max,
        },
      });
      if (response.data.data.length > 0) {
        setBooks(response.data.data);
        setCurrentPage(1);
      } else {
        setMessage("Không có sách phù hợp");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container fluid className="catalog-container">
      <Row>
        {/* Thanh filter theo chiều dọc */}
        <Col md={3}>
          <div className=" mb-4 mt-4">
            <h2 className="title-filter">
              <GrCatalog
                style={{ marginRight: "0.5rem", marginBottom: "0.25rem" }}
              />
              Danh mục
            </h2>
          </div>
          <div className="filter-bar">
            <div className="filter-section">
              <h3 className="filter-title">Bộ lọc</h3>
              {/* <p className="opt-checkbox">{books.length} kết quả</p> */}

              <div className="filter-tags mb-4">
                {filters.LANGUAGE.map((lang) => (
                  <span
                    key={lang}
                    className="badge me-2"
                    style={{ background: "#942446" }}
                  >
                    {lang}
                  </span>
                ))}
                {filters.GENRES.map((genre) => (
                  <span
                    key={genre}
                    className="badge me-2"
                    style={{ background: "#942446" }}
                  >
                    {genre}
                  </span>
                ))}
              </div>
              <div className="filter-options mb-4">
                <h3 className="filter-title">Thể loại</h3>
                {genres
                  .slice(0, showAllGenres ? genres.length : 5)
                  .map((genre) => (
                    <Form.Check
                      key={genre}
                      label={genre}
                      onChange={() => handleFilterChange("GENRES", genre)}
                      className="opt-checkbox custom-checkbox"
                    />
                  ))}
                {genres.length > 5 && (
                  <Button
                    variant="link"
                    className="more-detail p-0"
                    onClick={() => setShowAllGenres(!showAllGenres)}
                  >
                    {showAllGenres ? "Rút gọn" : "Xem thêm"} <FaAngleDown />
                  </Button>
                )}
              </div>

              <div className="filter-options mb-4">
                <h3 className="filter-title">Ngôn ngữ</h3>
                {languages
                  .slice(0, showAllLanguages ? languages.length : 5)
                  .map((language) => (
                    <Form.Check
                      key={language}
                      label={language}
                      onChange={() => handleFilterChange("LANGUAGE", language)}
                      className="opt-checkbox"
                    />
                  ))}
                {languages.length > 5 && (
                  <Button
                    variant="link"
                    className="showMore p-0"
                    onClick={() => setShowAllLanguages(!showAllLanguages)}
                  >
                    {showAllLanguages ? "View Less" : "View More"}
                    <FaAngleDown />
                  </Button>
                )}
              </div>

              <div className="filter-price mb-4">
                <h3 className="filter-title">Giá</h3>
                <div className="d-flex gap-2">
                  <Form.Control
                    type="number"
                    placeholder="Min"
                    onChange={(e) =>
                      handleFilterChange("PRICE", { min: e.target.value })
                    }
                    className="catalog-control"
                    defaultValue="100000"
                  />
                  <Form.Control
                    type="number"
                    placeholder="Max"
                    onChange={(e) =>
                      handleFilterChange("PRICE", { max: e.target.value })
                    }
                    className="catalog-control"
                    defaultValue="1000000"
                  />
                </div>
              </div>

              <Button
                variant="primary"
                className="w-100 btn-catalog"
                onClick={applyFilters}
              >
                Lọc kết quả
              </Button>
            </div>
          </div>
        </Col>

        <Col xs={12} sm={12} md={9} className="book-content">
          <div className="catalog-search-bar mb-4 mt-4">
            <div className="d-flex boder-input">
              <Form.Control
                type="search"
                placeholder="Nhập từ khóa cần tìm kiếm"
                className="catalog-control me-2 boder-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          {message ? (
            <Alert type="primary" content="Không tìm thấy sách" />
          ) : loading ? (
            <Spinner />
          ) : (
            <>
              <BookList books={currentBooks} />
              <div className="pagination-container">
                <Button
                  variant="link"
                  className="pagination-button"
                  disabled={currentPage === 1}
                  onClick={() => paginate(currentPage - 1)}
                >
                  Trang trước
                </Button>
                {[...Array(Math.ceil(books.length / booksPerPage))].map(
                  (_, index) => (
                    <Button
                      key={index}
                      variant="link"
                      className={`pagination-button ${
                        index + 1 === currentPage ? "active" : ""
                      }`}
                      active={index + 1 === currentPage}
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </Button>
                  )
                )}
                <Button
                  variant="link"
                  className="pagination-button"
                  disabled={
                    currentPage === Math.ceil(books.length / booksPerPage)
                  }
                  onClick={() => paginate(currentPage + 1)}
                >
                  Trang tiếp theo
                </Button>
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}
