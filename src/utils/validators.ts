import { z } from 'zod';
import { UserRole } from '@/types/user.types';
import { ProductCategory } from '@/types/product.types';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  companyName: z.string().min(2, 'Company name is required'),
  role: z.nativeEnum(UserRole, { message: 'Invalid role selected' }),
}).strict();

export const productSchema = z.object({
  sku: z.string().min(1, 'SKU is required'),
  name: z.string().min(3, 'Product name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.nativeEnum(ProductCategory, { message: 'Invalid category' }),
  tags: z.array(z.string()).optional().default([]),
  baseQuantity: z.number().min(0, 'Quantity cannot be negative'),
  minOrderQty: z.number().min(1, 'Minimum order must be at least 1'),
  unit: z.string().min(1, 'Unit (e.g., kg, unit) is required'),
  priceRange: z.object({
    min: z.number().min(0),
    max: z.number().min(0),
    currency: z.string().default('ILS'),
  }),
  isActive: z.boolean().optional().default(true),
}).strict();

export type RegisterInput = z.infer<typeof registerSchema>;
export type ProductInput = z.infer<typeof productSchema>;