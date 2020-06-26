import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { flureeQuery } from "../../utils/flureeFunctions";

function AllLists() {
  const [customers, setCustomers] = useState([{ pull_list: [] }]);

  useEffect(() => {
    const query = {
      select: ["username", { pull_list: ["*"] }],
      from: "_user",
      opts: {
        compact: true,
      },
    };
    flureeQuery(query)
      .then((data) => {
        console.log(data);
        setCustomers(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h2>Customer Pulls</h2>
      {customers.map((cust) => {
        return (
          <div key={cust._id}>
            <h2>{cust.username}</h2>
            <List>
              {cust.pull_list &&
                cust.pull_list.map((book) => {
                  return (
                    <ListItem key={book.diamond_id}>
                      <ListItemText primary={book.title} />
                    </ListItem>
                  );
                })}
            </List>
          </div>
        );
      })}
    </>
  );
}

export default AllLists;
