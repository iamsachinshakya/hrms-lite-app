export interface Employee {
    id: string;
    name: string;
    email: string;
    department: string;
    joinDate: string;
}

export interface AttendanceRecord {
    id?: string;
    employeeId: string;
    date: string;
    status: "Present" | "Absent";
}

export interface StatsSummary {
    totalEmployees: number;
    totalDepartments: number;
    todayPresent: number;
    todayAbsent: number;
    allTimePresent: number;
    allTimeAbsent: number;
}

export interface PresentDaysStats {
    employeeId: string;
    presentDays: number;
    totalRecords: number;
    rate: number;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export interface ApiListResponse<T> {
    success: boolean;
    message: string;
    data: T[];
    meta?: {
        total: number;
        page: number;
        limit: number;
    };
}

export type ActiveTab = "overview" | "employees" | "attendance";

export interface ToastState {
    msg: string;
    type: "ok" | "err";
}

export interface ChartData {
    label: string;
    value: number;
    color: string;
}
