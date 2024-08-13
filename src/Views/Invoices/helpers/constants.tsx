// libs

// consts
import { convertToLocale } from '../../../Shared/utils/functions';
import { ProductResponsePayload } from './model';

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
    row: ProductResponsePayload,
    val: string | number
  ) => JSX.Element[] | string | JSX.Element | string[];
}

// Define the shape of the columns
export const AuctionInvoiceColumns: ColumnData[] = [
  {
    title: 'Auction Id',
    fieldName: 'auctionId',
  },
  {
    title: 'Auction Name',
    fieldName: 'name',
    sortable: true,
    sortType: 'name',
  },
  {
    title: 'P. ID',
    fieldName: 'productId',
    sortable: true,
    sortType: 'productId',
  },
  {
    title: 'P. Name',
    fieldName: 'productName',
    sortable: true,
    sortType: 'productName',
  },
  {
    title: 'Purchased Date',
    fieldName: 'purchasedDate',
    sortable: true,
    sortType: 'purchasedDate',
  },
  {
    title: 'Invoice Date',
    fieldName: 'invoiceDate',
    sortable: true,
    sortType: 'invoiceDate',
  },
  {
    title: 'Bid Price',
    fieldName: 'bidPrice',
    render: (_, val) => `$${convertToLocale(val)}`,
    sortable: true,
    sortType: 'bidPrice',
  },
  {
    title: 'Username',
    fieldName: 'username',
    sortable: true,
    sortType: 'username',
  },
  {
    title: 'Email',
    fieldName: 'email',
    sortable: true,
    sortType: 'email',
  },
  {
    title: 'Invoice',
    fieldName: 'stock',
    render: (_, val) =>
      `${
        val === 0 ? (
          <span className="badge bg-danger">View</span>
        ) : (
          <span className="badge bg-info">Generate</span>
        )
      }`,
  },
];

// Define the shape of the columns
export const PurchaseInvoiceColumns: ColumnData[] = [
  {
    title: 'Pack Id',
    fieldName: 'packId',
  },
  {
    title: 'Pack Name',
    fieldName: 'name',
    sortable: true,
    sortType: 'name',
  },
  {
    title: 'Deal Price',
    fieldName: 'dealPrice',
    render: (_, val) => `$${convertToLocale(val)}`,
    sortable: true,
    sortType: 'dealPrice',
  },
  {
    title: 'Bids Received',
    fieldName: 'bidsReceived',
    sortable: true,
    sortType: 'bidsReceived',
  },
  {
    title: 'Purchased Date',
    fieldName: 'purchasedDate',
    sortable: true,
    sortType: 'purchasedDate',
  },
  {
    title: 'Username',
    fieldName: 'username',
    sortable: true,
    sortType: 'username',
  },
  {
    title: 'Email',
    fieldName: 'email',
    sortable: true,
    sortType: 'email',
  },
  {
    title: 'Invoice',
    fieldName: 'stock',
    render: (_, val) =>
      `${
        val === 0 ? (
          <span className="badge bg-danger">View</span>
        ) : (
          <span className="badge bg-info">Generate</span>
        )
      }`,
  },
];

// Define the shape of CONFIRMATION_DESCRIPTION
export const CONFIRMATION_DESCRIPTION: Record<string, string> = {
  DELETE: 'Are you sure you want to delete',
};
