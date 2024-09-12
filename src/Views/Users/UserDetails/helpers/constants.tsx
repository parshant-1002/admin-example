import moment from 'moment';
import { FieldSchema } from '../../../../Shared/components/CustomDetailsBoard/CustomDetailsBoard';
import {
  DATE_FORMATS,
  INPUT_TYPES,
} from '../../../../Shared/constants/constants';

// libs

// consts
import { FORM_VALIDATION_MESSAGES } from '../../../../Shared/constants/validationMessages';

const USER_DETAILS_SCHEMA: FieldSchema[] = [
  { label: 'Name', key: 'name' },
  { label: 'Email', key: 'email', truncate: true },
  { label: 'SSL No.', key: 'personalNumber', truncate: true },
  { label: 'Phone No.', key: 'phoneNumber' },
  { label: 'Address', key: 'address', truncate: true },
  { label: 'Total Bids', key: 'bidBalance', format: true },
  { label: 'Ongoing Auction', key: 'ongoingAuctions', format: true },
  { label: 'Auction Won', key: 'auctionsWon', format: true },
  { label: 'Referral Bids Earned', key: 'referralBidsEarned', format: true },
  {
    label: 'Joining Date',
    key: 'createdAt',
    render: (value: string | number | undefined) =>
      moment(value).format(DATE_FORMATS.DISPLAY_DATE_WITH_TIME),
  },
  { label: 'No. Of Users Referred', key: 'referredFriendsCount', format: true },
  { label: 'Total Spent', key: 'totalSpent', currencyFormat: true },
];

const UserDetailsTabs = {
  LIST_RELATED_TO_USERS: 'List Related to User',
};

// Define the shape of CONFIRMATION_DESCRIPTION
const CONFIRMATION_DESCRIPTION: Record<string, string> = {
  DELETE: 'Are you sure you want to delete',
};

const BID_CREDIT_TYPES = {
  PURCHASE: 1,
  GIFT: 2,
  REFERRAL: 3,
  BONUS: 4,
  REFUND: 5,
};

const BID_CREDIT_TYPES_OPTIONS = [
  { label: 'PURCHASE', value: BID_CREDIT_TYPES.PURCHASE },
  { label: 'GIFT', value: BID_CREDIT_TYPES.GIFT },
  { label: 'REFERRAL', value: BID_CREDIT_TYPES.REFERRAL },
  { label: 'BONUS', value: BID_CREDIT_TYPES.BONUS },
  { label: 'REFUND', value: BID_CREDIT_TYPES.REFUND },
];

const BID_STATUS = {
  CONFIRMED: 1,
  REFUNDED: 2,
};

const BID_STATUS_OPTIONS = [
  { label: 'CONFIRMED', value: BID_STATUS.CONFIRMED },
  { label: 'REFUNDED', value: BID_STATUS.REFUNDED },
];
const AUCTION_STATUS = {
  PENDING: 1, // awaiting bidding
  ACTIVE: 2, // bidding active
  ENDED: 3, // bidding ended
  REFUNDED: 4,
};

const AUCTION_HISTORY_FRONTEND = {
  COMPLETED: 1, // Active, Ended
  REFUNDED: 2, // Cancelled
};

const AUCTION_HISTORY_FRONTEND_OPTIONS = [
  { label: 'COMPLETED', value: AUCTION_HISTORY_FRONTEND.COMPLETED },
  { label: 'REFUNDED', value: AUCTION_HISTORY_FRONTEND.REFUNDED },
];
const ADD_BIDS_FORM_SCHEMA = {
  bids: {
    type: INPUT_TYPES.NUMBER,
    label: 'Add Bids',
    className: 'col-md-12',
    placeholder: 'Add Bids',
    schema: {
      required: FORM_VALIDATION_MESSAGES('Add Bids').REQUIRED,
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
};

const INVOICE_TYPE = {
  'BID PLAN': 1,
  'BID CREDIT': 2,
  'USER PRODUCT': 3,
};
const INVOICE_TYPE_OPTIONS = [
  { label: 'BID PLAN', value: 1 },
  { label: 'BID CREDIT', value: 2 },
  { label: 'USER PRODUCT', value: 3 },
];
export {
  ADD_BIDS_FORM_SCHEMA,
  AUCTION_HISTORY_FRONTEND_OPTIONS,
  AUCTION_STATUS,
  BID_CREDIT_TYPES,
  BID_CREDIT_TYPES_OPTIONS,
  BID_STATUS,
  BID_STATUS_OPTIONS,
  CONFIRMATION_DESCRIPTION,
  INVOICE_TYPE,
  INVOICE_TYPE_OPTIONS,
  USER_DETAILS_SCHEMA,
  UserDetailsTabs,
};
