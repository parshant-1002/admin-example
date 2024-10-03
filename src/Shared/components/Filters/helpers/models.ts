import { SelectOption } from '../../../../Models/common';

export type SliderValue = [number, number];
export interface PriceRange {
  min: number;
  max: number;
}
export enum FilterFieldTypes {
  select = 'select',
  dateRange = 'dateRange',
  slider = 'slider',
}
export interface DateRangeState {
  startDate?: string | Date;
  endDate?: string | Date;
}
export interface FiltersState {
  [key: string]: unknown;
}

export interface BaseFilter {
  id: string;
  type: FilterFieldTypes;
  className: string;
}

export interface SelectFilter extends BaseFilter {
  type: FilterFieldTypes.select;
  options: SelectOption[]; // Replace `any[]` with the appropriate type for your options
  onChange: (value: SelectOption) => void;
  value: SelectOption | null; // Adjust based on your application's state structure
  placeholder: string;
}

export interface DateRangeFilter extends BaseFilter {
  type: FilterFieldTypes.dateRange;
  onChange: (value: DateRangeState) => void;
}

export interface PriceRangeFilter extends BaseFilter {
  type: FilterFieldTypes.slider;
  title: string;
  min: number;
  max: number;
  value: SliderValue;
  onChange: (value: SliderValue) => void;
}

export type FilterSchema = SelectFilter | DateRangeFilter | PriceRangeFilter;
