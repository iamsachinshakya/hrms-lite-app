import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "danger" | "warning" | "info" | "neutral";
  style?: React.CSSProperties;
  className?: string;
}

export const Badge = ({ children, variant = "neutral", style, className = "" }: BadgeProps) => {
  const getColors = () => {
    switch (variant) {
      case "success":
        return { background: "#10b98122", color: "#10b981" };
      case "danger":
        return { background: "#ef444422", color: "#ef4444" };
      case "warning":
        return { background: "#f59e0b22", color: "#f59e0b" };
      case "info":
        return { background: "#3b82f622", color: "#3b82f6" };
      default:
        return { background: "rgba(255,255,255,0.1)", color: "#94a3b8" };
    }
  };

  return (
    <span
      className={`badge ${className}`}
      style={{ ...getColors(), ...style }}
    >
      {children}
    </span>
  );
};

export const Chip = ({ children, variant = "neutral", style, className = "" }: BadgeProps) => {
  const getColors = () => {
    switch (variant) {
      case "success":
        return { background: "#10b98122", color: "#10b981" };
      case "danger":
        return { background: "#ef444422", color: "#ef4444" };
      case "warning":
        return { background: "#f59e0b22", color: "#f59e0b" };
      case "info":
        return { background: "#3b82f622", color: "#3b82f6" };
      default:
        return { background: "rgba(255,255,255,0.06)", color: "#94a3b8" };
    }
  };

  return (
    <span
      className={`chip ${className}`}
      style={{ ...getColors(), ...style }}
    >
      {children}
    </span>
  );
};
