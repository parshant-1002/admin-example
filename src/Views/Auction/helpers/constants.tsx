import moment from 'moment';
import { Dispatch, SetStateAction } from 'react';
import { DATE_FORMATS, INPUT_TYPES } from '../../../Shared/constants';
import FORM_VALIDATION_MESSAGES from '../../../Shared/constants/validationMessages';
import { AuctionResponsePayload, ProductDetailResponsePayload } from './model';
import { Category, ViewMultiData } from '../../Products/helpers/model';

const COUNT_OF_MULTI_RENDER_ELEMENTS_TO_VIEW = 2;
export const AUCTION_STATUS = [
  { value: 1, label: 'Pending' },
  { value: 2, label: 'Active' },
  { value: 3, label: 'Ended' },
];
enum DetailType {
  String,
  Number,
  Dropdown,
  Date,
  DateRange,
}
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

export interface AuctionDetailsColumnData {
  title?: string;
  fieldName?: string;
  isTurncated?: boolean;
  isEditable?: boolean;
  type?: DetailType;
  render?: (
    row: ProductDetailResponsePayload,
    val: string | number | { categories: []; images: [] }
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

export const AuctionColumns = (
  renderActions: RenderActions,
  setShowMultiItemView: Dispatch<SetStateAction<ViewMultiData>>
): ColumnData[] => [
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
    fieldName: 'product',
    render: (data) => {
      // if (typeof val === 'object' && val !== null && 'categories' in val) {
      const categories = (data.product.categories ||
        []) as unknown as Category[];
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

// type AuctionDetailsRenderActions = (
//   val: unknown,
//   row: ProductDetailResponsePayload
// ) => JSX.Element;

export const AuctionColumn = (
  setShowMultiItemView: Dispatch<SetStateAction<ViewMultiData>>
): AuctionDetailsColumnData[] => [
  {
    title: 'ID',
    isEditable: false,
    fieldName: '_id',
    render: (_, val) => {
      return `#${val}`;
    },
  },
  {
    title: 'Auction Name',
    isEditable: true,
    type: DetailType.String,
    fieldName: 'title',
  },
  {
    title: 'Auction Date',
    isEditable: true,
    type: DetailType.Date,
    fieldName: 'Date Range',
  },
  {
    title: 'Reserve Price',
    isEditable: true,
    type: DetailType.Number,
    fieldName: 'reservePrice',
  },
  {
    title: 'Auction Time',
    isEditable: false,
    render: (row) => {
      const start = new Date(row.bidStartDate);
      const end = new Date(row.reserveWaitingEndDate);
      // Subtracting dates to get the difference in time (milliseconds)
      const differenceInTime = end.getTime() - start.getTime();

      // Converting time difference from milliseconds to days
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);

      return `${differenceInDays.toFixed(0)} days`;
    },
  },
  {
    title: 'Bid Timer',
    isEditable: true,
    type: DetailType.Number,
    fieldName: 'turnTimer',
  },
  {
    title: 'PreAuction Users',
    isEditable: true,
    type: DetailType.Number,
    fieldName: 'preAuctionUsers',
  },
  {
    title: 'Product Name',
    isEditable: true,
    type: DetailType.String,
    fieldName: 'productName',
  },
  {
    title: 'Category',
    isEditable: false,
    fieldName: 'productCategories',
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
    title: 'Current Item Price',
    isEditable: true,
    type: DetailType.Number,
    fieldName: 'currentItemPrice',
  },
  {
    title: 'Attachements',
    isEditable: false,
    fieldName: '',
  },
  {
    title: 'Total Bids Placed ',
    isEditable: false,
    fieldName: 'bidPlaced',
  },
  {
    title: 'Status',
    isEditable: false,
    fieldName: 'status',
  },
  {
    title: 'Winner',
    isEditable: false,
    fieldName: 'winner',
  },
  { title: 'No of Users', isEditable: false, fieldName: 'totalUsers' },
  {
    title: 'Product Purchase Status',
    isEditable: false,
    fieldName: 'uniqueUserCount',
  },
  {
    title: 'Product Purchase Duration',
    isEditable: true,
    fieldName: 'prizeClaimDays',
  },
];

export const AuctionBidColumn = (): ColumnData[] => [
  {
    title: 'Id',
    fieldName: '_id',
    isTruncated: true,
  },
  {
    title: 'Username',
    fieldName: 'userName',
    isTruncated: true,
  },
  {
    title: 'Email',
    fieldName: 'email',
    isTruncated: true,
  },
  {
    title: 'Phone No',
    fieldName: 'phoneNo',
    isTruncated: true,
  },
  {
    title: 'Date',
    fieldName: 'bidDate',
    isTruncated: true,
  },
  {
    title: 'Item Price',
    fieldName: 'bidCount',
    isTruncated: true,
  },
];
