import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Employee } from "@/types";
import { useEffect, useState } from "react";

interface MarkAttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMark: (data: {
    employeeId: string;
    date: string;
    status: "Present" | "Absent";
  }) => void;
  employees: Employee[];
  selectedEmployeeId?: string | null;
}

export const MarkAttendanceModal = ({
  isOpen,
  onClose,
  onMark,
  employees,
  selectedEmployeeId,
}: MarkAttendanceModalProps) => {
  const today = new Date().toISOString().split("T")[0];
  const [form, setForm] = useState({
    employeeId: "",
    date: today,
    status: "Present" as "Present" | "Absent",
  });

  useEffect(() => {
    if (isOpen) {
      setForm((f) => ({
        ...f,
        employeeId: selectedEmployeeId || "",
        date: today,
      }));
    }
  }, [isOpen, selectedEmployeeId, today]);

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
      <div className="flex flex-col gap-4">
        <Select
          label="Select Employee"
          options={[
            { label: "Choose an employee...", value: "" },
            ...employees.map((e) => ({
              label: `${e.name} (${e.id})`,
              value: e.id,
            })),
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
        <div className="flex gap-3 mt-2">
          <Button
            variant="ghost"
            onClick={onClose}
            className="flex-1 justify-center"
          >
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={handleSubmit}
            className="flex-1 justify-center"
            icon="check"
          >
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
};
