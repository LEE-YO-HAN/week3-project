import axios from "axios";

export const base = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
});

export const searchAPI = {
  getSearch: (param: string) => base.get(`sick?q=${param}`),
};
