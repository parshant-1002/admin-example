import { Image } from '../../../Models/common';
import {
  DateRangeState,
  SliderValue,
} from '../../../Shared/components/Filters/helpers/models';

export type TableRenderValue = string | number | undefined;
export interface SelectOption {
  value: number | string;
  label: string | number;
}

export interface ViewSpecificationData {
  data: Specification;
  show: boolean;
}

export interface FieldSchemaForSpecifications {
  label: string;
  key: keyof Specification;
  truncate?: boolean;
  format?: boolean;
  currencyFormat?: boolean;
  render?: (
    value: string | number | undefined,
    data: Specification
  ) => React.ReactNode;
}
export interface Specification {
  registrationNumber?: string;
  modelYear?: string;
  paint?: string;
  fuel?: string;
  motor?: string;
  gearbox?: string;
  gearCount?: number;
  seatCount?: number;
  security?: string;
  comfort?: string;
  appearance?: string;
  bodyType?: string;
}
// Define the main type
export interface PlanPayload {
  title: string;
  description: string;
  price: string;
  status: SelectOption;
  images: Image[];
  category: SelectOption;
  stock: number;
  registrationNumber: string;
  modelYear: string;
  paint: string;
  fuel: SelectOption;
  motor: string;
  gearbox: SelectOption;
  gearCount: number;
  seatCount: number;
  security: string;
  comfort: string;
  appearance: string;
  bodyType: SelectOption;
}

// Define the type for the category field
export interface Category {
  _id: string;
  name: string;
}

// Define the main type
export interface PlanResponsePayload {
  _id: string;
  price: number;
  status: number;
  title: string;
  description: string;
  bidStartDate: string; // or Date if you prefer to handle it as a Date object
  reservePrice: number;
  images: Image[];
  categories: Category[];
  specifications: Specification;
}

export interface ViewMultiData {
  data: {
    title: string;
    categories?: Category[];
    imgData?: Image[];
    size?: 'sm' | 'lg' | 'xl';
  } | null;
  show?: boolean;
}

export interface SelectedFilters {
  company?: SelectOption;
  dateRange?: DateRangeState;
  priceRange?: SliderValue;
  productStatus?: SelectOption;
}
