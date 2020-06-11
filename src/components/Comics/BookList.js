import React, { useState, useEffect } from "react";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { axiosBase } from "../../utils/axios";

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const query = {
      select: ["*"],
      from: "comic",
      opts: {
        compact: true,
      },
    };
    axiosBase
      .post("/fdb/example/comics/query", query)
      .then((res) => {
        console.log(res);
        const comics = res.data;
        setBooks(comics);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container>
      <List>
        {books.map((book) => {
          return (
            <ListItem key={book.diamond_id}>
              <Button>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
              </Button>
              <ListItemText primary={book.title} secondary={book.price} />
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
}

export default BookList;
