// consts
import {
  FilterFieldTypes,
  FilterSchema,
  FiltersState,
} from '../../../Shared/components/Filters/helpers/models';
import {
  INPUT_TYPES,
  PRICE_RANGE,
  STRINGS,
  blockInvalidChar,
} from '../../../Shared/constants/constants';
import { FORM_VALIDATION_MESSAGES } from '../../../Shared/constants/validationMessages';
import {
  FieldSchemaForSpecifications,
  PlanResponsePayload,
  SelectOption,
  TableRenderValue,
} from './model';

// const COUNT_OF_MULTI_RENDER_ELEMENTS_TO_VIEW = 1;

export const FUEL_TYPE = {
  DIESEL: 1,
  PETROL: 2,
  CNG: 3,
  ELECTRIC: 4,
  HYBRID: 5,
};

export const GEARBOX_TYPE = {
  MANUAL: 1,
  AUTOMATIC: 2,
};
export const PRODUCT_AVAILABILITY_STATUS = {
  AVAILABLE: 1,
  SOLD_OUT: 2,
};
export const GEARBOX_OPTIONS = [
  { value: 1, label: 'MANUAL' },
  { value: 2, label: 'AUTOMATIC' },
];

export const FUEL_OPTIONS = [
  { value: 1, label: 'DIESEL' },
  { value: 2, label: 'PETROL' },
  { value: 3, label: 'CNG' },
  { value: 4, label: 'ELECTRIC' },
  { value: 5, label: 'HYBRID' },
];

export const PRODUCT_STATUS = [
  { value: 1, label: 'Pending' },
  { value: 2, label: 'Active' },
  { value: 3, label: 'Ended' },
];

export const PRODUCT_AVAILABILITY_STATUS_OPTIONS = [
  { value: PRODUCT_AVAILABILITY_STATUS.SOLD_OUT, label: 'SOLD OUT' },
  { value: PRODUCT_AVAILABILITY_STATUS.AVAILABLE, label: 'Available' },
];

