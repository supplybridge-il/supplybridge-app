import Product from '@/models/Product';
import dbConnect from '@/lib/db/connect';
import { IProduct } from '@/types/product.types';

export const productRepository = {
  async create(data: Partial<IProduct>): Promise<IProduct> {
    await dbConnect();
    return Product.create(data);
  },

  async findById(id: string): Promise<IProduct | null> {
    await dbConnect();
    return Product.findById(id).lean();
  },

  async findBySupplier(supplierId: string): Promise<IProduct[]> {
    await dbConnect();
    return Product.find({ supplierId }).sort({ createdAt: -1 }).lean();
  },

  async countBySupplier(supplierId: string): Promise<number> {
    await dbConnect();
    return Product.countDocuments({ supplierId });
  },

  async update(id: string, data: Partial<IProduct>): Promise<IProduct | null> {
    await dbConnect();
    return Product.findByIdAndUpdate(id, data, { new: true }).lean();
  },

  async softDelete(id: string): Promise<void> {
    await dbConnect();
    await Product.findByIdAndUpdate(id, { isActive: false });
  },

  async findMarketplace(filters: { category?: string | null; query?: string | null }) {
    await dbConnect();
    
    // Constructing the query object dynamically ensures type safety 
    // without requiring the problematic FilterQuery type import.
    const query = { 
      isActive: true,
      ...(filters.category && { category: filters.category }),
      ...(filters.query && { $text: { $search: filters.query } })
    };

    return Product.find(query)
      .select('name priceRange images category baseQuantity minOrderQty unit')
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();
  }
};