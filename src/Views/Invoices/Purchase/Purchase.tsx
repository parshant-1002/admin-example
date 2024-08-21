// Libraries
import { debounce } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';

// Components
import { toast } from 'react-toastify';
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
} from '../../../Shared/constants';
import { PurchaseInvoiceColumns } from '../helpers/constants';

// API

// Utilities
import { useGetBidsTransactionsQuery } from '../../../Services/Api/module/plans';
import Filters from '../../../Shared/components/Filters';
import { FiltersState } from '../../../Shared/components/Filters/helpers/models';
import { removeEmptyValues } from '../../../Shared/utils/functions';
import { Filter, RED_WARNING } from '../../../assets';
import { ConfirmationModal } from '../../../Shared/components';
import { useBidsPlanInvoiceGenerationMutation } from '../../../Services/Api/module/invoiceGeneration';
import { Invoice, InvoiceData } from '../helpers/model';

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
  const [invoiceModal, setInvoiceModal] = useState<InvoiceData>({
    show: false,
    data: null,
  });
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
  const { data: listing, refetch } = useGetBidsTransactionsQuery({
    params: removeEmptyValues(
      queryParams as unknown as Record<string, unknown>
    ),
  });
  const [generateInvoice] = useBidsPlanInvoiceGenerationMutation();
  const handleInvoice = (row: Invoice) => {
    setInvoiceModal({ show: true, data: row });
  };
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
  const columns = useMemo(() => PurchaseInvoiceColumns(handleInvoice), []);

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
    setCurrentPage(0);
  };
  const handleCloseInvoice = () => {
    setInvoiceModal({ data: null, show: false });
  };
  const handleGenerateInvoice = () => {
    generateInvoice({
      payload: {
        bidPlanTransactionId: invoiceModal?.data?._id,
      },
      onSuccess: ({ message = '' }: { message: string }) => {
        toast.success(message);
        refetch();
        handleCloseInvoice();
      },
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
