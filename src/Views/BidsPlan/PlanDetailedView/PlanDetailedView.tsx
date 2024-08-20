// Libraries
import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

// Components
import CustomTableView, {
  Column,
  Row,
} from '../../../Shared/components/CustomTableView';

// Constants
import { FilterOrder, STRINGS } from '../../../Shared/constants';
import { PlanDetailedViewColumns } from '../helpers/constants';

// API
import {
  useGetBidPlansQuery,
  useGetBidsTransactionsQuery,
} from '../../../Services/Api/module/plans';

// Utilities
import { DetailsCard } from '../../../Shared/components';
import {
  convertToLocale,
  formatDate,
  removeEmptyValues,
} from '../../../Shared/utils/functions';

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

  const { data: referralPackDetails, refetch: refetchReferralPack } =
    useGetBidPlansQuery(
      {
        params: removeEmptyValues(
          queryParams as unknown as Record<string, unknown>
        ),
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
        refetchReferralPack();
      }
      onComponentMountRef.current = true;
    }
  }, [refetch, currentPage, sortKey, sortDirection, id, refetchReferralPack]);

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

  return (
    <div>
      {renderPackDetails}

      {/* Table */}
      <h5>
        {STRINGS.TRANSACTIONS} ({listing?.count || 0})
      </h5>
      <CustomTableView
        rows={(listing?.data as unknown as Row[]) || []}
        columns={PlanDetailedViewColumns as unknown as Column[]}
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
