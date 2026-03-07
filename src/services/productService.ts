import { productRepository } from '@/repositories/productRepository';
import { IProduct } from '@/types/product.types';
import { UserTier } from '@/types/user.types';

export const productService = {
  async createProduct(userId: string, tier: UserTier, data: Partial<IProduct>) {
    // Enforce free tier limit: Max 25 SKUs 
    if (tier === UserTier.FREE) {
      const count = await productRepository.countBySupplier(userId);
      if (count >= 25) {
        throw new Error('LIMIT_EXCEEDED');
      }
    }

    const productData = { ...data, supplierId: userId };
    const product = await productRepository.create(productData);
    
    // TODO (Phase 5): writeLog({ eventType: 'product.create', ... }) [cite: 70, 97]
    return product;
  },

  async getSupplierProducts(userId: string) {
    return productRepository.findBySupplier(userId);
  },

  async deleteProduct(productId: string, userId: string) {
    const product = await productRepository.findById(productId);
    if (!product || product.supplierId.toString() !== userId) {
      throw new Error('NOT_FOUND_OR_UNAUTHORIZED');
    }
    return productRepository.softDelete(productId);
  }
};