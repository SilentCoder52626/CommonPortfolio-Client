import axios from "axios";
import router from "@/router";

const apiHost = import.meta.env.VITE_API_HOST;

const axiosInstance = axios.create({
    baseURL : apiHost,
    headers : {
        "Content-Type": "application/json",
    }
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // get this from store 

    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},(error) => {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use((response) => response, 
    (error) => {
        if(error.response && error.response.status === 401){
            //add a notify
            router.push("/login");
        }
        return error.response;
    }
)

export default axiosInstance;