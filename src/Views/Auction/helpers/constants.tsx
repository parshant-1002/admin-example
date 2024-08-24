import moment from 'moment';
import { Dispatch, SetStateAction } from 'react';
import FileRenderer from '../../../Shared/components/form/FileUpload/FileRenderer';
import {
  DATE_FORMATS,
  FILE_TYPE,
  IMAGE_FILE_TYPES,
  INPUT_TYPES,
} from '../../../Shared/constants';
import FORM_VALIDATION_MESSAGES from '../../../Shared/constants/validationMessages';
import { convertToLocale } from '../../../Shared/utils/functions';
import { Category, ViewMultiData } from '../../Products/helpers/model';
import { SelectOption } from '../../Users/helpers/model';
import { AuctionStatus } from '../AuctionDetails/Helpers/constants';
import { AuctionResponsePayload } from './model';
// import { AuctionStatus } from '../../Users/UserDetails/helpers/constants';

const COUNT_OF_MULTI_RENDER_ELEMENTS_TO_VIEW = 1;

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
  _id?: string;
  url: string;
  title?: string;
  fileURL?: string;
  fileName?: string;
  assigned?: boolean;
  fileId?: string;
}
export interface AuctionPayload {
  title: string;
  productId: SelectOption;
  reservePrice: number;
  bidStartDate: string;
  bidDuration: number;
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
  initialData: AuctionResponsePayload | null,
  isEdit: boolean,
  selectedProductDetails: { _id: string }
) => ({
  title: {
    type: INPUT_TYPES.TEXT,
    label: 'Name',
    className: 'col-md-12',
    placeholder: 'Auction Name',
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
  bidStartDate: {
    type: INPUT_TYPES.DATE,
    label: 'Auction Date',
    className: 'col-md-6 col-xl-6',
    placeholder: 'Auction Date',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Auction Date').REQUIRED,
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
      required: FORM_VALIDATION_MESSAGES('Reserve End Date').REQUIRED,
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
      required: FORM_VALIDATION_MESSAGES('Product').REQUIRED,
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
      required: FORM_VALIDATION_MESSAGES('Category').REQUIRED,
    },
  },
  productPrice: {
    type: INPUT_TYPES.NUMBER,
    label: 'Product Price (SEK)',
    className: 'col-md-12',
    placeholder: 'Product Price (SEK)',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Product Price').REQUIRED,
      min: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_VALUE,
      },
    },
  },
  reservePrice: {
    type: INPUT_TYPES.NUMBER,
    label: 'Reserve Price (SEK)',
    className: 'col-md-12',
    placeholder: 'Reserve Price (SEK)',
    options: AuctionStatus,
    schema: {
      required: FORM_VALIDATION_MESSAGES('Reserve Price').REQUIRED,
      min: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_VALUE,
      },
    },
  },
  description: {
    type: INPUT_TYPES.TEXT_AREA,
    label: 'Description',
    className: 'col-md-12',
    placeholder: 'Description',
    options: AuctionStatus,
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
  prizeClaimDays: {
    type: INPUT_TYPES.NUMBER,
    label: 'Prize Claim Duration (Days)',
    className: 'col-md-12',
    placeholder: 'Prize Claim Duration (Days)',
    options: AuctionStatus,
    schema: {
      required: FORM_VALIDATION_MESSAGES('Prize Claim Duration').REQUIRED,
      min: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_VALUE,
      },
    },
  },
  bidDuration: {
    type: INPUT_TYPES.NUMBER,
    label: 'Bids Duration (Sec)',
    className: 'col-md-12',
    placeholder: 'Bids Duration (Sec)',
    options: AuctionStatus,
    schema: {
      required: FORM_VALIDATION_MESSAGES('Bids Duration').REQUIRED,
      min: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_VALUE,
      },
    },
  },
  images: {
    type: INPUT_TYPES.FILE,
    label: 'Images',
    accept: IMAGE_FILE_TYPES,
    className: 'col-md-12',
    singleImageSelectionEnabled: false,
    placeholder: 'Images',
    ratio: [1, 1],
    imageFileType: FILE_TYPE.AUCTION,
    fetchImageDataConfig: isEdit
      ? [
          {
            key: 'auctionId',
            value: initialData?._id,
          },
          {
            key: 'productId',
            value: selectedProductDetails?._id,
          },
        ]
      : [
          {
            key: 'productId',
            value: selectedProductDetails?._id,
          },
        ],
    schema: {
      required: FORM_VALIDATION_MESSAGES('Image').REQUIRED,
    },
  },
  preAuctionUsersCount: {
    type: INPUT_TYPES.NUMBER,
    label: 'Min Auction Users',
    className: 'col-md-12',
    placeholder: 'Min Auction Users',
    options: AuctionStatus,
    schema: {
      required: FORM_VALIDATION_MESSAGES('Min Auction Users').REQUIRED,
      min: {
        value: 1,
        message: FORM_VALIDATION_MESSAGES(1).MIN_VALUE,
      },
      pattern: {
        value: /^[0-9]+$/,
        message: FORM_VALIDATION_MESSAGES().ENTER_INTEGER,
      },
    },
  },
});

type RenderActions = (val: unknown, row: AuctionResponsePayload) => JSX.Element;

export const AuctionColumns = (
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
          onClick={() => handleChangeCheckBox(row?._id || '')}
        >
          <input
            type="checkbox"
            className="checkbox-input"
            checked={selectedIds?.includes(row?._id || '')}
            // onChange={() => handleChangeCheckBox(row._id)}
          />
          <span className="label" />
        </div>
      );
    },
  },
  {
    title: 'Id',
    fieldName: 'id',
    noClickEvent: true,
    sortable: true,
    sortType: 'id',
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
    title: 'Users Joined',
    fieldName: 'currentlySubscribedUser',
    sortable: true,
    sortType: 'currentlySubscribedUser',
  },
  // {
  //   title: 'Winner',
  //   fieldName: 'winnerName',
  //   isTruncated: true,
  //   sortable: true,
  //   sortType: 'winnerName',
  // },
  // {
  //   title: 'Prize Status',
  //   fieldName: 'productPurchaseStatus',
  //   sortable: true,
  //   sortType: 'productPurchaseStatus',
  //   render: (_, val) => {
  //     return (
  //       PurchaseStatus.find((item) => {
  //         return item.value === val;
  //       })?.label.toString() || '-.-'
  //     );
  //   },
  // },
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
