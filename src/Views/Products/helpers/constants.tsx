/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
// libs

// consts
import { Dispatch, SetStateAction } from 'react';
import { Button } from 'react-bootstrap';
import FileRenderer from '../../../Shared/components/form/FileUpload/FileRenderer';
import {
  FILE_TYPE,
  IMAGE_FILE_TYPES,
  INPUT_TYPES,
  blockInvalidChar,
} from '../../../Shared/constants';
import FORM_VALIDATION_MESSAGES from '../../../Shared/constants/validationMessages';
import { convertToLocale } from '../../../Shared/utils/functions';
import { view } from '../../../assets';
import {
  Category,
  FieldSchemaForSpecifications,
  ProductResponsePayload,
  SelectOption,
  ViewMultiData,
  ViewSpecificationData,
} from './model';

const COUNT_OF_MULTI_RENDER_ELEMENTS_TO_VIEW = 1;

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

export const PRODUCT_FORM_SCHEMA = (
  cateroryOptions: SelectOption[],
  productId?: string
) => ({
  title: {
    type: INPUT_TYPES.TEXT,
    label: 'Name',
    className: 'col-md-12',
    placeholder: 'Name',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Name').REQUIRED,
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
  description: {
    type: INPUT_TYPES.TEXT_AREA,
    label: 'Description',
    className: 'col-md-12',
    placeholder: 'Description',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Description').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
      maxLength: {
        value: 500,
        message: FORM_VALIDATION_MESSAGES(500).MAX_LENGTH,
      },
    },
  },

  category: {
    type: INPUT_TYPES.SELECT,
    label: 'Categories',
    className: 'col-md-12',
    placeholder: 'Select a category',
    isMulti: true,
    options: cateroryOptions,
    schema: {
      required: FORM_VALIDATION_MESSAGES('Categories').REQUIRED,
    },
  },
  images: {
    type: INPUT_TYPES.FILE,
    label: 'Images',
    accept: IMAGE_FILE_TYPES,
    className: 'col-md-12',
    placeholder: 'Add Images',
    singleImageSelectionEnabled: false,
    imageFileType: FILE_TYPE.PRODUCT,
    ratio: [1, 1],
    fetchImageDataConfig: [
      {
        key: 'productId',
        value: productId,
      },
    ],
    schema: {
      required: FORM_VALIDATION_MESSAGES('Image').REQUIRED,
    },
  },
  // stock: {
  //   type: INPUT_TYPES.NUMBER,
  //   label: 'Item Count',
  //   className: 'col-md-6',
  //   placeholder: 'Item Count',
  //   schema: {
  //     required: FORM_VALIDATION_MESSAGES('Item Count').REQUIRED,
  //     min: {
  //       value: 1,
  //       message: FORM_VALIDATION_MESSAGES(1).MIN_VALUE,
  //     },
  //     pattern: {
  //       value: /^[0-9]+$/,
  //       message: FORM_VALIDATION_MESSAGES().ENTER_INTEGER,
  //     },
  //   },
  //   config: { min: 1, type: 'number' },
  //   blockInvalidChars: blockInvalidChar,
  // },
  price: {
    type: INPUT_TYPES.NUMBER,
    label: 'Price (SEK)',
    className: 'col-md-3',
    placeholder: 'Price (SEK)',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Price').REQUIRED,
      min: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_VALUE,
      },
    },
    blockInvalidChars: blockInvalidChar,
  },
  registrationNumber: {
    type: INPUT_TYPES.TEXT,
    label: 'Registration Number',
    className: 'col-md-3',
    placeholder: 'Registration Number',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Registration Number').REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
      maxLength: {
        value: 30,
        message: FORM_VALIDATION_MESSAGES(30).MAX_LENGTH,
      },
    },
  },
  modelYear: {
    type: INPUT_TYPES.TEXT,
    label: 'Model Year',
    className: 'col-md-3',
    placeholder: 'Model Year',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Model Year').REQUIRED,
      minLength: {
        value: 4,
        message: FORM_VALIDATION_MESSAGES(4).MIN_LENGTH,
      },
      maxLength: {
        value: 4,
        message: FORM_VALIDATION_MESSAGES(4).MAX_LENGTH,
      },
    },
  },
  paint: {
    type: INPUT_TYPES.TEXT,
    label: 'Paint',
    className: 'col-md-3',
    placeholder: 'Paint',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Paint').REQUIRED,
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
  fuel: {
    type: INPUT_TYPES.SELECT,
    label: 'Fuel',
    className: 'col-md-3',
    placeholder: 'Select a fuel',
    options: FUEL_OPTIONS,
    schema: {
      required: FORM_VALIDATION_MESSAGES('Fuel').REQUIRED,
    },
  },
  gearbox: {
    type: INPUT_TYPES.SELECT,
    label: 'gearbox',
    className: 'col-md-3',
    placeholder: 'Select a gearbox',
    options: GEARBOX_OPTIONS,
    schema: {
      required: FORM_VALIDATION_MESSAGES('gearbox').REQUIRED,
    },
  },
  motor: {
    type: INPUT_TYPES.TEXT,
    label: 'Motor',
    className: 'col-md-3',
    placeholder: 'Motor',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Motor').REQUIRED,
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

  gearCount: {
    type: INPUT_TYPES.NUMBER,
    label: 'Gear Count',
    className: 'col-md-3',
    placeholder: 'Gear Count',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Gear Count').REQUIRED,
      min: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_VALUE,
      },
      pattern: {
        value: /^[0-9]+$/,
        message: FORM_VALIDATION_MESSAGES().ENTER_INTEGER,
      },
    },
    config: { min: 1, type: 'number' },
    blockInvalidChars: blockInvalidChar,
  },
  seatCount: {
    type: INPUT_TYPES.NUMBER,
    label: 'Seat Count',
    className: 'col-md-3',
    placeholder: 'Seat Count',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Seat Count').REQUIRED,
      min: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_VALUE,
      },
      pattern: {
        value: /^[0-9]+$/,
        message: FORM_VALIDATION_MESSAGES().ENTER_INTEGER,
      },
    },
    config: { min: 1, type: 'number' },
    blockInvalidChars: blockInvalidChar,
  },
  security: {
    type: INPUT_TYPES.TEXT,
    label: 'Security',
    className: 'col-md-3',
    placeholder: 'Security',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Security').REQUIRED,
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
  comfort: {
    type: INPUT_TYPES.TEXT,
    label: 'Comfort',
    className: 'col-md-3',
    placeholder: 'Comfort',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Comfort').REQUIRED,
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
  appearance: {
    type: INPUT_TYPES.TEXT,
    label: 'Appearance',
    className: 'col-md-3',
    placeholder: 'Appearance',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Appearance').REQUIRED,
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
  // status: {
  //   type: INPUT_TYPES.SELECT,
  //   label: 'Status',
  //   className: 'col-md-12',
  //   placeholder: 'Price',
  //   options: PRODUCT_STATUS,
  //   schema: {
  //     required: FORM_VALIDATION_MESSAGES().REQUIRED,
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
    row: ProductResponsePayload,
    val: string | number
  ) => JSX.Element[] | string | JSX.Element | string[];
}

type RenderActions = (val: unknown, row: ProductResponsePayload) => JSX.Element;

// Define the shape of the columns
export const productsColumns = (
  renderActions: RenderActions,
  setShowMultiItemView: Dispatch<SetStateAction<ViewMultiData>>,
  handleChangeCheckBox: (id: string) => void,
  selectedIds: string[] | undefined,
  setViewSpecifications: Dispatch<SetStateAction<ViewSpecificationData>>
): ColumnData[] => [
  {
    title: '#',
    render: (row) => {
      return (
        <div
          className="custom-checkbox"
          onClick={() => handleChangeCheckBox(row._id)}
        >
          <input
            type="checkbox"
            className="checkbox-input"
            checked={selectedIds?.includes(row._id)}
            // onChange={() => handleChangeCheckBox(row._id)}
          />
          <span className="label" />
        </div>
      );
    },
  },
  {
    title: 'Name',
    fieldName: 'images',
    sortable: true,
    sortType: 'title',
    render: (row, val) => {
      const imgData = val as unknown as {
        _id: string;
        url: string;
        title: string;
      }[];
      return (
        <div className="d-flex align-items-center gap-2">
          <div
            className="d-inline-flex align-items-center position-relative uploaded_file pointer"
            onClick={() =>
              setShowMultiItemView({
                show: true,
                data: { title: 'Product Images', size: 'lg', imgData },
              })
            }
          >
            {imgData?.map((img, index) =>
              index < COUNT_OF_MULTI_RENDER_ELEMENTS_TO_VIEW ? (
                <figure key={img.url}>
                  <FileRenderer fileURL={img.url} />
                  {/* <span>{img.title}</span> */}
                </figure>
              ) : null
            )}
            {imgData?.length > COUNT_OF_MULTI_RENDER_ELEMENTS_TO_VIEW ? (
              <button
                type="button"
                className="count_btn"
                onClick={() =>
                  setShowMultiItemView({
                    show: true,
                    data: { title: 'Product Images', size: 'lg', imgData },
                  })
                }
              >
                {`+${imgData.length - COUNT_OF_MULTI_RENDER_ELEMENTS_TO_VIEW}`}
              </button>
            ) : null}
          </div>
          <div>{row.title}</div>
        </div>
      );
    },
  },
  {
    title: 'Categories',
    fieldName: 'categories',
    render: (_, val) => {
      const categories = (val || []) as unknown as Category[];
      if (!categories?.length) return '- - -';
      return (
        <>
          {categories?.map((category: { name: string }, index) => {
            if (index < COUNT_OF_MULTI_RENDER_ELEMENTS_TO_VIEW) {
              return `${category.name}${
                index < categories.length - 1 ? ', ' : ' '
              }`;
            }
            return null;
          })}
          {categories?.length > COUNT_OF_MULTI_RENDER_ELEMENTS_TO_VIEW ? (
            <button
              type="button"
              className="btn border py-0 px-1 cat-count"
              onClick={() =>
                setShowMultiItemView({
                  show: true,
                  data: { title: 'Categories', size: 'sm', categories },
                })
              }
            >
              {`+${categories.length - COUNT_OF_MULTI_RENDER_ELEMENTS_TO_VIEW}`}
            </button>
          ) : null}
        </>
      );
    },
  },
  {
    title: 'Description',
    fieldName: 'description',
    isTruncated: true,
    sortable: true,
    sortType: 'description',
  },
  // {
  //   title: 'Item Count',
  //   fieldName: 'stock',
  //   sortable: true,
  //   sortType: 'stock',
  //   render: (_, val) => `${convertToLocale(val)}`,
  // },
  {
    title: 'Status',
    fieldName: 'stock',
    render: (_, val) => `${val === 0 ? 'SOLD OUT' : 'Available'}`,
  },
  {
    title: 'Price (SEK)',
    fieldName: 'price',
    render: (_, val) => `${convertToLocale(val)}`,
  },
  {
    title: 'Specifications',
    render: (row) => {
      return (
        <Button
          className="btn44 btn btn-primary"
          onClick={() => {
            setViewSpecifications({ data: row?.specifications, show: true });
          }}
        >
          <img src={view} alt="" />
        </Button>
      );
    },
  },
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
    render: (value: string | number | undefined) =>
      FUEL_OPTIONS?.find((fuel) => fuel.value === Number(value))?.label,
  },
  { label: 'Motor', key: 'motor', format: true },
  {
    label: 'Gearbox',
    key: 'gearbox',
    render: (value: string | number | undefined) =>
      GEARBOX_OPTIONS?.find((fuel) => fuel.value === Number(value))?.label,
  },
  { label: 'Gear Count', key: 'gearCount', format: true },
  { label: 'Seat Count', key: 'seatCount', format: true },
  {
    label: 'Security',
    key: 'security',
  },
  { label: 'Comfort', key: 'comfort' },
  { label: 'Appearance', key: 'appearance' },
];
