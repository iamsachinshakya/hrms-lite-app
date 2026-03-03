import { Icon } from "@/components/ui/Icon";
import { Input, Select } from "@/components/ui/Input";
import { Employee } from "@/types";

interface AttendanceFiltersProps {
  fFrom: string;
  setFFrom: (v: string) => void;
  fTo: string;
  setFTo: (v: string) => void;
  fEmp: string;
  setFEmp: (v: string) => void;
  fStat: string;
  setFStat: (v: any) => void;
  employees: Employee[];
  onClear: () => void;
  hasFilters: boolean;
}

export const AttendanceFilters = ({
  fFrom,
  setFFrom,
  fTo,
  setFTo,
  fEmp,
  setFEmp,
  fStat,
  setFStat,
  employees,
  onClear,
  hasFilters,
}: AttendanceFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-4 items-end mb-8 bg-white/[0.02] border border-white/[0.05] p-5 rounded-3xl backdrop-blur-md shadow-xl">
      <div className="flex flex-col gap-1.5 flex-1 min-w-[140px]">
        <Input
          label="From Date"
          type="date"
          className="!bg-white/[0.03] !border-white/10 hover:!border-white/20 focus:!border-indigo-500/50 transition-all"
          value={fFrom}
          onChange={(e) => setFFrom(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1.5 flex-1 min-w-[140px]">
        <Input
          label="To Date"
          type="date"
          className="!bg-white/[0.03] !border-white/10 hover:!border-white/20 focus:!border-indigo-500/50 transition-all"
          value={fTo}
          onChange={(e) => setFTo(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1.5 flex-1 min-w-[200px]">
        <Select
          label="Filter by Employee"
          options={[
            { label: "All Members", value: "all" },
            ...employees.map((e) => ({ label: e.name, value: e.id })),
          ]}
          value={fEmp}
          onChange={(e) => setFEmp(e.target.value)}
          className="!bg-white/[0.03] !border-white/10 hover:!border-white/20 focus:!border-indigo-500/50 transition-all"
        />
      </div>
      <div className="flex flex-col gap-1.5 flex-1 min-w-[140px]">
        <Select
          label="Status"
          options={[
            { label: "Any Status", value: "all" },
            { label: "Present", value: "Present" },
            { label: "Absent", value: "Absent" },
          ]}
          value={fStat}
          onChange={(e) => setFStat(e.target.value)}
          className="!bg-white/[0.03] !border-white/10 hover:!border-white/20 focus:!border-indigo-500/50 transition-all"
        />
      </div>
      {hasFilters && (
        <button
          onClick={onClear}
          className="bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 px-5 py-2.5 rounded-2xl cursor-pointer text-[13px] font-bold uppercase tracking-wider flex items-center gap-2 h-[46px] transition-all active:scale-95 shadow-lg group"
        >
          <Icon name="x" size={14} className="group-hover:rotate-90 transition-transform duration-300" /> 
          Reset Filters
        </button>
      )}
    </div>
  );
};
