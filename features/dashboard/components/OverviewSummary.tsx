import React from "react";
import { Employee, AttendanceRecord, ChartData } from "../../../types";
import { DEPT_COLORS } from "../../../constants";
import { Card } from "../../../components/ui/Card";
import { Icon } from "../../../components/ui/Icon";
import { DonutChart, MiniBar } from "../../../components/ui/Charts";
import { Badge } from "../../../components/ui/Badge";

interface OverviewSummaryProps {
  employees: Employee[];
  attendance: AttendanceRecord[];
  deptSummary: ChartData[];
  presentDaysMap: Record<string, number>;
  maxPresent: number;
  onViewAllAttendance: () => void;
}

export const OverviewSummary = ({
  employees,
  attendance,
  deptSummary,
  presentDaysMap,
  maxPresent,
  onViewAllAttendance,
}: OverviewSummaryProps) => {
  return (
    <>
      <div className="summary-grid" style={{ marginBottom: 24 }}>
        <Card style={{ padding: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
            <div style={{ background: "#6366f122", color: "#818cf8", padding: 7, borderRadius: 8 }}>
              <Icon name="dept" size={13} />
            </div>
            <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14 }}>Department Distribution</span>
          </div>
          <DonutChart data={deptSummary} />
        </Card>

        <Card style={{ padding: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
            <div style={{ background: "#10b98122", color: "#10b981", padding: 7, borderRadius: 8 }}>
              <Icon name="calendar" size={13} />
            </div>
            <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14 }}>All-Time Attendance</span>
          </div>
          <DonutChart
            data={[
              {
                label: "Present",
                value: attendance.filter((a) => a.status === "Present").length,
                color: "#10b981",
              },
              {
                label: "Absent",
                value: attendance.filter((a) => a.status === "Absent").length,
                color: "#ef4444",
              },
            ]}
          />
        </Card>
      </div>

      <Card style={{ padding: 22, marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
          <div style={{ background: "#f59e0b22", color: "#f59e0b", padding: 7, borderRadius: 8 }}>
            <Icon name="star" size={13} />
          </div>
          <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14 }}>Total Present Days — All Employees</span>
        </div>
        <div className="emp-grid">
          {employees.map((emp) => {
            const days = presentDaysMap[emp.id] || 0;
            const total = attendance.filter((a) => a.employeeId === emp.id).length;
            const rate = total > 0 ? Math.round((days / total) * 100) : 0;
            const deptColor = DEPT_COLORS[emp.department] || "#6366f1";

            return (
              <div
                key={emp.id}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 12,
                  padding: "14px 16px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg,${deptColor},${deptColor}88)`,
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, flexShrink: 0
                    }}
                  >
                    {emp.name.charAt(0)}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{emp.name}</div>
                    <div style={{ fontSize: 10, color: "#64748b" }}>{emp.department}</div>
                  </div>
                  <div style={{ marginLeft: "auto", textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 20, color: "#f1f5f9", lineHeight: 1 }}>{days}</div>
                    <div style={{ fontSize: 9, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em" }}>days</div>
                  </div>
                </div>
                <MiniBar pct={Math.round((days / maxPresent) * 100)} color={deptColor} />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                  <span style={{ fontSize: 10, color: "#475569" }}>{total} records</span>
                  <span style={{ fontSize: 10, fontWeight: 600, color: rate >= 80 ? "#10b981" : rate >= 50 ? "#f59e0b" : "#ef4444" }}>{rate}% rate</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card style={{ padding: 22 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ background: "#3b82f622", color: "#3b82f6", padding: 7, borderRadius: 8 }}>
              <Icon name="trend" size={13} />
            </div>
            <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14 }}>Recent Activity</span>
          </div>
          <button
            onClick={onViewAllAttendance}
            style={{ background: "none", border: "none", color: "#6366f1", fontSize: 12, cursor: "pointer", fontWeight: 600 }}
          >
            View all →
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[...attendance].reverse().slice(0, 5).map((rec, i) => {
            const emp = employees.find((e) => e.id === rec.employeeId);
            const deptColor = DEPT_COLORS[emp?.department || ""] || "#6366f1";
            return (
              <div
                key={i}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: "rgba(255,255,255,0.025)", borderRadius: 10
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                  <div
                    style={{
                      width: 30, height: 30, borderRadius: "50%", background: deptColor + "33", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: deptColor, flexShrink: 0
                    }}
                  >
                    {emp?.name.charAt(0)}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{emp?.name}</div>
                    <div style={{ fontSize: 11, color: "#64748b" }}>{new Date(rec.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</div>
                  </div>
                </div>
                <Badge variant={rec.status === "Present" ? "success" : "danger"}>
                  {rec.status === "Present" ? "● Present" : "○ Absent"}
                </Badge>
              </div>
            );
          })}
          {attendance.length === 0 && (
            <div style={{ textAlign: "center", color: "#475569", fontSize: 13, padding: "24px 0" }}>No records yet.</div>
          )}
        </div>
      </Card>
    </>
  );
};
