import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export const Input = ({ label, error, className = "", style, ...props }: InputProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, width: "100%" }}>
      {label && (
        <label style={{ fontSize: 12, fontWeight: 500, color: "#94a3b8" }}>
          {label}
        </label>
      )}
      <input
        className={`inp ${error ? "err" : ""} ${className}`}
        style={style}
        {...props}
      />
      {error && (
        <span style={{ fontSize: 11, color: "#ef4444" }}>{error}</span>
      )}
    </div>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { label: string; value: string }[];
  error?: string;
}

export const Select = ({ label, options, error, className = "", style, ...props }: SelectProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, width: "100%" }}>
      {label && (
        <label style={{ fontSize: 12, fontWeight: 500, color: "#94a3b8" }}>
          {label}
        </label>
      )}
      <select
        className={`inp ${error ? "err" : ""} ${className}`}
        style={style}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <span style={{ fontSize: 11, color: "#ef4444" }}>{error}</span>
      )}
    </div>
  );
};
