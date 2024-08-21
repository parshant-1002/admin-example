/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
// libs
import { useState, Fragment, useCallback } from 'react';
import './table.scss';
import ReactPaginate from 'react-paginate';
import TruncatedText from '../TruncateText/TruncateText';
import { FilterOrder } from '../../constants';
import { convertToLocale, getValueFromPath } from '../../utils/functions';
import { downArrow, sortIcon } from '../../../assets';

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
  isServerPagination = true,
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
    // if (column.isTruncated) {
    //   return fieldValue ? <TruncatedText text={fieldValue as string} /> : '-.-';
    // }
    if (column.render) {
      return column.render(row, fieldValue);
    }
    if (typeof fieldValue === 'number') {
      return convertToLocale(fieldValue);
    }
    if (typeof fieldValue === 'string') {
      return fieldValue ? <TruncatedText text={fieldValue as string} /> : '-.-';
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

  const [activeRowId, setActiveRowId] = useState<string | number | null>(null);

  const handleToggleRow = (rowId: string | number) => {
    setActiveRowId((prevId) => (prevId === rowId ? null : rowId));
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th
                      scope="col"
                      key={column.title}
                      style={{ width: column?.width || 0 }}
                      className={column?.sortable ? 'pointer' : ''}
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
                      <div className="d-flex gap-1 align-items-center ">
                        {column.title}
                        {column?.sortable ? (
                          <figure className='mb-0'>
                            <img src={sortIcon} alt="" width={15} height={15} />
                          </figure>
                        ) : null}
                      </div>
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
                          <p className="no-media d-flex justify-content-center align-items-center py-5">
                            {noDataFound}
                          </p>
                        </td>
                      </tr>
                    )
                  : rowsToBeRendered.map((row, index) =>
                      quickEditRowId === row._id ? (
                        <td colSpan={10} key={row._id}>
                          <h1>Edit</h1>
                        </td>
                      ) : (
                        <>
                          <tr
                            key={row._id}
                            className={`tr-item afixing ${
                              activeRowId === row._id ? 'tr-active' : ''
                            }`}
                          >
                            {columns.map((column, columnIndex) => (
                              <Fragment key={`${row._id}-columns`}>
                                <td
                                  data-label={column.title}
                                  onClick={() => {
                                    handleRowClickInternal(row, column, index);
                                  }}
                                >
                                  {getColumnValue(row, column)}
                                  {columnIndex === 1 ? (
                                    <button
                                      type="button"
                                      className="btn btn38 btn-collapse"
                                      onClick={(e) => {
                                        e.stopPropagation(); // Prevent triggering row click
                                        handleToggleRow(row._id);
                                      }}
                                    >
                                      <img
                                        src={downArrow}
                                        alt="Down Arrow"
                                        width=""
                                      />
                                    </button>
                                  ) : null}
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
          </div>
        </div>
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
