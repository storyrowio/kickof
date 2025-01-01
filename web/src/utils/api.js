import axios from "axios";
import AppStorage from "utils/storage";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig()

const Instance = axios.create({
    baseURL: publicRuntimeConfig.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URL
});

console.log("Api Url", process.env.NEXT_PUBLIC_API_URL, process.env.API_URL, publicRuntimeConfig)
Instance.interceptors.request.use(
    async (config) => {
        const token = await AppStorage.GetItem('x-token');
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
