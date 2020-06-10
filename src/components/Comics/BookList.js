import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import {axiosHeaders} from "../../utils/axios";

function BookList() {
  const endpoint = process.env.REACT_APP_API_ENDPOINT;
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axiosHeaders
      .get(endpoint)
      .then((res) => {
        console.log(res);
        const { comics } = res.data;
        setBooks(comics);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container>
      {books.map((book) => {
        return <h3 key={book.diamond_id}>{book.title}</h3>;
      })}
    </Container>
  );
}

export default BookList;
