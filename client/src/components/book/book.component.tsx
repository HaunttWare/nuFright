import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { BookData } from "../../store/books/books.action";

const Book = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState<BookData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/books/${bookId}`).then(({ data }) => {
      setBook(data);
    });
  }, [bookId]);

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
      {book ? (
        <>
          <button
            className="btn btn-secondary mr-4"
            onClick={() => navigate(-1)}
          >
            <i className="fas fa-arrow-left"></i>
          </button>

          <div className="d-flex">
            <img src={book.cover} alt={book.name} style={{ width: "400px" }} />
            <div className="card">
              <div className="card-body text-black">
                <h5 className="card-title">{book.name}</h5>
                {book.authors?.map((author) => (
                  <h6 className="card-subtitle mb-2 text-muted">{author}</h6>
                ))}
                <p className="card-text">
                  <i className="fas fa-star"></i> {book.rating}
                </p>
                <p className="card-text">{book.synopsis}</p>
                <div className="d-flex justify-content-between">
                  <a href={book.url} className="btn btn-primary">
                    Buy Now
                  </a>

                  <div className="d-flex">
                    <button className="btn btn-danger">
                      <i className="fas fa-heart"></i>
                    </button>
                    <button className="btn btn-success">
                      <i className="fas fa-save"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default Book;
