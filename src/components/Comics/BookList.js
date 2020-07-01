import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  List,
  ListItem,
  ListItemIcon,
  Button,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Book from "./Book";
import { UserContext } from "../../contexts/UserContext";
import { flureeQuery, flureeTransact } from "src/utils/flureeFunctions";

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
    flureeTransact(transaction)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const getBooks = (query) => {
    return flureeQuery(query)
      .then((comics) => comics)
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
    getBooks(query).then((comics) => {
      setBooks(comics);
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
              <Book {...book} />
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
}

export default BookList;
