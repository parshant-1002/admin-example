import { actions } from '../../../assets';
import { ColumnData } from '../../../Models/Tables';
import CustomDropDown from '../../../Shared/components/CustomDropDown';
import {
  INPUT_TYPES,
  REFERRAL_STATUS,
  STRINGS,
} from '../../../Shared/constants';
import FORM_VALIDATION_MESSAGES from '../../../Shared/constants/validationMessages';
import { formatDate, renderIdWithHash } from '../../../Shared/utils/functions';

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
    min: formatDate(new Date(), 'YYYY-MM-DD'),
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
export const CreateReferralColumns = ({
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
    title: STRINGS.REFERRAL_ID,
    fieldName: '_id',
    render: renderIdWithHash,
  },
  {
    title: STRINGS.NAME,
    fieldName: 'name',
    isTruncated: true,
    sortable: true,
    sortType: 'name',
  },
  {
    title: STRINGS.BIDS_GIVEN,
    fieldName: 'rewardBids',
    isTruncated: true,
    sortable: true,
    sortType: 'rewardBids',
  },
  {
    title: STRINGS.REFEREE_BIDS_PURCHASED,
    fieldName: 'refereeBidRequirement',
    sortable: true,
    sortType: 'refereeBidRequirement',
  },
  {
    title: STRINGS.START_DATE,
    fieldName: 'startDate',
    sortable: true,
    sortType: 'startDate',
    render: (_, startDate) =>
      startDate ? new Date(startDate).toDateString() : '',
  },
  {
    title: STRINGS.STATUS,
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
    title: STRINGS.ACTIONS,
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
    title: STRINGS.REFERRAL_ID,
    fieldName: '_id',
    render: renderIdWithHash,
  },
  {
    title: STRINGS.REFERRER_NAME,
    render: (row) => row?.refererUser?.name,
  },
  {
    title: STRINGS.REFERRER_EMAIL,
    render: (row) => row?.refererUser?.email,
  },
  {
    title: STRINGS.REWARDS,
    fieldName: 'rewardBids',
    sortable: true,
    sortType: 'rewardBids',
  },
  {
    title: STRINGS.REFEREE_EMAIL,
    render: (row) => row?.refereeUser?.email,
  },
  {
    title: STRINGS.REWARD_AT,
    fieldName: 'rewardAt',
    sortable: true,
    sortType: 'rewardAt',
  },
  {
    title: STRINGS.REFERRAL_DATE,
    fieldName: 'createdAt',
    sortable: true,
    sortType: 'createdAt',
    render: (_, startDate) =>
      startDate ? new Date(startDate).toDateString() : '',
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
