import React, { useState, useEffect, useContext } from "react";
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
import { UserContext } from "../../contexts/UserContext";
import { axiosBase } from "../../utils/axios";

function BookList() {
  const [books, setBooks] = useState([]);
  const user = useContext(UserContext);

  const addToPull = (i) => {
    console.log(i);
    const transaction = [
      {
        _id: user._id,
        pull_list: [books[i]._id],
      },
    ];
    console.log(transaction);
    axiosBase
      .post("/fdb/example/comics/transact", transaction)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

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
        {books.map((book, index) => {
          return (
            <ListItem key={book.diamond_id}>
              <Button onClick={() => addToPull(index)}>
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
