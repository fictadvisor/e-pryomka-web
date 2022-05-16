import axios from "axios";
import oauth from "./oauth";

const baseURL = process.browser ? process.env.NEXT_PUBLIC_API_BASE_URL : process.env.API_BASE_URL;
const client = axios.create({ baseURL });

const api = {
  oauth: oauth(client),
  client,
  baseURL
};

export default api;
