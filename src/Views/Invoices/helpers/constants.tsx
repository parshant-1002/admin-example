// utils
import Button from '../../../Shared/components/form/Button';
import {
  convertToLocale,
  formatDate,
  renderIdWithHash,
} from '../../../Shared/utils/functions';

// consts
import TruncatedText from '../../../Shared/components/TruncateText/TruncateText';
import { STRINGS } from '../../../Shared/constants';
import { InvoiceIcon } from '../../../assets';
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
export const AuctionInvoiceColumns = (
  handleGenerateInvoice: (row: Invoice) => void
): ColumnData[] => [
  {
    title: STRINGS.AUCTION_ID,
    fieldName: 'id',
    render: renderIdWithHash,
  },
  {
    title: STRINGS.AUCTION_NAME,
    path: ['auction', 'title'],
    sortable: true,
    sortType: 'auctionName',
  },
  {
    title: STRINGS.P_ID,
    path: ['product', 'id'],
    render: renderIdWithHash,
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
    render: (_, val) => (val ? formatDate(val as string) : '-.-'),
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
    render: (_, val) => `${convertToLocale(val)}`,
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
      <div className="text-start">
        {row?.invoiceURL ? (
          <button
            type="button"
            className="btn-primary"
            onClick={() => window.open(row?.invoiceURL, '_blank')}
          >
            <img src={InvoiceIcon} alt="" />
          </button>
        ) : (
          <Button onClick={() => handleGenerateInvoice(row)}>
            {STRINGS.GENERATE}
          </Button>
        )}
      </div>
    ),
  },
];

// Define the shape of the columns
export const PurchaseInvoiceColumns = (
  handleInvoice: (row: Invoice) => void
): ColumnData[] => [
  {
    title: STRINGS.PACK_ID,
    fieldName: 'bidPlan',
    render: (row) => <TruncatedText text={row?.bidPlan?.id} />,
  },
  {
    title: STRINGS.PACK_NAME,
    fieldName: 'name',
  },
  {
    title: STRINGS.DEAL_PRICE,
    fieldName: 'dealPrice',
    render: (_, val) => `${convertToLocale(val || 0)}`,
    // sortable: true,
    // sortType: 'dealPrice',
  },
  {
    title: STRINGS.BIDS_RECEIVED,
    fieldName: 'bids',
    // sortable: true,
    sortType: 'bids',
    render: (_, val) => `${convertToLocale(val)}`,
  },
  {
    title: STRINGS.PURCHASED_DATE,
    fieldName: 'createdAt',
    sortable: true,
    sortType: 'createdAt',
    render: (_, val) => (val ? formatDate(val as string) : '-.-'),
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
    render: (row) =>
      row?.invoiceURL ? (
        <button
          type="button"
          className="btn btn44 btn-primary"
          onClick={() => window.open(row?.invoiceURL, '_blank')}
        >
          <img src={InvoiceIcon} alt="" />
        </button>
      ) : (
        <Button onClick={() => handleInvoice(row)}>{STRINGS.GENERATE}</Button>
      ),
  },
];