export const PLANS_FORM_SCHEMA = () => ({
  planName: {
    type: INPUT_TYPES.TEXT,
    label: 'Plan Name',
    className: 'col-md-12',
    placeholder: 'Plan Name',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Plan Name').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
      maxLength: {
        value: 25,
        message: FORM_VALIDATION_MESSAGES(25).MAX_LENGTH,
      },
    },
  },
  duration: {
    type: INPUT_TYPES.NUMBER,
    label: 'Duration (Days)',
    className: 'col-md-12',
    placeholder: 'Duration',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Duration').REQUIRED,
      min: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_VALUE,
      },
    },
  },
  interestRate: {
    type: INPUT_TYPES.NUMBER,
    label: 'Interest Rate %',
    className: 'col-md-12',
    placeholder: 'Interest Rate',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Interest Rate').REQUIRED,
      min: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_VALUE,
      },
    },
    blockInvalidChars: blockInvalidChar,
  },

  // images: {
  //   type: INPUT_TYPES.FILE,
  //   label: 'Images',
  //   hideListSelection: true,
  //   accept: IMAGE_FILE_TYPES,
  //   className: 'col-md-12',
  //   placeholder: 'Add Images',
  //   singleImageSelectionEnabled: false,
  //   imageFileType: FILE_TYPE.PRODUCT,
  //   ratio: [1.5, 1],
  //   fetchImageDataConfig: [
  //     {
  //       key: 'productId',
  //       value: productId,
  //     },
  //   ],
  //   schema: {
  //     required: FORM_VALIDATION_MESSAGES('Image').REQUIRED,
  //   },
  // },
  // bodyType: {
  //   type: INPUT_TYPES.SELECT,
  //   label: 'Body Type',
  //   className: 'col-md-6',
  //   placeholder: 'Select a body type',
  //   options: CAR_BODY_TYPE_OPTIONS,
  //   schema: {
  //     required: FORM_VALIDATION_MESSAGES('Body Type').REQUIRED,
  //   },
  // },
  minInvestment: {
    type: INPUT_TYPES.NUMBER,
    label: 'Min Investment',
    className: 'col-md-12',
    placeholder: 'minInvestment',
    schema: {
      required: FORM_VALIDATION_MESSAGES('minInvestment').REQUIRED,
      min: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_VALUE,
      },
    },
    blockInvalidChars: blockInvalidChar,
  },
  // registrationNumber: {
  //   type: INPUT_TYPES.TEXT,
  //   label: 'Registration Number',
  //   className: 'col-md-3',
  //   placeholder: 'Registration Number',
  //   schema: {
  //     required: FORM_VALIDATION_MESSAGES('Registration Number').REQUIRED,
  //     minLength: {
  //       value: 3,
  //       message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
  //     },
  //     maxLength: {
  //       value: 30,
  //       message: FORM_VALIDATION_MESSAGES(30).MAX_LENGTH,
  //     },
  //   },
  // },
  // paint: {
  //   type: INPUT_TYPES.TEXT,
  //   label: 'Paint',
  //   className: 'col-md-3',
  //   placeholder: 'Paint',
  //   schema: {
  //     required: FORM_VALIDATION_MESSAGES('Paint').REQUIRED,
  //     minLength: {
  //       value: 3,
  //       message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
  //     },
  //     maxLength: {
  //       value: 25,
  //       message: FORM_VALIDATION_MESSAGES(25).MAX_LENGTH,
  //     },
  //   },
  // },
  // fuel: {
  //   type: INPUT_TYPES.SELECT,
  //   label: 'Fuel',
  //   className: 'col-md-3',
  //   placeholder: 'Select a fuel',
  //   options: FUEL_OPTIONS,
  //   schema: {
  //     required: FORM_VALIDATION_MESSAGES('Fuel').REQUIRED,
  //   },
  // },
  // gearbox: {
  //   type: INPUT_TYPES.SELECT,
  //   label: 'GearBox',
  //   className: 'col-md-3',
  //   placeholder: 'Select a gearbox',
  //   options: GEARBOX_OPTIONS,
  //   schema: {
  //     required: FORM_VALIDATION_MESSAGES('GearBox').REQUIRED,
  //   },
  // },

  // motor: {
  //   type: INPUT_TYPES.TEXT,
  //   label: 'Motor',
  //   className: 'col-md-3',
  //   placeholder: 'Motor',
  //   schema: {
  //     required: FORM_VALIDATION_MESSAGES('Motor').REQUIRED,
  //     minLength: {
  //       value: 3,
  //       message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
  //     },
  //     maxLength: {
  //       value: 25,
  //       message: FORM_VALIDATION_MESSAGES(25).MAX_LENGTH,
  //     },
  //   },
  // },

  // gearCount: {
  //   type: INPUT_TYPES.NUMBER,
  //   label: 'Gear Count',
  //   className: 'col-md-3',
  //   placeholder: 'Gear Count',
  //   schema: {
  //     required: FORM_VALIDATION_MESSAGES('Gear Count').REQUIRED,
  //     min: {
  //       value: 1,
  //       message: FORM_VALIDATION_MESSAGES(1).MIN_VALUE,
  //     },
  //     pattern: {
  //       value: VALIDATION_REGEX.NUMBER,
  //       message: FORM_VALIDATION_MESSAGES().ENTER_INTEGER,
  //     },
  //   },
  //   config: { min: 1, type: 'number' },
  //   blockInvalidChars: blockInvalidChar,
  // },
  // seatCount: {
  //   type: INPUT_TYPES.NUMBER,
  //   label: 'Seat Count',
  //   className: 'col-md-3',
  //   placeholder: 'Seat Count',
  //   schema: {
  //     required: FORM_VALIDATION_MESSAGES('Seat Count').REQUIRED,
  //     min: {
  //       value: 1,
  //       message: FORM_VALIDATION_MESSAGES(1).MIN_VALUE,
  //     },
  //     pattern: {
  //       value: VALIDATION_REGEX.NUMBER,
  //       message: FORM_VALIDATION_MESSAGES().ENTER_INTEGER,
  //     },
  //   },
  //   config: { min: 1, type: 'number' },
  //   blockInvalidChars: blockInvalidChar,
  // },
  // security: {
  //   type: INPUT_TYPES.TEXT,
  //   label: 'Security',
  //   className: 'col-md-3',
  //   placeholder: 'Security',
  //   schema: {
  //     required: FORM_VALIDATION_MESSAGES('Security').REQUIRED,
  //     minLength: {
  //       value: 3,
  //       message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
  //     },
  //     maxLength: {
  //       value: 25,
  //       message: FORM_VALIDATION_MESSAGES(25).MAX_LENGTH,
  //     },
  //   },
  // },
  // comfort: {
  //   type: INPUT_TYPES.TEXT,
  //   label: 'Comfort',
  //   className: 'col-md-3',
  //   placeholder: 'Comfort',
  //   schema: {
  //     required: FORM_VALIDATION_MESSAGES('Comfort').REQUIRED,
  //     minLength: {
  //       value: 3,
  //       message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
  //     },
  //     maxLength: {
  //       value: 25,
  //       message: FORM_VALIDATION_MESSAGES(25).MAX_LENGTH,
  //     },
  //   },
  // },
  // appearance: {
  //   type: INPUT_TYPES.TEXT,
  //   label: 'Appearance',
  //   className: 'col-md-3',
  //   placeholder: 'Appearance',
  //   schema: {
  //     required: FORM_VALIDATION_MESSAGES('Appearance').REQUIRED,
  //     minLength: {
  //       value: 3,
  //       message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
  //     },
  //     maxLength: {
  //       value: 25,
  //       message: FORM_VALIDATION_MESSAGES(25).MAX_LENGTH,
  //     },
  //   },
  // },
});

