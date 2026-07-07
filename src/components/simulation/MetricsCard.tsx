'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/cn';

interface MetricsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  colorClass: string;
}

export const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  colorClass,
}) => {
  return (
    <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-xl p-4 flex items-center justify-between">
      <div>
        <p className="text-xs font-medium text-slate-400 mb-1">{title}</p>
        <h4 className="text-xl font-bold text-slate-100 font-mono tracking-tight">{value}</h4>
        {subtitle && <p className="text-[11px] text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg', colorClass)}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
};
