import { SelectOption } from '../../../../Models/common';

export interface PriceRange {
  min: number;
  max: number;
}
export interface FiltersState {
  startDate?: string | Date;
  endDate?: string | Date;
  priceRange?: [number, number];
  brand?: SelectOption[];
  selectedBrand?: SelectOption | null;
  status?: SelectOption[];
  selectedStatus?: SelectOption | null;
}
