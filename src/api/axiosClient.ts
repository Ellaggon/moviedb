import axios from "axios";
import apiConfig from "./apiConfig";

export const axiosClient = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        "Content-Type": "application/json",
    },
    params: {
        api_key: apiConfig.apiKey
    }
})