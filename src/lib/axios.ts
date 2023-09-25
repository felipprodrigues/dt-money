import axios from "axios";

export const api = axios.create({
  // baseURL: "http://localhost:3333/",
  baseURL: "https://dt-money-api-kn4h.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
});
