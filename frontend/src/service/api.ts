import axios from "axios";
import type { Row } from "../models";
import { convertToIsoString } from "../utils";

const enum ENDPOINTSMAP {
  kasboek = "/api/kasboek",
}

const errHandler = (err) => {
  console.error(err);
  if (err.response && err.response.data) {
    console.error("API response", err.response.data);
    throw err.response.data.message;
  }
  throw err;
};

const logger = (response) => {
  console.log("res.data", response.data);
  console.log("res.status", response.status);
  console.log("res.statustext", response.statusText);
  console.log("res.headers", response.headers);
  console.log("res.config", response.config);
};

function axiosFactory(servicename: ENDPOINTSMAP) {
  const urlpoint = servicename;
  const service = axios.create({
    baseURL: `http://${window.location.hostname}:5000${urlpoint}`,
    withCredentials: true,
  });

  service.interceptors.response.use(
    (response) => {
      console.log("====START RES LOGGING====");
      logger(response);
      console.log("====END RES LOGGING====");
      return response;
    },
    (error) => {
      console.log("====START ERROR LOGGING====");
      errHandler(error);
      console.log("====END ERROR LOGGING====");
      return Promise.reject(error);
    }
  );

  return service;
}

const service = axiosFactory(ENDPOINTSMAP.kasboek);

export default {
  async getKasboek(start, end): Promise<Row[]> {
    const res = await service.get(`?start=${convertToIsoString(start)}&end=${convertToIsoString(end)}`);
    console.log("res", res);
    return res.data
  },
  async postKasboek(entries): Promise<string> {
    const res = await service.post("", entries);
    return res.data 
  },
};
