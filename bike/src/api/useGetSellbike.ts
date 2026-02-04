// hooks/useGetBikeListings.ts
import { useQuery } from '@tanstack/react-query';
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from '@tanstack/react-table';

import routes from '@/api/routes'; // ← adjust path if needed

// Better type names (you should move these to types/bikeListing.ts)
interface BikeListingsResponse {
  success: boolean;
  count: number;
  data: any[]; // ← replace with SellBike[] when you have the type
  message?: string;
}

interface UseBikeListingsParams {
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  pagination: PaginationState;
}

/**
 * Fetches bike listings with filtering, sorting and pagination
 */
export const useGetBikeListings = ({
  sorting,
  columnFilters,
  pagination,
}: UseBikeListingsParams) => {
  const queryFn = async (): Promise<BikeListingsResponse> => {
    // ── Pagination ───────────────────────────────────────
    const page = pagination.pageIndex + 1;
    const limit = pagination.pageSize;
    const offset = (page - 1) * limit;

    // ── Filters ──────────────────────────────────────────
    const filters: Record<string, string> = {};

    columnFilters.forEach(({ id, value }) => {
      const strValue = (value as string)?.trim() ?? '';

      switch (id) {
        case 'search':
        case 'bikeName':
          if (strValue) filters.search = strValue;
          break;

        case 'brand':
          if (strValue) filters.brand = strValue;
          break;

        case 'location':
          if (strValue) filters.location = strValue;
          break;

        case 'status':
          if (strValue) filters.status = strValue.toLowerCase();
          break;

        case 'condition':
          if (strValue) filters.condition = strValue;
          break;

        case 'fuelType':
          if (strValue) filters.fuelType = strValue;
          break;

        // You can add more filters later (price range, year, etc.)
        // case 'price':
        //   if (value && typeof value === 'object') {
        //     if (value.min) filters.minPrice = String(value.min);
        //     if (value.max) filters.maxPrice = String(value.max);
        //   }
        //   break;
      }
    });

    // ── Sorting ──────────────────────────────────────────
    let sortBy = '';
    let sortDirection = '';

    if (sorting.length > 0) {
      const sort = sorting[0];
      sortBy = sort.id;
      sortDirection = sort.desc ? 'desc' : 'asc';
    }

    // ── Build URL ────────────────────────────────────────
    const url = routes.BIKE_LIST({
      // rename this route later to BIKE_LIST or similar
      ...filters,
      sorting_param: sortBy,
      direction: sortDirection,
      offset,
      limit,
    });

    const response = await fetch(url, {
      headers: {
        // Authorization: `Bearer ${getAccessToken() ?? ''}`,  ← add later
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // ← usually better for listings
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch bike listings: ${response.status}`);
    }

    const data = await response.json();

    // Make sure the shape is consistent
    return {
      success: data.success ?? false,
      count: data.count ?? 0,
      data: data.data ?? [],
      message: data.message,
    };
  };

  return useQuery<BikeListingsResponse, Error>({
    queryKey: ['bike-listings', pagination, columnFilters, sorting],
    queryFn,
    // keepPreviousData: true,           // nice UX for pagination
    staleTime: 1000 * 60 * 1.5,       // 1.5 minutes
    refetchOnWindowFocus: false,
  });
};