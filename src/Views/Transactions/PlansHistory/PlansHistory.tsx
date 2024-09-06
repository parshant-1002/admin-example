// Libraries
import { debounce } from 'lodash';
import { useEffect, useRef, useState } from 'react';

// Components
import { toast } from 'react-toastify';
import { ConfirmationModal, Filters } from '../../../Shared/components';
import CustomTableView, {
  Column,
  Row,
} from '../../../Shared/components/CustomTableView';

// Constants
import {
  BUTTON_LABELS,
  CONFIRMATION_DESCRIPTION_INVOICE,
  FilterOrder,
  STRINGS,
  TABLE_PAGE_LIMIT,
} from '../../../Shared/constants';
import { PlansHistoryColumns } from '../helpers/constants';

// API
import { useGetUserBidsCreditHistoryQuery } from '../../../Services/Api/module/users';

// Utilities
import { useBidsCreditInvoiceGenerationMutation } from '../../../Services/Api/module/invoiceGeneration';
import { FiltersState } from '../../../Shared/components/Filters/helpers/models';
import { removeEmptyValues } from '../../../Shared/utils/functions';
import { RED_WARNING } from '../../../assets';
import { BID_CREDIT_TYPES_OPTIONS } from '../../Users/UserDetails/helpers/constants';
import { Invoice, InvoiceData } from '../helpers/model';

function PlansHistory() {
  // State Management
  const [currentPage, setCurrentPage] = useState(0);
  const [filters, setFilters] = useState({});
  const [search, setSearch] = useState<string>('');
  const [sortKey, setSortKey] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<FilterOrder>(
    FilterOrder.ASCENDING
  );
  const [invoiceModal, setInvoiceModal] = useState<InvoiceData>({
    show: false,
    data: null,
  });
  // Refs
  const onComponentMountRef = useRef(false);

  // Query Parameters
  const queryParams = {
    skip: currentPage * TABLE_PAGE_LIMIT,
    limit: TABLE_PAGE_LIMIT,
    searchString: search,
    sortKey,
    sortDirection,
    ...filters,
  };

  // API Queries
  const { data: listing, refetch } = useGetUserBidsCreditHistoryQuery({
    params: removeEmptyValues(
      queryParams as unknown as Record<string, unknown>
    ),
  });
  const [generateInvoice] = useBidsCreditInvoiceGenerationMutation();
  const handleInvoice = (row: Invoice) => {
    setInvoiceModal({ show: true, data: row });
  };

  const columns = PlansHistoryColumns(handleInvoice);
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
  }, [refetch, currentPage, search, sortKey, sortDirection, filters]);

  const handleApplyFilters = (filterState: FiltersState) => {
    setFilters({
      fromDate: filterState?.startDate,
      toDate: filterState?.endDate,
      type: filterState?.selectedStatus?.value,
    });
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
        refetch();
      },
    });
    handleCloseInvoice();
  };
  return (
    <div>
      <Filters
        handleClearSearch={() => setSearch('')}
        handleSearch={debounceSearch}
        showDateFilter
        handleApply={handleApplyFilters}
        statusOptions={BID_CREDIT_TYPES_OPTIONS}
      />
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

      <CustomTableView
        rows={(listing?.data as unknown as Row[]) || []}
        columns={columns as unknown as Column[]}
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
