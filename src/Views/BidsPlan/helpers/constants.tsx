import { actions, InvoiceIcon } from '../../../assets';
import { ColumnData } from '../../../Models/Tables';
import CustomDropDown from '../../../Shared/components/CustomDropDown';
import {
  INPUT_TYPES,
  REFERRAL_STATUS,
  STRINGS,
} from '../../../Shared/constants';
import FORM_VALIDATION_MESSAGES from '../../../Shared/constants/validationMessages';
import { formatDate } from '../../../Shared/utils/functions';

export const PLAN_SCHEMA = {
  title: {
    type: INPUT_TYPES.TEXT,
    label: 'Plan Name',
    className: 'col-md-12',
    placeholder: 'Plan Name',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  price: {
    type: INPUT_TYPES.NUMBER,
    label: 'Deal Price',
    className: 'col-md-12',
    placeholder: 'Deal Price',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  bids: {
    type: INPUT_TYPES.NUMBER,
    label: 'Bids Credited',
    className: 'col-md-12',
    placeholder: 'Bids Credited',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  hotDeal: {
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
        value: 'Yes',
      },
      {
        label: 'No',
        value: 'No',
      },
    ],
  },
  startDate: {
    type: INPUT_TYPES.DATE,
    label: 'Start Date',
    className: 'col-md-12',
    placeholder: 'Start Date',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  endDate: {
    type: INPUT_TYPES.DATE,
    label: 'End Date',
    className: 'col-md-12',
    placeholder: 'End Date',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  isEnabled: {
    type: INPUT_TYPES.SWITCH,
    label: 'Status',
    className: 'col-md-12',
    placeholder: 'Status',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
};

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
            // onChange={() => handleChangeCheckBox(row._id)}
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
    fieldName: 'title',
    isTruncated: true,
    sortable: true,
    sortType: 'title',
  },
  {
    title: 'Bids Given',
    fieldName: 'bids',
    isTruncated: true,
    sortable: true,
    sortType: 'bids',
  },
  {
    title: 'Deal Price',
    fieldName: 'price',
    sortable: true,
    sortType: 'price',
  },
  {
    title: 'Created At',
    fieldName: 'createdAt',
    sortable: true,
    sortType: 'createdAt',
    render: (_, createdAt) =>
      createdAt ? new Date(createdAt).toDateString() : '',
  },
  {
    title: 'End At',
    fieldName: 'endAt',
    sortable: true,
    sortType: 'endAt',
    render: (_, endAt) => (endAt ? new Date(endAt).toDateString() : ''),
  },
  {
    title: 'Hot Deal',
    fieldName: 'hotDeal',
    sortable: true,
    sortType: 'hotDeal',
    render: (_, hotDeal) => (hotDeal ? new Date(hotDeal).toDateString() : ''),
  },
  {
    title: 'Status',
    fieldName: 'isEnabled',
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
