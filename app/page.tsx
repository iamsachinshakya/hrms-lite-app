"use client";

import { Header } from "@/components/layout/Header";
import { StatsGrid } from "@/components/layout/StatsGrid";
import { Icon } from "@/components/ui/Icon";
import { Toast } from "@/components/ui/Toast";
import { INITIAL_ATTENDANCE, INITIAL_EMPLOYEES, ITEMS_PER_PAGE } from "@/constants";
import { AttendanceFilters } from "@/features/attendance/components/AttendanceFilters";
import { AttendanceList } from "@/features/attendance/components/AttendanceList";
import { MarkAttendanceModal } from "@/features/attendance/components/MarkAttendanceModal";
import { OverviewSummary } from "@/features/dashboard/components/OverviewSummary";
import { AddEmployeeModal } from "@/features/employees/components/AddEmployeeModal";
import { EmployeeList } from "@/features/employees/components/EmployeeList";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import { ActiveTab, AttendanceRecord, Employee, StatsSummary, ToastState } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { EmployeeService } from "@/services/employee.service";
import { AttendanceService } from "@/services/attendance.service";
import { StatsService } from "@/services/stats.service";
import { useDebounce } from "@/hooks/useDebounce";

export default function Dashboard() {
  const w = useWindowWidth();
  const isMobile = w !== null && w < 640;
  const isTablet = w !== null && w >= 640 && w < 1024;

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [statsSummary, setStatsSummary] = useState<StatsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialLoaded, setInitialLoaded] = useState(false);
  const [selectedEmpForAtt, setSelectedEmpForAtt] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");

  // UI state
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
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

  // Computed
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
          e.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          e.id.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          e.department.toLowerCase().includes(debouncedSearch.toLowerCase()),
      ),
    [employees, debouncedSearch],
  );

  const hasFilters = !!(fFrom || fTo || fEmp !== "all" || fStat !== "all");

  const [mounted, setMounted] = useState(false);
  
  const refreshData = async () => {
    try {
      setLoading(true);
      const [empRes, attRes, statsRes] = await Promise.all([
        EmployeeService.getAll(),
        AttendanceService.getAll({ limit: ITEMS_PER_PAGE }), // Get recent records
        StatsService.getSummary()
      ]);
      
      if (empRes.success) setEmployees(empRes.data);
      if (attRes.success) setAttendance(attRes.data);
      if (statsRes.success) setStatsSummary(statsRes.data);
    } catch (err: any) {
      showToast(err.message || "Failed to fetch data", "err");
    } finally {
      setLoading(false);
      setInitialLoaded(true);
    }
  };

  useEffect(() => {
    setMounted(true);
    refreshData();
  }, []);

  // Effect to re-fetch attendance when filters change (if we wanted server-side filtering)
  useEffect(() => {
    if (!mounted) return;
    
    const fetchFilteredAttendance = async () => {
      try {
        const res = await AttendanceService.getAll({
          from: fFrom,
          to: fTo,
          employeeId: fEmp,
          status: fStat,
          limit: 100
        });
        if (res.success) setAttendance(res.data);
      } catch (err: any) {
        showToast(err.message || "Filter failed", "err");
      }
    };

    fetchFilteredAttendance();
  }, [fFrom, fTo, fEmp, fStat]);

  // Handlers
  const onAddEmployee = async (data: {
    id: string;
    name: string;
    email: string;
    department: string;
  }) => {
    try {
      const res = await EmployeeService.create(data);
      if (res.success) {
        setShowAddEmp(false);
        showToast(`${res.data.name} added!`);
        refreshData(); // Refresh everything
      }
    } catch (err: any) {
      showToast(err.message, "err");
    }
  };

  const onDeleteEmployee = async (id: string) => {
    try {
      const res = await EmployeeService.delete(id);
      if (res.success) {
        showToast("Employee removed", "err");
        refreshData();
      }
    } catch (err: any) {
      showToast(err.message, "err");
    }
  };

  const onMarkAttendance = async (data: {
    employeeId: string;
    date: string;
    status: "Present" | "Absent";
  }) => {
    try {
      const res = await AttendanceService.mark(data);
      if (res.success) {
        setShowAtt(false);
        showToast(`${data.status} marked successfully`);
        refreshData();
      }
    } catch (err: any) {
      showToast(err.message, "err");
    }
  };

  const stats = [
    {
      label: "Total Employees",
      value: statsSummary?.totalEmployees || 0,
      icon: "users" as const,
      color: "#6366f1",
      sub: loading ? "Updating..." : "Active headcount",
    },
    {
      label: "Departments",
      value: statsSummary?.totalDepartments || 0,
      icon: "dept" as const,
      color: "#8b5cf6",
      sub: "Active departments",
    },
    {
      label: "Present Today",
      value: statsSummary?.todayPresent || 0,
      icon: "check" as const,
      color: "#10b981",
      sub: `of ${statsSummary?.totalEmployees || 0}`,
    },
    {
      label: "Absent Today",
      value: statsSummary?.todayAbsent || 0,
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
                {mounted
                  ? new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Loading..."}
              </p>
            </div>
          </div>
        </div>

        <div className="animate-slide-up transition-opacity duration-500" style={{ opacity: w === null ? 0 : 1 }}>
          <StatsGrid stats={stats} isMobile={isMobile} />
        </div>

        <div className="mt-10 relative min-h-[400px]">
          {loading && (
            <div className="absolute inset-x-0 top-0 pt-20 flex flex-col items-center justify-center gap-4 z-10 animate-fade-in bg-[#06090f]/50 backdrop-blur-sm rounded-3xl h-full">
              <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin shadow-lg shadow-indigo-500/10" />
              <span className="text-[12px] font-bold text-slate-400 uppercase tracking-widest animate-pulse">Syncing workforce engine...</span>
            </div>
          )}

          {activeTab === "overview" && (
            <div className="animate-slide-up">
              <OverviewSummary
                employees={employees}
                attendance={attendance}
                deptSummary={deptSummary}
                presentDaysMap={presentDaysMap}
                maxPresent={maxPresent}
                statsSummary={statsSummary}
                onViewAllAttendance={() => setActiveTab("attendance")}
              />
            </div>
          )}

          {activeTab === "employees" && (
            <div className="animate-slide-up">
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
               
              </div>

              <EmployeeList
                employees={filteredEmployees}
                presentDaysMap={presentDaysMap}
                maxPresent={maxPresent}
                onDelete={onDeleteEmployee}
                onRowClick={(id) => {
                  setSelectedEmpForAtt(id);
                  setShowAtt(true);
                }}
                isMobile={isMobile}
                isTablet={isTablet}
              />
            </div>
          )}

          {activeTab === "attendance" && (
            <div className="animate-slide-up">
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
        onClose={() => {
          setShowAtt(false);
          setSelectedEmpForAtt(null);
        }}
        onMark={onMarkAttendance}
        employees={employees}
        selectedEmployeeId={selectedEmpForAtt}
      />

      <Toast toast={toast} />
    </div>
  );
}
