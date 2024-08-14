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
import { ReferralListColumns } from '../helpers/constants';

// API
import {
  useGetReferralPackHistoryQuery,
  useGetReferralPacksQuery,
} from '../../../Services/Api/module/referral';

// Utilities
import { formatDate, removeEmptyValues } from '../../../Shared/utils/functions';
import { DetailsCard } from '../../../Shared/components';

// Interfaces
interface QueryParams {
  referralPackId: string;
  skip: number;
  limit: number;
  sortKey: string;
  sortDirection: FilterOrder;
}

// Constants
const ADD_ONS_PAGE_LIMIT = 5;

function Invoices() {
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
    referralPackId: id || '',
    skip: currentPage * ADD_ONS_PAGE_LIMIT,
    limit: ADD_ONS_PAGE_LIMIT,
    sortKey,
    sortDirection,
  };

  // API Queries
  const { data: listing, refetch } = useGetReferralPackHistoryQuery(
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
    useGetReferralPacksQuery(
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
              value: referralPackDetails?.data?.[0]?._id,
            },
            {
              label: STRINGS.NAME,
              value: referralPackDetails?.data?.[0]?.name,
            },
            {
              label: STRINGS.CREATED_AT,
              value: referralPackDetails?.data?.[0]?.startDate
                ? formatDate(referralPackDetails?.data?.[0]?.startDate)
                : '',
            },
            {
              label: STRINGS.CLOSED_AT,
              value: referralPackDetails?.data?.[0]?.endDate
                ? formatDate(referralPackDetails?.data?.[0]?.endDate)
                : '',
            },
            {
              label: STRINGS.REWARDS,
              value: referralPackDetails?.data?.[0]?.rewardBids,
            },
            {
              label: STRINGS.REWARD_AT,
              value: referralPackDetails?.data?.[0]?.refereeBidRequirement,
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
        {STRINGS.REFERRALS} ({listing?.count || 0})
      </h5>
      <CustomTableView
        rows={(listing?.data as unknown as Row[]) || []}
        columns={ReferralListColumns as unknown as Column[]}
        pageSize={ADD_ONS_PAGE_LIMIT}
        noDataFound={STRINGS.NO_RESULT}
        handleSortingClick={handleSortingClick}
        quickEditRowId={null}
        pagination
        pageCount={(listing?.count || 1) / ADD_ONS_PAGE_LIMIT}
        onPageChange={handlePageClick}
        currentPage={currentPage}
      />
    </div>
  );
}

export default Invoices;
