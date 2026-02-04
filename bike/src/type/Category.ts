 // types/bikeListing.ts    ← better file name than Category.ts

import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";

// Input for the query hook (usually stays the same)
export interface UseDataInput {
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  pagination: PaginationState;
}

// Response structure from your backend API
// (adjusted according to your controller's response format)
export interface BikeListingsResponse {
  success: boolean;
  count: number;           // total matching records (for pagination)
  data: SellBike[];        // array of bike listings
  // Optional - if you add more metadata later
  // message?: string;
  // totalPages?: number;
}

// Single bike listing type (matches your Mongoose schema)
export interface SellBike {
  _id: string;             // MongoDB ObjectId as string
  bikeName: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  condition: 'New' | 'Like New' | 'Good' | 'Fair' | 'Poor';
  engineCC: number;
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  color: string;
  description: string;
  contactNumber: string;
  location: string;
  images: string[];        // array of image URLs/paths
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt: string;       // ISO string from timestamps: true
  updatedAt: string;       // ISO string
  __v?: number;            // usually present, but optional
}

// For table columns / filters (most useful fields)
export type BikeTableColumn = Pick<
  SellBike,
  | 'bikeName'
  | 'brand'
  | 'model'
  | 'year'
  | 'price'
  | 'mileage'
  | 'condition'
  | 'fuelType'
  | 'location'
  | 'status'
  | 'createdAt'
> & {
  _id: string;
};

// Optional: if you want to show a simplified version somewhere
export interface BikeCardPreview {
  id: string;
  bikeName: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  condition: SellBike['condition'];
  mainImage?: string;      // first image or placeholder
  location: string;
  status: SellBike['status'];
}