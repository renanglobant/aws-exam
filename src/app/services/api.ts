import axiosPackage from "axios";

const axios = axiosPackage.create({
  baseURL: "/api",
});

export default axios;
