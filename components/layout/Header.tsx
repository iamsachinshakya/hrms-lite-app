import { ActiveTab } from "@/types";
import { Navigation } from "@/components/layout/Navigation";
import { Icon } from "@/components/ui/Icon";

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isMobile: boolean;
  mobileNav: boolean;
  setMobileNav: (val: boolean | ((v: boolean) => boolean)) => void;
  onAddEmployee?: () => void;
  onMarkAttendance?: () => void;
  pad: string;
}

export const Header = ({
  activeTab,
  setActiveTab,
  isMobile,
  mobileNav,
  setMobileNav,
  onAddEmployee,
  onMarkAttendance,
  pad,
}: HeaderProps) => {
  return (
    <header
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: pad,
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(8,12,20,0.94)",
        backdropFilter: "blur(14px)",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 60,
          gap: 12,
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <div
            style={{
              width: 30,
              height: 30,
              background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="grid" size={14} />
          </div>
          <span
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 800,
              fontSize: 17,
              letterSpacing: "-0.02em",
            }}
          >
            NEXUS <span style={{ color: "#6366f1" }}>HR</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Navigation
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isMobile={false}
          />
        )}

        {/* Right side CTAs */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          {!isMobile && activeTab === "employees" && onAddEmployee && (
            <button className="btn-p" onClick={onAddEmployee}>
              <Icon name="plus" size={13} /> Add Employee
            </button>
          )}
          {!isMobile && activeTab === "attendance" && onMarkAttendance && (
            <button className="btn-g" onClick={onMarkAttendance}>
              <Icon name="plus" size={13} /> Mark Attendance
            </button>
          )}
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#6366f1,#ec4899)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 800,
              flexShrink: 0,
            }}
          >
            A
          </div>
          {isMobile && (
            <button
              onClick={() => setMobileNav((v: boolean) => !v)}
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "none",
                color: "#94a3b8",
                padding: 8,
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              <Icon name={mobileNav ? "close" : "menu"} size={16} />
            </button>
          )}
        </div>
      </div>

      {isMobile && mobileNav && (
        <div
          style={{
            padding: "10px 0 14px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <Navigation
            activeTab={activeTab}
            setActiveTab={(t) => {
              setActiveTab(t);
              setMobileNav(false);
            }}
            isMobile={true}
          />
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <button
              className="btn-p"
              style={{ flex: 1, justifyContent: "center" }}
              onClick={() => {
                onAddEmployee?.();
                setMobileNav(false);
              }}
            >
              <Icon name="plus" size={13} /> Add Employee
            </button>
            <button
              className="btn-g"
              style={{ flex: 1, justifyContent: "center" }}
              onClick={() => {
                onMarkAttendance?.();
                setMobileNav(false);
              }}
            >
              <Icon name="plus" size={13} /> Mark Attendance
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
