import { Icon, IconName } from "@/components/ui/Icon";
import { ActiveTab } from "@/types";

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

export const Navigation = ({
  activeTab,
  setActiveTab,
  isMobile,
}: NavigationProps) => {
  return (
    <nav
      className={`flex gap-1.5 ${
        isMobile
          ? "flex-col w-full"
          : "flex-row bg-white/[0.04] p-1.5 rounded-2xl border border-white/[0.05]"
      }`}
    >
      {TABS.map((t) => (
        <button
          key={t.id}
          className={`tab-btn ${activeTab === t.id ? "on" : "off"} ${
            isMobile ? "w-full justify-start px-4 py-3" : "px-4 py-2"
          } transition-all duration-300`}
          onClick={() => setActiveTab(t.id)}
        >
          <div className={`p-1.5 rounded-lg ${activeTab === t.id ? "bg-indigo-500/20 text-indigo-400" : "bg-white/5 text-slate-400"} group-hover:scale-110 transition-transform`}>
            <Icon name={t.icon} size={14} />
          </div>
          <span className="font-semibold tracking-tight">{t.label}</span>
          {activeTab === t.id && !isMobile && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-500 rounded-full" />
          )}
        </button>
      ))}
    </nav>
  );
};
