import axios from "axios";

const enum ENDPOINTSMAP {
  kasboek = "/api/kasboek",
};

const errHandler = (err) => {
  console.error(err);
  if (err.response && err.response.data) {
    console.error("API response", err.response.data);
    throw err.response.data.message;
  }
  throw err;
};

const logger = (response) => {
  console.log(process.env.NODE_ENV, "node env");
  console.log("res.data", response.data);
  console.log("res.status", response.status);
  console.log("res.statustext", response.statusText);
  console.log("res.headers", response.headers);
  console.log("res.config", response.config);
};

function axiosFactory(servicename: ENDPOINTSMAP) {
  const urlpoint = servicename
  const service = axios.create({
    baseURL:
      process.env.NODE_ENV === "production"
        ? urlpoint
        : `http://${window.location.hostname}:5000${urlpoint}`,
    withCredentials: true,
  });
  if (process.env.NODE_ENV === "development") {
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
  }
  return service;
}

const service = axiosFactory(ENDPOINTSMAP.kasboek)

export default {
    async getKasboek() {
      const res = await service.get("")
      console.log('res', res)
    },
    async postKasboek(entries) {
      const res = await service.post("", entries)
      console.log('res', res)
    }
  };