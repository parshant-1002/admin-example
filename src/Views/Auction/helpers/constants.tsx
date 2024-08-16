import moment from 'moment';
import { Dispatch, SetStateAction } from 'react';
import {
  DATE_FORMATS,
  IMAGE_FILE_TYPES,
  INPUT_TYPES,
} from '../../../Shared/constants';
import FORM_VALIDATION_MESSAGES from '../../../Shared/constants/validationMessages';
import { AuctionResponsePayload } from './model';
import { Category, ViewMultiData } from '../../Products/helpers/model';
import { SelectOption } from '../../Users/helpers/model';
import {
  AuctionStatus,
  PurchaseStatus,
} from '../AuctionDetails/Helpers/constants';
// import { AuctionStatus } from '../../Users/UserDetails/helpers/constants';

const COUNT_OF_MULTI_RENDER_ELEMENTS_TO_VIEW = 2;

// export const AuctionStatus = [
//   { value: 1, label: 'Pending' },
//   { value: 2, label: 'Active' },
//   { value: 3, label: 'Ended' },
// ];

export interface Product {
  _id: string;
  title: string;
}

// interface FormSchema {
//   type: string;
//   label: string;
//   accept?: string;
//   options?: { value: number | string; label: string }[];
//   className: string;
//   placeholder: string;
//   schema?: {
//     required: string;
//   };
// }

interface ColumnData {
  title?: string;
  fieldName?: string;
  isTruncated?: boolean;
  noClickEvent?: boolean;
  render?: (
    row: AuctionResponsePayload,
    val: string | number
  ) => JSX.Element[] | string | JSX.Element | string[];
}

interface Image {
  url: string;
  title: string;
  fileURL?: string;
  fileName?: string;
}
export interface AuctionPayload {
  title: string;
  productId: SelectOption;
  reservePrice: number;
  bidStartDate: string;
  turnTimer: number;
  reserveWaitingEndDate: string;
  prizeClaimDays: number;
  preAuctionUsersCount: number;
  images: Image[];
  description: string;
  productPrice: number;
  categoryIds: SelectOption[];
}

export const AUCTION_ADD_FORM_SCHEMA = (
  categoryOptions: SelectOption[],
  productOptions: SelectOption[]
) => ({
  title: {
    type: INPUT_TYPES.TEXT,
    label: 'Name',
    className: 'col-md-12',
    placeholder: 'Auction Name',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  bidStartDate: {
    type: INPUT_TYPES.DATE,
    label: 'Date',
    className: 'col-md-12',
    placeholder: 'Description',
    schema: {},
  },
  productId: {
    type: INPUT_TYPES.SELECT,
    label: 'Product',
    className: 'col-md-12',
    placeholder: 'Price',
    options: productOptions,
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  categoryIds: {
    type: INPUT_TYPES.SELECT,
    label: 'Category',
    className: 'col-md-12',
    placeholder: 'Category',
    isMulti: true,
    options: categoryOptions,
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  productPrice: {
    type: INPUT_TYPES.NUMBER,
    label: 'Product Price',
    className: 'col-md-12',
    placeholder: 'Product Count',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  reservePrice: {
    type: INPUT_TYPES.NUMBER,
    label: 'Reserve Price',
    className: 'col-md-12',
    placeholder: 'Price',
    options: AuctionStatus,
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  description: {
    type: INPUT_TYPES.TEXT_AREA,
    label: 'Description',
    className: 'col-md-12',
    placeholder: 'Price',
    options: AuctionStatus,
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  prizeClaimDays: {
    type: INPUT_TYPES.NUMBER,
    label: 'Prize claim Duration',
    className: 'col-md-12',
    placeholder: 'Price',
    options: AuctionStatus,
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  turnTimer: {
    type: INPUT_TYPES.NUMBER,
    label: 'Bids Duration',
    className: 'col-md-12',
    placeholder: 'Price',
    options: AuctionStatus,
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
  },
  preAuctionUsersCount: {
    type: INPUT_TYPES.NUMBER,
    label: 'Pre Auction Users',
    className: 'col-md-12',
    placeholder: 'Price',
    options: AuctionStatus,
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
});

type RenderActions = (val: unknown, row: AuctionResponsePayload) => JSX.Element;

export const AuctionColumns = (
  renderActions: RenderActions,
  setShowMultiItemView: Dispatch<SetStateAction<ViewMultiData>>
): ColumnData[] => [
  {
    title: 'Id',
    fieldName: 'id',
    noClickEvent: true,
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
    noClickEvent: true,
    render: (data) => {
      // if (typeof val === 'object' && val !== null && 'categories' in val) {
      const categories = (data.categories || []) as unknown as Category[];
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
    fieldName: 'winnerName',
    isTruncated: true,
  },
  {
    title: 'Prize Status',
    fieldName: 'productPurchaseStatus',
    render: (_, val) => {
      return (
        PurchaseStatus.find((item) => {
          return item.value === val;
        })?.label.toString() || '-'
      );
    },
  },
  {
    title: 'Status',
    fieldName: 'status',
    render: (_, val) => {
      return (
        AuctionStatus.find((item) => {
          return item.value === val;
        })?.label.toString() || '-'
      );
    },
  },
  {
    title: 'Actions',
    noClickEvent: true,
    render: (row, val) => renderActions(val, row),
  },
];
