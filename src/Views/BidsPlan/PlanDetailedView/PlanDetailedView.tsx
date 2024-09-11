// Libraries
import { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

// Components
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
import { PlanDetailedViewColumns } from '../helpers/constants';

// API
import {
  useGetBidPlansQuery,
  useGetBidsTransactionsQuery,
} from '../../../Services/Api/module/plans';

// Utilities
import { useUserProductsInvoiceGenerationMutation } from '../../../Services/Api/module/invoiceGeneration';
import { ConfirmationModal, DetailsCard } from '../../../Shared/components';
import {
  convertToLocale,
  formatDate,
  removeEmptyValues,
} from '../../../Shared/utils/functions';
import { RED_WARNING } from '../../../assets';
import { Invoice, InvoiceData } from '../../Invoices/helpers/model';

// Interfaces
interface QueryParams {
  bidPlanId: string;
  skip: number;
  limit: number;
  sortKey: string;
  sortDirection: FilterOrder;
}

// Constants
const PLAN_DETAILS_PAGE_LIMIT = 10;

function PlanDetailedView() {
  const [generateInvoice] = useUserProductsInvoiceGenerationMutation();
  const [invoiceModal, setInvoiceModal] = useState<InvoiceData>({
    show: false,
    data: null,
  });
  const { id } = useParams();
  // State Management
  const [currentPage, setCurrentPage] = useState(0);

  const [sortKey, setSortKey] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<FilterOrder>(
    FilterOrder.ASCENDING
  );

  // Refs
  const onComponentMountRef = useRef(false);

  // Query Parameters
  const queryParams: QueryParams = {
    bidPlanId: id || '',
    skip: currentPage * PLAN_DETAILS_PAGE_LIMIT,
    limit: PLAN_DETAILS_PAGE_LIMIT,
    sortKey,
    sortDirection,
  };

  // API Queries
  const { data: listing, refetch } = useGetBidsTransactionsQuery(
    {
      params: removeEmptyValues(
        queryParams as unknown as Record<string, unknown>
      ),
    },
    {
      skip: !id,
    }
  );

  const { data: referralPackDetails } = useGetBidPlansQuery(
    {
      params: removeEmptyValues({ bidPlanId: id || '' } as unknown as Record<
        string,
        unknown
      >),
    },
    {
      skip: !id,
    }
  );

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

  // Effect to refetch data on dependencies change
  useEffect(() => {
    if (id) {
      if (onComponentMountRef.current) {
        refetch();
      }
      onComponentMountRef.current = true;
    }
  }, [refetch, currentPage, sortKey, sortDirection, id]);

  const renderPackDetails = useMemo(() => {
    if (referralPackDetails?.data?.[0]) {
      return (
        <DetailsCard
          details={[
            {
              label: STRINGS.PLAN_ID,
              value: referralPackDetails?.data?.[0]?.id,
            },
            {
              label: STRINGS.NAME,
              value: referralPackDetails?.data?.[0]?.title,
            },
            {
              label: STRINGS.CREATED_AT,
              value: referralPackDetails?.data?.[0]?.createdAt
                ? formatDate(referralPackDetails?.data?.[0]?.createdAt)
                : '',
            },
            {
              label: STRINGS.CLOSED_AT,
              value: referralPackDetails?.data?.[0]?.lastDisabledAt
                ? formatDate(referralPackDetails?.data?.[0]?.lastDisabledAt)
                : '',
            },
            {
              label: STRINGS.DEAL_PRICE_LABEL,
              value: `${convertToLocale(
                referralPackDetails?.data?.[0]?.price,
                true
              )}`,
            },
            {
              label: STRINGS.BIDS_GIVEN,
              value: referralPackDetails?.data?.[0]?.bids,
            },
            {
              label: STRINGS.HOT_DEAL,
              value: referralPackDetails?.data?.[0]?.hotDeal
                ? STRINGS.YES
                : STRINGS.NO,
            },
          ]}
        />
      );
    }

    return null;
  }, [referralPackDetails]);
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
  return (
    <div>
      {renderPackDetails}

      {/* Table */}
      <h5>
        {STRINGS.TRANSACTIONS} ({listing?.count || 0})
      </h5>
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
        columns={PlanDetailedViewColumns(handleInvoice) as unknown as Column[]}
        pageSize={PLAN_DETAILS_PAGE_LIMIT}
        noDataFound={STRINGS.NO_RESULT}
        handleSortingClick={handleSortingClick}
        quickEditRowId={null}
        pagination
        pageCount={(listing?.count || 1) / PLAN_DETAILS_PAGE_LIMIT}
        onPageChange={handlePageClick}
        currentPage={currentPage}
      />
    </div>
  );
}

export default PlanDetailedView;
