import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { DEPT_COLORS } from "@/constants";
import { AttendanceRecord, Employee } from "@/types";

interface AttendanceListProps {
  attendance: AttendanceRecord[];
  employees: Employee[];
}

export const AttendanceList = ({
  attendance,
  employees,
}: AttendanceListProps) => {
  if (attendance.length === 0) {
    return (
      <div className="text-center text-slate-500 text-[13px] py-10">
        No records found.
      </div>
    );
  }

  return (
    <Card className="card overflow-hidden animate-fade-in border-white/[0.05]">
      <div className="overflow-x-auto scrollbar-hide">
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-white/[0.03] border-b border-white/[0.08]">
              <th className="text-left px-6 py-4 text-[11px] text-slate-500 font-bold uppercase tracking-[0.15em]">
                Employee Details
              </th>
              <th className="text-left px-6 py-4 text-[11px] text-slate-500 font-bold uppercase tracking-[0.15em]">
                Date Recorded
              </th>
              <th className="text-right px-6 py-4 text-[11px] text-slate-500 font-bold uppercase tracking-[0.15em]">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {attendance.map((rec, i) => {
              const emp = employees.find((e) => e.id === rec.employeeId);
              const deptColor = DEPT_COLORS[emp?.department || ""] || "#6366f1";
              return (
                <tr
                  key={i}
                  className="hover:bg-white/[0.04] transition-all duration-200 group/row"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-[13px] font-bold shadow-inner transition-transform group-hover/row:scale-110"
                        style={{
                          background: deptColor + "15",
                          border: `1px solid ${deptColor}22`,
                          color: deptColor,
                        }}
                      >
                        {emp?.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[14px] font-bold text-slate-200 group-hover/row:text-white transition-colors">
                          {emp?.name}
                        </span>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                          {emp?.department}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-[13px] text-slate-300 font-medium">
                        {new Date(rec.date).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </span>
                      <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">
                        Timestamp: {rec.date}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Badge
                      variant={rec.status === "Present" ? "success" : "danger"}
                      className="!pt-1 !px-4 shadow-lg shadow-black/20"
                    >
                      {rec.status === "Present" ? "● Present" : "○ Absent"}
                    </Badge>
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
