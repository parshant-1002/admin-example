// Libraries
import { debounce } from 'lodash';
import { useEffect, useRef, useState } from 'react';

// Components
import CustomTableView, {
  Column,
  Row,
} from '../../../Shared/components/CustomTableView';
import { TableFilterHeader } from '../../../Shared/components';

// Constants
import {
  FilterOrder,
  PRODUCT_PURCHASE_STATUS,
  STRINGS,
} from '../../../Shared/constants';
import { AuctionInvoiceColumns } from '../helpers/constants';

// API
import { useGetInvoicesQuery } from '../../../Services/Api/module/invoices';

// Utilities
import { removeEmptyValues } from '../../../Shared/utils/functions';

// Interfaces
interface QueryParams {
  skip: number;
  limit: number;
  searchString?: string;
  sortKey: string;
  sortDirection: FilterOrder;
  status: number;
}

// Constants
const ADD_ONS_PAGE_LIMIT = 5;

function AuctionInvoices() {
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
    skip: currentPage * ADD_ONS_PAGE_LIMIT,
    limit: ADD_ONS_PAGE_LIMIT,
    searchString: search,
    sortKey,
    sortDirection,
    status: PRODUCT_PURCHASE_STATUS.PENDING,
  };

  // API Queries
  const { data: listing, refetch } = useGetInvoicesQuery({
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
      <TableFilterHeader
        handleClearSearch={() => setSearch('')}
        search={search}
        handleSearch={debounceSearch}
      />

      <CustomTableView
        rows={(listing?.data as unknown as Row[]) || []}
        columns={AuctionInvoiceColumns as unknown as Column[]}
        pageSize={ADD_ONS_PAGE_LIMIT}
        noDataFound={STRINGS.NO_RESULT}
        handleSortingClick={handleSortingClick}
        quickEditRowId={null}
        pagination
        pageCount={(listing?.count || 1) / ADD_ONS_PAGE_LIMIT}
        onPageChange={handlePageClick}
        currentPage={currentPage}
      />
    </div>
  );
}

export default AuctionInvoices;
