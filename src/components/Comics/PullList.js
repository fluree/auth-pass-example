import React, { useState, useEffect, useContext } from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { UserContext } from "../../contexts/UserContext";
import { ListContext } from "../../contexts/ListContext";
import { axiosBase } from "../../utils/axios";

function PullList(props) {
  const [list, setList] = useState([]);
  const userInfo = useContext(UserContext);

  useEffect(() => {
    const query = {
      selectOne: [{ pull_list: ["*"] }],
      from: userInfo._id,
      opts: {
        compact: true,
      },
    };
    console.log(query);
    axiosBase
      .post("/fdb/example/comics/query", query)
      .then((res) => {
        console.log("list response", res);
        setList(res.data.pull_list);
      })
      .catch((err) => console.log(err));
  }, [userInfo]);

  return (
    <List>
      {list.map((book) => {
        return (
          <ListItem key={book.diamond_id}>
            <ListItemText primary={book.title} />
          </ListItem>
        );
      })}
    </List>
  );
  // const user = useContext(UserContext);

  // const [state, setState] = useState({
  //   user: {},
  //   list: [],
  // });

  // useEffect(() => {
  //   setState({ ...state, user });
  // }, []);

  // useEffect(() => {
  //   console.log("user", user);
  //   const listQuery = {
  //     selectOne: {
  //       pull_list: ["*"],
  //     },
  //     from: user._id,
  //     opts: {
  //       compact: true,
  //     },
  //   };
  //   console.log("listquery", listQuery)
  //   axiosBase
  //     .post("/fdb/example/comics/query", listQuery)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => console.log(err));
  // }, [state.user]);

  // if (user.role === "employee") {
  //   return <h1>employee</h1>;
  // } else
  //   return (
  //     <div>
  //       <List>
  //         {state.list.map((book) => {
  //           console.log(book);
  //           return (
  //             <ListItem key={book.diamond_id}>
  //               <ListItemText primary={book.title} secondary={book.price} />
  //             </ListItem>
  //           );
  //         })}
  //       </List>
  //     </div>
  //   );
}

export default PullList;
