// libs

// consts
import FileRenderer from '../../../Shared/components/form/FileUpload/FileRenderer';
import { IMAGE_FILE_TYPES, INPUT_TYPES } from '../../../Shared/constants';
import FORM_VALIDATION_MESSAGES from '../../../Shared/constants/validationMessages';
import { convertToLocale } from '../../../Shared/utils/functions';
import { ProductResponsePayload } from './model';

// Define types for schema
interface FormSchema {
  type: string;
  label: string;
  accept?: string;
  options?: { value: number | string; label: string }[];
  className: string;
  placeholder: string;
  schema?: {
    required: string;
  };
}

export const PRODUCT_STATUS = [
  { value: 1, label: 'Pending' },
  { value: 2, label: 'Active' },
  { value: 3, label: 'Ended' },
];
// Define the shape of the ADD_ON_FORM_SCHEMA
export const ADD_ON_FORM_SCHEMA: Record<string, FormSchema> = {
  title: {
    type: INPUT_TYPES.TEXT,
    label: 'Title',
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
    label: 'Category',
    className: 'col-md-12',
    placeholder: 'Category',
    options: [{ value: '66b1e81c6d811e95bfb534fd', label: 'Car' }],
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  stock: {
    type: INPUT_TYPES.NUMBER,
    label: 'Product Count',
    className: 'col-md-12',
    placeholder: 'Product Count',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  images: {
    type: INPUT_TYPES.FILE,
    label: 'Images',
    accept: IMAGE_FILE_TYPES,
    className: 'col-md-12',
    placeholder: 'Price',
    // schema: {
    //   required: FORM_VALIDATION_MESSAGES().REQUIRED,
    // },
  },
  status: {
    type: INPUT_TYPES.SELECT,
    label: 'Status',
    className: 'col-md-12',
    placeholder: 'Price',
    options: PRODUCT_STATUS,
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
};

// Define types for renderActions and column data
interface ColumnData {
  title?: string;
  fieldName?: string;
  isTruncated?: boolean;
  render?: (
    row: ProductResponsePayload,
    val: string | number
  ) => JSX.Element[] | string | JSX.Element | string[];
}

type RenderActions = (val: unknown, row: ProductResponsePayload) => JSX.Element;

// Define the shape of the columns
export const productsColumns = (renderActions: RenderActions): ColumnData[] => [
  {
    title: 'Product Title',
    fieldName: 'title',
    isTruncated: true,
  },
  {
    title: 'Description',
    fieldName: 'description',
    isTruncated: true,
  },
  {
    title: 'Price',
    fieldName: 'price',
    render: (_, val) => `$${convertToLocale(val)}`,
  },
  {
    title: 'Category',
    fieldName: 'categories',
    render: (_, val) => {
      const categories = val as unknown as { name: string }[];
      return categories?.length
        ? categories?.map((category: { name: string }) => category.name)
        : '- - -';
    },
  },
  {
    title: 'Product Images',
    fieldName: 'images',
    render: (_, val) => {
      const imgData = val as unknown as {
        _id: string;
        url: string;
        title: string;
      }[];
      return (
        <div>
          {imgData?.map((img, index) =>
            index < 2 ? (
              <div
                key={img.url}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '10px',
                }}
              >
                <span className="uploaded_file" style={{ marginRight: '10px' }}>
                  <FileRenderer fileURL={img.url} />
                </span>
                <div>{img.title}</div>
              </div>
            ) : (
              <span key={img.url} style={{ marginLeft: '10px' }}>
                +{imgData?.length}
              </span>
            )
          )}
        </div>
      );
    },
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
  DELETE: 'Are you sure to delete this item',
};
