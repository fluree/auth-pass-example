import axios from "axios";

const url =
  process.env.REACT_APP_API_BASE_URL ||
  "http://localhost:8080/fdb/example/comics";

const instance = axios.create({
  baseURL: url,
});

// Global error handling for axio request
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(error);

    switch (error.response.status) {
      // case 401:
      // case 404:
      // case 500: {
      //   window.location = "/errors/error-" + error.response.status;
      //   break;
      // }
      default:
        return Promise.reject(error);
    }
  }
);

/**
 * Helper function to handle Fluree queries
 * @param {Object} query
 */
export function flureeQuery(query) {
  const token = localStorage.getItem("authToken");
  if (token) {
    const authHeader = "Bearer " + token
    return instance
      .post("/query", query, { headers: { Authorization: authHeader } })
      .then((res) => {
        console.log("flureeQuery", res);
        return res.data;
      })
      .catch((err) => err);
  }
  return instance
    .post(`/query`, query)
    .then((res) => {
      console.log("flureeQuery", res);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}

/**
 * Helper function to handle Fluree transactions
 * @param {Array} transactions
 */
export function flureeTransact(transactions) {
  const token = localStorage.getItem("authToken");
  if (token) {
    return instance
      .post("/transact", transactions, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        return res.data;
      });
  }
  return instance
    .post(`/transact`, transactions)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}

export default instance;
