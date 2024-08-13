/* eslint-disable no-underscore-dangle */
// libs
import { useState, Fragment, useCallback } from 'react';
import './table.scss';
import ReactPaginate from 'react-paginate';
import TruncatedText from '../TruncateText/TruncateText';
import { FilterOrder } from '../../constants';
import { getValueFromPath } from '../../utils/functions';

interface CustomTableViewProps {
  columns?: Column[];
  rows?: Row[];
  currentPage?: number;
  renderTableFooter?: () => React.ReactNode;
  pageSize?: number;
  noDataFound?: string;
  quickEditRowId?: string | null;
  isServerPagination?: boolean;
  handleSortingClick?: (order?: number, sortKey?: string) => void;
  handleRowClick?: (row: Row) => void;
  isLoading?: boolean;
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
  isServerPagination = false,
  handleSortingClick = () => {},
  handleRowClick = () => {},
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

  return (
    <>
      <div className="table-responsive">
        <table className="text-white custom-table">
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
              : rowsToBeRendered.map((row) =>
                  quickEditRowId === row._id ? (
                    <tr key={row._id}>
                      <td colSpan={10}>
                        <h1>Edit</h1>
                      </td>
                    </tr>
                  ) : (
                    <tr
                      key={row._id}
                      className="tr-item"
                      onClick={() => handleRowClick(row)}
                    >
                      {columns.map((column) => (
                        <Fragment key={`${row._id}-columns-${column.title}`}>
                          <td data-label={column.title}>
                            {getColumnValue(row, column)}
                          </td>
                        </Fragment>
                      ))}
                    </tr>
                  )
                )}
          </tbody>
        </table>
      </div>
      {pagination && rows?.length ? (
        <div className="pagination-group d-flex justify-content-end align-items-center">
          <ReactPaginate
            pageCount={pageCount}
            onPageChange={onPageChange}
            activeClassName="active"
            nextClassName={`next-btn ${
              Math.ceil(pageCount) !== currentPage + 1 ? '' : 'disabled'
            }`}
            previousClassName="prev-btn"
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
