import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { DonutChart, MiniBar } from "@/components/ui/Charts";
import { Icon } from "@/components/ui/Icon";
import { AttendanceRecord, ChartData, Employee, StatsSummary } from "@/types";
import { DEPT_COLORS } from "@/constants";

interface OverviewSummaryProps {
  employees: Employee[];
  attendance: AttendanceRecord[];
  deptSummary: ChartData[];
  presentDaysMap: Record<string, number>;
  maxPresent: number;
  statsSummary: StatsSummary | null;
  onViewAllAttendance: () => void;
}

import { useEffect, useState } from "react";

export const OverviewSummary = ({
  employees,
  attendance,
  deptSummary,
  presentDaysMap,
  maxPresent,
  statsSummary,
  onViewAllAttendance,
}: OverviewSummaryProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="p-6 card hover-lift animate-slide-up [animation-delay:100ms]">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-indigo-500/20 text-indigo-400 p-2 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/10 border border-indigo-500/20">
              <Icon name="dept" size={14} />
            </div>
            <span className="font-syne font-extrabold text-[15px] tracking-tight text-slate-100">
              Department Distribution
            </span>
          </div>
          <div className="p-2">
            <DonutChart data={deptSummary} />
          </div>
        </Card>

        <Card className="p-6 card hover-lift animate-slide-up [animation-delay:200ms]">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-emerald-500/20 text-emerald-400 p-2 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/10 border border-emerald-500/20">
              <Icon name="calendar" size={14} />
            </div>
            <span className="font-syne font-extrabold text-[15px] tracking-tight text-slate-100">
              All-Time Attendance
            </span>
          </div>
          <div className="p-2">
            <DonutChart
              data={[
                {
                  label: "Present",
                  value: statsSummary?.allTimePresent || 0,
                  color: "#10b981",
                },
                {
                  label: "Absent",
                  value: statsSummary?.allTimeAbsent || 0,
                  color: "#f43f5e",
                },
              ]}
            />
          </div>
        </Card>
      </div>

      <Card className="p-6 mb-8 card animate-slide-up [animation-delay:300ms]">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-amber-500/20 text-amber-400 p-2 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/10 border border-amber-500/20">
            <Icon name="star" size={14} />
          </div>
          <span className="font-syne font-extrabold text-[15px] tracking-tight text-slate-100">
            Performance Overview <span className="text-slate-500 mx-1">—</span> Total Present Days
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {employees.map((emp) => {
            const days = presentDaysMap[emp.id] || 0;
            const total = attendance.filter(
              (a) => a.employeeId === emp.id,
            ).length;
            const rate = total > 0 ? Math.round((days / total) * 100) : 0;
            const deptColor = DEPT_COLORS[emp.department] || "#6366f1";

            return (
              <div
                key={emp.id}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 transition-all duration-300 hover:bg-white/[0.06] hover:border-white/[0.12] group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-[15px] font-extrabold shrink-0 shadow-lg group-hover:scale-105 transition-transform"
                    style={{
                      background: `linear-gradient(135deg,${deptColor},${deptColor}aa)`,
                      boxShadow: `0 4px 12px ${deptColor}33`
                    }}
                  >
                    {emp.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-[14px] truncate text-slate-100">
                      {emp.name}
                    </div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                      {emp.department}
                    </div>
                  </div>
                  <div className="ml-auto text-right shrink-0">
                    <div className="font-syne font-extrabold text-2xl text-white leading-none">
                      {days}
                    </div>
                    <div className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.1em]">
                      days
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <MiniBar
                    pct={Math.round((days / maxPresent) * 100)}
                    color={deptColor}
                  />
                  <div className="flex justify-between items-center px-0.5">
                    <span className="text-[10px] text-slate-500 font-bold">
                      {total} records
                    </span>
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded-md"
                      style={{
                        background: rate >= 80 ? "#10b98122" : rate >= 50 ? "#f59e0b22" : "#f43f5e22",
                        color: rate >= 80 ? "#10b981" : rate >= 50 ? "#f59e0b" : "#f43f5e",
                      }}
                    >
                      {rate}% rate
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="p-6 card animate-slide-up [animation-delay:400ms]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/20 text-blue-400 p-2 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/10 border border-blue-500/20">
              <Icon name="trend" size={14} />
            </div>
            <span className="font-syne font-extrabold text-[15px] tracking-tight text-slate-100">
              Recent Activity Feed
            </span>
          </div>
          <button
            onClick={onViewAllAttendance}
            className="text-primary text-[12px] cursor-pointer font-bold uppercase tracking-wider hover:underline flex items-center gap-1.5 group"
          >
            View all <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {[...attendance]
            .reverse()
            .slice(0, 5)
            .map((rec, i) => {
              const emp = employees.find((e) => e.id === rec.employeeId);
              const deptColor = DEPT_COLORS[emp?.department || ""] || "#6366f1";
              return (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 px-4 bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.04] rounded-2xl transition-all duration-300"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-[13px] font-bold shrink-0 shadow-inner"
                      style={{
                        background: deptColor + "15",
                        border: `1px solid ${deptColor}22`,
                        color: deptColor,
                      }}
                    >
                      {emp?.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[14px] font-bold text-slate-200 truncate">
                        {emp?.name}
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium">
                        {mounted 
                          ? new Date(rec.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric"
                            })
                          : rec.date
                        }
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant={rec.status === "Present" ? "success" : "danger"}
                    className="!py-1 !px-3 shadow-lg"
                  >
                    {rec.status === "Present" ? "● Present" : "○ Absent"}
                  </Badge>
                </div>
              );
            })}
          {attendance.length === 0 && (
            <div className="text-center text-slate-400 text-[14px] py-10 opacity-50 italic">
              No recent records found...
            </div>
          )}
        </div>
      </Card>
    </>
  );
};
