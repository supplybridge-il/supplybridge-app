import { Types } from 'mongoose';

export enum ProductCategory {
  FOOD_BEVERAGE = 'Food & Beverage',
  AGRICULTURE = 'Agriculture & Fresh Produce',
  CHEMICALS = 'Chemicals & Materials',
  TEXTILES = 'Textiles & Apparel',
  ELECTRONICS = 'Electronics & Components',
  CONSTRUCTION = 'Construction & Building',
  PACKAGING = 'Packaging & Containers',
  RAW_MATERIALS = 'Raw Materials',
  MACHINERY = 'Machinery & Equipment',
  MEDICAL_PHARMA = 'Medical & Pharma',
  AUTOMOTIVE = 'Automotive Parts',
  CLEANING = 'Cleaning & Hygiene',
  OFFICE = 'Office & Stationery',
  COSMETICS = 'Cosmetics & Personal Care',
  TOYS_LEISURE = 'Toys & Leisure',
  FURNITURE = 'Furniture & Fixtures',
  ENERGY = 'Energy & Utilities',
  OTHER = 'Other'
}

export interface CloudinaryImage {
  publicId: string;
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface ProductVariant {
  name: string;
  value: string;
  quantity: number;
  price: number;
}

export interface IProduct {
  _id?: string;
  supplierId: Types.ObjectId | string;
  sku: string;
  name: string;
  description: string;
  category: ProductCategory;
  tags: string[];
  images: CloudinaryImage[];
  variants: ProductVariant[];
  baseQuantity: number;
  reservedQuantity: number;
  minOrderQty: number;
  unit: string;
  priceRange: {
    min: number;
    max: number;
    currency: string;
  };
  isActive: boolean;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}