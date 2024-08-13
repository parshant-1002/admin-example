// utils
import { convertToLocale, formatDate } from '../../../Shared/utils/functions';
import Button from '../../../Shared/components/form/Button';

// consts
import { Invoice } from './model';

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
    title: 'Auction Id',
    fieldName: '_id',
    render: (_, val) => (val ? `#${val}` : ''),
  },
  {
    title: 'Auction Name',
    path: ['auction', 'title'],
    sortable: true,
    sortType: 'auctionName',
  },
  {
    title: 'P. ID',
    render: (row) => (row?.product?._id ? `#${row?.product?._id}` : ''),
  },
  {
    title: 'P. Name',
    path: ['product', 'title'],
    sortable: true,
    sortType: 'productName',
  },
  {
    title: 'Purchased Date',
    fieldName: 'purchaseDate',
    sortable: true,
    sortType: 'purchaseDate',
    render: (_, val) => (val ? formatDate(val as string) : ''),
  },
  {
    title: 'Invoice Date',
    fieldName: 'invoiceDate',
    sortable: true,
    sortType: 'invoiceDate',
  },
  {
    title: 'Bid Price',
    fieldName: 'purchasedPrice',
    render: (_, val) => `$${convertToLocale(val)}`,
    sortable: true,
    sortType: 'purchasedPrice',
  },
  {
    title: 'Username',
    path: ['user', 'name'],
  },
  {
    title: 'Email',
    path: ['user', 'email'],
  },
  {
    title: 'Invoice',
    render: (row) => (
      <div className="text-center">
        {row?.invoiceURL ? <img src="" alt="" /> : <Button>Generate</Button>}
      </div>
    ),
  },
];

// Define the shape of the columns
export const PurchaseInvoiceColumns: ColumnData[] = [
  {
    title: 'Pack Id',
    fieldName: '_id',
    render: (_, val) => (val ? `#${val}` : ''),
  },
  {
    title: 'Pack Name',
    fieldName: 'name',
  },
  {
    title: 'Deal Price',
    fieldName: 'purchasedPrice',
    render: (_, val) => `$${convertToLocale(val || 0)}`,
    sortable: true,
    sortType: 'purchasedPrice',
  },
  {
    title: 'Bids Received',
    fieldName: 'bidsReceived',
  },
  {
    title: 'Purchased Date',
    fieldName: 'purchaseDate',
    sortable: true,
    sortType: 'purchaseDate',
    render: (_, val) => (val ? formatDate(val as string) : ''),
  },
  {
    title: 'Username',
    path: ['user', 'name'],
  },
  {
    title: 'Email',
    path: ['user', 'email'],
  },
  {
    title: 'Invoice',
    render: (row) => (
      <div className="text-center">
        {row?.invoiceURL ? <img src="" alt="" /> : <Button>Generate</Button>}
      </div>
    ),
  },
];

// Define the shape of CONFIRMATION_DESCRIPTION
export const CONFIRMATION_DESCRIPTION: Record<string, string> = {
  DELETE: 'Are you sure you want to delete',
};
