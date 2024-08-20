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
import {
  BID_CREDIT_TYPES,
  BID_STATUS,
  REFERRAL_STATUS,
  STRINGS,
} from '../../../Shared/constants';
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
    fieldName: 'id',
    render: renderIdWithHash,
    sortable: true,
    sortType: 'id',
  },
  {
    title: STRINGS.PACK_NAME,
    path: ['bidPlan', 'title'],
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
    sortType: 'userEmail',
  },
  {
    title: STRINGS.DEAL_PRICE,
    fieldName: 'price',
    render: (_, val) => `${convertToLocale(val || 0)}`,
    sortable: true,
    sortType: 'price',
  },
  {
    title: STRINGS.DEAL_OFFER,
    fieldName: 'dealOfferPercentage',
    render: (_, val) => (val ? `${val}% Off` : '-.-'),
    sortable: true,
    sortType: 'dealOfferPercentage',
  },
  {
    title: STRINGS.BIDS_RECEIVED,
    fieldName: 'bids',
    sortable: true,
    sortType: 'bids',
    render: (_, val) => `${convertToLocale(val)}`,
  },
  {
    title: STRINGS.STATUS,
    fieldName: 'type',
    render: (_, val) =>
      (() => {
        switch (val) {
          case BID_CREDIT_TYPES.ADMIN_GIFT:
            return STRINGS.GIFT;
          case BID_CREDIT_TYPES.PURCHASE:
            return STRINGS.PURCHASE;
          case BID_CREDIT_TYPES.REFERRAL:
            return STRINGS.REFERRAL;
          case BID_CREDIT_TYPES.REFUND:
            return STRINGS.REFUND;
          case BID_CREDIT_TYPES.SIGNUP_BONUS:
            return STRINGS.SIGNUP_BONUS;
          default:
            return '';
        }
      })(),
  },
  {
    title: STRINGS.PURCHASED_DATE,
    fieldName: 'createdAt',
    sortable: true,
    sortType: 'createdAt',
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
    fieldName: 'id',
    render: renderIdWithHash,
    sortable: true,
    sortType: 'id',
  },
  {
    title: STRINGS.USERNAME,
    fieldName: 'userName',
  },
  {
    title: STRINGS.EMAIL,
    fieldName: 'userEmail',
  },
  {
    title: STRINGS.AUCTION_ID,
    fieldName: 'auctionId',
    render: renderIdWithHash,
    sortable: true,
    sortType: 'auctionId',
  },
  {
    title: STRINGS.AUCTION_NAME,
    path: ['auctionDetails', 'title'],
    sortable: true,
    sortType: 'auctionName',
  },
  {
    title: STRINGS.BID_SPENT,
    fieldName: 'bids',
    render: (_, val) => `${convertToLocale(val)}`,
  },
  {
    title: STRINGS.DATE,
    fieldName: 'createdAt',
    sortable: true,
    sortType: 'createdAt',
    render: (_, val) => (val ? formatDate(val as string) : '-.-'),
  },
  {
    title: STRINGS.ITEM_PRICE,
    fieldName: 'currentBidPrice',
    sortable: true,
    sortType: 'currentBidPrice',
    render: (_, val) => `${convertToLocale(val)}`,
  },
  {
    title: STRINGS.STATUS,
    fieldName: 'status',
    render: (row) =>
      (() => {
        switch (row?.status as number) {
          case BID_STATUS.CONFIRMED:
            return <span className="text-success">{STRINGS.CONFIRMED}</span>;
          case BID_STATUS.REFUNDED:
            return <span className="text-warning">{STRINGS.REFUNDED}</span>;
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
    fieldName: 'id',
    render: renderIdWithHash,
  },
  {
    title: STRINGS.AUCTION_ID,
    path: ['auction', 'id'],
    render: renderIdWithHash,
    sortable: true,
    sortType: 'auctionId',
  },
  {
    title: STRINGS.AUCTION_NAME,
    path: ['auction', 'title'],
    sortable: true,
    sortType: 'auctionName',
  },
  {
    title: STRINGS.PRODUCT_ID,
    path: ['product', 'id'],
    render: renderIdWithHash,
    sortable: true,
    sortType: 'productId',
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
  },
  {
    title: STRINGS.EMAIL,
    path: ['user', 'email'],
  },
  {
    title: STRINGS.PRODUCT_PRICE,
    fieldName: 'purchasedPrice',
    render: (_, val) => `${convertToLocale(val)}`,
    sortable: true,
    sortType: 'purchasedPrice',
  },
  {
    title: STRINGS.DATE,
    fieldName: 'createdAt',
    sortable: true,
    sortType: 'createdAt',
    render: (_, val) => (val ? formatDate(val as string) : '-.-'),
  },
  {
    title: 'Images',
    fieldName: 'images',
    render: (row) => {
      const images = row?.product?.images;
      return (
        <div
          className="d-inline-flex align-items-center position-relative uploaded_file pointer"
          onClick={() => handleMoreImagesClick(images)}
        >
          {images?.map((img, index) =>
            index < IMAGES_COUNT_IN_TABLE ? (
              <figure key={img.url}>
                <FileRenderer fileURL={img.url} />
                {/* <span>{img.title}</span> */}
              </figure>
            ) : null
          )}
          {images?.length > IMAGES_COUNT_IN_TABLE ? (
            <button
              type="button"
              className="count_btn"
              onClick={() => handleMoreImagesClick(images)}
            >
              {`+${images.length - IMAGES_COUNT_IN_TABLE}`}
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
    fieldName: 'id',
    render: renderIdWithHash,
    sortable: true,
    sortType: 'id',
  },
  {
    title: STRINGS.PLAN_ID,
    fieldName: 'referralPackId',
    render: renderIdWithHash,
    sortable: true,
    sortType: 'referralPlanId',
  },
  {
    title: STRINGS.REFERRER_ID,
    path: ['refererUser', 'id'],
    render: renderIdWithHash,
    sortable: true,
    sortType: 'referrerId',
  },
  {
    title: STRINGS.REFERRER_NAME,
    path: ['refererUser', 'name'],
    sortable: true,
    sortType: 'refererName',
  },
  {
    title: STRINGS.REFERRER_EMAIL,
    path: ['refererUser', 'email'],
    sortable: true,
    sortType: 'refererEmail',
  },
  {
    title: STRINGS.BIDS_GIVEN,
    fieldName: 'rewardBids',
    sortable: true,
    sortType: 'rewardBids',
    render: (_, val) => `${convertToLocale(val)}`,
  },
  {
    title: STRINGS.REFEREE_EMAIL,
    path: ['refereeUser', 'email'],
    sortable: true,
    sortType: 'refereeEmail',
  },
  {
    title: STRINGS.DATE,
    fieldName: 'createdAt',
    sortable: true,
    sortType: 'createdAt',
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
