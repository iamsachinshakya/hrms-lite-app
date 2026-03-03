"use client";

import { useState, useMemo, useEffect } from "react";
import { Header } from "../components/layout/Header";
import { StatsGrid } from "../components/layout/StatsGrid";
import { OverviewSummary } from "../features/dashboard/components/OverviewSummary";
import { EmployeeList } from "../features/employees/components/EmployeeList";
import { AddEmployeeModal } from "../features/employees/components/AddEmployeeModal";
import { AttendanceList } from "../features/attendance/components/AttendanceList";
import { MarkAttendanceModal } from "../features/attendance/components/MarkAttendanceModal";
import { AttendanceFilters } from "../features/attendance/components/AttendanceFilters";
import { Toast } from "../components/ui/Toast";
import { Icon } from "../components/ui/Icon";
import { useWindowWidth } from "../hooks/useWindowWidth";
import {
  INITIAL_EMPLOYEES,
  INITIAL_ATTENDANCE,
} from "../constants";
import {
  Employee,
  AttendanceRecord,
  ActiveTab,
  ToastState,
} from "../types";

export default function Dashboard() {
  const w = useWindowWidth();
  const isMobile = w < 640;
  const isTablet = w >= 640 && w < 1024;

  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE);
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");

  // UI state
  const [search, setSearch] = useState("");
  const [showAddEmp, setShowAddEmp] = useState(false);
  const [showAtt, setShowAtt] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [mobileNav, setMobileNav] = useState(false);

  // Filters
  const [fFrom, setFFrom] = useState("");
  const [fTo, setFTo] = useState("");
  const [fEmp, setFEmp] = useState("all");
  const [fStat, setFStat] = useState<"all" | "Present" | "Absent">("all");

  const today = new Date().toISOString().split("T")[0];

  const showToast = (msg: string, type: "ok" | "err" = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Computed ─────────────────────────────────────────────────────────────
  const todayPresent = attendance.filter(
    (a) => a.date === today && a.status === "Present",
  ).length;
  const todayAbsent = attendance.filter(
    (a) => a.date === today && a.status === "Absent",
  ).length;

  const presentDaysMap = useMemo(() => {
    const map: Record<string, number> = {};
    employees.forEach((e) => {
      map[e.id] = 0;
    });
    attendance.forEach((a) => {
      if (a.status === "Present")
        map[a.employeeId] = (map[a.employeeId] || 0) + 1;
    });
    return map;
  }, [attendance, employees]);

  const maxPresent = Math.max(...Object.values(presentDaysMap), 1);

  const deptSummary = useMemo(() => {
    const map: Record<string, number> = {};
    employees.forEach((e) => {
      map[e.department] = (map[e.department] || 0) + 1;
    });
    
    const DEPT_COLORS: Record<string, string> = {
      Engineering: "#6366f1",
      Design: "#ec4899",
      Marketing: "#f59e0b",
      Finance: "#10b981",
      HR: "#3b82f6",
      Operations: "#8b5cf6",
    };
    return Object.entries(map).map(([label, value]) => ({
      label,
      value,
      color: DEPT_COLORS[label] || "#6366f1",
    }));
  }, [employees]);

  const filteredAttendance = useMemo(
    () =>
      [...attendance].reverse().filter((a) => {
        if (fEmp !== "all" && a.employeeId !== fEmp) return false;
        if (fStat !== "all" && a.status !== fStat) return false;
        if (fFrom && a.date < fFrom) return false;
        if (fTo && a.date > fTo) return false;
        return true;
      }),
    [attendance, fEmp, fStat, fFrom, fTo],
  );

  const filteredEmployees = useMemo(
    () =>
      employees.filter(
        (e) =>
          e.name.toLowerCase().includes(search.toLowerCase()) ||
          e.id.toLowerCase().includes(search.toLowerCase()) ||
          e.department.toLowerCase().includes(search.toLowerCase()),
      ),
    [employees, search],
  );

  const hasFilters = !!(fFrom || fTo || fEmp !== "all" || fStat !== "all");

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const onAddEmployee = (data: { id: string; name: string; email: string; department: string }) => {
    const emp: Employee = {
      ...data,
      joinDate: today,
    };
    setEmployees((p) => [...p, emp]);
    setShowAddEmp(false);
    showToast(`${emp.name} added!`);
  };

  const onDeleteEmployee = (id: string) => {
    const emp = employees.find((e) => e.id === id);
    setEmployees((p) => p.filter((e) => e.id !== id));
    setAttendance((p) => p.filter((a) => a.employeeId !== id));
    showToast(`${emp?.name} removed`, "err");
  };

  const onMarkAttendance = (data: { employeeId: string; date: string; status: "Present" | "Absent" }) => {
    if (attendance.find((a) => a.employeeId === data.employeeId && a.date === data.date)) {
        showToast("Already marked for this date", "err");
        return;
    }
    setAttendance((p) => [...p, data]);
    const emp = employees.find((e) => e.id === data.employeeId);
    showToast(`${data.status} marked for ${emp?.name}`);
  };

  const stats = [
    {
      label: "Total Employees",
      value: employees.length,
      icon: "users" as const,
      color: "#6366f1",
      sub: "Active headcount",
    },
    {
      label: "Departments",
      value: deptSummary.length,
      icon: "dept" as const,
      color: "#8b5cf6",
      sub: "Active departments",
    },
    {
      label: "Present Today",
      value: todayPresent,
      icon: "check" as const,
      color: "#10b981",
      sub: `of ${employees.length}`,
    },
    {
      label: "Absent Today",
      value: todayAbsent,
      icon: "x" as const,
      color: "#ef4444",
      sub: "Marked absent",
    },
  ];

  return (
    <div className="min-h-screen bg-[#06090f] text-[#f1f5f9] font-['Inter',sans-serif] selection:bg-indigo-500/30">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobile={isMobile}
        mobileNav={mobileNav}
        setMobileNav={setMobileNav}
        onAddEmployee={() => setShowAddEmp(true)}
        onMarkAttendance={() => setShowAtt(true)}
      />

      <main className="max-w-[1400px] mx-auto py-10 px-4 sm:px-8 lg:px-12">
        <div className="mb-10 animate-slide-up">
          <div className="flex flex-col gap-1">
            <h1 className="font-syne font-extrabold text-3xl sm:text-4xl tracking-tight leading-tight">
              {activeTab === "overview" && (
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-[length:200%_auto] animate-gradient">
                  Dashboard Intelligence
                </span>
              )}
              {activeTab === "employees" && (
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400 bg-[length:200%_auto] animate-gradient">
                  Workforce Directory
                </span>
              )}
              {activeTab === "attendance" && (
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 bg-[length:200%_auto] animate-gradient">
                  Attendance Records
                </span>
              )}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              <p className="text-slate-500 text-[13px] font-bold uppercase tracking-[0.2em]">
                {mounted ? new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }) : "Loading..."}
              </p>
            </div>
          </div>
        </div>

        <div className="animate-slide-up [animation-delay:100ms]">
          <StatsGrid stats={stats} isMobile={isMobile} />
        </div>

        <div className="mt-10">
          {activeTab === "overview" && (
            <OverviewSummary
              employees={employees}
              attendance={attendance}
              deptSummary={deptSummary}
              presentDaysMap={presentDaysMap}
              maxPresent={maxPresent}
              onViewAllAttendance={() => setActiveTab("attendance")}
            />
          )}

          {activeTab === "employees" && (
            <div className="animate-slide-up [animation-delay:200ms]">
              <div className="mb-6 relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 z-10 transition-colors group-focus-within:text-indigo-400">
                  <Icon name="search" size={18} />
                </span>
                <input
                  className="inp pl-12 h-14 !rounded-2xl !bg-white/[0.03] !border-white/[0.05] hover:!border-white/10 focus:!border-indigo-500/50 focus:!bg-white/[0.05] transition-all shadow-xl"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search members by name, ID or department..."
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 opacity-30 group-focus-within:opacity-100 transition-opacity">
                  <span className="text-[10px] font-bold bg-white/10 px-1.5 py-0.5 rounded border border-white/10">ESC</span>
                </div>
              </div>

              <EmployeeList
                employees={filteredEmployees}
                presentDaysMap={presentDaysMap}
                maxPresent={maxPresent}
                onDelete={onDeleteEmployee}
                isMobile={isMobile}
                isTablet={isTablet}
              />
            </div>
          )}

          {activeTab === "attendance" && (
            <div className="animate-slide-up [animation-delay:200ms]">
              <AttendanceFilters
                fFrom={fFrom}
                setFFrom={setFFrom}
                fTo={fTo}
                setFTo={setFTo}
                fEmp={fEmp}
                setFEmp={setFEmp}
                fStat={fStat}
                setFStat={setFStat}
                employees={employees}
                onClear={() => {
                  setFFrom("");
                  setFTo("");
                  setFEmp("all");
                  setFStat("all");
                }}
                hasFilters={hasFilters}
              />

              <AttendanceList
                attendance={filteredAttendance}
                employees={employees}
              />
            </div>
          )}
        </div>
      </main>

      <AddEmployeeModal
        isOpen={showAddEmp}
        onClose={() => setShowAddEmp(false)}
        onAdd={onAddEmployee}
        employees={employees}
      />

      <MarkAttendanceModal
        isOpen={showAtt}
        onClose={() => setShowAtt(false)}
        onMark={onMarkAttendance}
        employees={employees}
      />

      <Toast toast={toast} />
    </div>
  );
}
