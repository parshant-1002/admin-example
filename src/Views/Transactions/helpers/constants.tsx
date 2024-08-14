// utils
import {
  convertToLocale,
  formatDate,
  renderIdWithHash,
} from '../../../Shared/utils/functions';
import Button from '../../../Shared/components/form/Button';

// consts
import { Invoice } from './model';
import { InvoiceIcon } from '../../../assets';
import { REFERRAL_STATUS, STRINGS } from '../../../Shared/constants';
import FileRenderer from '../../../Shared/components/form/FileUpload/FileRenderer';
import { Image } from '../../../Models/common';

// Define types for renderActions and column data
interface ColumnData {
  title?: string;
  fieldName?: string;
  isTruncated?: boolean;
  sortable?: boolean;
  sortType?: string;
  render?: (
    row: Invoice,
    val: string | number
  ) => JSX.Element[] | string | JSX.Element | string[];
  path?: string[];
}

const IMAGES_COUNT_IN_TABLE = 2;

export const PRODUCT_STATUS = [
  { value: 1, label: 'Pending' },
  { value: 2, label: 'Active' },
  { value: 3, label: 'Ended' },
];

// Define the shape of the columns
export const PlansHistoryColumns: ColumnData[] = [
  {
    title: STRINGS.T_ID,
    fieldName: '_id',
    render: renderIdWithHash,
  },
  {
    title: STRINGS.PACK_NAME,
    fieldName: 'name',
    sortable: true,
    sortType: 'packName',
  },
  {
    title: STRINGS.USERNAME,
    path: ['user', 'name'],
    sortable: true,
    sortType: 'userName',
  },
  {
    title: STRINGS.EMAIL,
    path: ['user', 'email'],
    sortable: true,
    sortType: 'email',
  },
  {
    title: STRINGS.DEAL_PRICE,
    fieldName: 'purchasedPrice',
    render: (_, val) => `$${convertToLocale(val || 0)}`,
    sortable: true,
    sortType: 'purchasedPrice',
  },
  {
    title: STRINGS.DEAL_OFFER,
    fieldName: 'purchasedPrice',
    render: (_, val) => (val ? `${val}% Off` : '-.-'),
    sortable: true,
    sortType: 'dealOffer',
  },
  {
    title: STRINGS.BIDS_RECEIVED,
    fieldName: 'bidsReceived',
    sortable: true,
    sortType: 'bidsReceived',
  },
  {
    title: STRINGS.STATUS,
    fieldName: 'status',
    render: (row) =>
      (() => {
        switch (row?.status as number) {
          case REFERRAL_STATUS.COMPLETED:
            return <span className="text-success">{STRINGS.COMPLETED}</span>;
          case REFERRAL_STATUS.PENDING:
            return <span className="text-warning">{STRINGS.PENDING}</span>;
          case REFERRAL_STATUS.USER_DELETED_BEFORE_COMPLETION:
            return <span className="text-danger">{STRINGS.USER_DELETED}</span>;
          default:
            return '';
        }
      })(),
  },
  {
    title: STRINGS.PURCHASED_DATE,
    fieldName: 'purchaseDate',
    sortable: true,
    sortType: 'purchaseDate',
    render: (_, val) => (val ? formatDate(val as string) : '-.-'),
  },
  {
    title: STRINGS.INVOICE,
    render: (row) => (
      <div className="text-center">
        {row?.invoiceURL ? (
          <button
            type="button"
            className="cursor-pointer btn-transparent"
            onClick={() => window.open(row?.invoiceURL, '_blank')}
          >
            <img src={InvoiceIcon} alt="" />
          </button>
        ) : (
          <Button>{STRINGS.GENERATE}</Button>
        )}
      </div>
    ),
  },
];

// Define the shape of the columns
export const BidsHistoryColumns: ColumnData[] = [
  {
    title: STRINGS.T_ID,
    fieldName: '_id',
    render: renderIdWithHash,
  },
  {
    title: STRINGS.USERNAME,
    path: ['user', 'name'],
    sortable: true,
    sortType: 'userName',
  },
  {
    title: STRINGS.EMAIL,
    path: ['user', 'email'],
    sortable: true,
    sortType: 'email',
  },
  {
    title: STRINGS.AUCTION_ID,
    fieldName: '_id',
    render: renderIdWithHash,
  },
  {
    title: STRINGS.AUCTION_NAME,
    path: ['auction', 'title'],
    sortable: true,
    sortType: 'auctionName',
  },
  {
    title: STRINGS.BID_SPENT,
    fieldName: 'purchasedPrice',
    render: (_, val) => `$${convertToLocale(val)}`,
    sortable: true,
    sortType: 'purchasedPrice',
  },
  {
    title: STRINGS.DATE,
    fieldName: 'purchaseDate',
    sortable: true,
    sortType: 'purchaseDate',
    render: (_, val) => (val ? formatDate(val as string) : '-.-'),
  },
  {
    title: STRINGS.ITEM_PRICE,
    fieldName: 'purchasedPrice',
    sortable: true,
    sortType: 'purchasedPrice',
  },
  {
    title: STRINGS.STATUS,
    fieldName: 'status',
    render: (row) =>
      (() => {
        switch (row?.status as number) {
          case REFERRAL_STATUS.COMPLETED:
            return <span className="text-success">{STRINGS.COMPLETED}</span>;
          case REFERRAL_STATUS.PENDING:
            return <span className="text-warning">{STRINGS.PENDING}</span>;
          case REFERRAL_STATUS.USER_DELETED_BEFORE_COMPLETION:
            return <span className="text-danger">{STRINGS.USER_DELETED}</span>;
          default:
            return '';
        }
      })(),
  },
];

