import { productRepository } from '@/repositories/productRepository';
import { ProductGrid } from '@/components/catalog/ProductGrid';
import { SearchBar } from '@/components/catalog/SearchBar';
import { FilterPanel } from '@/components/catalog/FilterPanel';
import { logEvent } from '@/lib/analytics/logger';

export default async function MarketplacePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; inStock?: string }>;
}) {
  const { q, category, inStock } = await searchParams;
  
  const products = await productRepository.findMarketplace({ 
    query: q, 
    category 
  });

  // Log the search event as required by Phase 2.3
  if (q || category) {
    await logEvent('product.search', { 
      query: q, 
      filters: { category, inStock }, 
      count: products.length 
    });
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-3xl font-black text-slate-900">Marketplace</h1>
        <SearchBar />
      </div>

      <div className="flex gap-10">
        <FilterPanel />
        <div className="flex-1">
          <ProductGrid products={JSON.parse(JSON.stringify(products))} />
          {products.length === 0 && (
            <div className="py-20 text-center text-slate-400 italic">
              No products match your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}