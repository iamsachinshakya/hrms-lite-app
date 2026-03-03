import React from "react";
import { ChartData } from "../../types";

export const MiniBar = ({ pct, color }: { pct: number; color: string }) => (
  <div
    style={{
      width: "100%",
      height: 6,
      background: "rgba(255,255,255,0.06)",
      borderRadius: 3,
      overflow: "hidden",
    }}
  >
    <div
      style={{
        width: `${pct}%`,
        height: "100%",
        background: color,
        borderRadius: 3,
        transition: "width 0.6s ease",
      }}
    />
  </div>
);

export function DonutChart({ data }: { data: ChartData[] }) {
  const total = data.reduce((s, d) => s + d.value, 0);

  if (total === 0)
    return (
      <div
        style={{
          textAlign: "center",
          color: "#475569",
          fontSize: 12,
          padding: 20,
        }}
      >
        No data yet
      </div>
    );

  let cum = 0;
  const R = 40;
  const C = 2 * Math.PI * R;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <svg
        width={100}
        height={100}
        viewBox="0 0 100 100"
        style={{ flexShrink: 0 }}
      >
        {data.map((d, i) => {
          const pct = d.value / total;
          const offset = C - pct * C;
          const rot = (cum / total) * 360 - 90;
          cum += d.value;
          return (
            <circle
              key={i}
              cx="50"
              cy="50"
              r={R}
              fill="none"
              stroke={d.color}
              strokeWidth="14"
              strokeDasharray={`${C} ${C}`}
              strokeDashoffset={offset}
              transform={`rotate(${rot} 50 50)`}
              style={{ transition: "stroke-dashoffset 0.6s ease" }}
            />
          );
        })}
        <text
          x="50"
          y="46"
          textAnchor="middle"
          fill="#f1f5f9"
          fontSize="14"
          fontWeight="800"
          fontFamily="'Syne',sans-serif"
        >
          {total}
        </text>
        <text
          x="50"
          y="58"
          textAnchor="middle"
          fill="#64748b"
          fontSize="7"
          fontFamily="'DM Sans',sans-serif"
        >
          TOTAL
        </text>
      </svg>
      <div
        style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}
      >
        {data.map((d, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: d.color,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  color: "#94a3b8",
                  fontFamily: "'DM Sans',sans-serif",
                }}
              >
                {d.label}
              </span>
            </div>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#f1f5f9",
                fontFamily: "'Syne',sans-serif",
              }}
            >
              {d.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
