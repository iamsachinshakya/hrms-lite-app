import { Chip } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { MiniBar } from "@/components/ui/Charts";
import { Icon } from "@/components/ui/Icon";
import { DEPT_COLORS } from "@/constants";
import { Employee } from "@/types";

interface EmployeeCardProps {
  employee: Employee;
  presentDays: number;
  maxPresent: number;
  onDelete: (id: string) => void;
  isMobile: boolean;
}

export const EmployeeCard = ({
  employee,
  presentDays,
  maxPresent,
  onDelete,
  isMobile,
}: EmployeeCardProps) => {
  const deptColor = DEPT_COLORS[employee.department] || "#6366f1";

  return (
    <Card className="p-5 card hover-lift animate-fade-in flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-base font-extrabold text-white shadow-lg shadow-black/20"
            style={{
              background: `linear-gradient(135deg,${deptColor},${deptColor}88)`,
            }}
          >
            {employee.name.charAt(0)}
          </div>
          <div className="flex flex-col">
            <div className="font-bold text-[15px] leading-tight text-slate-100 group-hover:text-white transition-colors">
              {employee.name}
            </div>
            <div className="font-syne font-bold text-[11px] text-indigo-400/80 mt-0.5 tracking-tight">
              #{employee.id}
            </div>
          </div>
        </div>
        <button
          onClick={() => onDelete(employee.id)}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-200 active:scale-95 border border-red-500/10"
        >
          <Icon name="trash" size={16} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/5 border border-white/5 rounded-2xl p-3 flex flex-col gap-1 shadow-inner">
          <div className="text-[10px] text-slate-500 uppercase tracking-[0.12em] font-extrabold">
            Contact Info
          </div>
          <div className="text-[12px] text-slate-300 font-medium truncate">
            {employee.email}
          </div>
        </div>
        <div className="bg-white/5 border border-white/5 rounded-2xl p-3 flex flex-col gap-1 shadow-inner">
          <div className="text-[10px] text-slate-500 uppercase tracking-[0.12em] font-extrabold">
            Sub-Department
          </div>
          <div 
            className="text-[11px] font-bold uppercase tracking-wider truncate"
            style={{ color: deptColor }}
          >
            {employee.department}
          </div>
        </div>
      </div>

      <div className="space-y-2 mt-1">
        <div className="flex justify-between items-center px-1">
          <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wide">Activity Level</span>
          <div className="flex items-baseline gap-1">
            <span className="font-syne font-extrabold text-base text-white">
              {presentDays}
            </span>
            <span className="text-[10px] text-slate-500 font-bold uppercase">Days</span>
          </div>
        </div>
        <MiniBar
          pct={Math.round((presentDays / maxPresent) * 100)}
          color={deptColor}
        />
      </div>
    </Card>
  );
};
