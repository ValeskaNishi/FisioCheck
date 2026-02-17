import axios from "axios";

const BASE_URL = "https://6993200b8f29113acd400fa4.mockapi.io/api/evaluations";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
