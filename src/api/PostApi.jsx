import axios from "axios";

//getData

export const getData = () => {
  const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
  });
  return api.get("/users");
};
