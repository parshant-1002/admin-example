/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Dispatch, SetStateAction } from 'react';
import { ColumnData } from '../../../Models/Tables';
import CustomFilterIcons from '../../../Shared/components/CustomFilterIcons';
import TruncateText from '../../../Shared/components/TruncateText';
import {
  BID_PLAN_TYPES,
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
import { Delete, InvoiceIcon, edit, view } from '../../../assets';
import { ViewMultiData } from '../../Products/helpers/model';

export const PLAN_FORM_FIELDS = {
  NAME: 'title',
  DESCRIPTION: 'description',
  PRICE: 'price',
  YEARLY_PRICE: 'priceAnnual',
  BIDS: 'bids',
  BID_PLAN_TYPE: 'type',
  DISCOUNT_PERCENTAGE: 'dealOfferPercentage',
  BID_COVERSION: 'bidConversion',
  MIN_BIDS: 'bidMin',
  MAX_BIDS: 'bidMax',
  DISCOUNT_PRICE: 'dealPrice',
  MONTHLY_PRICE: 'priceMonthly',
  END_DATE: 'endDate',
  STATUS: 'isEnabled',
  IMAGE_URL: 'imageURL',
};

export const PLAN_SCHEMA = (showHotDealSpecificFields: number) => ({
  [PLAN_FORM_FIELDS.NAME]: {
    type: INPUT_TYPES.TEXT,
    label: STRINGS.PLAN_NAME,
    className: 'col-md-12',
    placeholder: STRINGS.PLAN_NAME,
    schema: {
      required: FORM_VALIDATION_MESSAGES(STRINGS.PLAN_NAME).REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
      maxLength: {
        value: 25,
        message: FORM_VALIDATION_MESSAGES(25).MAX_LENGTH,
      },
    },
  },
  [PLAN_FORM_FIELDS.DESCRIPTION]: {
    type: INPUT_TYPES.TEXT_AREA,
    label: STRINGS.PLAN_DESCRIPTION,
    className: 'col-md-12',
    placeholder: STRINGS.PLAN_DESCRIPTION,
    schema: {
      required: FORM_VALIDATION_MESSAGES(STRINGS.PLAN_DESCRIPTION).REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
      maxLength: {
        value: 100,
        message: FORM_VALIDATION_MESSAGES(100).MAX_LENGTH,
      },
    },
  },
  [PLAN_FORM_FIELDS.BID_PLAN_TYPE]: {
    type: INPUT_TYPES.SELECT,
    label: STRINGS.BID_PLAN_TYPE,
    className: 'col-md-12',
    placeholder: STRINGS.BID_PLAN_TYPE,
    schema: {
      required: FORM_VALIDATION_MESSAGES(STRINGS.BID_PLAN_TYPE).REQUIRED,
    },
    options: [
      {
        label: STRINGS.CUSTOM,
        value: BID_PLAN_TYPES.CUSTOM,
      },
      {
        label: STRINGS.REGULAR,
        value: BID_PLAN_TYPES.REGULAR,
      },
    ],
  },
  ...(showHotDealSpecificFields === BID_PLAN_TYPES.CUSTOM
    ? {
        [PLAN_FORM_FIELDS.BID_COVERSION]: {
          type: INPUT_TYPES.NUMBER,
          label: STRINGS.BIDS_CONVERSION,
          className: 'col-md-12',
          placeholder: STRINGS.BIDS_CONVERSION,
          min: 0,
          schema: {
            required: FORM_VALIDATION_MESSAGES(STRINGS.BIDS_CONVERSION)
              .REQUIRED,
            min: {
              value: 0,
              message: FORM_VALIDATION_MESSAGES(0).MIN_LENGTH,
            },
          },
        },
        [PLAN_FORM_FIELDS.MIN_BIDS]: {
          type: INPUT_TYPES.NUMBER,
          label: STRINGS.MIN_BIDS,
          className: 'col-md-6',
          placeholder: STRINGS.MIN_BIDS,
          min: 0,
          schema: {
            required: FORM_VALIDATION_MESSAGES(STRINGS.MIN_BIDS).REQUIRED,
            min: {
              value: 0,
              message: FORM_VALIDATION_MESSAGES(0).MIN_LENGTH,
            },
          },
        },
        [PLAN_FORM_FIELDS.MAX_BIDS]: {
          type: INPUT_TYPES.NUMBER,
          label: STRINGS.MAX_BIDS,
          className: 'col-md-6',
          placeholder: STRINGS.MAX_BIDS,
          min: 0,
          schema: {
            required: FORM_VALIDATION_MESSAGES(STRINGS.MAX_BIDS).REQUIRED,
            min: {
              value: 0,
              message: FORM_VALIDATION_MESSAGES(0).MIN_LENGTH,
            },
          },
        },
      }
    : {}),
  ...(showHotDealSpecificFields === BID_PLAN_TYPES.REGULAR
    ? {
        [PLAN_FORM_FIELDS.MONTHLY_PRICE]: {
          type: INPUT_TYPES.NUMBER,
          label: STRINGS.MONTHLY_PRICE,
          className: 'col-md-12',
          placeholder: STRINGS.MONTHLY_PRICE,
          schema: {
            required: FORM_VALIDATION_MESSAGES(STRINGS.MONTHLY_PRICE).REQUIRED,
            min: {
              value: 1,
              message: FORM_VALIDATION_MESSAGES(1).MIN_LENGTH,
            },
          },
        },
        [PLAN_FORM_FIELDS.DISCOUNT_PERCENTAGE]: {
          type: INPUT_TYPES.NUMBER,
          label: STRINGS.DISCOUNT_PERCENTAGE,
          className: 'col-md-12',
          placeholder: STRINGS.DISCOUNT_PERCENTAGE,
          min: 0,
          max: 100,
          schema: {
            required: FORM_VALIDATION_MESSAGES(STRINGS.DISCOUNT_PERCENTAGE)
              .REQUIRED,
            min: {
              value: 0,
              message: FORM_VALIDATION_MESSAGES(0).MIN_LENGTH,
            },
            max: {
              value: 100,
              message: FORM_VALIDATION_MESSAGES().MAXIMUM_100_PERCENT_ALLOWED,
            },
          },
        },
        [PLAN_FORM_FIELDS.YEARLY_PRICE]: {
          type: INPUT_TYPES.NUMBER,
          label: STRINGS.YEARLY_PRICE,
          className: 'col-md-12',
          placeholder: STRINGS.YEARLY_PRICE,
          readOnly: true,
          schema: {
            min: {
              value: 1,
              message: FORM_VALIDATION_MESSAGES(1).MIN_LENGTH,
            },
          },
        },
        [PLAN_FORM_FIELDS.BIDS]: {
          type: INPUT_TYPES.NUMBER,
          label: STRINGS.BIDS_CREDITED,
          className: 'col-md-12',
          placeholder: STRINGS.BIDS_CREDITED,
          schema: {
            required: FORM_VALIDATION_MESSAGES(STRINGS.BIDS_CREDITED).REQUIRED,
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
      }
    : {}),
  [PLAN_FORM_FIELDS.STATUS]: {
    type: INPUT_TYPES.SWITCH,
    label: STRINGS.STATUS,
    className: 'col-md-12',
    placeholder: STRINGS.STATUS,
    schema: {
      required: FORM_VALIDATION_MESSAGES(STRINGS.STATUS).REQUIRED,
    },
  },
});

interface CreateReferralProps {
  handleView: (row: Record<string, unknown>) => void;
  handleDelete: (row: Record<string, unknown>) => void;
  handleEdit: (row: Record<string, unknown>) => void;
  handleStatusChange: (row: Record<string, unknown>) => void;
  handleSelectMultiple?: (id: string) => void;
  setShowMultiItemView?: Dispatch<SetStateAction<ViewMultiData>>;
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
    title: STRINGS.PLAN_DESCRIPTION,
    fieldName: PLAN_FORM_FIELDS.DESCRIPTION,
    isTruncated: true,
  },
  {
    title: STRINGS.BIDS_GIVEN,
    fieldName: PLAN_FORM_FIELDS.BIDS,
    render: (_, val) => `${convertToLocale(val)}`,
  },
  {
    title: STRINGS.BIDS_CONVERSION,
    fieldName: PLAN_FORM_FIELDS.BID_COVERSION,
    render: (_, val) => `${convertToLocale(val)}`,
  },
  {
    title: STRINGS.MONTHLY_PRICE,
    fieldName: PLAN_FORM_FIELDS.MONTHLY_PRICE,
    render: (_, val) => `${convertToLocale(val)}`,
  },
  {
    title: STRINGS.YEARLY_PRICE,
    fieldName: PLAN_FORM_FIELDS.YEARLY_PRICE,
    render: (_, val) => `${convertToLocale(val)}`,
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
    title: STRINGS.BID_PLAN_TYPE,
    fieldName: PLAN_FORM_FIELDS.BID_PLAN_TYPE,
    render: (_, value) =>
      (() => {
        switch (value) {
          case BID_PLAN_TYPES.CUSTOM:
            return STRINGS.CUSTOM;
          case BID_PLAN_TYPES.REGULAR:
            return STRINGS.REGULAR;
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
    sortable: true,
    sortType: 'id',
    render: renderIdWithHash,
  },
  {
    title: STRINGS.USERNAME,
    fieldName: 'name',
    sortable: true,
    sortType: 'userName',
    render: (row) => <TruncateText text={row?.user?.name} />,
  },
  {
    title: STRINGS.EMAIL,
    fieldName: 'email',
    sortable: true,
    sortType: 'userEmail',
    render: (row) => <TruncateText text={row?.user?.email} />,
  },
  {
    title: STRINGS.DEAL_OFFER,
    fieldName: 'dealOfferPercentage',
    sortable: true,
    sortType: 'dealOfferPercentage',
    render: (_, val) => `${convertToLocale(val)} % Off`,
  },
  {
    title: STRINGS.DEAL_PRICE,
    fieldName: 'dealPrice',
    sortable: true,
    sortType: 'dealPrice',
    render: (_, val) => `${convertToLocale(val)}`,
  },
  {
    title: STRINGS.BIDS_RECEIVED,
    fieldName: 'bids',
    sortable: true,
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
    sortable: true,
    sortType: 'createdAt',
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
