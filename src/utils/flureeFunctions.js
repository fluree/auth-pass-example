import axios from "axios";

const port = process.env.REACT_APP_FLUREE_PORT || 8080;
const url = `http://localhost:${port}/fdb/example/comics`;

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
 * @param {Object} query Object containing FlureeQL query
 */
export function flureeQuery(query) {
  const token = localStorage.getItem("authToken");
  if (token) {
    const authHeader = "Bearer " + token;
    return instance
      .post("/query", query, { headers: { Authorization: authHeader } })
      .then((res) => {
        // console.log("flureeQuery", res);
        return res.data;
      })
      .catch((err) => err);
  }
  return instance
    .post(`/query`, query)
    .then((res) => {
      // console.log("flureeQuery", res);
      return res.data;
    })
    .catch((err) => {
      // console.log(err);
      return err;
    });
}

/**
 * Helper function to handle Fluree transactions
 * @param {Array} transactions Should contain Objects, each representing a FlureeQL transaction
 */
export function flureeTransact(transactions) {
  const token = localStorage.getItem("authToken");
  if (token) {
    return instance
      .post("/transact", transactions, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // console.log(res);
        return res.data;
      });
  }
  return instance
    .post(`/transact`, transactions)
    .then((res) => {
      // console.log(res);
      return res.data;
    })
    .catch((err) => {
      // console.log(err);
      return err;
    });
}

// Check to see if "example/comics" db exists in Fluree ledger
export function lookForDbs() {
  return axios
    .post(`http://localhost:${port}/fdb/dbs`)
    .then((res) => {
      // console.log("looking for dbs", res.data[0]);
      const database = res.data[0];
      if (database.includes("example") && database.includes("comics")) {
        return true;
      }
      return false;
    })
    .catch((err) => console.log(err, "Fluree DB not found"));
}

export default instance;
