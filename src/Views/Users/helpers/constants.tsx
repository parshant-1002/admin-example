// libs

// consts
import moment from 'moment';
import { DATE_FORMATS } from '../../../Shared/constants';
import { UsersResponsePayload } from './model';

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
  noClickEvent?: boolean;
  render?: (
    row: UsersResponsePayload,
    val: string | number
  ) => JSX.Element[] | string | JSX.Element | string[];
}

type RenderActions = (val: unknown, row: UsersResponsePayload) => JSX.Element;

// Define the shape of the columns
export const usersColumns = (
  renderActions: RenderActions,
  handleChangeCheckBox: (id: string) => void,
  selectedIds: string[] | undefined
): ColumnData[] => [
  {
    title: '#',
    noClickEvent: true,
    render: (row) => {
      return (
        <div
          className="custom-checkbox"
          onClick={(e) => {
            e.stopPropagation();
            handleChangeCheckBox(row._id);
          }}
        >
          <input
            type="checkbox"
            className="checkbox-input"
            checked={selectedIds?.includes(row._id)}
            // onChange={() => handleChangeCheckBox(row._id)}
          />
          <span className="label" />
        </div>
      );
    },
  },
  {
    title: 'Name',
    fieldName: 'name',
    sortable: true,
    sortType: 'name',
  },
  {
    title: 'Email',
    fieldName: 'email',
    isTruncated: true,
    sortable: true,
    sortType: 'email',
  },
  {
    title: 'Phone',
    fieldName: 'phoneNumber',
    sortable: true,
    sortType: 'phoneNumber',
  },
  {
    title: 'Address',
    fieldName: 'address',
    isTruncated: true,
    sortable: true,
    sortType: 'address',
  },
  {
    title: 'Date',
    fieldName: 'createdAt',
    sortable: true,
    sortType: 'createdAt',
    render: (_, val) =>
      val ? moment(val)?.format(DATE_FORMATS.DISPLAY_DATE_WITH_TIME) : '_',
  },
  {
    title: 'Bids Available',
    fieldName: 'bidBalance',
    sortable: true,
    sortType: 'bidBalance',
  },
  {
    title: 'Auction Joined',
    fieldName: 'ongoingAuctions',
    sortable: true,
    sortType: 'ongoingAuctions',
  },
  {
    title: 'Auction Won',
    fieldName: 'auctionsWon',
    sortable: true,
    sortType: 'auctionsWon',
  },
  {
    title: 'Blocked',
    fieldName: 'isBlocked',
    sortable: true,
    sortType: 'isBlocked',
    render: (_, val) => (
      <div className={val ? 'text-danger' : 'text-green'}>
        {val ? 'Yes' : 'No'}
      </div>
    ),
  },
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
};
