import axios from "axios";
import AppStorage from "utils/storage";
import {AUTH_TOKEN} from "constants/storage";

const Instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
});
Instance.interceptors.request.use(
    async (config) => {
        const token = await AppStorage.GetItem(AUTH_TOKEN);
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)


const Api = {
    Instance
}

export default Api;
