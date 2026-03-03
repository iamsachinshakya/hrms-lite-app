import apiClient from "@/services/api.client";
import { ApiListResponse, ApiResponse, AttendanceRecord } from "@/types";

export const AttendanceService = {
    getAll: async (params: {
        employeeId?: string;
        status?: string;
        from?: string;
        to?: string;
        page?: number;
        limit?: number;
    } = {}) => {
        const cleanedParams = { ...params };
        if (cleanedParams.employeeId === "all") delete cleanedParams.employeeId;
        if (cleanedParams.status === "all") delete cleanedParams.status;

        return apiClient.get<any, ApiListResponse<AttendanceRecord>>("/attendance", { params: cleanedParams });
    },

    mark: async (data: AttendanceRecord) => {
        return apiClient.post<any, ApiResponse<AttendanceRecord>>("/attendance", data);
    },
};
