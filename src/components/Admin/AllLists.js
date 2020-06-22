import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";

import { axiosBase } from "src/utils/axios";

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
    axiosBase
      .post("/fdb/example/comics/query", query)
      .then((res) => {
        console.log(res.data);
        setCustomers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h2>Customer Pulls</h2>
      {customers.map((cust) => {
        return (
          <div key={cust.username}>
            <h2>{cust.username}</h2>
            <List>
              {/* {cust.pull_list.map((book) => {
                return (
                  <ListItem>
                    <ListItemText primary={book.title} />
                  </ListItem>
                );
              })} */}
            </List>
          </div>
        );
      })}
    </>
  );
}

export default AllLists;
