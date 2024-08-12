// Libraries
import { useEffect, useRef, useState } from 'react';
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
import { useGetReferralPackHistoryQuery } from '../../../Services/Api/module/referral';

// Utilities
import { removeEmptyValues } from '../../../Shared/utils/functions';

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

  return (
    <div>
      <div className="card mb-3">
        <div className="card-body row">
          {[
            {
              label: 'Plan Id',
              value: id,
            },
            {
              label: 'Name',
              value: 'Audi',
            },
            {
              label: 'Created At',
              value: '26-07-2024',
            },
            {
              label: 'Closed At',
              value: '26-07-2024',
            },
            {
              label: 'Reward',
              value: '50 Bids',
            },
            {
              label: 'Reward At',
              value: '500 SEK Spent',
            },
          ].map(({ label, value }) => (
            <div className="col-lg-2 col-md-3 col-sm-4" key={label}>
              <h6>{label}</h6>
              <p>{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <h5>Referrals ({listing?.count || 0})</h5>
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
