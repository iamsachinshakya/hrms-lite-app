import React from "react";
import { Icon, IconName } from "../ui/Icon";
import { Card } from "../ui/Card";

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
    <div className="stat-grid" style={{ marginBottom: 24 }}>
      {stats.map((c) => (
        <Card
          key={c.label}
          style={{
            padding: "18px 20px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -18,
              right: -18,
              width: 70,
              height: 70,
              background: c.color,
              borderRadius: "50%",
              opacity: 0.12,
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <span
              style={{
                color: "#64748b",
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontWeight: 600,
              }}
            >
              {c.label}
            </span>
            <div
              style={{
                background: c.color + "22",
                color: c.color,
                padding: 7,
                borderRadius: 8,
              }}
            >
              <Icon name={c.icon} size={13} />
            </div>
          </div>
          <div
            style={{
              fontSize: isMobile ? 24 : 30,
              fontFamily: "'Syne',sans-serif",
              fontWeight: 800,
              lineHeight: 1,
            }}
          >
            {c.value}
          </div>
          <div style={{ color: "#475569", fontSize: 11, marginTop: 6 }}>
            {c.sub}
          </div>
        </Card>
      ))}
    </div>
  );
};
