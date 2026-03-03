import React from "react";
import { Select, Input } from "../../../components/ui/Input";
import { Employee } from "../../../types";
import { Icon } from "../../../components/ui/Icon";

interface AttendanceFiltersProps {
  fFrom: string;
  setFFrom: (v: string) => void;
  fTo: string;
  setFTo: (v: string) => void;
  fEmp: string;
  setFEmp: (v: string) => void;
  fStat: string;
  setFStat: (v: any) => void;
  employees: Employee[];
  onClear: () => void;
  hasFilters: boolean;
}

export const AttendanceFilters = ({
  fFrom,
  setFFrom,
  fTo,
  setFTo,
  fEmp,
  setFEmp,
  fStat,
  setFStat,
  employees,
  onClear,
  hasFilters,
}: AttendanceFiltersProps) => {
  return (
    <div className="filter-row" style={{ marginBottom: 20 }}>
      <div className="filter-field">
        <Input
          label="From Date"
          type="date"
          value={fFrom}
          onChange={(e) => setFFrom(e.target.value)}
        />
      </div>
      <div className="filter-field">
        <Input
          label="To Date"
          type="date"
          value={fTo}
          onChange={(e) => setFTo(e.target.value)}
        />
      </div>
      <div className="filter-field">
        <Select
          label="Employee"
          options={[
            { label: "All Employees", value: "all" },
            ...employees.map((e) => ({ label: e.name, value: e.id })),
          ]}
          value={fEmp}
          onChange={(e) => setFEmp(e.target.value)}
        />
      </div>
      <div className="filter-field">
        <Select
          label="Status"
          options={[
            { label: "All Status", value: "all" },
            { label: "Present", value: "Present" },
            { label: "Absent", value: "Absent" },
          ]}
          value={fStat}
          onChange={(e) => setFStat(e.target.value)}
        />
      </div>
      {hasFilters && (
        <button
          onClick={onClear}
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "none",
            color: "#94a3b8",
            padding: "10px 14px",
            borderRadius: 10,
            cursor: "pointer",
            fontSize: 13,
            display: "flex",
            alignItems: "center",
            gap: 6,
            height: 41,
          }}
        >
          <Icon name="x" size={12} /> Clear
        </button>
      )}
    </div>
  );
};
