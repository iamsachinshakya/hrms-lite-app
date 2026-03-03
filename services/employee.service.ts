import { ApiListResponse, ApiResponse, Employee } from "@/types";
import apiClient from "./api.client";

export const EmployeeService = {
    getAll: async (params: { search?: string; page?: number; limit?: number } = {}) => {
        return apiClient.get<any, ApiListResponse<Employee>>("/employees", { params });
    },

    getById: async (id: string) => {
        return apiClient.get<any, ApiResponse<Employee>>(`/employees/${id}`);
    },

    create: async (data: Partial<Employee>) => {
        const { id, ...rest } = data;

        const payload = {
            ...rest,
            employeeId: id,
        };

        return apiClient.post<any, ApiResponse<Employee>>(
            "/employees",
            payload
        );
    },

    update: async (id: string, data: Partial<Employee>) => {
        return apiClient.patch<any, ApiResponse<Employee>>(`/employees/${id}`, data);
    },

    delete: async (id: string) => {
        return apiClient.delete<any, ApiResponse<null>>(`/employees/${id}`);
    },
};
