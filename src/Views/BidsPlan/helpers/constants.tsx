import { Delete, edit, InvoiceIcon, view } from '../../../assets';
import { ColumnData } from '../../../Models/Tables';
import CustomFilterIcons from '../../../Shared/components/CustomFilterIcons';
import FileRenderer from '../../../Shared/components/form/FileUpload/FileRenderer';
import TruncateText from '../../../Shared/components/TruncateText';
import {
  BID_PLAN_TYPES,
  IMAGE_FILE_TYPES,
  INPUT_TYPES,
  REFERRAL_STATUS,
  STRINGS,
} from '../../../Shared/constants';
import FORM_VALIDATION_MESSAGES from '../../../Shared/constants/validationMessages';
import {
  convertToLocale,
  formatDate,
  renderIdWithHash,
} from '../../../Shared/utils/functions';

export const PLAN_FORM_FIELDS = {
  NAME: 'title',
  PRICE: 'price',
  BIDS: 'bids',
  HOT_DEAL: 'type',
  DISCOUNT_PERCENTAGE: 'dealOfferPercentage',
  DISCOUNT_PRICE: 'dealPrice',
  END_DATE: 'endDate',
  STATUS: 'isEnabled',
  IMAGE_URL: 'imageURL',
};

export const PLAN_SCHEMA = (showHotDealSpecificFields: boolean) => ({
  [PLAN_FORM_FIELDS.NAME]: {
    type: INPUT_TYPES.TEXT,
    label: STRINGS.PLAN_NAME,
    className: 'col-md-12',
    placeholder: STRINGS.PLAN_NAME,
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  [PLAN_FORM_FIELDS.PRICE]: {
    type: INPUT_TYPES.NUMBER,
    label: STRINGS.DEAL_PRICE,
    className: 'col-md-12',
    placeholder: STRINGS.DEAL_PRICE,
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
      min: {
        value: 0,
        message: FORM_VALIDATION_MESSAGES().NEGATIVE_VALUES_NOT_ALLOWED,
      },
    },
  },
  [PLAN_FORM_FIELDS.IMAGE_URL]: {
    type: INPUT_TYPES.FILE,
    label: 'Images',
    accept: IMAGE_FILE_TYPES,
    className: 'col-md-12',
    placeholder: 'Images',
  },
  [PLAN_FORM_FIELDS.BIDS]: {
    type: INPUT_TYPES.NUMBER,
    label: STRINGS.BIDS_CREDITED,
    className: 'col-md-12',
    placeholder: STRINGS.BIDS_CREDITED,
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
      min: {
        value: 0,
        message: FORM_VALIDATION_MESSAGES().NEGATIVE_VALUES_NOT_ALLOWED,
      },
    },
  },
  [PLAN_FORM_FIELDS.HOT_DEAL]: {
    type: INPUT_TYPES.SELECT,
    label: STRINGS.HOT_DEAL,
    className: 'col-md-12',
    placeholder: STRINGS.HOT_DEAL,
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
    options: [
      {
        label: STRINGS.YES,
        value: BID_PLAN_TYPES.HOT_DEAL,
      },
      {
        label: STRINGS.NO,
        value: BID_PLAN_TYPES.REGULAR,
      },
    ],
  },
  ...(showHotDealSpecificFields
    ? {
        [PLAN_FORM_FIELDS.DISCOUNT_PERCENTAGE]: {
          type: INPUT_TYPES.NUMBER,
          label: STRINGS.DISCOUNT_PERCENTAGE,
          className: 'col-md-12',
          placeholder: STRINGS.DISCOUNT_PERCENTAGE,
          min: 0,
          max: 100,
          schema: {
            required: FORM_VALIDATION_MESSAGES().REQUIRED,
            min: {
              value: 0,
              message: FORM_VALIDATION_MESSAGES().NEGATIVE_VALUES_NOT_ALLOWED,
            },
            max: {
              value: 100,
              message: FORM_VALIDATION_MESSAGES().MAXIMUM_100_PERCENT_ALLOWED,
            },
          },
        },
        [PLAN_FORM_FIELDS.DISCOUNT_PRICE]: {
          type: INPUT_TYPES.NUMBER,
          label: STRINGS.DISCOUNT_OFFER_PRICE,
          className: 'col-md-12',
          placeholder: STRINGS.DISCOUNT_OFFER_PRICE,
          readOnly: true,
          schema: {
            required: FORM_VALIDATION_MESSAGES().REQUIRED,
          },
        },
        [PLAN_FORM_FIELDS.END_DATE]: {
          type: INPUT_TYPES.DATE,
          label: STRINGS.END_DATE,
          className: 'col-md-12',
          placeholder: STRINGS.END_DATE,
          min: formatDate(new Date(), 'YYYY-MM-DD'),
          schema: {
            required: FORM_VALIDATION_MESSAGES().REQUIRED,
          },
        },
      }
    : {}),
  [PLAN_FORM_FIELDS.STATUS]: {
    type: INPUT_TYPES.SWITCH,
    label: STRINGS.STATUS,
    className: 'col-md-12',
    placeholder: STRINGS.STATUS,
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
          className="custom-checkbox"
          onClick={() => handleSelectMultiple(row._id)}
        >
          <input
            type="checkbox"
            className="checkbox-input"
            checked={selectedIds?.includes(row._id)}
          />
          <span className="label" />
        </div>
      );
    },
  },
  {
    title: STRINGS.ID,
    fieldName: 'id',
    render: renderIdWithHash,
  },
  {
    title: STRINGS.NAME,
    fieldName: PLAN_FORM_FIELDS.NAME,
    isTruncated: true,
  },
  {
    title: STRINGS.BIDS_GIVEN,
    fieldName: PLAN_FORM_FIELDS.BIDS,
    render: (_, val) => `${convertToLocale(val)}`,
  },
  {
    title: STRINGS.DEAL_PRICE,
    fieldName: PLAN_FORM_FIELDS.PRICE,
    render: (_, val) => `${convertToLocale(val)}`,
  },
  {
    title: STRINGS.IMAGE,
    fieldName: 'imageURL',
    sortable: false,
    render: (_, imageURL: string | number) => (
      <div className="d-inline-flex align-items-center position-relative uploaded_file">
        <figure key={String(imageURL)}>
          <FileRenderer fileURL={String(imageURL)} />
        </figure>
      </div>
    ),
  },
  {
    title: STRINGS.CREATED_AT,
    fieldName: 'createdAt',
    sortable: true,
    sortType: 'createdAt',
    render: (_, createdAt) =>
      createdAt ? formatDate(createdAt as string) : '-.-',
  },
  {
    title: STRINGS.END_AT,
    fieldName: PLAN_FORM_FIELDS.END_DATE,
    render: (_, endDate) => (endDate ? formatDate(endDate as string) : '-.-'),
  },
  {
    title: STRINGS.HOT_DEAL,
    fieldName: PLAN_FORM_FIELDS.HOT_DEAL,
    render: (_, value) =>
      (() => {
        switch (value) {
          case BID_PLAN_TYPES.HOT_DEAL:
            return STRINGS.YES;
          case BID_PLAN_TYPES.REGULAR:
            return STRINGS.NO;
          default:
            return '';
        }
      })(),
  },
  {
    title: STRINGS.STATUS,
    fieldName: PLAN_FORM_FIELDS.STATUS,
    render: (row, isEnabled) => (
      <div className="form-check form-switch d-flex d-lg-block justify-content-end">
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
      <div className="d-flex justify-content-end justify-content-lg-start">
        <CustomFilterIcons
          submenu={[
            {
              buttonLabel: 'View',
              buttonAction: () => handleView(row),
              className: 'btn44 btn btn-primary',
              icon: view,
            },
            {
              buttonLabel: STRINGS.UPDATE,
              buttonAction: () => handleEdit(row),
              icon: edit,
              className: 'btn44 btn btn-primary',
            },
            {
              buttonLabel: STRINGS.DELETE,
              buttonAction: () => handleDelete(row),
              icon: Delete,
              className: 'btn44 btn btn-danger',
            },
          ]}
        />
      </div>
    ),
  },
];

