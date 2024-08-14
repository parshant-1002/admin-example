import { actions, InvoiceIcon } from '../../../assets';
import { ColumnData } from '../../../Models/Tables';
import CustomDropDown from '../../../Shared/components/CustomDropDown';
import {
  BID_PLAN_TYPES,
  INPUT_TYPES,
  REFERRAL_STATUS,
  STRINGS,
} from '../../../Shared/constants';
import FORM_VALIDATION_MESSAGES from '../../../Shared/constants/validationMessages';
import { formatDate } from '../../../Shared/utils/functions';

export const PLAN_FORM_FIELDS = {
  NAME: 'title',
  PRICE: 'price',
  BIDS: 'bids',
  HOT_DEAL: 'type',
  DISCOUNT_PERCENTAGE: 'dealOfferPercentage',
  DISCOUNT_PRICE: 'dealPrice',
  END_DATE: 'endDate',
  STATUS: 'isEnabled',
};

export const PLAN_SCHEMA = (showHotDealSpecificFields: boolean) => ({
  [PLAN_FORM_FIELDS.NAME]: {
    type: INPUT_TYPES.TEXT,
    label: 'Plan Name',
    className: 'col-md-12',
    placeholder: 'Plan Name',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  [PLAN_FORM_FIELDS.PRICE]: {
    type: INPUT_TYPES.NUMBER,
    label: 'Deal Price',
    className: 'col-md-12',
    placeholder: 'Deal Price',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
      min: {
        value: 0,
        message: 'Values can not be less than 0',
      },
    },
  },
  [PLAN_FORM_FIELDS.BIDS]: {
    type: INPUT_TYPES.NUMBER,
    label: 'Bids Credited',
    className: 'col-md-12',
    placeholder: 'Bids Credited',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
      min: {
        value: 0,
        message: 'Values can not be less than 0',
      },
    },
  },
  [PLAN_FORM_FIELDS.HOT_DEAL]: {
    type: INPUT_TYPES.SELECT,
    label: 'Hot Deal',
    className: 'col-md-12',
    placeholder: 'Hot Deal',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
    options: [
      {
        label: 'Yes',
        value: BID_PLAN_TYPES.HOT_DEAL,
      },
      {
        label: 'No',
        value: BID_PLAN_TYPES.REGULAR,
      },
    ],
  },
  ...(showHotDealSpecificFields
    ? {
        [PLAN_FORM_FIELDS.DISCOUNT_PERCENTAGE]: {
          type: INPUT_TYPES.NUMBER,
          label: 'Discount Percentage (upto 100)',
          className: 'col-md-12',
          placeholder: 'Discount Percentage (upto 100)',
          min: 0,
          max: 100,
          schema: {
            required: FORM_VALIDATION_MESSAGES().REQUIRED,
            min: {
              value: 0,
              message: 'Values can not be less than 0',
            },
            max: {
              value: 100,
              message: 'Value can not be great than 100',
            },
          },
        },
        [PLAN_FORM_FIELDS.DISCOUNT_PRICE]: {
          type: INPUT_TYPES.NUMBER,
          label: 'Discounted Deal Price',
          className: 'col-md-12',
          placeholder: 'Discounted Deal Price',
          readOnly: true,
          schema: {
            required: FORM_VALIDATION_MESSAGES().REQUIRED,
          },
        },
        [PLAN_FORM_FIELDS.END_DATE]: {
          type: INPUT_TYPES.DATE,
          label: 'End Date',
          className: 'col-md-12',
          placeholder: 'End Date',
          schema: {
            required: FORM_VALIDATION_MESSAGES().REQUIRED,
          },
        },
      }
    : {}),
  [PLAN_FORM_FIELDS.STATUS]: {
    type: INPUT_TYPES.SWITCH,
    label: 'Status',
    className: 'col-md-12',
    placeholder: 'Status',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
});

interface CreateReferralProps {
  handleView: (row: Record<string, unknown>) => void;
  handleDelete: (row: Record<string, unknown>) => void;
  handleEdit: (row: Record<string, unknown>) => void;
  handleStatusChange: (row: Record<string, unknown>) => void;
  handleSelectMultiple?: (id: string) => void;
  selectedIds?: string[];
}

