import axios from "axios";

const url = "http://localhost:8080";
let token = localStorage.getItem("authExample") || "";

export const axiosBase = axios.create({
  baseURL: url,
});

export const axiosHeaders = axios.create({
  baseURL: url,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
