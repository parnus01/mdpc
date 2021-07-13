import axios from "axios";
import config from "../config/config";

const client = axios.create({
  baseURL: config.API_URL,
  auth: {
    username: config.API_USERNAME,
    password: config.API_PASSWORD
  }
});

export default client;
