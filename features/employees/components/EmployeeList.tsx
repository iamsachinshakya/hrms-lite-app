import React from "react";
import { Employee } from "../../../types";
import { DEPT_COLORS } from "../../../constants";
import { EmployeeCard } from "./EmployeeCard";
import { Icon } from "../../../components/ui/Icon";
import { Card } from "../../../components/ui/Card";
import { MiniBar } from "../../../components/ui/Charts";
import { Button } from "../../../components/ui/Button";

interface EmployeeListProps {
  employees: Employee[];
  presentDaysMap: Record<string, number>;
  maxPresent: number;
  onDelete: (id: string) => void;
  isMobile: boolean;
  isTablet: boolean;
}

export const EmployeeList = ({
  employees,
  presentDaysMap,
  maxPresent,
  onDelete,
  isMobile,
  isTablet,
}: EmployeeListProps) => {
  if (employees.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          color: "#475569",
          padding: "40px 0",
          fontSize: 14,
        }}
      >
        No employees found.
      </div>
    );
  }

  if (isMobile) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {employees.map((emp) => (
          <EmployeeCard
            key={emp.id}
            employee={emp}
            presentDays={presentDaysMap[emp.id] || 0}
            maxPresent={maxPresent}
            onDelete={onDelete}
            isMobile={true}
          />
        ))}
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
            minWidth: isTablet ? 500 : 720,
          }}
        >
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              {!isTablet && (
                <th style={{ textAlign: "left", padding: "14px 20px", fontSize: 11, color: "#64748b", fontWeight: 600 }}>ID</th>
              )}
              <th style={{ textAlign: "left", padding: "14px 20px", fontSize: 11, color: "#64748b", fontWeight: 600 }}>Name</th>
              {!isTablet && (
                <th style={{ textAlign: "left", padding: "14px 20px", fontSize: 11, color: "#64748b", fontWeight: 600 }}>Email</th>
              )}
              <th style={{ textAlign: "left", padding: "14px 20px", fontSize: 11, color: "#64748b", fontWeight: 600 }}>Department</th>
              <th style={{ textAlign: "left", padding: "14px 20px", fontSize: 11, color: "#64748b", fontWeight: 600 }}>Performance</th>
              <th style={{ textAlign: "right", padding: "14px 20px", fontSize: 11, color: "#64748b", fontWeight: 600 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => {
              const days = presentDaysMap[emp.id] || 0;
              const deptColor = DEPT_COLORS[emp.department] || "#6366f1";
              return (
                <tr key={emp.id} className="rh" style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                  {!isTablet && (
                    <td style={{ padding: "14px 20px", fontSize: 12, fontFamily: "'Syne',sans-serif", fontWeight: 700, color: "#818cf8" }}>{emp.id}</td>
                  )}
                  <td style={{ padding: "14px 20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: "50%",
                          background: `linear-gradient(135deg,${deptColor},${deptColor}88)`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 11,
                          fontWeight: 800,
                        }}
                      >
                        {emp.name.charAt(0)}
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 500 }}>{emp.name}</span>
                    </div>
                  </td>
                  {!isTablet && (
                    <td style={{ padding: "14px 20px", fontSize: 13, color: "#94a3b8" }}>{emp.email}</td>
                  )}
                  <td style={{ padding: "14px 20px" }}>
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: 6,
                        fontSize: 11,
                        fontWeight: 600,
                        background: deptColor + "22",
                        color: deptColor,
                      }}
                    >
                      {emp.department}
                    </span>
                  </td>
                  <td style={{ padding: "14px 20px", width: 140 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ flex: 1 }}>
                        <MiniBar pct={Math.round((days / maxPresent) * 100)} color={deptColor} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 700, fontFamily: "'Syne',sans-serif", minWidth: 20 }}>{days}</span>
                    </div>
                  </td>
                  <td style={{ padding: "14px 20px", textAlign: "right" }}>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                      <Button variant="danger" onClick={() => onDelete(emp.id)} style={{ padding: "6px 10px", borderRadius: 8 }}>
                        <Icon name="trash" size={13} />
                      </Button>
                    </div>
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
