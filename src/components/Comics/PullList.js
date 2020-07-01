import React, { useState, useEffect, useContext } from "react";
import { List, ListItem } from "@material-ui/core";
import Book from "./Book";
import { UserContext } from "../../contexts/UserContext";
import { flureeQuery } from "../../utils/flureeFunctions";
function PullList() {
  const [list, setList] = useState([]);
  const userInfo = useContext(UserContext);

  useEffect(() => {
    console.log("user context", userInfo._id);
    if (userInfo._id) {
      const query = {
        selectOne: [{ pull_list: ["*"] }],
        from: userInfo._id,
        opts: {
          compact: true,
        },
      };
      flureeQuery(query).then((data) => {
        console.log(data);
        setList(data.pull_list);
      });
    }
  }, [userInfo]);

  if (list) {
    return (
      <List>
        {list.map((book) => {
          return (
            <ListItem key={book.diamond_id}>
              <Book {...book} />
            </ListItem>
          );
        })}
      </List>
    );
  } else {
    return <h3>No books selected</h3>;
  }
}

export default PullList;
