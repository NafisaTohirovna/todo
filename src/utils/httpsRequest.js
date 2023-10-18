import axios from "axios";
export const useRequest = axios.create({
  baseURL: "http://localhost:3000/todos",
});
