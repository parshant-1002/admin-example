// Libraries
import { debounce } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';

// Components
import CustomTableView, {
  Column,
  Row,
} from '../../../Shared/components/CustomTableView';

// Constants
import { FilterOrder, STRINGS } from '../../../Shared/constants';
import { PurchaseInvoiceColumns } from '../helpers/constants';

// API
import { useGetInvoicesQuery } from '../../../Services/Api/module/invoices';

// Utilities
import Filters from '../../../Shared/components/Filters';
import { FiltersState } from '../../../Shared/components/Filters/helpers/models';
import { removeEmptyValues } from '../../../Shared/utils/functions';
import { Filter } from '../../../assets';

// Constants
const PURCHASE_PAGE_LIMIT = 10;

function PurchaseInvoices() {
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
  const queryParams = {
    skip: currentPage * PURCHASE_PAGE_LIMIT,
    limit: PURCHASE_PAGE_LIMIT,
    searchString: search,
    sortKey,
    sortDirection,
    ...filters,
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

  // Memoized columns for table
  const columns = useMemo(() => PurchaseInvoiceColumns, []);

  // Effect to refetch data on dependencies change
  useEffect(() => {
    if (onComponentMountRef.current) {
      refetch();
    }
    onComponentMountRef.current = true;
  }, [refetch, currentPage, search, sortKey, sortDirection, filters]);
  const handleApplyFilters = (filter: FiltersState) => {
    setFilters({
      fromDate: filter?.startDate,
      toDate: filter?.endDate,
    });
  };
  return (
    <div>
      <Filters
        handleClearSearch={() => setSearch('')}
        handleSearch={debounceSearch}
        filterToggleImage={Filter}
        showDateFilter
        handleApply={handleApplyFilters}
      />

      <CustomTableView
        rows={(listing?.data as unknown as Row[]) || []}
        columns={columns as unknown as Column[]}
        pageSize={PURCHASE_PAGE_LIMIT}
        noDataFound={STRINGS.NO_RESULT}
        handleSortingClick={handleSortingClick}
        pagination
        pageCount={(listing?.count || 1) / PURCHASE_PAGE_LIMIT}
        onPageChange={handlePageClick}
        currentPage={currentPage}
      />
    </div>
  );
}

export default PurchaseInvoices;
