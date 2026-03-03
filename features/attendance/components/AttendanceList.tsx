import React from "react";
import { AttendanceRecord, Employee } from "../../../types";
import { DEPT_COLORS } from "../../../constants";
import { Card } from "../../../components/ui/Card";
import { Badge } from "../../../components/ui/Badge";

interface AttendanceListProps {
  attendance: AttendanceRecord[];
  employees: Employee[];
}

export const AttendanceList = ({ attendance, employees }: AttendanceListProps) => {
  if (attendance.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          color: "#475569",
          fontSize: 13,
          padding: "40px 0",
        }}
      >
        No records found.
      </div>
    );
  }

  return (
    <Card style={{ padding: 0, overflow: "hidden" }}>
      <div className="scrollable">
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: 500,
          }}
        >
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <th style={{ textAlign: "left", padding: "14px 20px", fontSize: 11, color: "#64748b", fontWeight: 600 }}>Employee</th>
              <th style={{ textAlign: "left", padding: "14px 20px", fontSize: 11, color: "#64748b", fontWeight: 600 }}>Date</th>
              <th style={{ textAlign: "right", padding: "14px 20px", fontSize: 11, color: "#64748b", fontWeight: 600 }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((rec, i) => {
              const emp = employees.find((e) => e.id === rec.employeeId);
              const deptColor = DEPT_COLORS[emp?.department || ""] || "#6366f1";
              return (
                <tr key={i} className="rh" style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                  <td style={{ padding: "14px 20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          background: deptColor + "22",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 10,
                          fontWeight: 700,
                          color: deptColor,
                        }}
                      >
                        {emp?.name.charAt(0)}
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 500, color: "#f1f5f9" }}>{emp?.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: "14px 20px", fontSize: 13, color: "#94a3b8" }}>
                    {new Date(rec.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td style={{ padding: "14px 20px", textAlign: "right" }}>
                    <Badge variant={rec.status === "Present" ? "success" : "danger"}>
                      {rec.status === "Present" ? "● Present" : "○ Absent"}
                    </Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
