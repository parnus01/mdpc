/** @format */

import axios from "axios";
import config from "../config/config";

const client = axios.create({
  baseURL: config.API_URL,
});

export default client;
