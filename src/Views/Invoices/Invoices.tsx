// Libraries
import { debounce } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';
import ReactPaginate from 'react-paginate';

// Components
import CustomTableView, {
  Column,
  Row,
} from '../../Shared/components/CustomTableView';
import StatsFilters from './components/Filters';

// Constants
import { FilterOrder, STRINGS } from '../../Shared/constants';
import { InvoiceColumns } from './helpers/constants';

// API
import { useGetProductsQuery } from '../../Services/Api/module/products';

// Utilities
import { removeEmptyValues } from '../../Shared/utils/functions';

// Styles
import './Invoices.scss';

// Interfaces
interface QueryParams {
  skip: number;
  limit: number;
  searchString?: string;
  sortKey: string;
  sortDirection: FilterOrder;
}

// Constants
const ADD_ONS_PAGE_LIMIT = 5;

function Invoices() {
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
  };

  // API Queries
  const { data: productListing, refetch } = useGetProductsQuery({
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
  const columns = useMemo(() => InvoiceColumns, []);

  // Effect to refetch data on dependencies change
  useEffect(() => {
    if (onComponentMountRef.current) {
      refetch();
    }
    onComponentMountRef.current = true;
  }, [refetch, currentPage, search, sortKey, sortDirection]);

  return (
    <div>
      <StatsFilters
        handleClearSearch={() => setSearch('')}
        search={search}
        handleSearch={debounceSearch}
      />

      <CustomTableView
        rows={(productListing?.data as unknown as Row[]) || []}
        columns={columns as unknown as Column[]}
        pageSize={ADD_ONS_PAGE_LIMIT}
        noDataFound={STRINGS.NO_RESULT}
        handleSortingClick={handleSortingClick}
        quickEditRowId={null}
        renderTableFooter={() => (
          <ReactPaginate
            pageCount={(productListing?.count || 1) / ADD_ONS_PAGE_LIMIT}
            onPageChange={handlePageClick}
            activeClassName={STRINGS.ACTIVE}
            nextClassName={`${STRINGS.NEXT_BTN} ${
              Math.ceil((productListing?.count || 1) / ADD_ONS_PAGE_LIMIT) !==
              currentPage + 1
                ? STRINGS.EMPTY_STRING
                : STRINGS.DISABLED
            }`}
            previousClassName={STRINGS.PREV_BTN}
            disabledClassName={STRINGS.DISABLED}
            forcePage={currentPage}
          />
        )}
      />
    </div>
  );
}

export default Invoices;