// Define types for renderActions and column data
interface ColumnData {
  title?: string;
  fieldName?: string;
  isTruncated?: boolean;
  path?: string[];
  sortable?: boolean;
  sortType?: string;
  render?: (
    row: PlanResponsePayload,
    val: string | number
  ) => JSX.Element[] | string | JSX.Element | string[];
}

type RenderActions = (val: unknown, row: PlanResponsePayload) => JSX.Element;

// Define the shape of the columns
export const PlansColumns = (
  renderActions: RenderActions
  // setShowMultiItemView: Dispatch<SetStateAction<ViewMultiData>>
  // handleChangeCheckBox: (id: string) => void,
  // selectedIds: string[] | undefined
  // setViewSpecifications: Dispatch<SetStateAction<ViewSpecificationData>>
): ColumnData[] => [
  // {
  //   title: '#',
  //   render: (row) => {
  //     return (
  //       <button
  //         type="button"
  //         className="custom-checkbox btn btn-transparent"
  //         onClick={() => handleChangeCheckBox(row._id)}
  //       >
  //         <input
  //           type="checkbox"
  //           className="checkbox-input"
  //           checked={selectedIds?.includes(row._id)}
  //           // onChange={() => handleChangeCheckBox(row._id)}
  //         />
  //         <span className="label" />
  //       </button>
  //     );
  //   },
  // },
  {
    title: 'Plan Name',
    fieldName: 'planName',
    sortable: true,
    sortType: 'title',
    // render: (row, val) => {
    //   const imgData = val as unknown as {
    //     _id: string;
    //     url: string;
    //     title: string;
    //   }[];
    //   return (
    //     <ImageWithCount
    //       title={row?.title}
    //       imgData={imgData}
    //       setShowMultiItemView={setShowMultiItemView}
    //       count={COUNT_OF_MULTI_RENDER_ELEMENTS_TO_VIEW}
    //     />
    //   );
    // },
  },
  {
    title: 'Duration (Days)',
    fieldName: 'duration',
    sortable: true,
    sortType: 'title',
  },
  {
    title: 'Interest Rate %',
    fieldName: 'interestRate',
    sortable: true,
    sortType: 'title',
  },
  {
    title: 'Min Investment',
    fieldName: 'minInvestment',
    sortable: true,
    sortType: 'title',
  },
  // {
  //   title: 'Duration (Days)',
  //   fieldName: 'duration',
  //   render: (_, val) => {
  //     const type = (val || []) as unknown as Category[];
  //     if (!type?.length) return '- - -';
  //     return (
  //       <>
  //         {type?.map((category: { name: string }, index) => {
  //           if (index < COUNT_OF_MULTI_RENDER_ELEMENTS_TO_VIEW) {
  //             return `${category}${index < type.length - 1 ? ', ' : ' '}`;
  //           }
  //           return null;
  //         })}
  //         {type?.length > COUNT_OF_MULTI_RENDER_ELEMENTS_TO_VIEW ? (
  //           <button
  //             type="button"
  //             className="btn border py-0 px-1 cat-count"
  //             onClick={() =>
  //               setShowMultiItemView({
  //                 show: true,
  //                 data: { title: 'Company', size: 'sm' },
  //               })
  //             }
  //           >
  //             {`+${type.length - COUNT_OF_MULTI_RENDER_ELEMENTS_TO_VIEW}`}
  //           </button>
  //         ) : null}
  //       </>
  //     );
  //   },
  // },
  // {
  //   title: 'Status',
  //   fieldName: 'stock',
  //   render: (_, val) => `${val === 0 ? 'SOLD OUT' : 'Available'}`,
  // },
  // {
  //   title: 'Specifications',
  //   render: (row) => {
  //     return (
  //       <Button
  //         className="btn btn-primary px-3"
  //         onClick={() => {
  //           setViewSpecifications({ data: row?.specifications, show: true });
  //         }}
  //       >
  //         {BUTTON_LABELS.VIEW}
  //       </Button>
  //     );
  //   },
  // },
  {
    title: 'Actions',
    render: (row, val) => renderActions(val, row),
  },
];

