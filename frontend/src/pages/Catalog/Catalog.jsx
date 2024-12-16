import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Pagination,
  Container,
} from "react-bootstrap";
import { useDebounce } from "use-debounce";
import { FaAngleDown } from "react-icons/fa";
import { axiosRequest } from "../../helpers/config";
import BookList from "../../components/BookList/BookList";
import Alert from "../../layouts/Alert";
import Spinner from "../../layouts/Spinner";
import "./Catalog.css";

const languages = ["Tiếng Việt", "Tiếng Anh"];
const genres = [
  "Giả tưởng",
  "Trinh thám",
  "Educational",
  "Romance",
  "Adventure",
  "Selfhept",
  "Trinh Thám",
];

export default function Catalog() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [filteredBooks, setFilteredBooks] = useState(books);
  const [showAllLanguages, setShowAllLanguages] = useState(false);
  const [showAllGenres, setShowAllGenres] = useState(false);
  const [filters, setFilters] = useState({
    GENRES: [],
    LANGUAGE: [],
    AUTHOR: "",
    PRICE: { min: "", max: "" },
  });

  const applyFilters = () => {
    const { GENRES, LANGUAGE, AUTHOR, PRICE } = filters;

    const filtered = books.filter((book) => {
      const genresMatch = GENRES.length ? GENRES.includes(book.category) : true;
      const languageMatch = LANGUAGE.length
        ? LANGUAGE.includes(book.language)
        : true;
      const authorMatch = AUTHOR
        ? book.author_name.toLowerCase().includes(AUTHOR.toLowerCase())
        : true;
      const priceMatch =
        (PRICE.min === "" || book.book_price >= Number(PRICE.min)) &&
        (PRICE.max === "" || book.book_price <= Number(PRICE.max));
      const searchMatch = searchText
        ? book.book_name.toLowerCase().includes(searchText.toLowerCase())
        : true;

      return (
        genresMatch && languageMatch && authorMatch && priceMatch && searchMatch
      );
    });

    setFilteredBooks(filtered);
  };

  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      if (type === "GENRES" || type === "LANGUAGE") {
        const isSelected = prev[type].includes(value);
        return {
          ...prev,
          [type]: isSelected
            ? prev[type].filter((item) => item !== value)
            : [...prev[type], value],
        };
      }
      if (type === "AUTHOR") {
        return { ...prev, AUTHOR: value };
      }
      if (type === "PRICE") {
        return { ...prev, PRICE: { ...prev.PRICE, ...value } };
      }
      return prev;
    });
  };

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

  const handleSearch = () => {
    // Implement search functionality here
  };

  return (
    <Container fluid className="catalog-container">
      <Row>
        {/* Thanh filter theo chiều dọc */}
        <Col md={3} className="filter-bar">
          <div className="logo mb-4 mt-4">
            <h2>Books</h2>
          </div>
          <div className="filter-section">
            <h2>Filter</h2>
            <p>{filteredBooks.length} results</p>

            <div className="filter-tags mb-4">
              {filters.LANGUAGE.map((lang) => (
                <span key={lang} className="badge bg-secondary  me-2">
                  {lang}
                </span>
              ))}
              {filters.GENRES.map((lang) => (
                <span key={lang} className="badge bg-secondary  me-2">
                  {lang}
                </span>
              ))}
            </div>
            <div className="filter-options mb-4">
              <h3>Genres</h3>
              {genres
                .slice(0, showAllGenres ? genres.length : 5)
                .map((genres) => (
                  <Form.Check
                    key={genres}
                    label={genres}
                    onChange={() => handleFilterChange("GENRES", genres)}
                  />
                ))}
              {genres.length > 5 && (
                <Button
                  variant="link"
                  className="showMore  p-0"
                  onClick={() => setShowAllGenres(!showAllGenres)}
                >
                  {showAllGenres ? "View Less" : "View More"} <FaAngleDown />
                </Button>
              )}
            </div>

            <div className="filter-options mb-4">
              <h3>Language</h3>
              {languages
                .slice(0, showAllLanguages ? languages.length : 5)
                .map((language) => (
                  <Form.Check
                    key={language}
                    label={language}
                    onChange={() => handleFilterChange("LANGUAGE", language)}
                  />
                ))}
              {languages.length > 5 && (
                <Button
                  variant="link"
                  className="showMore  p-0"
                  onClick={() => setShowAllLanguages(!showAllLanguages)}
                >
                  {showAllLanguages ? "View Less" : "View More"}
                  <FaAngleDown />
                </Button>
              )}
            </div>

            <div className="filter-options mb-4">
              <h3>Author</h3>
              <Form.Control
                type="text"
                placeholder="Find Author"
                onChange={(e) => handleFilterChange("AUTHOR", e.target.value)}
              />
            </div>

            <div className="filter-price mb-4">
              <h3>Price</h3>
              <div className="d-flex gap-2">
                <Form.Control
                  type="number"
                  placeholder="Min"
                  onChange={(e) =>
                    handleFilterChange("PRICE", { min: e.target.value })
                  }
                />
                <Form.Control
                  type="number"
                  placeholder="Max"
                  onChange={(e) =>
                    handleFilterChange("PRICE", { max: e.target.value })
                  }
                />
              </div>
            </div>

            <Button
              variant="primary "
              className="w-100 btn-catalog"
              onClick={applyFilters}
            >
              Apply
            </Button>
          </div>
        </Col>

        <Col xs={12} sm={12} md={9} className="book-content">
          <div className="catalog-search-bar mb-4 mt-4">
            <div className="d-flex boder-input">
              <Form.Control
                type="search"
                placeholder="Find Your Book Here"
                className="me-2 boder-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                // onKeyDown={(e) => {
                //   if (e.key === "Enter") {
                //     e.preventDefault();
                //     handleSearch();
                //   }
                // }}
              />
              <Button
                className="btn-catalog"
                variant="danger"
                onClick={handleSearch}
              >
                Search
              </Button>
            </div>
          </div>
          {message ? (
            <Alert type="primary" content="Không tìm thấy sách" />
          ) : loading ? (
            <Spinner />
          ) : (
            <BookList books={books} />
          )}
        </Col>
      </Row>
    </Container>
  );
}
