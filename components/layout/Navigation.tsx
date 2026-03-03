import React from "react";
import { Icon, IconName } from "../ui/Icon";
import { ActiveTab } from "../../types";

interface NavigationProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isMobile: boolean;
}

const TABS: { id: ActiveTab; label: string; icon: IconName }[] = [
  { id: "overview", label: "Overview", icon: "bar" },
  { id: "employees", label: "Employees", icon: "users" },
  { id: "attendance", label: "Attendance", icon: "calendar" },
];

export const Navigation = ({ activeTab, setActiveTab, isMobile }: NavigationProps) => {
  return (
    <nav
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: 4,
        background: isMobile ? "transparent" : "rgba(255,255,255,0.03)",
        padding: isMobile ? 0 : 4,
        borderRadius: 12,
        flex: isMobile ? "1 1 auto" : "0 1 auto",
      }}
    >
      {TABS.map((t) => (
        <button
          key={t.id}
          className={`tab-btn ${activeTab === t.id ? "on" : "off"}`}
          style={{
            width: isMobile ? "100%" : "auto",
            justifyContent: "flex-start",
          }}
          onClick={() => setActiveTab(t.id)}
        >
          <Icon name={t.icon} size={13} /> {t.label}
        </button>
      ))}
    </nav>
  );
};
