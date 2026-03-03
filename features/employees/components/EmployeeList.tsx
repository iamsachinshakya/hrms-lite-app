import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { MiniBar } from "@/components/ui/Charts";
import { Icon } from "@/components/ui/Icon";
import { DEPT_COLORS } from "@/constants";
import { EmployeeCard } from "@/features/employees/components/EmployeeCard";
import { Employee } from "@/types";

interface EmployeeListProps {
  employees: Employee[];
  presentDaysMap: Record<string, number>;
  maxPresent: number;
  onDelete: (id: string) => void;
  onRowClick?: (id: string) => void;
  isMobile: boolean;
  isTablet: boolean;
}

export const EmployeeList = ({
  employees,
  presentDaysMap,
  maxPresent,
  onDelete,
  onRowClick,
  isMobile,
  isTablet,
}: EmployeeListProps) => {
  if (employees.length === 0) {
    return (
      <div className="text-center text-slate-500 py-10 text-sm">
        No employees found.
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="flex flex-col gap-2.5">
        {employees.map((emp) => (
          <EmployeeCard
            key={emp.id}
            employee={emp}
            presentDays={presentDaysMap[emp.id] || 0}
            maxPresent={maxPresent}
            onDelete={onDelete}
            isMobile={true}
          />
        ))}
      </div>
    );
  }

  return (
    <Card className="card overflow-hidden animate-fade-in border-white/[0.05]">
      <div className="overflow-x-auto scrollbar-hide">
        <table className={`w-full border-collapse ${isTablet ? "min-w-[500px]" : "min-w-[800px]"}`}>
          <thead>
            <tr className="bg-white/[0.03] border-b border-white/[0.08]">
              {!isTablet && (
                <th className="text-left px-6 py-4 text-[11px] text-slate-500 font-bold uppercase tracking-[0.15em]">
                  ID
                </th>
              )}
              <th className="text-left px-6 py-4 text-[11px] text-slate-500 font-bold uppercase tracking-[0.15em]">
                Employee
              </th>
              {!isTablet && (
                <th className="text-left px-6 py-4 text-[11px] text-slate-500 font-bold uppercase tracking-[0.15em]">
                  Contact
                </th>
              )}
              <th className="text-left px-6 py-4 text-[11px] text-slate-500 font-bold uppercase tracking-[0.15em]">
                Department
              </th>
              <th className="text-left px-6 py-4 text-[11px] text-slate-500 font-bold uppercase tracking-[0.15em]">
                Activity
              </th>
              <th className="text-right px-6 py-4 text-[11px] text-slate-500 font-bold uppercase tracking-[0.15em]">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {employees.map((emp) => {
              const days = presentDaysMap[emp.id] || 0;
              const deptColor = DEPT_COLORS[emp.department] || "#6366f1";
              return (
                <tr
                  key={emp.id}
                  onClick={() => onRowClick?.(emp.id)}
                  className="hover:bg-white/[0.04] transition-all duration-200 group/row cursor-pointer"
                >
                  {!isTablet && (
                    <td className="px-6 py-4 text-[12px] font-syne font-bold text-indigo-400 opacity-80 group-hover/row:opacity-100 transition-opacity">
                      #{emp.id}
                    </td>
                  )}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-[13px] font-extrabold shadow-lg shadow-black/20"
                        style={{
                          background: `linear-gradient(135deg,${deptColor},${deptColor}88)`,
                        }}
                      >
                        {emp.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[14px] font-bold text-slate-200 group-hover/row:text-white transition-colors">
                          {emp.name}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium">Joined {emp.joinDate || "N/A"}</span>
                      </div>
                    </div>
                  </td>
                  {!isTablet && (
                    <td className="px-6 py-4 text-[13px] text-slate-400 font-medium">
                      {emp.email}
                    </td>
                  )}
                  <td className="px-6 py-4">
                    <span
                      className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                      style={{
                        background: deptColor + "15",
                        border: `1px solid ${deptColor}33`,
                        color: deptColor,
                      }}
                    >
                      {emp.department}
                    </span>
                  </td>
                  <td className="px-6 py-4 w-[160px]">
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <MiniBar
                          pct={Math.round((days / maxPresent) * 100)}
                          color={deptColor}
                        />
                      </div>
                      <span className="text-[13px] font-syne font-extrabold text-slate-300 min-w-[24px] text-right">
                        {days}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(emp.id);
                      }}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-200 opacity-40 group-hover/row:opacity-100 hover:scale-110 shadow-lg shadow-red-500/0 hover:shadow-red-500/20"
                    >
                      <Icon name="trash" size={14} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
