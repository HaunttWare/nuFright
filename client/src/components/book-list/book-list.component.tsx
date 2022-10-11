import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BookData } from "../../store/books/books.action";
import { selectBookList } from "../../store/books/books.selector";

import Pagination from "../pagination/pagination.component";

const BookList = () => {
  const bookList = useSelector(selectBookList);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10);
  const navigate = useNavigate();

  // Get current books
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = bookList.slice(indexOfFirstBook, indexOfLastBook);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="row">
        {currentBooks.map((book: BookData) => (
          <div className="col-md-4" key={book.book_id}>
            <div className="card mb-4 shadow-sm">
              <img
                src={book.cover}
                className="card-img-top"
                alt={book.name}
                style={{ width: "auto", height: 300 }}
              />
              <div className="card-body">
                <h5 className="card-title text-black">{book.name}</h5>
                <button
                  onClick={() => navigate(`${book.book_id}`)}
                  className="btn btn-outline-secondary"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        booksPerPage={booksPerPage}
        totalBooks={bookList.length}
        paginate={paginate}
      />
    </>
  );
};

export default BookList;
