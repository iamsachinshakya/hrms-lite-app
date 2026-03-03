export interface Employee {
    id: string;
    name: string;
    email: string;
    department: string;
    joinDate: string;
}

export interface AttendanceRecord {
    employeeId: string;
    date: string;
    status: "Present" | "Absent";
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