// Define the shape of the columns
export const ProductsHistoryColumns = ({
  handleMoreImagesClick = () => {},
}: {
  handleMoreImagesClick: (imgs: Image[]) => void;
}): ColumnData[] => [
  {
    title: STRINGS.T_ID,
    fieldName: '_id',
    render: renderIdWithHash,
  },
  {
    title: STRINGS.AUCTION_ID,
    fieldName: '_id',
    render: renderIdWithHash,
  },
  {
    title: STRINGS.AUCTION_NAME,
    path: ['auction', 'title'],
    sortable: true,
    sortType: 'auctionName',
  },
  {
    title: STRINGS.PRODUCT_ID,
    fieldName: '_id',
    render: renderIdWithHash,
  },
  {
    title: STRINGS.PRODUCT_NAME,
    path: ['product', 'title'],
    sortable: true,
    sortType: 'productName',
  },
  {
    title: STRINGS.USERNAME,
    path: ['user', 'name'],
    sortable: true,
    sortType: 'userName',
  },
  {
    title: STRINGS.EMAIL,
    path: ['user', 'email'],
    sortable: true,
    sortType: 'email',
  },
  {
    title: STRINGS.PRODUCT_PRICE,
    fieldName: 'purchasedPrice',
    render: (_, val) => `$${convertToLocale(val)}`,
    sortable: true,
    sortType: 'purchasedPrice',
  },
  {
    title: STRINGS.DATE,
    fieldName: 'purchaseDate',
    sortable: true,
    sortType: 'purchaseDate',
    render: (_, val) => (val ? formatDate(val as string) : '-.-'),
  },
  {
    title: 'Images',
    fieldName: 'images',
    render: (row) => {
      const images = row?.product?.images;
      return (
        <div className="d-flex align-items-center">
          {images?.map((img, index) =>
            index < IMAGES_COUNT_IN_TABLE ? (
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
          {images?.length > IMAGES_COUNT_IN_TABLE ? (
            <button
              type="button"
              className="btn border py-0 px-1"
              onClick={() => handleMoreImagesClick(images)}
            >
              {`. . .+${images.length - IMAGES_COUNT_IN_TABLE}`}
            </button>
          ) : null}
        </div>
      );
    },
  },
  {
    title: STRINGS.INVOICE,
    render: (row) => (
      <div className="text-center">
        {row?.invoiceURL ? (
          <button
            type="button"
            className="cursor-pointer btn-transparent"
            onClick={() => window.open(row?.invoiceURL, '_blank')}
          >
            <img src={InvoiceIcon} alt="" />
          </button>
        ) : (
          <Button>{STRINGS.GENERATE}</Button>
        )}
      </div>
    ),
  },
];

// Define the shape of the columns
export const ReferralHistoryColumns: ColumnData[] = [
  {
    title: STRINGS.T_ID,
    fieldName: '_id',
    render: renderIdWithHash,
  },
  {
    title: STRINGS.PLAN_ID,
    path: ['auction', '_id'],
    render: renderIdWithHash,
  },
  {
    title: STRINGS.REFERRER_ID,
    path: ['product', '_id'],
    render: renderIdWithHash,
  },
  {
    title: STRINGS.REFERRER_NAME,
    path: ['user', 'name'],
    sortable: true,
    sortType: 'referrerName',
  },
  {
    title: STRINGS.REFERRER_EMAIL,
    path: ['user', 'email'],
    sortable: true,
    sortType: 'referrerEmail',
  },
  {
    title: STRINGS.BIDS_GIVEN,
    path: ['product', 'title'],
    sortable: true,
    sortType: 'productName',
  },
  {
    title: STRINGS.REFEREE_EMAIL,
    path: ['user', 'email'],
    sortable: true,
    sortType: 'refereeEmail',
  },
  {
    title: STRINGS.DATE,
    fieldName: 'purchaseDate',
    sortable: true,
    sortType: 'purchaseDate',
    render: (_, val) => (val ? formatDate(val as string) : '-.-'),
  },
  {
    title: STRINGS.STATUS,
    fieldName: 'status',
    render: (row) =>
      (() => {
        switch (row?.status as number) {
          case REFERRAL_STATUS.COMPLETED:
            return <span className="text-success">{STRINGS.COMPLETED}</span>;
          case REFERRAL_STATUS.PENDING:
            return <span className="text-warning">{STRINGS.PENDING}</span>;
          case REFERRAL_STATUS.USER_DELETED_BEFORE_COMPLETION:
            return <span className="text-danger">{STRINGS.USER_DELETED}</span>;
          default:
            return '';
        }
      })(),
  },
];
