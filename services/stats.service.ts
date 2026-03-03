import { ApiResponse, PresentDaysStats, StatsSummary } from "@/types";
import apiClient from "./api.client";

export const StatsService = {
    getSummary: async () => {
        return apiClient.get<any, ApiResponse<StatsSummary>>("/stats/summary");
    },

    getPresentDays: async () => {
        return apiClient.get<any, ApiResponse<PresentDaysStats[]>>("/stats/present-days");
    },
};
