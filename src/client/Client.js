import axios from "axios";

const client = axios.create({
  baseURL: "https://101412150-comp-3123-assignment1.vercel.app/api/v1"
});
export const empClient = axios.create({
  baseURL: "https://101412150-comp-3123-assignment1.vercel.app/api/v1",
  headers: {
    "x-access-token": localStorage.getItem("token"),
  }
});

export default client;
