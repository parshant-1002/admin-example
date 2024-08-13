// utils
import { convertToLocale, formatDate } from '../../../Shared/utils/functions';
import Button from '../../../Shared/components/form/Button';

// consts
import { Invoice } from './model';
import { InvoiceIcon } from '../../../assets';
import { STRINGS } from '../../../Shared/constants';

export const PRODUCT_STATUS = [
  { value: 1, label: 'Pending' },
  { value: 2, label: 'Active' },
  { value: 3, label: 'Ended' },
];

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

// Define the shape of the columns
export const AuctionInvoiceColumns: ColumnData[] = [
  {
    title: STRINGS.AUCTION_ID,
    fieldName: '_id',
    render: (_, val) => (val ? `#${val}` : ''),
  },
  {
    title: STRINGS.AUCTION_NAME,
    path: ['auction', 'title'],
    sortable: true,
    sortType: 'auctionName',
  },
  {
    title: STRINGS.P_ID,
    render: (row) => (row?.product?._id ? `#${row?.product?._id}` : ''),
  },
  {
    title: STRINGS.P_NAME,
    path: ['product', 'title'],
    sortable: true,
    sortType: 'productName',
  },
  {
    title: STRINGS.PURCHASED_DATE,
    fieldName: 'purchaseDate',
    sortable: true,
    sortType: 'purchaseDate',
    render: (_, val) => (val ? formatDate(val as string) : ''),
  },
  {
    title: STRINGS.INVOICE_DATE,
    fieldName: 'invoiceDate',
    sortable: true,
    sortType: 'invoiceDate',
  },
  {
    title: STRINGS.BID_PRICE,
    fieldName: 'purchasedPrice',
    render: (_, val) => `$${convertToLocale(val)}`,
    sortable: true,
    sortType: 'purchasedPrice',
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
export const PurchaseInvoiceColumns: ColumnData[] = [
  {
    title: STRINGS.PACK_ID,
    fieldName: '_id',
    render: (_, val) => (val ? `#${val}` : ''),
  },
  {
    title: STRINGS.PACK_NAME,
    fieldName: 'name',
  },
  {
    title: STRINGS.DEAL_PRICE,
    fieldName: 'purchasedPrice',
    render: (_, val) => `$${convertToLocale(val || 0)}`,
    sortable: true,
    sortType: 'purchasedPrice',
  },
  {
    title: STRINGS.BIDS_RECEIVED,
    fieldName: 'bidsReceived',
  },
  {
    title: STRINGS.PURCHASED_DATE,
    fieldName: 'purchaseDate',
    sortable: true,
    sortType: 'purchaseDate',
    render: (_, val) => (val ? formatDate(val as string) : ''),
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
