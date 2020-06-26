import React, { useState, useEffect, useContext } from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { UserContext } from "../../contexts/UserContext";
import { flureeQuery } from "../../utils/flureeFunctions";
function PullList(props) {
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
              <ListItemText primary={book.title} />
            </ListItem>
          );
        })}
      </List>
    );
  } else {
    return <h3>No books selected</h3>;
  }
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
