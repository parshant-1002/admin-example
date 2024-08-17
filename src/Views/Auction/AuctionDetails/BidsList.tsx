// Libraries
import { debounce } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';
import ReactPaginate from 'react-paginate';

import CustomTableView, {
  Column,
  Row,
} from '../../../Shared/components/CustomTableView';

// Constants
import {
  BUTTON_LABELS,
  FilterOrder,
  PRICE_RANGE,
  STRINGS,
} from '../../../Shared/constants';

import { CONFIRMATION_DESCRIPTION } from '../../Products/helpers/constants';

// Models
import { ViewMultiData } from '../../Products/helpers/model';

// API
import { useGetAuctionBidHistoryQuery } from '../../../Services/Api/module/auction';

import { removeEmptyValues } from '../../../Shared/utils/functions';

import ConfirmationModal from '../../../Shared/components/ConfirmationModal';
import { RED_WARNING } from '../../../assets';
import ViewMultiTableItem from '../../Products/components/ViewMultiTableItem';
import StatsFilters from '../../../Shared/components/Filters';
import { AuctionBidColumn } from './Helpers/constants';
import { FiltersState } from '../../../Shared/components/Filters/helpers/models';

interface DeleteData {
  data: { id?: string; ids?: string[] } | null;
  show: boolean;
}

interface QueryParams {
  skip: number;
  limit: number;
  searchString?: string;
  sortKey: string;
  sortDirection: FilterOrder;
  userId?: string;
  auctionId?: string | number;
}

// Constants
const AUCTION_DETAILS_PAGE_LIMIT = 10;

export default function BidsList({ auctionId }: { auctionId?: string }) {
  // State Management
  // Refs
  const onComponentMountRef = useRef(false);
  const [deleteModal, setDeleteModal] = useState<DeleteData>({
    show: false,
    data: { id: '', ids: [''] },
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [filters, setFilters] = useState({});
  const [search, setSearch] = useState<string>('');
  const [sortKey, setSortKey] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<FilterOrder>(
    FilterOrder.ASCENDING
  );
  const [showMultiItemView, setShowMultiItemView] = useState<ViewMultiData>({
    data: { title: '' },
    show: false,
  });

  // Query Parameters
  const queryParams: QueryParams = {
    skip: currentPage * AUCTION_DETAILS_PAGE_LIMIT,
    limit: AUCTION_DETAILS_PAGE_LIMIT,
    searchString: search,
    sortKey,
    sortDirection,
    auctionId,
    ...filters,
  };

  const { data: userAuctionHistory, refetch } = useGetAuctionBidHistoryQuery({
    params: removeEmptyValues(
      queryParams as unknown as Record<string, unknown>
    ),
  });
  useEffect(() => {
    if (onComponentMountRef.current) {
      refetch();
    }
    onComponentMountRef.current = true;
  }, [refetch, currentPage, search, sortKey, sortDirection, filters]);
  // Function to handle page click
  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  // Function to close delete modal
  const handleCloseDelete = () => {
    setDeleteModal({ data: null, show: false });
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

  const columns = useMemo(() => AuctionBidColumn(), []);

  const handleApplyFilters = (filterState: FiltersState) => {
    setFilters({
      fromDate: filterState?.startDate,
      toDate: filterState?.endDate,
      currentBidPriceMin: filterState?.priceRange?.[0],
      currentBidPriceMax: filterState?.priceRange?.[1],
    });
  };
  return (
    <div className="mt-5">
      <ViewMultiTableItem
        show={showMultiItemView}
        setShow={() => setShowMultiItemView}
      />

      <ConfirmationModal
        title={CONFIRMATION_DESCRIPTION.DELETE}
        open={deleteModal?.show}
        handleClose={handleCloseDelete}
        showCancelButton
        submitButtonText={BUTTON_LABELS.YES}
        cancelButtonText={BUTTON_LABELS.NO}
        icon={RED_WARNING}
        handleSubmit={() => {}}
        showClose={false}
      />

      <StatsFilters
        handleClearSearch={() => setSearch('')}
        handleSearch={debounceSearch}
        showDateFilter
        rangeSilderTitle="Item Price"
        handleApply={handleApplyFilters}
        priceRange={PRICE_RANGE}
        showHeading={false}
      />

      <CustomTableView
        rows={(userAuctionHistory?.data as unknown as Row[]) || []}
        columns={columns as unknown as Column[]}
        pageSize={AUCTION_DETAILS_PAGE_LIMIT}
        noDataFound={STRINGS.NO_RESULT}
        // handleRowClick={handleRowClick}
        handleSortingClick={handleSortingClick}
        quickEditRowId={null}
        // selectedRow={selectedRow}
        // SecondaryRowComponent={() => auctionBidDetails(selectedAuctionId)}
        renderTableFooter={() => (
          <ReactPaginate
            pageCount={
              (userAuctionHistory?.count || 1) / AUCTION_DETAILS_PAGE_LIMIT
            }
            onPageChange={handlePageClick}
            activeClassName={STRINGS.ACTIVE}
            nextClassName={`${STRINGS.NEXT_BTN} ${
              Math.ceil(
                (userAuctionHistory?.count || 1) / AUCTION_DETAILS_PAGE_LIMIT
              ) !==
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
