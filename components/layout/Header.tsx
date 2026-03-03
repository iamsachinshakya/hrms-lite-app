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
}

export const Header = ({
  activeTab,
  setActiveTab,
  isMobile,
  mobileNav,
  setMobileNav,
  onAddEmployee,
  onMarkAttendance,
}: HeaderProps) => {
  return (
    <header className="sticky top-0 z-[100] bg-[#06090f]/80 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.3)] px-4 sm:px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between h-[72px] gap-4">
        {/* Logo */}
        <div className="flex items-center gap-3 shrink-0 group cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
            <Icon name="grid" size={20} />
          </div>
          <div className="hidden sm:block">
            <h1 className="font-syne font-extrabold text-xl tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              NEXUS<span className="text-indigo-400">.</span>
            </h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] leading-none mt-1">HRMS Lite</p>
          </div>
        </div>

        {/* Desktop Nav */}
        {!isMobile && (
          <div className="bg-white/[0.03] p-1.5 rounded-2xl border border-white/[0.05] shadow-inner">
            <Navigation
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isMobile={false}
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <div className="hidden sm:flex items-center gap-2 mr-2 pr-4 border-r border-white/10">
            {activeTab === "employees" && onAddEmployee && (
              <button
                onClick={onAddEmployee}
                className="btn-p !py-2 !px-4 !text-[12px] !rounded-xl"
              >
                <Icon name="plus" size={14} />
                <span>Add Employee</span>
              </button>
            )}
            {activeTab === "attendance" && onMarkAttendance && (
              <button
                onClick={onMarkAttendance}
                className="btn-g !py-2 !px-4 !text-[12px] !rounded-xl"
              >
                <Icon name="plus" size={14} />
                <span>Mark Attendance</span>
              </button>
            )}
          </div>

          <div className="w-9 h-9 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-slate-300 cursor-pointer hover:bg-slate-700 transition-colors shadow-sm">
             <span className="text-[12px] font-bold">JD</span>
          </div>

          {isMobile && (
            <button
              onClick={() => setMobileNav(!mobileNav)}
              className="w-10 h-10 flex items-center justify-center text-slate-200 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
            >
              <Icon name={mobileNav ? "close" : "menu"} size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isMobile && mobileNav && (
        <div className="absolute top-[72px] left-0 right-0 bg-[#06090f]/95 backdrop-blur-3xl border-b border-white/10 p-5 pt-2 animate-slide-up shadow-2xl z-50">
          <Navigation
            activeTab={activeTab}
            setActiveTab={(t) => {
              setActiveTab(t);
              setMobileNav(false);
            }}
            isMobile={true}
          />
          <div className="grid grid-cols-1 gap-3 mt-5 pt-5 border-t border-white/5">
            {activeTab === "employees" && onAddEmployee && (
              <button
                className="btn-p !h-11"
                onClick={() => {
                  onAddEmployee();
                  setMobileNav(false);
                }}
              >
                <Icon name="plus" size={14} /> Add Employee
              </button>
            )}
            {activeTab === "attendance" && onMarkAttendance && (
              <button
                className="btn-g !h-11"
                onClick={() => {
                  onMarkAttendance();
                  setMobileNav(false);
                }}
              >
                <Icon name="plus" size={14} /> Mark Attendance
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
