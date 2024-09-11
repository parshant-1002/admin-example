// Libraries
import { debounce } from 'lodash';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';

// Components
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
  STRINGS,
} from '../../../../../Shared/constants';
import { Filter, RED_WARNING } from '../../../../../assets';
import {
  CONFIRMATION_DESCRIPTION,
  INVOICE_TYPE_OPTIONS,
  userInvoicesColumn,
} from '../../helpers/constants';

// Models
import { UserBid } from '../../helpers/model';

// API

// Utilities
import { useUserProductsInvoiceGenerationMutation } from '../../../../../Services/Api/module/invoiceGeneration';
import { useGetUserInvoicesQuery } from '../../../../../Services/Api/module/users';
import { FiltersState } from '../../../../../Shared/components/Filters/helpers/models';
import { removeEmptyValues } from '../../../../../Shared/utils/functions';
import { transformInvoicesResponse } from '../../helpers/utils';

interface DeleteData {
  data: { id?: string; ids?: string[] } | null;
  show: boolean;
}

interface FilterPayload {
  fromDate?: string | Date;
  toDate?: string | Date;
  status?: number | string;
  type?: number | string;
  currentBidPriceMin?: number;
  currentBidPriceMax?: number;
}

// Constants
const PROFILE_RELATED_LIST_PAGE_LIMIT = 10;

export default function Invoices({
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
  const [generateInvoice] = useUserProductsInvoiceGenerationMutation();
  const [invoiceModal, setInvoiceModal] = useState<{
    show: boolean;
    data: UserBid | null;
  }>({
    show: false,
    data: null,
  });
  const [deleteModal, setDeleteModal] = useState<DeleteData>({
    show: false,
    data: { id: '', ids: [''] },
  });
  const [filters, setFilters] = useState({});
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  const [tableData, setTableData] = useState({ data: [], count: 0 });

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
  const { data: userInvoices, refetch: refetchInvoices } =
    useGetUserInvoicesQuery(
      {
        params: removeEmptyValues(
          queryParams as unknown as Record<string, unknown>
        ),
      }
      // {
      //   skip: currentTab !== UserDetailsTabs.BIDDING_HISTORY,
      // }
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

  // Function to handle search with debounce
  const debounceSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(0);
    setSearch(e.target.value);
  }, 1000);

  const handleInvoice = useCallback((row: UserBid) => {
    setInvoiceModal({ show: true, data: row });
  }, []);

  const handleCloseInvoice = () => {
    setInvoiceModal({ data: null, show: false });
  };

  const handleGenerateInvoice = async () => {
    await generateInvoice({
      payload: {
        userProductId: invoiceModal?.data?._id,
      },
      onSuccess: ({ message = '' }: { message: string }) => {
        toast.success(message);
        refetchInvoices();
      },
    });
    handleCloseInvoice();
  };

  const columns = useMemo(() => {
    return userInvoicesColumn(handleInvoice);
  }, [handleInvoice]);

  const refetchData = useCallback(() => {
    try {
      if (refetchInvoices) {
        refetchInvoices();
        setSelectedRow('');
      }
    } catch (err) {
      console.error('error');
    }
  }, [refetchInvoices]);

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
    refetchInvoices,
    filters,
    refetchData,
  ]);

  // Define the useEffect hook
  useEffect(() => {
    const transformFunction = transformInvoicesResponse;

    if (transformFunction) {
      const data = transformFunction(userInvoices);

      setTableData(data as unknown as { data: never[]; count: number });
    } else {
      setTableData({ data: [], count: 0 });
    }
  }, [currentTab, userInvoices]);

  const handleApplyFilters = (filter: FiltersState) => {
    const initalFilterPayload: FilterPayload = {
      fromDate: filter?.startDate,
      toDate: filter?.endDate,
      type: filter?.selectedStatus?.value,
    };
    setFilters(initalFilterPayload);
    setCurrentPage(0);
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
        handleApply={handleApplyFilters}
        statusOptions={INVOICE_TYPE_OPTIONS}
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
