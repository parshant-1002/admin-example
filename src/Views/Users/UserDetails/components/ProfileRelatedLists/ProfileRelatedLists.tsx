/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
// Libraries
import { debounce } from 'lodash';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactPaginate from 'react-paginate';

// Components
import ConfirmationModal from '../../../../../Shared/components/ConfirmationModal';
import CustomTableView, {
  Column,
  Row,
} from '../../../../../Shared/components/CustomTableView';
import StatsFilters from '../../../../../Shared/components/Filters';
import ViewMultiTableItem from '../ViewMultiTableItem';

// Constants
import {
  BUTTON_LABELS,
  FilterOrder,
  PRICE_RANGE,
  STRINGS,
} from '../../../../../Shared/constants';
import { Filter, RED_WARNING } from '../../../../../assets';
import {
  AUCTION_HISTORY_FRONTEND_OPTIONS,
  BID_CREDIT_TYPES_OPTIONS,
  BID_STATUS_OPTIONS,
  CONFIRMATION_DESCRIPTION,
  UserDetailsTabs,
  auctionHistoryColumn,
  biddingHistoryColumn,
  bidsPurchaseHistoryColumn,
  productHistoryColumn,
  referralHistoryColumn,
} from '../../helpers/constants';

// Models
import { ViewMultiData } from '../../helpers/model';

// API

// Utilities
import {
  useGetAuctionHistoryQuery,
  useGetBidsSpentHistoryQuery,
} from '../../../../../Services/Api/module/auctions';
import { useGetReferralHistoryQuery } from '../../../../../Services/Api/module/referrals';
import {
  useGetUserBidsCreditHistoryQuery,
  useGetUserProductHistoryQuery,
} from '../../../../../Services/Api/module/users';
import { FiltersState } from '../../../../../Shared/components/Filters/helpers/models';
import { removeEmptyValues } from '../../../../../Shared/utils/functions';
import {
  transformAuctionHistoryResponse,
  transformBidderPurchaseResponse,
  transformBiddingHistoryResponse,
  transformProductHistoryResponse,
  transformReferralHistoryResponse,
} from '../../helpers/utils';
import AuctionBidsDetails from '../AuctionBidsDetails';

interface DeleteData {
  data: { id?: string; ids?: string[] } | null;
  show: boolean;
}

interface FilterPayload {
  fromDate?: string | Date;
  toDate?: string | Date;
  status?: number;
  type?: number;
}

// Constants
const PROFILE_RELATED_LIST_PAGE_LIMIT = 5;

