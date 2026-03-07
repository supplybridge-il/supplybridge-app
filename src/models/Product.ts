import { Schema, model, models } from 'mongoose';
import { IProduct, ProductCategory } from '@/types/product.types';

const ProductSchema = new Schema<IProduct>({
  supplierId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  sku: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: Object.values(ProductCategory), required: true },
  tags: [{ type: String }],
  images: [{
    publicId: String,
    url: String,
    alt: String,
    width: Number,
    height: Number
  }],
  variants: [{
    name: String,
    value: String,
    quantity: Number,
    price: Number
  }],
  baseQuantity: { type: Number, default: 0 },
  reservedQuantity: { type: Number, default: 0 },
  minOrderQty: { type: Number, default: 1 },
  unit: { type: String, required: true },
  priceRange: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
    currency: { type: String, default: 'ILS' }
  },
  isActive: { type: Boolean, default: true },
  viewCount: { type: Number, default: 0 }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual field: availableQuantity = baseQuantity - reservedQuantity
// Explicitly typing 'this' as IProduct to fix property access errors
ProductSchema.virtual('availableQuantity').get(function(this: IProduct) {
  return this.baseQuantity - this.reservedQuantity;
});

// Required PRD Indexes
ProductSchema.index({ supplierId: 1, isActive: 1 });
ProductSchema.index({ category: 1, isActive: 1 });
ProductSchema.index({ name: 'text', tags: 'text' });

export default models.Product || model<IProduct>('Product', ProductSchema);