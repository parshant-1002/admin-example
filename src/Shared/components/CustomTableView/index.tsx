/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
// libs
import { useState, Fragment, useCallback } from 'react';
import './table.scss';
import ReactPaginate from 'react-paginate';
import TruncatedText from '../TruncateText/TruncateText';
import { FilterOrder } from '../../constants';
import { getValueFromPath } from '../../utils/functions';
import { DownArrow } from '../../../assets';

interface CustomTableViewProps {
  columns?: Column[];
  rows?: Row[];
  selectedRow?: string | number | null;
  currentPage?: number;
  renderTableFooter?: () => React.ReactNode;
  pageSize?: number;
  noDataFound?: string;
  quickEditRowId?: string | null;
  isServerPagination?: boolean;
  handleSortingClick?: (order?: number, sortKey?: string) => void;
  handleRowClick?: (row: Row, index: number | null) => void;
  isLoading?: boolean;
  SecondaryRowComponent?: () => JSX.Element;
  pagination?: boolean;
  pageCount?: number;
  onPageChange?: (selectedItem: { selected: number }) => void;
}
export interface Column {
  title?: string;
  fieldName?: string;
  sortable?: boolean;
  sortType?: string;
  width?: string;
  isTruncated?: boolean;
  noClickEvent?: boolean;
  render?: (row: unknown, value: unknown) => React.ReactNode;
  path?: string[];
}

export interface Row {
  [key: string]: string | number;
}
function CustomTableView({
  columns = [],
  rows = [],
  currentPage = 0,
  renderTableFooter = () => <> </>,
  pageSize = 10,
  noDataFound = '',
  quickEditRowId = '',
  selectedRow = null,
  isServerPagination = false,
  handleSortingClick = () => {},
  handleRowClick = () => {},
  SecondaryRowComponent = () => <> </>,
  isLoading = false,
  pagination = false,
  pageCount = 0,
  onPageChange = () => {},
}: CustomTableViewProps) {
  const [selectedSortType, setSelectedSortType] = useState<FilterOrder>(
    FilterOrder.ASCENDING
  );

  const rowsToBeRendered = isServerPagination
    ? rows
    : rows.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  const getColumnValue = useCallback((row: Row, column: Column) => {
    // if (!column?.fieldName) return null;
    const fieldValue = column?.path?.length
      ? getValueFromPath(row, column?.path)
      : row[column?.fieldName || ''];
    if (column.isTruncated) {
      return fieldValue ? <TruncatedText text={fieldValue as string} /> : '-.-';
    }
    if (column.render) {
      return column.render(row, fieldValue);
    }
    if (typeof fieldValue === 'number') {
      return fieldValue;
    }
    return fieldValue || '-.-';
  }, []);

  const handleRowClickInternal = (
    row: Row,
    column: Column,
    index: number | null
  ) => {
    if (column.noClickEvent) return null;
    handleRowClick(row, index);
  };
  return (
    <>
      <table className="custom-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                scope="col"
                key={column.title}
                style={{ width: column?.width || 0 }}
                className={column?.sortable ? 'cursor-pointer' : ''}
                onClick={() => {
                  if (!column?.sortable) return;
                  const sortKey = column.sortType;
                  const sortOrder =
                    selectedSortType === FilterOrder.ASCENDING
                      ? FilterOrder.DESCENDING
                      : FilterOrder.ASCENDING;

                  handleSortingClick(sortOrder, sortKey);
                  setSelectedSortType(sortOrder);
                }}
              >
                {column.title}
                <button type="button" className="btn btn38 btn-collapse">
                  <img src={DownArrow} alt="Down Arrow" />
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={columns.length}>
                <p className="text-center">Loading...</p>
              </td>
            </tr>
          )}
          {!rows.length
            ? !isLoading && (
                <tr>
                  <td colSpan={12} className="no-data">
                    <p className="no-media d-flex justify-content-center align-items-center text-white">
                      {noDataFound}
                    </p>
                  </td>
                </tr>
              )
            : rowsToBeRendered.map((row, index) =>
                quickEditRowId === row._id ? (
                  <td colSpan={10}>
                    <h1>Edit</h1>
                  </td>
                ) : (
                  <>
                    <tr key={row._id} className="tr-item">
                      {columns.map((column) => (
                        <Fragment key={`${row._id}-columns`}>
                          <td
                            data-label={column.title}
                            onClick={() => {
                              handleRowClickInternal(row, column, index);
                            }}
                          >
                            {getColumnValue(row, column)}
                          </td>
                        </Fragment>
                      ))}
                    </tr>
                    {`${index}-${row?._id}` === selectedRow && (
                      <tr>
                        <td
                          colSpan={columns.length}
                          className="text-primary secondary_component"
                        >
                          {SecondaryRowComponent()}
                        </td>
                      </tr>
                    )}
                  </>
                )
              )}
        </tbody>
      </table>

      {pagination && rows?.length ? (
        <div className="pagination-group d-flex justify-content-end align-items-center">
          <ReactPaginate
            pageCount={pageCount}
            onPageChange={onPageChange}
            activeClassName="active"
            nextClassName={`next-btn ${
              Math.ceil(pageCount) !== currentPage + 1 ? '' : 'disabled'
            }`}
            previousClassName="pre-btn"
            disabledClassName="disabled"
            forcePage={currentPage}
          />
        </div>
      ) : null}
      {rows.length ? (
        <div className="pagination-group d-flex justify-content-end align-items-center">
          {renderTableFooter()}
        </div>
      ) : null}
    </>
  );
}

export default CustomTableView;
