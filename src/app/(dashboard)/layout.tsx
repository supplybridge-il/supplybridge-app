import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { UserRole } from '@/types/user.types';
import { SignOutButton } from '@/components/auth/SignOutButton';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/auth/signin');

  const { role, name } = session.user;
  const isSupplier = role === UserRole.SUPPLIER;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900">
      {/* Light Theme Header */}
      <nav className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-10">
          <Link href="/dashboard" className="text-xl font-black text-blue-600 tracking-tighter">
            SupplyBridge
          </Link>
          <div className="hidden md:flex gap-6">
            <Link href="/marketplace" className="text-sm font-semibold text-slate-600 hover:text-blue-600">Marketplace</Link>
            {isSupplier && <Link href="/dashboard/products" className="text-sm font-semibold text-slate-600 hover:text-blue-600">Inventory</Link>}
            <Link href="/dashboard/orders" className="text-sm font-semibold text-slate-600 hover:text-blue-600">Orders</Link>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold leading-none">{name}</p>
            <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">{role}</p>
          </div>
          <SignOutButton />
        </div>
      </nav>

      <main className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}