// Define the shape of CONFIRMATION_DESCRIPTION
export const CONFIRMATION_DESCRIPTION: Record<string, string> = {
  DELETE: 'Are you sure you want to delete',
};
export const SPECIFICATIONS: FieldSchemaForSpecifications[] = [
  { label: 'Registration Number', key: 'registrationNumber' },
  { label: 'Model Year', key: 'modelYear' },
  { label: 'Paint', key: 'paint' },
  {
    label: 'fuel',
    key: 'fuel',
    render: (value: TableRenderValue) =>
      FUEL_OPTIONS?.find((fuel) => fuel.value === Number(value))?.label,
  },
  { label: 'Motor', key: 'motor', format: true },
  {
    label: 'Gearbox',
    key: 'gearbox',
    render: (value: TableRenderValue) =>
      GEARBOX_OPTIONS?.find((fuel) => fuel.value === Number(value))?.label,
  },
  // {
  //   label: 'Body Type',
  //   key: 'bodyType',
  //   render: (value: TableRenderValue) =>
  //     CAR_BODY_TYPE_OPTIONS?.find(
  //       (bodyType) => bodyType.value === Number(value)
  //     )?.label,
  // },
  { label: 'Gear Count', key: 'gearCount', format: true },
  { label: 'Seat Count', key: 'seatCount', format: true },
  {
    label: 'Security',
    key: 'security',
  },
  { label: 'Comfort', key: 'comfort' },
  { label: 'Appearance', key: 'appearance' },
];

export const FiltersKeys = {
  company: 'company',
  dateRange: 'dateRange',
  priceRange: 'priceRange',
  productStatus: 'productStatus',
};

export const filterSchema = (
  // categoryOptions: SelectOption[],
  onChangeFilter: (key: string, newValue: unknown) => void,
  filtersState: FiltersState
): FilterSchema[] => [
  // {
  //   type: FilterFieldTypes.select,
  //   id: FiltersKeys.company,
  //   options: categoryOptions,
  //   onChange: (value) => onChangeFilter(FiltersKeys.company, value),
  //   value: filtersState?.[FiltersKeys.company] as SelectOption,
  //   className: 'col-12 col-sm-6 col-md-4 col-lg-3 col-xxl-2',
  //   placeholder: 'Select Company',
  // },
  {
    type: FilterFieldTypes.dateRange,
    id: FiltersKeys.dateRange,
    onChange: (value) => onChangeFilter(FiltersKeys.dateRange, value),
    className: STRINGS.EMPTY_STRING,
  },
  {
    type: FilterFieldTypes.slider,
    id: FiltersKeys.priceRange,
    title: STRINGS.PRICE_RANGE || STRINGS.EMPTY_STRING,
    min: PRICE_RANGE?.min ?? 0,
    max: PRICE_RANGE?.max ?? 0,
    value: (filtersState?.[FiltersKeys.priceRange] as [number, number]) ?? [
      0, 0,
    ],
    onChange: (value) =>
      onChangeFilter(FiltersKeys.priceRange, [value[0], value[1]]),
    className: 'col-12 col-sm-6 col-md-4 col-lg-3 col-xxl-3',
  },
  {
    type: FilterFieldTypes.select,
    id: FiltersKeys.productStatus,
    options: PRODUCT_AVAILABILITY_STATUS_OPTIONS as SelectOption[],
    onChange: (value) => onChangeFilter(FiltersKeys.productStatus, value),
    value: filtersState?.[FiltersKeys.productStatus] as SelectOption,
    className: 'col-12 col-sm-6 col-md-3 col-xxl-2',
    placeholder: 'Status',
  },
];
