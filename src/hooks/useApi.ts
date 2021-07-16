import axios, { AxiosInstance } from "axios";

export const useApi: AxiosInstance = axios.create({
    baseURL: "http://universitas.test",
});
