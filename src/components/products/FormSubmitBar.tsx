'use client';

import { Plus } from 'lucide-react';

interface Props {
  isLoading: boolean;
  label: string;
}

export function FormSubmitBar({ isLoading, label }: Props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-slate-100 lg:relative lg:bg-transparent lg:border-0 lg:p-0 lg:mt-8 z-50">
      <button 
        type="submit" 
        disabled={isLoading} 
        className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all active:scale-[0.98] disabled:bg-slate-300"
      >
        {isLoading ? 'Publishing...' : <><Plus className="w-5 h-5" /> {label}</>}
      </button>
    </div>
  );
}