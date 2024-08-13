import { useEffect, useMemo, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useGetBidsSpentHistoryQuery } from '../../../../../Services/Api/module/auctions';
import CustomTableView, {
  Column,
  Row,
} from '../../../../../Shared/components/CustomTableView';
import { FilterOrder, STRINGS } from '../../../../../Shared/constants';
import { removeEmptyValues } from '../../../../../Shared/utils/functions';
import { auctionBiddingHistoryColumn } from '../../helpers/constants';
import './AuctionBidsDetails.scss';

const BIDS_SPENT_HISTORY_PAGE_SIZE = 2;
export default function AuctionBidsDetails({
  selectedAuctionId,
}: {
  selectedAuctionId: string | number;
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [sortKey, setSortKey] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<FilterOrder>(
    FilterOrder.ASCENDING
  );
  const queryParams = {
    skip: currentPage * BIDS_SPENT_HISTORY_PAGE_SIZE,
    limit: BIDS_SPENT_HISTORY_PAGE_SIZE,
    sortKey,
    sortDirection,
    auctionId: selectedAuctionId,
  };
  const { data: userBidsSpentHistory, refetch } = useGetBidsSpentHistoryQuery({
    params: removeEmptyValues(
      queryParams as unknown as Record<string, unknown>
    ),
  });
  useEffect(() => {
    if (selectedAuctionId) {
      refetch();
    }
  }, [refetch, selectedAuctionId]);
  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };
  const handleSortingClick = (
    selectedOrder: number = FilterOrder.DESCENDING,
    selectedSortKey: string = ''
  ) => {
    setSortKey(selectedSortKey);
    setSortDirection(selectedOrder);
  };
  const columns = useMemo(() => {
    return auctionBiddingHistoryColumn;
  }, []);
  return (
    <div className="auction-bid-details">
      <CustomTableView
        rows={(userBidsSpentHistory?.data as unknown as Row[]) || []}
        columns={columns as unknown as Column[]}
        pageSize={BIDS_SPENT_HISTORY_PAGE_SIZE}
        noDataFound={STRINGS.NO_RESULT}
        handleSortingClick={handleSortingClick}
        quickEditRowId={null}
        renderTableFooter={() => (
          <ReactPaginate
            pageCount={
              (userBidsSpentHistory?.count || 1) / BIDS_SPENT_HISTORY_PAGE_SIZE
            }
            onPageChange={handlePageClick}
            activeClassName={STRINGS.ACTIVE}
            nextClassName={`${STRINGS.NEXT_BTN} ${
              Math.ceil(
                (userBidsSpentHistory?.count || 1) /
                  BIDS_SPENT_HISTORY_PAGE_SIZE
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
