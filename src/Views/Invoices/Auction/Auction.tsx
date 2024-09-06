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
  FilterOrder,
  PRODUCT_PURCHASE_STATUS,
  STRINGS,
  CONFIRMATION_DESCRIPTION_INVOICE,
} from '../../../Shared/constants';
import { AuctionInvoiceColumns } from '../helpers/constants';

// API
import { useGetInvoicesQuery } from '../../../Services/Api/module/invoices';

// Utilities
import { useUserProductsInvoiceGenerationMutation } from '../../../Services/Api/module/invoiceGeneration';
import { ConfirmationModal } from '../../../Shared/components';
import Filters from '../../../Shared/components/Filters';
import { FiltersState } from '../../../Shared/components/Filters/helpers/models';
import { removeEmptyValues } from '../../../Shared/utils/functions';
import { Filter, RED_WARNING } from '../../../assets';
import { Invoice, InvoiceData } from '../helpers/model';

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
const INVOICE_AUCTIONS_PAGE_LIMIT = 10;

function AuctionInvoices() {
  // State Management
  const [currentPage, setCurrentPage] = useState(0);
  const [filters, setFilters] = useState({});
  const [search, setSearch] = useState<string>('');
  const [sortKey, setSortKey] = useState<string>('');
  const [invoiceModal, setInvoiceModal] = useState<InvoiceData>({
    show: false,
    data: null,
  });
  const [sortDirection, setSortDirection] = useState<FilterOrder>(
    FilterOrder.ASCENDING
  );

  // Refs
  const onComponentMountRef = useRef(false);
  // Query Parameters
  const queryParams: QueryParams = {
    skip: currentPage * INVOICE_AUCTIONS_PAGE_LIMIT,
    limit: INVOICE_AUCTIONS_PAGE_LIMIT,
    searchString: search,
    sortKey,
    sortDirection,
    status: PRODUCT_PURCHASE_STATUS.PENDING,
    ...filters,
  };

  // API Queries
  const { data: listing, refetch } = useGetInvoicesQuery({
    params: removeEmptyValues(
      queryParams as unknown as Record<string, unknown>
    ),
  });
  const [generateInvoice] = useUserProductsInvoiceGenerationMutation();
  const handleInvoice = (row: Invoice) => {
    setInvoiceModal({ show: true, data: row });
  };
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
        refetch();
      },
    });
    handleCloseInvoice();
  };
  const columns = useMemo(() => AuctionInvoiceColumns(handleInvoice), []);
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

  const handleApplyFilters = (filter: FiltersState) => {
    setFilters({
      fromDate: filter?.startDate,
      toDate: filter?.endDate,
    });
    setCurrentPage(0);
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
        pageSize={INVOICE_AUCTIONS_PAGE_LIMIT}
        noDataFound={STRINGS.NO_RESULT}
        handleSortingClick={handleSortingClick}
        quickEditRowId={null}
        pagination
        pageCount={(listing?.count || 1) / INVOICE_AUCTIONS_PAGE_LIMIT}
        onPageChange={handlePageClick}
        currentPage={currentPage}
      />
    </div>
  );
}

export default AuctionInvoices;
