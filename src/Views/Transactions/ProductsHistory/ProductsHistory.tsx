// Libraries
import { debounce } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';

// Components
import { toast } from 'react-toastify';
import CustomTableView, {
  Column,
  Row,
} from '../../../Shared/components/CustomTableView';
import {
  ConfirmationModal,
  Filters,
  SeeAllImagesModal,
} from '../../../Shared/components';

// Constants
import {
  BUTTON_LABELS,
  CONFIRMATION_DESCRIPTION_INVOICE,
  FilterOrder,
  PRICE_RANGE,
  STRINGS,
  TABLE_PAGE_LIMIT,
} from '../../../Shared/constants';
import { ProductsHistoryColumns } from '../helpers/constants';

// API
import { useGetInvoicesQuery } from '../../../Services/Api/module/invoices';

// Utilities
import { removeEmptyValues } from '../../../Shared/utils/functions';
import { Image } from '../../../Models/common';
import { FiltersState } from '../../../Shared/components/Filters/helpers/models';
import { useUserProductsInvoiceGenerationMutation } from '../../../Services/Api/module/invoiceGeneration';
import { Invoice, InvoiceData } from '../helpers/model';
import { RED_WARNING } from '../../../assets';

// Interfaces
interface QueryParams {
  skip: number;
  limit: number;
  searchString?: string;
  sortKey: string;
  sortDirection: FilterOrder;
}

function ProductsHistory() {
  // State Management
  const [currentPage, setCurrentPage] = useState(0);
  const [filters, setFilters] = useState({});
  const [search, setSearch] = useState<string>('');
  const [sortKey, setSortKey] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<FilterOrder>(
    FilterOrder.ASCENDING
  );
  const [moreImagesPopup, setMoreImagesPopup] = useState<Image[]>();
  const [invoiceModal, setInvoiceModal] = useState<InvoiceData>({
    show: false,
    data: null,
  });
  // Refs
  const onComponentMountRef = useRef(false);

  // Query Parameters
  const queryParams: QueryParams = {
    skip: currentPage * TABLE_PAGE_LIMIT,
    limit: TABLE_PAGE_LIMIT,
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
  const [generateInvoice] = useUserProductsInvoiceGenerationMutation();
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

  const handleMoreImagesClick = (imgs: Image[]) => {
    setMoreImagesPopup(imgs);
  };

  // Memoized columns for table
  const columns = useMemo(
    () => ProductsHistoryColumns({ handleMoreImagesClick, handleInvoice }),
    []
  );

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
      purchasedPriceMin: filterState?.priceRange?.[0],
      purchasedPriceMax: filterState?.priceRange?.[1],
    });
    setCurrentPage(0);
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
  return (
    <div>
      {/* More Images Popup */}
      <SeeAllImagesModal
        show={!!moreImagesPopup?.length}
        onClose={() => setMoreImagesPopup([])}
        images={moreImagesPopup}
        title="Product Images"
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

      <Filters
        handleClearSearch={() => setSearch('')}
        handleSearch={debounceSearch}
        showDateFilter
        handleApply={handleApplyFilters}
        priceRange={PRICE_RANGE}
      />

      <CustomTableView
        rows={(listing?.data as unknown as Row[]) || []}
        columns={columns as unknown as Column[]}
        pageSize={TABLE_PAGE_LIMIT}
        noDataFound={STRINGS.NO_RESULT}
        handleSortingClick={handleSortingClick}
        pagination
        pageCount={(listing?.count || 1) / TABLE_PAGE_LIMIT}
        onPageChange={handlePageClick}
        currentPage={currentPage}
      />
    </div>
  );
}

export default ProductsHistory;
