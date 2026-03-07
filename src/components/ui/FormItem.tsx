'use client';

import React from 'react';
import { CircleDot } from 'lucide-react';

interface FormChildProps {
  id: string;
  'aria-invalid'?: boolean;
  className?: string;
}

interface FormItemProps {
  label: string;
  children: React.ReactElement<FormChildProps>;
  error?: string;
  id: string;
}

export function FormItem({ label, children, error, id }: FormItemProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <CircleDot className="w-3 h-3 text-blue-600" aria-hidden="true" />
        <label htmlFor={id} className="block text-sm font-bold text-slate-800 tracking-tight">
          {label}
        </label>
      </div>

      {/* No more 'any'! We are explicitly cloning with the expected props */}
      {React.cloneElement(children, { 
        id, 
        'aria-invalid': !!error 
      })}

      {error && (
        <p role="alert" className="text-red-600 text-[11px] font-bold uppercase tracking-wider">
          {error}
        </p>
      )}
    </div>
  );
}