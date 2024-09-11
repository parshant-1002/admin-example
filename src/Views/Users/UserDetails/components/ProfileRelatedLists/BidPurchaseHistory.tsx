/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
// Libraries
import { debounce } from 'lodash';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactPaginate from 'react-paginate';

// Components
import { toast } from 'react-toastify';
import ConfirmationModal from '../../../../../Shared/components/ConfirmationModal';
import CustomTableView, {
  Column,
  Row,
} from '../../../../../Shared/components/CustomTableView';
import StatsFilters from '../../../../../Shared/components/Filters';

// Constants
import {
  BUTTON_LABELS,
  CONFIRMATION_DESCRIPTION_INVOICE,
  FilterOrder,
  PRICE_RANGE,
  STRINGS,
} from '../../../../../Shared/constants';
import { Filter, RED_WARNING } from '../../../../../assets';
import {
  BID_CREDIT_TYPES_OPTIONS,
  UserDetailsTabs,
  bidsPurchaseHistoryColumn,
} from '../../helpers/constants';

// Models
import { UserBid } from '../../helpers/model';

// API

// Utilities
import { useBidsCreditInvoiceGenerationMutation } from '../../../../../Services/Api/module/invoiceGeneration';
import { useGetUserBidsCreditHistoryQuery } from '../../../../../Services/Api/module/users';
import { FiltersState } from '../../../../../Shared/components/Filters/helpers/models';
import { removeEmptyValues } from '../../../../../Shared/utils/functions';
import { transformBidderPurchaseResponse } from '../../helpers/utils';

interface FilterPayload {
  fromDate?: string | Date;
  toDate?: string | Date;
  status?: number | string;
  type?: number | string;
}
interface UserInvoice {
  data: UserBid | null;
  show: boolean;
}
// Constants
const PROFILE_RELATED_LIST_PAGE_LIMIT = 10;

export default function BidPurchaseHistory({
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

  const [filters, setFilters] = useState({});
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  const [tableData, setTableData] = useState({ data: [], count: 0 });

  const [invoiceModal, setInvoiceModal] = useState<UserInvoice>({
    show: false,
    data: null,
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
  const { data: userBidsCreditHistory, refetch: refetchUserBidsCreditHistory } =
    useGetUserBidsCreditHistoryQuery(
      {
        params: removeEmptyValues(
          queryParams as unknown as Record<string, unknown>
        ),
      }
      // {
      //   skip: currentTab !== UserDetailsTabs.BIDS_PURCHASE_HISTORY,
      // }
    );
  // Function to handle page click
  const [generateInvoice] = useBidsCreditInvoiceGenerationMutation();
  const handleInvoice = (row: UserBid) => {
    setInvoiceModal({ show: true, data: row });
  };
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

  const columns = useMemo(() => {
    return bidsPurchaseHistoryColumn(handleInvoice);
  }, [currentTab, handleInvoice]);

  const refetchData = useCallback(() => {
    try {
      if (refetchUserBidsCreditHistory) {
        refetchUserBidsCreditHistory();
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
    search,
    sortDirection,
    sortKey,
    callBidsCreditApi,
    refetchUserBidsCreditHistory,
    filters,
    refetchData,
  ]);

  // Define the useEffect hook
  useEffect(() => {
    const transformFunction = transformBidderPurchaseResponse;

    if (transformFunction) {
      const data = transformFunction(userBidsCreditHistory);

      setTableData(data as unknown as { data: never[]; count: number });
    } else {
      setTableData({ data: [], count: 0 });
    }
  }, [currentTab, userBidsCreditHistory]);

  const handleApplyFilters = (filter: FiltersState) => {
    const initalFilterPayload: FilterPayload = {
      fromDate: filter?.startDate,
      toDate: filter?.endDate,
      type: filter?.selectedStatus?.value,
    };
    setFilters(initalFilterPayload);
    setCurrentPage(0);
  };
  const handleCloseInvoice = () => {
    setInvoiceModal({ data: null, show: false });
  };
  const handleGenerateInvoice = async () => {
    await generateInvoice({
      payload: {
        bidCreditHistoryId: invoiceModal?.data?._id,
      },
      onSuccess: ({ message = '' }: { message: string }) => {
        toast.success(message);
        refetchUserBidsCreditHistory();
      },
    });
    handleCloseInvoice();
  };
  return (
    <>
      <ConfirmationModal
        title={CONFIRMATION_DESCRIPTION_INVOICE}
        open={invoiceModal?.show}
        handleClose={handleCloseInvoice}
        showCancelButton
        submitButtonText={BUTTON_LABELS.YES}
        cancelButtonText={BUTTON_LABELS.NO}
        icon={RED_WARNING}
        handleSubmit={handleGenerateInvoice}
        showClose={false}
      />

      <StatsFilters
        handleClearSearch={() => setSearch('')}
        handleSearch={debounceSearch}
        filterToggleImage={Filter}
        showHeading={false}
        showDateFilter
        statusOptions={BID_CREDIT_TYPES_OPTIONS}
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
        handleSortingClick={handleSortingClick}
        quickEditRowId={null}
        selectedRow={selectedRow}
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
