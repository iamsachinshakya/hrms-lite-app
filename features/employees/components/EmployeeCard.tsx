import React from "react";
import { Employee } from "../../../types";
import { DEPT_COLORS } from "../../../constants";
import { Card } from "../../../components/ui/Card";
import { Icon } from "../../../components/ui/Icon";
import { Chip } from "../../../components/ui/Badge";
import { MiniBar } from "../../../components/ui/Charts";
import { Button } from "../../../components/ui/Button";

interface EmployeeCardProps {
  employee: Employee;
  presentDays: number;
  maxPresent: number;
  onDelete: (id: string) => void;
  isMobile: boolean;
}

export const EmployeeCard = ({
  employee,
  presentDays,
  maxPresent,
  onDelete,
  isMobile,
}: EmployeeCardProps) => {
  const deptColor = DEPT_COLORS[employee.department] || "#6366f1";

  return (
    <Card style={{ padding: 16 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: `linear-gradient(135deg,${deptColor},${deptColor}88)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              fontWeight: 800,
            }}
          >
            {employee.name.charAt(0)}
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14 }}>{employee.name}</div>
            <div
              style={{
                fontFamily: "'Syne',sans-serif",
                fontWeight: 700,
                fontSize: 11,
                color: "#818cf8",
              }}
            >
              {employee.id}
            </div>
          </div>
        </div>
        <Button variant="danger" onClick={() => onDelete(employee.id)} style={{ padding: "6px 10px", borderRadius: 8 }}>
          <Icon name="trash" size={13} />
        </Button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
          marginBottom: 10,
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            borderRadius: 8,
            padding: "8px 10px",
          }}
        >
          <div
            style={{
              fontSize: 9,
              color: "#64748b",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: 3,
              fontWeight: 600,
            }}
          >
            Email
          </div>
          <div
            style={{
              fontSize: 11,
              color: "#94a3b8",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {employee.email}
          </div>
        </div>
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            borderRadius: 8,
            padding: "8px 10px",
          }}
        >
          <div
            style={{
              fontSize: 9,
              color: "#64748b",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: 4,
              fontWeight: 600,
            }}
          >
            Dept
          </div>
          <Chip
            style={{
              background: deptColor + "22",
              color: deptColor.length > 7 ? deptColor : deptColor, // simple mock logic for color
            }}
          >
            {employee.department}
          </Chip>
        </div>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 5,
          }}
        >
          <span style={{ fontSize: 10, color: "#64748b" }}>Present days</span>
          <span
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 700,
              fontSize: 12,
            }}
          >
            {presentDays}
          </span>
        </div>
        <MiniBar
          pct={Math.round((presentDays / maxPresent) * 100)}
          color={deptColor}
        />
      </div>
    </Card>
  );
};
