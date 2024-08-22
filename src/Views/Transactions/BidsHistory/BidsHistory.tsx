// Libraries
import { debounce } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';

// Components
import CustomTableView, {
  Column,
  Row,
} from '../../../Shared/components/CustomTableView';
import { Filters } from '../../../Shared/components';

// Constants
import {
  FilterOrder,
  STRINGS,
  TABLE_PAGE_LIMIT,
} from '../../../Shared/constants';
import { BidsHistoryColumns } from '../helpers/constants';

// API
import { useGetBidsSpentHistoryQuery } from '../../../Services/Api/module/auctionHistories';

// Utilities
import { removeEmptyValues } from '../../../Shared/utils/functions';
import { BID_STATUS_OPTIONS } from '../../Users/UserDetails/helpers/constants';
import { FiltersState } from '../../../Shared/components/Filters/helpers/models';

// Interfaces
interface QueryParams {
  skip: number;
  limit: number;
  searchString?: string;
  sortKey: string;
  sortDirection: FilterOrder;
}

function BidsHistory({ onDashBoard }: { onDashBoard?: boolean }) {
  // State Management
  const [currentPage, setCurrentPage] = useState(0);
  const [filters, setFilters] = useState({});
  const [search, setSearch] = useState<string>('');
  const [sortKey, setSortKey] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<FilterOrder>(
    FilterOrder.ASCENDING
  );

  // Refs
  const onComponentMountRef = useRef(false);

  // Query Parameters
  const queryParams: QueryParams = {
    skip: currentPage * TABLE_PAGE_LIMIT,
    limit: TABLE_PAGE_LIMIT,
    searchString: search,
    sortKey,
    sortDirection,
    ...filters,
  };

  // API Queries
  const { data: listing, refetch } = useGetBidsSpentHistoryQuery({
    params: removeEmptyValues(
      queryParams as unknown as Record<string, unknown>
    ),
  });

  // Function to handle page click
  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  // Function to handle sorting click
  const handleSortingClick = (
    selectedOrder: number = FilterOrder.DESCENDING,
    selectedSortKey: string = ''
  ) => {
    setSortKey(selectedSortKey);
    setSortDirection(selectedOrder);
  };

  // Function to handle search with debounce
  const debounceSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(0);
    setSearch(e.target.value);
  }, 1000);

  // Memoized columns for table
  const columns = useMemo(() => BidsHistoryColumns(onDashBoard), [onDashBoard]);

  // Effect to refetch data on dependencies change
  useEffect(() => {
    if (onComponentMountRef.current) {
      refetch();
    }
    onComponentMountRef.current = true;
  }, [refetch, currentPage, search, sortKey, sortDirection, filters]);

  const handleApplyFilters = (filterState: FiltersState) => {
    setFilters({
      fromDate: filterState?.startDate,
      toDate: filterState?.endDate,
      status: filterState?.selectedStatus?.value,
    });
    setCurrentPage(0);
  };
  return (
    <div>
      {!onDashBoard ? (
        <Filters
          handleClearSearch={() => setSearch('')}
          handleSearch={debounceSearch}
          showDateFilter
          handleApply={handleApplyFilters}
          statusOptions={BID_STATUS_OPTIONS}
        />
      ) : null}

      <CustomTableView
        rows={(listing?.data as unknown as Row[]) || []}
        columns={columns as unknown as Column[]}
        pageSize={TABLE_PAGE_LIMIT}
        noDataFound={STRINGS.NO_RESULT}
        handleSortingClick={handleSortingClick}
        pagination={!onDashBoard}
        pageCount={(listing?.count || 1) / TABLE_PAGE_LIMIT}
        onPageChange={handlePageClick}
        currentPage={currentPage}
      />
    </div>
  );
}

export default BidsHistory;
