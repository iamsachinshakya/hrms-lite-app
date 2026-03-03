import { Card } from "@/components/ui/Card";
import { Icon, IconName } from "@/components/ui/Icon";

interface StatItem {
  label: string;
  value: string | number;
  icon: IconName;
  color: string;
  sub: string;
}

interface StatsGridProps {
  stats: StatItem[];
  isMobile: boolean;
}

export const StatsGrid = ({ stats, isMobile }: StatsGridProps) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 group/grid">
      {stats.map((c) => (
        <Card
          key={c.label}
          className="p-5 sm:p-6 relative overflow-hidden card hover-lift"
        >
          {/* Decorative background glow */}
          <div
            className="absolute -top-[24px] -right-[24px] w-[90px] h-[90px] rounded-full blur-3xl opacity-20"
            style={{ background: c.color }}
          />
          
          <div className="flex items-start justify-between mb-4">
            <div className="flex flex-col gap-1">
              <span className="text-slate-500 text-[10px] uppercase font-bold tracking-[0.1em]">
                {c.label}
              </span>
              <div className="text-3xl sm:text-4xl font-syne font-extrabold leading-none tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-400">
                {c.value}
              </div>
            </div>
            <div
              className="p-2.5 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 hover:rotate-6 scale-110"
              style={{ 
                background: `linear-gradient(135deg, ${c.color}33, ${c.color}11)`,
                border: `1px solid ${c.color}22`,
                color: c.color 
              }}
            >
              <Icon name={c.icon} size={16} />
            </div>
          </div>

          <div className="flex items-center gap-2 mt-auto pt-2 border-t border-white/[0.04]">
            <div className={`w-1.5 h-1.5 rounded-full`} style={{ background: c.color }} />
            <span className="text-slate-400 text-[11px] font-medium leading-none">
              {c.sub}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
};