export const PlanDetailedViewColumns: ColumnData[] = [
  {
    title: STRINGS.T_ID,
    fieldName: 'id',
    render: renderIdWithHash,
  },
  {
    title: STRINGS.USERNAME,
    fieldName: 'name',
    // sortable: true,
    sortType: 'name',
    render: (row) => <TruncateText text={row?.user?.name} />,
  },
  {
    title: STRINGS.EMAIL,
    fieldName: 'email',
    // sortable: true,
    sortType: 'email',
    render: (row) => <TruncateText text={row?.user?.email} />,
  },
  {
    title: STRINGS.DEAL_OFFER,
    fieldName: 'dealOfferPercentage',
    // sortable: true,
    sortType: 'dealOfferPercentage',
    render: (_, val) => `${convertToLocale(val)} % Off`,
  },
  {
    title: STRINGS.DEAL_PRICE,
    fieldName: 'dealPrice',
    // sortable: true,
    sortType: 'dealPrice',
    render: (_, val) => `${convertToLocale(val)}`,
  },
  {
    title: STRINGS.BIDS_RECEIVED,
    fieldName: 'bids',
    // sortable: true,
    sortType: 'bids',
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
            return <span className="text-danger">{STRINGS.FAILED}</span>;
          default:
            return '';
        }
      })(),
  },
  {
    title: STRINGS.DATE,
    fieldName: 'createdAt',
    render: (row) => formatDate(row?.createdAt),
  },
  {
    title: STRINGS.INVOICE,
    render: (row) =>
      row?.invoiceURL ? (
        <div className="text-center">
          {' '}
          <img src={InvoiceIcon} alt="invoice" />{' '}
        </div>
      ) : (
        '-.-'
      ),
  },
];
