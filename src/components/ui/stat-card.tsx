// ============================================================
// WebSchool — StatCard Component
// Design: Academic Warmth — Cards com sombra offset neobrutalist
// ============================================================

import React from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  accentColor?: string;
  className?: string;
}

export function StatCard({ title, value, subtitle, icon, accentColor = "#3B4FD8", className }: StatCardProps) {
  return (
    <div
      className={cn(
        "bg-white border-2 border-[#1C1917] rounded-xl p-5 relative overflow-hidden",
        className
      )}
      style={{ boxShadow: "4px 4px 0px #1C1917" }}
    >
      <div
        className="absolute top-0 left-0 w-1.5 h-full rounded-l-xl"
        style={{ backgroundColor: accentColor }}
      />
      <div className="pl-2">
        <div className="flex items-start justify-between mb-2">
          <p className="text-xs font-semibold text-[#1C1917]/50 uppercase tracking-wider">{title}</p>
          {icon && (
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: accentColor + "20", color: accentColor }}
            >
              {icon}
            </div>
          )}
        </div>
        <p className="text-3xl font-bold text-[#1C1917]" style={{ fontFamily: "'Fraunces', serif" }}>
          {value}
        </p>
        {subtitle && <p className="text-xs text-[#1C1917]/50 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  accentColor?: string;
  action?: React.ReactNode;
}

export function PageHeader({ title, subtitle, accentColor = "#1C1917", action }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        <h1
          className="text-3xl font-bold text-[#1C1917] mb-1"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          {title}
        </h1>
        {subtitle && <p className="text-[#1C1917]/60 text-sm">{subtitle}</p>}
        <div
          className="mt-2 h-1 w-16 rounded-full"
          style={{ backgroundColor: accentColor }}
        />
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

interface SectionCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
  action?: React.ReactNode;
}

export function SectionCard({ title, children, className, noPadding, action }: SectionCardProps) {
  return (
    <div
      className={cn("bg-white border-2 border-[#1C1917] rounded-xl overflow-hidden", className)}
      style={{ boxShadow: "4px 4px 0px #1C1917" }}
    >
      {(title || action) && (
        <div className="px-5 py-4 border-b-2 border-[#1C1917] flex items-center justify-between">
          {title && (
            <h3 className="font-bold text-[#1C1917] text-sm uppercase tracking-wider">{title}</h3>
          )}
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={noPadding ? "" : "p-5"}>{children}</div>
    </div>
  );
}

interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

export function Badge({ children, color = "#3B4FD8", className }: BadgeProps) {
  return (
    <span
      className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border", className)}
      style={{
        backgroundColor: color + "15",
        color: color,
        borderColor: color + "40",
      }}
    >
      {children}
    </span>
  );
}
