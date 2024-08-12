import { actions } from '../../../assets';
import { ColumnData } from '../../../Models/Tables';
import CustomDropDown from '../../../Shared/components/CustomDropDown';
import {
  INPUT_TYPES,
  REFERRAL_STATUS,
  STRINGS,
} from '../../../Shared/constants';
import FORM_VALIDATION_MESSAGES from '../../../Shared/constants/validationMessages';

export const REFERRAL_PACK_SCHEMA = {
  name: {
    type: INPUT_TYPES.TEXT,
    label: 'Referral Pack Name',
    className: 'col-md-12',
    placeholder: 'Referral Pack Name',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  rewardBids: {
    type: INPUT_TYPES.NUMBER,
    label: 'Bids Given',
    className: 'col-md-12',
    placeholder: 'Bids Given',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  refereeBidRequirement: {
    type: INPUT_TYPES.NUMBER,
    label: 'Referee Bids Purchased',
    className: 'col-md-12',
    placeholder: 'Referee Bids Purchased',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
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
}

// Define the shape of the columns
export const CreateReferralColumns = ({
  handleView,
  handleDelete,
  handleEdit,
  handleStatusChange,
}: CreateReferralProps): ColumnData[] => [
  {
    title: 'Referral Id',
    fieldName: '_id',
  },
  {
    title: 'Name',
    fieldName: 'name',
    isTruncated: true,
    sortable: true,
    sortType: 'name',
  },
  {
    title: 'Bids Given',
    fieldName: 'rewardBids',
    isTruncated: true,
    sortable: true,
    sortType: 'rewardBids',
  },
  {
    title: 'Referee Bids Purchased',
    fieldName: 'refereeBidRequirement',
    sortable: true,
    sortType: 'refereeBidRequirement',
  },
  {
    title: 'Start Date',
    fieldName: 'startDate',
    sortable: true,
    sortType: 'startDate',
    render: (_, startDate) =>
      startDate ? new Date(startDate).toDateString() : '',
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

export const ReferralListColumns: ColumnData[] = [
  {
    title: 'Referral Id',
    fieldName: '_id',
  },
  {
    title: 'Referrer Name',
    fieldName: 'name',
    sortable: true,
    sortType: 'name',
    render: (row) => row?.refererUser?.name,
  },
  {
    title: 'Referrer Email',
    fieldName: 'email',
    sortable: true,
    sortType: 'rewardBids',
    render: (row) => row?.refererUser?.email,
  },
  {
    title: 'Rewards',
    fieldName: 'rewardBids',
    sortable: true,
    sortType: 'refereeBidRequirement',
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
    title: 'Referral Date',
    fieldName: 'createdAt',
    sortable: true,
    sortType: 'createdAt',
    render: (_, startDate) =>
      startDate ? new Date(startDate).toDateString() : '',
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
            return <span className="text-danger">User Deleted</span>;
          default:
            return '';
        }
      })(),
  },
];
