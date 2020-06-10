import axios from "axios";

const url = process.env.REACT_APP_API_URL || "http://localhost:8080";
const token = localStorage.getItem("authExample") || "";
const instance = axios.create({
  baseURL: url,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default instance;
