import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBookList } from "../../store/books/books.action";

import BookList from "../../components/book-list/book-list.component";

const Books = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("/api/books").then(({ data }) => {
      dispatch(setBookList(data));
    });
  }, [dispatch]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1 className="text-center">Popular Books</h1>
          <BookList />
        </div>
      </div>
    </div>
  );
};

export default Books;
