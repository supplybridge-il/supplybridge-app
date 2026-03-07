import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';
import { productService } from '@/services/productService';
import { ProductList } from '@/components/products/ProductList';
import { Button } from '@/components/ui/Button';
import { UserSession } from '@/types/user.types';

export default async function SupplierProductsPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user as UserSession;

  // Fetch only products belonging to this supplier
  const products = await productService.getSupplierProducts(user.id);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Inventory Management</h1>
          <p className="text-slate-500">Manage your product catalog and track stock levels.</p>
        </div>
        <Link href="/dashboard/products/new">
          <Button>+ Add Product</Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <ProductList products={JSON.parse(JSON.stringify(products))} />
      </div>
    </div>
  );
}