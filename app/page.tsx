"use client";

import { useState, useMemo } from "react";
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
  DEPARTMENTS,
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
    
    // This assumes colors are handled in UI/Constants as before
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

  const PAD = isMobile ? "0 16px" : isTablet ? "0 24px" : "0 40px";

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
    <div
      style={{
        minHeight: "100vh",
        background: "#080c14",
        color: "#f1f5f9",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{background:#080c14}
        .inp{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:10px 14px;color:#f1f5f9;font-family:'DM Sans',sans-serif;font-size:14px;outline:none;width:100%;transition:border-color 0.2s}
        .inp:focus{border-color:#6366f1}
        .inp.err{border-color:#ef4444}
        select.inp option{background:#1e293b}
        .inp[type=date]::-webkit-calendar-picker-indicator{filter:invert(0.4);cursor:pointer}
        .rh:hover{background:rgba(255,255,255,0.028)!important}
        .del-btn{background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.2);color:#ef4444;padding:6px 10px;border-radius:8px;cursor:pointer;transition:all 0.2s;display:flex;align-items:center}
        .del-btn:hover{background:rgba(239,68,68,0.22)}
        .btn-p{background:linear-gradient(135deg,#6366f1,#8b5cf6);border:none;color:#fff;padding:10px 18px;border-radius:10px;font-family:'DM Sans',sans-serif;font-weight:600;font-size:13px;cursor:pointer;display:flex;align-items:center;gap:7px;transition:opacity 0.2s;white-space:nowrap}
        .btn-p:hover{opacity:0.85}
        .btn-g{background:linear-gradient(135deg,#10b981,#059669);border:none;color:#fff;padding:10px 188;border-radius:10px;font-family:'DM Sans',sans-serif;font-weight:600;font-size:13px;cursor:pointer;display:flex;align-items:center;gap:7px;transition:opacity 0.2s;white-space:nowrap}
        .btn-g:hover{opacity:0.85}
        .mbg{position:fixed;inset:0;background:rgba(0,0,0,0.75);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;z-index:200;padding:16px}
        .modal{background:#0d1a2d;border:1px solid rgba(255,255,255,0.1);border-radius:20px;padding:28px;width:440px;max-width:100%}
        .badge{display:inline-flex;align-items:center;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600;font-family:'DM Sans',sans-serif;letter-spacing:0.04em}
        .chip{display:inline-flex;align-items:center;padding:3px 10px;border-radius:6px;font-size:11px;font-family:'DM Sans',sans-serif;font-weight:600}
        .card{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:14px}
        .toast{position:fixed;bottom:24px;right:24px;padding:12px 18px;border-radius:12px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;z-index:300;animation:up 0.3s ease;box-shadow:0 8px 32px rgba(0,0,0,0.4);max-width:300px}
        @keyframes up{from{transform:translateY(14px);opacity:0}to{transform:translateY(0);opacity:1}}
        .scrollable{overflow-x:auto}
        .scrollable::-webkit-scrollbar{height:4px}
        .scrollable::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:2px}
        .stat-grid{display:grid;gap:14px;grid-template-columns:repeat(2,1fr)}
        @media(min-width:768px){.stat-grid{grid-template-columns:repeat(4,1fr)}}
        .summary-grid{display:grid;gap:16px;grid-template-columns:1fr}
        @media(min-width:768px){.summary-grid{grid-template-columns:repeat(2,1fr)}}
        .emp-grid{display:grid;gap:12px;grid-template-columns:1fr}
        @media(min-width:640px){.emp-grid{grid-template-columns:repeat(2,1fr)}}
        @media(min-width:1024px){.emp-grid{grid-template-columns:repeat(3,1fr)}}
        .filter-row{display:flex;flex-wrap:wrap;gap:10px;align-items:flex-end}
        .filter-field{display:flex;flex-direction:column;gap:4px;flex:1 1 130px;min-width:110px}
        .tab-btn{background:transparent;border:none;cursor:pointer;padding:9px 16px;border-radius:10px;font-family:'DM Sans',sans-serif;font-weight:600;font-size:13px;display:flex;align-items:center;gap:7px;transition:all 0.2s;white-space:nowrap}
        .tab-btn.on{background:rgba(99,102,241,0.18);color:#818cf8}
        .tab-btn.off{color:#64748b}
        .tab-btn.off:hover{color:#94a3b8;background:rgba(255,255,255,0.04)}
      `}</style>

      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobile={isMobile}
        mobileNav={mobileNav}
        setMobileNav={setMobileNav}
        onAddEmployee={() => setShowAddEmp(true)}
        onMarkAttendance={() => setShowAtt(true)}
        pad={PAD}
      />

      <main
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: `30px ${isMobile ? "16px" : isTablet ? "24px" : "40px"}`,
        }}
      >
        <div style={{ marginBottom: 24 }}>
          <h1
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 800,
              fontSize: isMobile ? 22 : 28,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: 4,
            }}
          >
            {activeTab === "overview" && (
              <>
                <span style={{ color: "#6366f1" }}>Dashboard</span> Overview
              </>
            )}
            {activeTab === "employees" && (
              <>
                Employee <span style={{ color: "#6366f1" }}>Management</span>
              </>
            )}
            {activeTab === "attendance" && (
              <>
                Attendance <span style={{ color: "#10b981" }}>Tracker</span>
              </>
            )}
          </h1>
          <p style={{ color: "#64748b", fontSize: 13 }}>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <StatsGrid stats={stats} isMobile={isMobile} />

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
          <>
            <div style={{ marginBottom: 14, position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#64748b",
                  zIndex: 1,
                }}
              >
                <Icon name="search" size={14} />
              </span>
              <input
                className="inp"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, ID or department…"
                style={{ paddingLeft: 38 }}
              />
            </div>

            <EmployeeList
              employees={filteredEmployees}
              presentDaysMap={presentDaysMap}
              maxPresent={maxPresent}
              onDelete={onDeleteEmployee}
              isMobile={isMobile}
              isTablet={isTablet}
            />
          </>
        )}

        {activeTab === "attendance" && (
          <>
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
          </>
        )}
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
