import axios from 'axios';

const url = process.env.REACT_APP_API_URL || "http://localhost:8080";
const instance = axios.create({
  baseURL: url
})

export default instance;