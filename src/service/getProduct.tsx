import axios from "axios";
import { API } from "../hooks/getEnv";

export const getProducts = async () => {
  const res = await axios.get(`${API}/products`);

  return res.data;
};
