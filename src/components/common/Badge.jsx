import React from 'react';

export const RiskBadge = ({ risk, size = 'md' }) => {
  const normalized = (risk || '').toUpperCase();
  let bgClass = "bg-emerald-50 text-emerald-800 border-emerald-300"; // Low
  let label = "LOW RISK";

  if (normalized === 'MODERATE') {
    bgClass = "bg-amber-50 text-amber-800 border-amber-300";
    label = "MODERATE RISK";
  } else if (normalized === 'HIGH') {
    bgClass = "bg-orange-50 text-orange-900 border-orange-300";
    label = "HIGH RISK";
  } else if (normalized === 'CRITICAL') {
    bgClass = "bg-red-50 text-red-900 border-red-300 font-semibold";
    label = "CRITICAL RISK";
  }

  const px = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-xs';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded border ${px} ${bgClass} font-semibold tracking-wide`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
      {label}
    </span>
  );
};

export const StatusBadge = ({ status }) => {
  let color = "bg-slate-100 text-slate-700 border-slate-300";
  if (status?.includes("Emergency") || status?.includes("Critical")) {
    color = "bg-red-100 text-red-900 border-red-300 font-semibold";
  } else if (status?.includes("Awaiting") || status?.includes("Pending")) {
    color = "bg-amber-100 text-amber-900 border-amber-300";
  } else if (status?.includes("Assigned") || status?.includes("In progress")) {
    color = "bg-emerald-100 text-emerald-900 border-emerald-300";
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs border ${color}`}>
      {status}
    </span>
  );
};