// Define the shape of the columns
export const PlansColumns = ({
  handleView,
  handleDelete,
  handleEdit,
  handleStatusChange,
  handleSelectMultiple = () => {},
  selectedIds = [],
}: CreateReferralProps): ColumnData[] => [
  {
    title: '#',
    render: (row) => {
      return (
        <div
          className="checkbox-wrapper"
          onClick={() => handleSelectMultiple(row._id)}
        >
          <input
            type="checkbox"
            className="checkbox-input"
            checked={selectedIds?.includes(row._id)}
          />
          <div className="checkbox-custom" />
        </div>
      );
    },
  },
  {
    title: 'ID',
    fieldName: '_id',
  },
  {
    title: 'Name',
    fieldName: PLAN_FORM_FIELDS.NAME,
    isTruncated: true,
    sortable: true,
    sortType: PLAN_FORM_FIELDS.NAME,
  },
  {
    title: 'Bids Given',
    fieldName: PLAN_FORM_FIELDS.BIDS,
    isTruncated: true,
    sortable: true,
    sortType: PLAN_FORM_FIELDS.BIDS,
  },
  {
    title: 'Deal Price',
    fieldName: PLAN_FORM_FIELDS.PRICE,
    sortable: true,
    sortType: PLAN_FORM_FIELDS.PRICE,
  },
  {
    title: 'Created At',
    fieldName: 'createdAt',
    sortable: true,
    sortType: 'createdAt',
    render: (_, createdAt) =>
      createdAt ? formatDate(createdAt as string) : '-.-',
  },
  {
    title: 'End At',
    fieldName: PLAN_FORM_FIELDS.END_DATE,
    sortable: true,
    sortType: PLAN_FORM_FIELDS.END_DATE,
    render: (_, endDate) => (endDate ? formatDate(endDate as string) : '-.-'),
  },
  {
    title: 'Hot Deal',
    fieldName: PLAN_FORM_FIELDS.HOT_DEAL,
    sortable: true,
    sortType: PLAN_FORM_FIELDS.HOT_DEAL,
    render: (_, value) =>
      (() => {
        switch (value) {
          case BID_PLAN_TYPES.HOT_DEAL:
            return 'Yes';
          case BID_PLAN_TYPES.REGULAR:
            return 'No';
          default:
            return '';
        }
      })(),
  },
  {
    title: 'Status',
    fieldName: PLAN_FORM_FIELDS.STATUS,
    render: (row, isEnabled) => (
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          checked={isEnabled as unknown as boolean}
          onChange={() => handleStatusChange(row)}
        />
      </div>
    ),
  },
  {
    title: 'Actions',
    render: (row) => (
      <div className="d-flex">
        <CustomDropDown
          toggleImage={actions}
          submenu={[
            { buttonLabel: STRINGS.VIEW, buttonAction: () => handleView(row) },
            {
              buttonLabel: STRINGS.UPDATE,
              buttonAction: () => handleEdit(row),
            },
            {
              buttonLabel: STRINGS.DELETE,
              buttonAction: () => handleDelete(row),
              className: 'text-danger',
            },
          ]}
        />
      </div>
    ),
  },
];

export const PlanDetailedViewColumns: ColumnData[] = [
  {
    title: 'T Id',
    fieldName: '_id',
  },
  {
    title: 'Username',
    fieldName: 'name',
    sortable: true,
    sortType: 'name',
    render: (row) => row?.refererUser?.name,
  },
  {
    title: 'Email',
    fieldName: 'email',
    sortable: true,
    sortType: 'email',
    render: (row) => row?.refererUser?.email,
  },
  {
    title: 'Deal Offer',
    fieldName: 'dealOffer',
    sortable: true,
    sortType: 'dealOffer',
  },
  {
    title: 'Deal Price',
    fieldName: 'dealPrice',
    sortable: true,
    sortType: 'dealPrice',
  },
  {
    title: 'Referee Email',
    fieldName: 'refereeEmail',
    sortable: true,
    sortType: 'refereeBidRequirement',
    render: (row) => row?.refereeUser?.email,
  },
  {
    title: 'Reward At',
    fieldName: 'rewardAt',
    sortable: true,
    sortType: 'refereePurchasedBids',
  },
  {
    title: 'Bids Received',
    fieldName: 'purchasedBids',
    sortable: true,
    sortType: 'purchasedBids',
  },
  {
    title: 'Status',
    fieldName: 'status',
    render: (row) =>
      (() => {
        switch (row?.status as number) {
          case REFERRAL_STATUS.COMPLETED:
            return <span className="text-success">Completed</span>;
          case REFERRAL_STATUS.PENDING:
            return <span className="text-warning">Pending</span>;
          case REFERRAL_STATUS.USER_DELETED_BEFORE_COMPLETION:
            return <span className="text-danger">Failed</span>;
          default:
            return '';
        }
      })(),
  },
  {
    title: 'Date',
    fieldName: 'createdAt',
    render: (row) => formatDate(row?.createdAt),
  },
  {
    title: 'Invoice',
    render: (row) =>
      row?.url ? (
        <div className="text-center">
          {' '}
          <img src={InvoiceIcon} alt="invoice" />{' '}
        </div>
      ) : (
        ''
      ),
  },
];
