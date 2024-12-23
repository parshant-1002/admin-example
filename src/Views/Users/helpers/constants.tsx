// libs

// consts
import moment from 'moment';
import {
  FilterFieldTypes,
  FilterSchema,
} from '../../../Shared/components/Filters/helpers/models';
import { DATE_FORMATS, STRINGS } from '../../../Shared/constants/constants';
import { UsersResponsePayload } from './model';

export const USER_STATUS = [
  { value: 1, label: 'BLOCKED' },
  { value: 2, label: 'UNBLOCKED' },
];

// Define types for renderActions and column data
interface ColumnData {
  title?: string;
  fieldName?: string;
  isTruncated?: boolean;
  sortable?: boolean;
  sortType?: string;
  noClickEvent?: boolean;
  render?: (
    row: UsersResponsePayload,
    val: string | number
  ) => JSX.Element[] | string | JSX.Element | string[];
}

type RenderActions = (val: unknown, row: UsersResponsePayload) => JSX.Element;

// Define the shape of the columns
export const usersColumns = (
  renderActions: RenderActions
  // handleChangeCheckBox: (id: string) => void,
  // selectedIds: string[] | undefined
): ColumnData[] => [
  // {
  //   title: '#',
  //   noClickEvent: true,
  //   render: (row) => {
  //     return (
  //       <button
  //         type="button"
  //         className="custom-checkbox btn btn-transparent"
  //         onClick={(e) => {
  //           e.stopPropagation();
  //           handleChangeCheckBox(row._id);
  //         }}
  //       >
  //         <input
  //           type="checkbox"
  //           className="checkbox-input"
  //           checked={selectedIds?.includes(row._id)}
  //         />
  //         <span className="label" />
  //       </button>
  //     );
  //   },
  // },
  {
    title: 'First Name',
    fieldName: 'firstname',
    sortable: true,
    sortType: 'name',
  },
  {
    title: 'Last Name',
    fieldName: 'lastname',
    sortable: true,
    sortType: 'name',
  },
  {
    title: 'Email',
    fieldName: 'username',
    isTruncated: true,
    sortable: true,
    sortType: 'email',
  },
  {
    title: 'Date',
    fieldName: 'createdAt',
    sortable: true,
    sortType: 'createdAt',
    render: (_, val) =>
      val ? moment(val)?.format(DATE_FORMATS.DISPLAY_DATE_WITH_TIME) : '_',
  },
  // {
  //   title: 'Wallet Address',
  //   fieldName: 'walletAddress',
  //   isTruncated: true,
  //   sortable: true,
  //   sortType: 'walletAddress',
  // },
  // {
  //   title: 'Current Plan',
  //   fieldName: 'currentPlan',
  //   sortable: true,
  //   sortType: 'currentPlan',
  //   render: (_, val) => `${convertToLocale(val)}`,
  // },
  // {
  //   title: 'Blocked',
  //   fieldName: 'isBlocked',
  //   sortable: true,
  //   sortType: 'isBlocked',
  //   render: (_, val) => (
  //     <div className={val ? 'text-danger' : 'text-green'}>
  //       {val ? 'Yes' : 'No'}
  //     </div>
  //   ),
  // },
  {
    title: 'Actions',
    noClickEvent: true,
    render: (row, val) => renderActions(val, row),
  },
];

// Define the shape of CONFIRMATION_DESCRIPTION
export const CONFIRMATION_DESCRIPTION: Record<string, string> = {
  DELETE: 'Are you sure you want to delete',
  BLOCK: 'Are you sure you want to block',
  UNBLOCK: 'Are you sure you want to unblock',
};

export const FiltersKeys = {
  dateRange: 'dateRange',
  userStatus: 'userStatus',
};
export const filterSchema = (
  onChangeFilter: (key: string, newValue: unknown) => void
  // filtersState: FiltersStatef
): FilterSchema[] => [
  {
    type: FilterFieldTypes.dateRange,
    id: FiltersKeys.dateRange,
    onChange: (value) => onChangeFilter(FiltersKeys.dateRange, value),
    className: STRINGS.EMPTY_STRING,
  },
  // {
  //   type: FilterFieldTypes.select,
  //   id: FiltersKeys.userStatus,
  //   options: USER_STATUS as SelectOption[],
  //   onChange: (value) => onChangeFilter(FiltersKeys.userStatus, value),
  //   value: filtersState?.[FiltersKeys.userStatus] as SelectOption,
  //   className: 'col-12 col-sm-6 col-md-3 col-xxl-2',
  //   placeholder: 'Status',
  // },
];
