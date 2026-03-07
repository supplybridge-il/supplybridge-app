'use client';

import { signOut } from 'next-auth/react';

export function SignOutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: '/signin' })}
      className="text-xs font-bold text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors border border-transparent hover:border-red-100"
    >
      Sign Out
    </button>
  );
}