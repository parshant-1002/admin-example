// libs

// consts
import { Dispatch, SetStateAction } from 'react';
import FileRenderer from '../../../Shared/components/form/FileUpload/FileRenderer';
import { IMAGE_FILE_TYPES, INPUT_TYPES } from '../../../Shared/constants';
import FORM_VALIDATION_MESSAGES from '../../../Shared/constants/validationMessages';
import { convertToLocale } from '../../../Shared/utils/functions';
import {
  Category,
  ProductResponsePayload,
  SelectOption,
  ViewMultiData,
} from './model';

const COUNT_OF_MULTI_RENDER_ELEMENTS_TO_VIEW = 2;
export const PRODUCT_STATUS = [
  { value: 1, label: 'Pending' },
  { value: 2, label: 'Active' },
  { value: 3, label: 'Ended' },
];
export const PRODUCT_FORM_SCHEMA = (cateroryOptions: SelectOption[]) => ({
  title: {
    type: INPUT_TYPES.TEXT,
    label: 'Name',
    className: 'col-md-12',
    placeholder: 'Title',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  description: {
    type: INPUT_TYPES.TEXT_AREA,
    label: 'Description',
    className: 'col-md-12',
    placeholder: 'Description',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  price: {
    type: INPUT_TYPES.NUMBER,
    label: 'Price',
    className: 'col-md-12',
    placeholder: 'Price',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  category: {
    type: INPUT_TYPES.SELECT,
    label: 'Categories',
    className: 'col-md-12',
    placeholder: 'Categories',
    isMulti: true,
    options: cateroryOptions,
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  stock: {
    type: INPUT_TYPES.NUMBER,
    label: 'Item Count',
    className: 'col-md-12',
    placeholder: 'Item Count',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  images: {
    type: INPUT_TYPES.FILE,
    label: 'Images',
    accept: IMAGE_FILE_TYPES,
    className: 'col-md-12',
    placeholder: 'Images',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
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
  selectedIds: string[] | undefined
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
          <div className="checkbox-custom" />
        </div>
      );
    },
  },
  {
    title: 'Name',
    fieldName: 'title',
    isTruncated: true,
    sortable: true,
    sortType: 'title',
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
              className="btn border py-0 px-1"
              onClick={() =>
                setShowMultiItemView({
                  show: true,
                  data: { title: 'Categories', size: 'sm', categories },
                })
              }
            >
              {`. . .+${
                categories.length - COUNT_OF_MULTI_RENDER_ELEMENTS_TO_VIEW
              }`}
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
  {
    title: 'Item Count',
    fieldName: 'stock',
    sortable: true,
    sortType: 'stock',
  },
  {
    title: 'Images',
    fieldName: 'images',
    render: (_, val) => {
      const imgData = val as unknown as {
        _id: string;
        url: string;
        title: string;
      }[];
      return (
        <div className="d-flex align-items-center">
          {imgData?.map((img, index) =>
            index < COUNT_OF_MULTI_RENDER_ELEMENTS_TO_VIEW ? (
              <div
                key={img.url}
                className="m-2 d-flex flex-column text-center justify-content-center align-items-center"
              >
                <span className="uploaded_file">
                  <FileRenderer fileURL={img.url} />
                </span>
                <div>{img.title}</div>
              </div>
            ) : null
          )}
          {imgData?.length > COUNT_OF_MULTI_RENDER_ELEMENTS_TO_VIEW ? (
            <button
              type="button"
              className="btn border py-0 px-1"
              onClick={() =>
                setShowMultiItemView({
                  show: true,
                  data: { title: 'Product Images', size: 'lg', imgData },
                })
              }
            >
              {`. . .+${
                imgData.length - COUNT_OF_MULTI_RENDER_ELEMENTS_TO_VIEW
              }`}
            </button>
          ) : null}
        </div>
      );
    },
  },
  {
    title: 'Status',
    fieldName: 'stock',
    render: (_, val) => `${val === 0 ? 'SOLD OUT' : 'Available'}`,
  },
  {
    title: 'Price',
    fieldName: 'price',
    render: (_, val) => `$${convertToLocale(val)}`,
  },
  //   {
  //     title: 'Bid Start Date',
  //     fieldName: 'bidStartDate',
  //     render: (_, val) =>
  //       moment(val)?.format(DATE_FORMATS.DISPLAY_DATE_WITH_TIME),
  //   },
  {
    // fieldName: '',
    title: 'Actions',
    render: (row, val) => renderActions(val, row),
  },
];

// Define the shape of CONFIRMATION_DESCRIPTION
export const CONFIRMATION_DESCRIPTION: Record<string, string> = {
  DELETE: 'Are you sure you want to delete',
};
