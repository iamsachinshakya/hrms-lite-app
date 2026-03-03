import axios, { AxiosError } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor for centralized error handling
apiClient.interceptors.response.use(
    (response) => response.data,
    (error: AxiosError<any>) => {
        const message = error.response?.data?.message || error.message || "An unexpected error occurred";
        return Promise.reject(new Error(message));
    }
);

export default apiClient;
