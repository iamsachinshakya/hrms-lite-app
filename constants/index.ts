import { AttendanceRecord, Employee } from "@/types";

export const INITIAL_EMPLOYEES: Employee[] = [
    {
        id: "EMP001",
        name: "Aisha Patel",
        email: "aisha@nexus.io",
        department: "Engineering",
        joinDate: "2023-01-15",
    },
    {
        id: "EMP002",
        name: "Marcus Chen",
        email: "marcus@nexus.io",
        department: "Design",
        joinDate: "2023-03-22",
    },
    {
        id: "EMP003",
        name: "Sofia Rivera",
        email: "sofia@nexus.io",
        department: "Marketing",
        joinDate: "2022-11-08",
    },
    {
        id: "EMP004",
        name: "James Okafor",
        email: "james@nexus.io",
        department: "Finance",
        joinDate: "2024-01-10",
    },
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
    { employeeId: "EMP001", date: "2025-03-01", status: "Present" },
    { employeeId: "EMP002", date: "2025-03-01", status: "Present" },
    { employeeId: "EMP003", date: "2025-03-01", status: "Absent" },
    { employeeId: "EMP004", date: "2025-03-01", status: "Present" },
    { employeeId: "EMP001", date: "2025-03-02", status: "Present" },
    { employeeId: "EMP002", date: "2025-03-02", status: "Absent" },
    { employeeId: "EMP003", date: "2025-03-02", status: "Present" },
    { employeeId: "EMP004", date: "2025-03-02", status: "Present" },
    { employeeId: "EMP001", date: "2025-03-03", status: "Present" },
    { employeeId: "EMP002", date: "2025-03-03", status: "Present" },
];

export const DEPARTMENTS = [
    "Engineering",
    "Design",
    "Marketing",
    "Finance",
    "HR",
    "Operations",
];

export const DEPT_COLORS: Record<string, string> = {
    Engineering: "#6366f1",
    Design: "#ec4899",
    Marketing: "#f59e0b",
    Finance: "#10b981",
    HR: "#3b82f6",
    Operations: "#8b5cf6",
};
