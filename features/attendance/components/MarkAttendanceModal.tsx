import React, { useState } from "react";
import { Modal } from "../../../components/ui/Modal";
import { Select, Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import { Employee } from "../../../types";

interface MarkAttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMark: (data: { employeeId: string; date: string; status: "Present" | "Absent" }) => void;
  employees: Employee[];
}

export const MarkAttendanceModal = ({
  isOpen,
  onClose,
  onMark,
  employees,
}: MarkAttendanceModalProps) => {
  const today = new Date().toISOString().split("T")[0];
  const [form, setForm] = useState({
    employeeId: "",
    date: today,
    status: "Present" as "Present" | "Absent",
  });
  const [err, setErr] = useState("");

  const handleSubmit = () => {
    if (!form.employeeId) {
      setErr("Select an employee");
      return;
    }
    onMark(form);
    setErr("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Mark Attendance">
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Select
          label="Select Employee"
          options={[
            { label: "Choose an employee...", value: "" },
            ...employees.map((e) => ({ label: `${e.name} (${e.id})`, value: e.id })),
          ]}
          value={form.employeeId}
          onChange={(e) => setForm({ ...form, employeeId: e.target.value })}
          error={err}
        />
        <Input
          label="Date"
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <Select
          label="Status"
          options={[
            { label: "Present", value: "Present" },
            { label: "Absent", value: "Absent" },
          ]}
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value as any })}
        />
        <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
          <Button
            variant="ghost"
            onClick={onClose}
            style={{ flex: 1, justifyContent: "center" }}
          >
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={handleSubmit}
            style={{ flex: 1, justifyContent: "center" }}
            icon="check"
          >
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
};