export default function ProfileRelatedLists({
  search = '',
  setSearch = () => {},
  currentPage = 0,
  setCurrentPage = () => {},
  sortKey = '',
  sortDirection = FilterOrder.ASCENDING,
  setSortKey = () => {},
  setSortDirection = () => {},
  userId,
  currentTab,
  callBidsCreditApi,
}: {
  search: string;
  setSearch: (search: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  sortKey: string;
  sortDirection: FilterOrder;
  setSortKey: (search: string) => void;
  setSortDirection: (order: FilterOrder) => void;
  userId?: string;
  currentTab: string;
  callBidsCreditApi?: boolean;
}) {
  // State Management
  const [deleteModal, setDeleteModal] = useState<DeleteData>({
    show: false,
    data: { id: '', ids: [''] },
  });
  const [filters, setFilters] = useState({});
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [selectedAuctionId, setSelectedAuctionId] = useState<string | number>(
    ''
  );

  const [tableData, setTableData] = useState({ data: [], count: 0 });
  const [showMultiItemView, setShowMultiItemView] = useState<ViewMultiData>({
    data: { title: '' },
    show: false,
  });

  // Refs
  const onComponentMountRef = useRef(false);

  // Query Parameters
  const queryParams = {
    skip: currentPage * PROFILE_RELATED_LIST_PAGE_LIMIT,
    limit: PROFILE_RELATED_LIST_PAGE_LIMIT,
    searchString: search,
    sortKey,
    sortDirection,
    userId,
    ...filters,
  };
  // API Queries
  const {
    data: userBidsCreditHistory,
    refetch: refetchUserBidsCreditHistory,
    error: isfetchUserBidsCreditHistory,
  } = useGetUserBidsCreditHistoryQuery(
    {
      params: removeEmptyValues(
        queryParams as unknown as Record<string, unknown>
      ),
    },
    {
      skip: currentTab !== UserDetailsTabs.BIDS_PURCHASE_HISTORY,
    }
  );

  const {
    data: userBidsSpentHistory,
    refetch: refetchBidsSpentHistory,
    error: isfetchBidsSpentHitstory,
  } = useGetBidsSpentHistoryQuery(
    {
      params: removeEmptyValues(
        queryParams as unknown as Record<string, unknown>
      ),
    },
    {
      skip: currentTab !== UserDetailsTabs.BIDDING_HISTORY,
    }
  );
  console.log('🚀 ~ refetchBidsSpentHistory:', refetchBidsSpentHistory);
  const {
    data: userReferralHistory,
    refetch: refetchUserReferralHistory,
    error: isfetchUserReferralHistory,
  } = useGetReferralHistoryQuery(
    {
      params: removeEmptyValues(
        queryParams as unknown as Record<string, unknown>
      ),
    },
    {
      skip: currentTab !== UserDetailsTabs.REFERRAL_HISTORY,
    }
  );

  const {
    data: userProductHistory,
    refetch: refetchUserProductHistory,
    error: isfetchUserProductHistory,
  } = useGetUserProductHistoryQuery(
    {
      params: removeEmptyValues(
        queryParams as unknown as Record<string, unknown>
      ),
    },
    {
      skip: currentTab !== UserDetailsTabs.PRODUCT_HISTORY,
    }
  );

  const {
    data: userAuctionHistory,
    refetch: refetchUserAuctionHistory,
    error: isfetchUserAuctionHistory,
  } = useGetAuctionHistoryQuery(
    {
      params: removeEmptyValues(
        queryParams as unknown as Record<string, unknown>
      ),
    },
    {
      skip: currentTab !== UserDetailsTabs.AUCTION_HISTORY,
    }
  );

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

  const handleRowClick = (row: Row, index: number | null) => {
    if (currentTab !== UserDetailsTabs.AUCTION_HISTORY) return;
    if (selectedRow === `${index}-${row._id}`) {
      setSelectedRow('');
      return;
    }
    setSelectedRow(`${index}-${row._id}`);
    setSelectedAuctionId(row?._id);
  };
  // Function to handle search with debounce
  const debounceSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(0);
    setSearch(e.target.value);
  }, 1000);

  // Memoized columns for table
  const columnsMap = useMemo(
    () => ({
      [UserDetailsTabs.BIDS_PURCHASE_HISTORY]: bidsPurchaseHistoryColumn,
      [UserDetailsTabs.BIDDING_HISTORY]: biddingHistoryColumn,
      [UserDetailsTabs.REFERRAL_HISTORY]: referralHistoryColumn,
      [UserDetailsTabs.PRODUCT_HISTORY]: () =>
        productHistoryColumn(setShowMultiItemView),
      [UserDetailsTabs.AUCTION_HISTORY]: auctionHistoryColumn,
    }),
    []
  );

  const columns = useMemo(() => {
    const columnFn = columnsMap[currentTab];
    return typeof columnFn === 'function' ? columnFn() : columnFn;
  }, [columnsMap, currentTab]);

  const auctionBidDetails = useCallback(
    (auctionId: string | number) => (
      <AuctionBidsDetails selectedAuctionId={auctionId} />
    ),
    []
  );
  // Effect to refetch data on dependencies change
  const refetchMap = useMemo(
    () => ({
      [UserDetailsTabs.BIDS_PURCHASE_HISTORY]: {
        refetch: refetchUserBidsCreditHistory,
        isFetched: isfetchUserBidsCreditHistory,
      },
      [UserDetailsTabs.BIDDING_HISTORY]: {
        refetch: refetchBidsSpentHistory,
        isFetched: isfetchBidsSpentHitstory,
      },
      [UserDetailsTabs.PRODUCT_HISTORY]: {
        refetch: refetchUserProductHistory,
        isFetched: isfetchUserProductHistory,
      },
      [UserDetailsTabs.REFERRAL_HISTORY]: {
        refetch: refetchUserReferralHistory,
        isFetched: isfetchUserReferralHistory,
      },
      [UserDetailsTabs.AUCTION_HISTORY]: {
        refetch: refetchUserAuctionHistory,
        isFetched: isfetchUserAuctionHistory,
      },
    }),
    [
      isfetchBidsSpentHitstory,
      isfetchUserBidsCreditHistory,
      isfetchUserAuctionHistory,
      isfetchUserProductHistory,
      isfetchUserReferralHistory,
      refetchBidsSpentHistory,
      refetchUserAuctionHistory,
      refetchUserBidsCreditHistory,
      refetchUserProductHistory,
      refetchUserReferralHistory,
    ]
  );

  const transformMap = useMemo(
    () => ({
      [UserDetailsTabs.BIDS_PURCHASE_HISTORY]: transformBidderPurchaseResponse,
      [UserDetailsTabs.BIDDING_HISTORY]: transformBiddingHistoryResponse,
      [UserDetailsTabs.REFERRAL_HISTORY]: transformReferralHistoryResponse,
      [UserDetailsTabs.AUCTION_HISTORY]: transformAuctionHistoryResponse,
      [UserDetailsTabs.PRODUCT_HISTORY]: transformProductHistoryResponse,
    }),
    []
  );

  const refetchData = useCallback(() => {
    try {
      if (callBidsCreditApi) {
        refetchUserBidsCreditHistory();
        return;
      }
      const refetchFunction = refetchMap[currentTab].refetch;
      if (refetchFunction) {
        refetchFunction();
        setSelectedRow('');
      }
    } catch (err) {
      console.error('error');
    }
  }, []);

  useEffect(() => {
    if (onComponentMountRef.current) {
      refetchData();
    }
    onComponentMountRef.current = true;
  }, [
    currentTab,
    refetchBidsSpentHistory,
    search,
    sortDirection,
    sortKey,
    refetchMap,
    callBidsCreditApi,
    refetchUserBidsCreditHistory,
    filters,
    refetchData,
  ]);

  // Define the useEffect hook
  useEffect(() => {
    const transformFunction = transformMap[currentTab];

    if (transformFunction) {
      const data = transformFunction(
        {
          [UserDetailsTabs.BIDS_PURCHASE_HISTORY]: userBidsCreditHistory,
          [UserDetailsTabs.BIDDING_HISTORY]: userBidsSpentHistory,
          [UserDetailsTabs.REFERRAL_HISTORY]: userReferralHistory,
          [UserDetailsTabs.AUCTION_HISTORY]: userAuctionHistory,
          [UserDetailsTabs.PRODUCT_HISTORY]: userProductHistory,
        }[currentTab]
      );

      setTableData(data as unknown as { data: never[]; count: number });
    } else {
      setTableData({ data: [], count: 0 });
    }
  }, [
    currentTab,
    userBidsCreditHistory,
    userBidsSpentHistory,
    userReferralHistory,
    userProductHistory,
    userAuctionHistory,
    transformMap,
  ]);
  const handleApplyFilters = (filter: FiltersState) => {
    const initalFilterPayload: FilterPayload = {
      fromDate: filter?.startDate,
      toDate: filter?.endDate,
    };
    if (currentTab === UserDetailsTabs.BIDDING_HISTORY) {
      setFilters({
        ...initalFilterPayload,
        type: filter?.selectedStatus?.value,
      });
    } else {
      setFilters({
        ...initalFilterPayload,
        status: filter?.selectedStatus?.value,
      });
    }
  };

  const statusOptions = () => {
    switch (currentTab) {
      case UserDetailsTabs.BIDS_PURCHASE_HISTORY: {
        return BID_CREDIT_TYPES_OPTIONS;
      }
      case UserDetailsTabs.BIDDING_HISTORY: {
        return BID_STATUS_OPTIONS;
      }
      case UserDetailsTabs.AUCTION_HISTORY: {
        return AUCTION_HISTORY_FRONTEND_OPTIONS;
      }
      default:
        return undefined;
    }
  };
  return (
    <>
      <ViewMultiTableItem
        show={showMultiItemView}
        setShow={setShowMultiItemView}
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
        filterToggleImage={Filter}
        showHeading={false}
        showDateFilter
        statusOptions={statusOptions()}
        priceRange={
          currentTab === UserDetailsTabs.PRODUCT_HISTORY
            ? PRICE_RANGE
            : undefined
        }
        handleApply={handleApplyFilters}
      />

      <CustomTableView
        rows={(tableData?.data as unknown as Row[]) || []}
        columns={columns as unknown as Column[]}
        pageSize={PROFILE_RELATED_LIST_PAGE_LIMIT}
        noDataFound={STRINGS.NO_RESULT}
        handleRowClick={handleRowClick}
        handleSortingClick={handleSortingClick}
        quickEditRowId={null}
        selectedRow={selectedRow}
        SecondaryRowComponent={() => auctionBidDetails(selectedAuctionId)}
        renderTableFooter={() => (
          <ReactPaginate
            pageCount={
              (tableData?.count || 1) / PROFILE_RELATED_LIST_PAGE_LIMIT
            }
            onPageChange={handlePageClick}
            activeClassName={STRINGS.ACTIVE}
            nextClassName={`${STRINGS.NEXT_BTN} ${
              Math.ceil(
                (tableData?.count || 1) / PROFILE_RELATED_LIST_PAGE_LIMIT
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
    </>
  );
}
