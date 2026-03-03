import React, { useState } from "react";
import { Modal } from "../../../components/ui/Modal";
import { Input, Select } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import { DEPARTMENTS } from "../../../constants";

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: { id: string; name: string; email: string; department: string }) => void;
  employees: { id: string; email: string }[];
}

export const AddEmployeeModal = ({
  isOpen,
  onClose,
  onAdd,
  employees,
}: AddEmployeeModalProps) => {
  const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
    department: DEPARTMENTS[0],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.id.trim()) e.id = "Employee ID required";
    else if (employees.find((x) => x.id === form.id.trim()))
      e.id = "ID already exists";
    if (!form.name.trim()) e.name = "Full name required";
    if (!form.email.trim()) e.email = "Email required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Invalid email format";
    else if (employees.find((x) => x.email === form.email.trim()))
      e.email = "Email already registered";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    onAdd(form);
    setForm({ id: "", name: "", email: "", department: DEPARTMENTS[0] });
    setErrors({});
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Employee">
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Input
          label="Employee ID (e.g. EMP005)"
          placeholder="EMP005"
          value={form.id}
          onChange={(e) => setForm({ ...form, id: e.target.value })}
          error={errors.id}
        />
        <Input
          label="Full Name"
          placeholder="Enter full name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          error={errors.name}
        />
        <Input
          label="Email Address"
          type="email"
          placeholder="email@nexus.io"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          error={errors.email}
        />
        <Select
          label="Department"
          options={DEPARTMENTS.map((d) => ({ label: d, value: d }))}
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
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
            variant="primary"
            onClick={handleSubmit}
            style={{ flex: 1, justifyContent: "center" }}
            icon="plus"
          >
            Add Employee
          </Button>
        </div>
      </div>
    </Modal>
  );
};
