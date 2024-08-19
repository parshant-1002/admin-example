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
import { convertToLocale } from '../../../Shared/utils/functions';
import FileRenderer from '../../../Shared/components/form/FileUpload/FileRenderer';
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
  sortable?: boolean;
  sortType?: string;
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
  productOptions: SelectOption[],
  initialData: { bidStartDate?: string } | null
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
    label: 'Auction Date',
    className: 'col-md-6 col-xl-6',
    placeholder: 'Auction Date',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
      minDate: {
        value: moment().format(DATE_FORMATS.DISPLAY_DATE_REVERSE),
        message: `Date cannot be earlier than ${moment().format(
          DATE_FORMATS.DISPLAY_DATE_REVERSE
        )}`,
      },
    },
  },
  reserveWaitingEndDate: {
    type: INPUT_TYPES.DATE,
    label: 'Reserve End Date',
    className: ' col-xl-6 col-md-6',
    placeholder: 'Reserve End Date',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
      minDate: {
        value: moment().format(DATE_FORMATS.DISPLAY_DATE_REVERSE),
        message: `Date cannot be earlier than ${moment(
          initialData?.bidStartDate
        ).format(DATE_FORMATS.DISPLAY_DATE_REVERSE)}`,
      },
    },
  },
  productId: {
    type: INPUT_TYPES.SELECT,
    label: 'Product',
    className: 'col-md-12',
    placeholder: 'Product',
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
    label: 'Product Price (SEK)',
    className: 'col-md-12',
    placeholder: 'Product Price (SEK)',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  reservePrice: {
    type: INPUT_TYPES.NUMBER,
    label: 'Reserve Price (SEK)',
    className: 'col-md-12',
    placeholder: 'Reserve Price (SEK)',
    options: AuctionStatus,
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  description: {
    type: INPUT_TYPES.TEXT_AREA,
    label: 'Description',
    className: 'col-md-12',
    placeholder: 'Description',
    options: AuctionStatus,
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  prizeClaimDays: {
    type: INPUT_TYPES.NUMBER,
    label: 'Prize claim Duration (days)',
    className: 'col-md-12',
    placeholder: 'Prize claim Duration (days)',
    options: AuctionStatus,
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  turnTimer: {
    type: INPUT_TYPES.NUMBER,
    label: 'Bids Duration (sec)',
    className: 'col-md-12',
    placeholder: 'Bids Duration (sec)',
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
    label: 'Min Auction Users',
    className: 'col-md-12',
    placeholder: 'Min Auction Users',
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
    sortable: true,
    sortType: 'id',
  },
  {
    title: 'Name',
    fieldName: 'title',
    sortable: true,
    sortType: 'title',
  },
  {
    title: 'Auction Date',
    fieldName: 'bidStartDate',
    sortable: true,
    sortType: 'bidStartDate',
    render: (_, val) =>
      moment(val)?.format(DATE_FORMATS.DISPLAY_DATE_WITH_TIME),
  },
  {
    title: 'Reserve End Date',
    fieldName: 'reserveWaitingEndDate',
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
    title: 'Reserve Price (SEK)',
    fieldName: 'reservePrice',
    sortable: true,
    sortType: 'reservePrice',
    render: (_, val) => `${convertToLocale(val)}`,
  },
  {
    title: 'Item Price (SEK)',
    fieldName: 'currentBidPrice',
    sortable: true,
    sortType: 'currentBidPrice',
    render: (_, val) => `${convertToLocale(val)}`,
  },
  {
    title: 'Total Bids',
    fieldName: '',
    sortable: true,
    // sortType: 'reservePrice',
    render: (_, val) => `${convertToLocale(val)}`,
  },
  {
    title: 'Winner',
    fieldName: 'winnerName',
    isTruncated: true,
    sortable: true,
    sortType: 'winnerName',
  },
  {
    title: 'Prize Status',
    fieldName: 'productPurchaseStatus',
    sortable: true,
    sortType: 'productPurchaseStatus',
    render: (_, val) => {
      return (
        PurchaseStatus.find((item) => {
          return item.value === val;
        })?.label.toString() || '-.-'
      );
    },
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
      );
    },
  },
  {
    title: 'Status',
    fieldName: 'status',
    sortable: true,
    sortType: 'status',
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
