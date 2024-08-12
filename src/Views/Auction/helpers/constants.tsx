import moment from 'moment';
import { DATE_FORMATS, INPUT_TYPES } from '../../../Shared/constants';
import FORM_VALIDATION_MESSAGES from '../../../Shared/constants/validationMessages';
import { AuctionResponsePayload } from './model';

export const AUCTION_STATUS = [
  { value: 1, label: 'Pending' },
  { value: 2, label: 'Active' },
  { value: 3, label: 'Ended' },
];

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

interface ColumnData {
  title?: string;
  fieldName?: string;
  isTruncated?: boolean;
  render?: (
    row: AuctionResponsePayload,
    val: string | number
  ) => JSX.Element[] | string | JSX.Element | string[];
}

export const AUCTION_ADD_FORM_SCHEMA: Record<string, FormSchema> = {
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
  status: {
    type: INPUT_TYPES.SELECT,
    label: 'Status',
    className: 'col-md-12',
    placeholder: 'Price',
    options: AUCTION_STATUS,
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
};

type RenderActions = (val: unknown, row: AuctionResponsePayload) => JSX.Element;

export const AuctionColumns = (renderActions: RenderActions): ColumnData[] => [
  {
    title: 'Id',
    fieldName: '_id',
    isTruncated: true,
  },
  {
    title: 'Name',
    fieldName: 'title',
    isTruncated: true,
  },
  {
    title: 'Auction Date',
    fieldName: 'bidStartDate',
    render: (_, val) =>
      moment(val)?.format(DATE_FORMATS.DISPLAY_DATE_WITH_TIME),
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
    title: 'Reserve Price',
    fieldName: 'reservePrice',
    isTruncated: true,
  },
  {
    title: 'Item Price',
    fieldName: 'currentBidPrice',
    isTruncated: true,
  },
  {
    title: 'Total Bids',
    fieldName: 'reservePrice',
    isTruncated: true,
  },
  {
    title: 'Winner',
    fieldName: 'reservePrice',
    isTruncated: true,
  },
  {
    title: 'Prize Status',
    fieldName: 'prizeStatus',
    render: (_, val) => {
      switch (val) {
        case 1:
          return 'Claimed';
        case 2:
          return 'Pending';
        default:
          return '__';
      }
    },
  },
  {
    title: 'Status',
    fieldName: 'status',
    render: (_, val) => {
      switch (val) {
        case 1:
          return 'Ongoing';
        case 2:
          return 'Ended';
        default:
          return '-';
      }
    },
  },
  {
    // fieldName: '',
    title: 'Actions',
    render: (row, val) => renderActions(val, row),
  },
];
