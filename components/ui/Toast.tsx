import { Icon } from "@/components/ui/Icon";
import { ToastState } from "@/types";

interface ToastProps {
  toast: ToastState | null;
}

export const Toast = ({ toast }: ToastProps) => {
  if (!toast) return null;

  const isOk = toast.type === "ok";

  return (
    <div
      className="toast"
      style={{
        background: isOk ? "#064e3b" : "#450a0a",
        border: `1px solid ${isOk ? "#059669" : "#dc2626"}`,
        color: isOk ? "#a7f3d0" : "#fecaca",
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Icon name={isOk ? "check" : "x"} size={14} />
      {toast.msg}
    </div>
  );
};
