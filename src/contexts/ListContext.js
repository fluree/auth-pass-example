import { createContext } from "react";
import { axiosBase } from "../utils/axios";

export const ListContext = createContext({
  pullList: [],
  add: (book, userId) => {
    const transaction = [
      {
        _id: userId,
        pull_list: [book._id],
      },
    ];
    axiosBase
      .post("/fdb/example/comics/transact", transaction)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  },
  get: (user) => {
    const query = {
      select: ["pull_list"],
      from: user,
    };
    axiosBase
      .post("/fdb/example/comics/query", query)
      .then((res) => {
        console.log("in the list", res);
      })
      .catch((err) => console.log(err));
  },
});
