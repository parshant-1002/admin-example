// Libraries
import { debounce } from 'lodash';
import { useEffect, useRef, useState } from 'react';

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
import { PlansHistoryColumns } from '../helpers/constants';

// API
import { useGetUserBidsCreditHistoryQuery } from '../../../Services/Api/module/users';

// Utilities
import { removeEmptyValues } from '../../../Shared/utils/functions';

// Interfaces
interface QueryParams {
  skip: number;
  limit: number;
  searchString?: string;
  sortKey: string;
  sortDirection: FilterOrder;
}

function PlansHistory() {
  // State Management
  const [currentPage, setCurrentPage] = useState(0);
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
  };

  // API Queries
  const { data: listing, refetch } = useGetUserBidsCreditHistoryQuery({
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

  // Effect to refetch data on dependencies change
  useEffect(() => {
    if (onComponentMountRef.current) {
      refetch();
    }
    onComponentMountRef.current = true;
  }, [refetch, currentPage, search, sortKey, sortDirection]);

  return (
    <div>
      <Filters
        handleClearSearch={() => setSearch('')}
        search={search}
        handleSearch={debounceSearch}
      />

      <CustomTableView
        rows={(listing?.data as unknown as Row[]) || []}
        columns={PlansHistoryColumns as unknown as Column[]}
        pageSize={TABLE_PAGE_LIMIT}
        noDataFound={STRINGS.NO_RESULT}
        handleSortingClick={handleSortingClick}
        quickEditRowId={null}
        pagination
        pageCount={(listing?.count || 1) / TABLE_PAGE_LIMIT}
        onPageChange={handlePageClick}
        currentPage={currentPage}
      />
    </div>
  );
}

export default PlansHistory;
