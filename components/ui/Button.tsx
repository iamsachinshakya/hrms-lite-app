import React from "react";
import { Icon, IconName } from "./Icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "success" | "ghost";
  icon?: IconName;
  iconSize?: number;
}

export const Button = ({
  children,
  variant = "primary",
  icon,
  iconSize = 13,
  className = "",
  style,
  ...props
}: ButtonProps) => {
  const getVariantClass = () => {
    switch (variant) {
      case "primary":
        return "btn-p";
      case "success":
        return "btn-g";
      case "danger":
        return "del-btn";
      case "ghost":
        return "tab-btn off";
      default:
        return "btn-p";
    }
  };

  return (
    <button
      className={`${getVariantClass()} ${className}`}
      style={style}
      {...props}
    >
      {icon && <Icon name={icon} size={iconSize} />}
      {children}
    </button>
  );
};
