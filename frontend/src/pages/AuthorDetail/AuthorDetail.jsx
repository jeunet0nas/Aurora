import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosRequest } from "../../helpers/config";
import Image from "react-bootstrap/Image";
import Spinner from "../../layouts/Spinner";
import Alert from "../../layouts/Alert";
import MultiItemSlider from "../../components/MutltiItemSlider/MultiItemSlider";
import "./AuthorDetail.css";

export default function AuthorDetail() {
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { author_slug } = useParams();

  useEffect(() => {
    const fetchAuthorBySlug = async () => {
      setLoading(true);

      try {
        const response = await axiosRequest.get(`author/${author_slug}/show`);
        console.log(author);
        setAuthor(response.data.data);
        setLoading(false);
      } catch (error) {
        if (error?.response?.status === 404) {
          setError("Tác giả bạn truy cập không tồn tại");
        }
        console.log(error);
        setLoading(false);
      }
    };
    fetchAuthorBySlug();
  }, [author_slug]);

  return (
    <div className="author-page">
      {error ? (
        <Alert content={error} type="danger" />
      ) : loading ? (
        <Spinner />
      ) : (
        <>
          <div className="author-info-container">
            <div className="author-info d-flex">
              <div className="author-image">
                <div className="author-image">
                  <Image
                    src={author?.author_img}
                    alt={author?.author_name}
                    className="custom-image"
                    fluid
                  />
                </div>
              </div>

              <div className="book-details flex-grow-1">
                <div className="book-introduction">
                  <h2>{author?.author_name}</h2>
                </div>
                <div className="book-info">
                  <div className="info-item">
                    <strong>Quốc tịch:</strong> {author?.nationality}
                  </div>
                  <div className="info-item">
                    <strong>Năm sinh:</strong>
                    {author?.yob}
                  </div>
                </div>
              </div>

              <div className="author-description">
                <h3>Thông tin tác giả</h3>
                <p>{author?.author_desc}</p>
              </div>
            </div>
          </div>

          <div className="related-products">
            <h2>Các tác phẩm của {author?.author_name}</h2>
            <div className="books-list">
              {Array.isArray(author?.books) && author.books.length > 0 ? (
                <MultiItemSlider items={author.books} itemType="book" />
              ) : (
                <p>No books available</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
