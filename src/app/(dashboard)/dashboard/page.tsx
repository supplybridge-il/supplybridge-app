import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { UserRole } from '@/types/user.types';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/auth/signin');

  const { name, role } = session.user;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <header>
        <h1 className="text-3xl font-black text-slate-900">Welcome back, {name}</h1>
        <p className="text-slate-500">Here is what is happening with your {role === UserRole.SUPPLIER ? 'supply chain' : 'orders'} today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {role === UserRole.SUPPLIER ? (
          <>
            <DashboardCard title="Total Products" value="--" link="/dashboard/products" label="Manage Inventory" />
            <DashboardCard title="Active Orders" value="0" link="/dashboard/orders" label="View Orders" />
            <DashboardCard title="Total Sales" value="₪0" link="/dashboard/analytics" label="View Stats" />
          </>
        ) : (
          <>
            <DashboardCard title="My Orders" value="0" link="/dashboard/orders" label="Track Shipments" />
            <DashboardCard title="Marketplace" value="Browse" link="/marketplace" label="Find Supplies" />
            <DashboardCard title="Saved Items" value="0" link="/dashboard/saved" label="View Wishlist" />
          </>
        )}
      </div>
    </div>
  );
}

function DashboardCard({ title, value, link, label }: { title: string, value: string, link: string, label: string }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
      </div>
      <Link href={link} className="text-sm font-semibold text-blue-600 hover:text-blue-700 block">
        {label} →
      </Link>
    </div>
  );
}