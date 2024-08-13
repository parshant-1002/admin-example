// Libraries
import { debounce } from 'lodash';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// Components
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import CustomTableView, {
  Column,
  Row,
} from '../../../Shared/components/CustomTableView';
import ConfirmationModal from '../../../Shared/components/ConfirmationModal';
import AddEditReferralPack from '../components/AddEditReferralPack';
import { TableFilterHeader } from '../../../Shared/components';

// Constants
import {
  BUTTON_LABELS,
  FilterOrder,
  POPUPTYPES,
  ROUTES,
  STRINGS,
} from '../../../Shared/constants';
import { CreateReferralColumns } from '../helpers/constants';

// API
import {
  useAddReferralPackMutation,
  useDeleteReferralPackMutation,
  useEditReferralPackMutation,
  useGetReferralPacksQuery,
} from '../../../Services/Api/module/referral';

// Utilities
import { formatDate, removeEmptyValues } from '../../../Shared/utils/functions';
import { ErrorResponse } from '../../../Models/Apis/Error';
import { RED_WARNING } from '../../../assets';

// Interfaces
interface QueryParams {
  skip: number;
  limit: number;
  searchString?: string;
  sortKey: string;
  sortDirection: FilterOrder;
}

interface Popup {
  show: boolean;
  data: Record<string, unknown> | null;
  type: POPUPTYPES;
}

// Constants
const PAGE_LIMIT = 5;

function CreateReferral() {
  const navigate = useNavigate();
  // State Management
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState<string>('');
  const [sortKey, setSortKey] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<FilterOrder>(
    FilterOrder.ASCENDING
  );
  const [selectedIds, setSelectedIds] = useState<string[]>();

  const [popup, setPopup] = useState<Popup>({
    show: false,
    data: null,
    type: POPUPTYPES.NONE,
  });

  // Refs
  const onComponentMountRef = useRef(false);

  // Query Parameters
  const queryParams: QueryParams = {
    skip: currentPage * PAGE_LIMIT,
    limit: PAGE_LIMIT,
    searchString: search,
    sortKey,
    sortDirection,
  };

  // API Queries
  const { data: listing, refetch } = useGetReferralPacksQuery({
    params: removeEmptyValues(
      queryParams as unknown as Record<string, unknown>
    ),
  });

  const [editReferralPack] = useEditReferralPackMutation();
  const [addReferralPack] = useAddReferralPackMutation();
  const [deleteReferralPack] = useDeleteReferralPackMutation();

  // Effect to refetch data on dependencies change
  useEffect(() => {
    if (onComponentMountRef.current) {
      refetch();
    }
    onComponentMountRef.current = true;
  }, [refetch, currentPage, search, sortKey, sortDirection]);

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

  const handleAddEditPopupSubmit = (data: Record<string, unknown>) => {
    const payload = { ...data };
    payload.startDate = formatDate(
      payload.startDate as string,
      'YYYY-MM-DD HH:mm:ss'
    );

    if (popup.type === POPUPTYPES.EDIT) {
      payload.referralPackId = popup.data?._id;
    }

    const action =
      popup.type === POPUPTYPES.EDIT ? editReferralPack : addReferralPack;

    action({
      payload,
      onSuccess: (response: { message: string }) => {
        toast.success(response.message);
        refetch();
        setPopup({ show: false, data: null, type: POPUPTYPES.NONE });
      },
      onFailure: (error: ErrorResponse) => {
        toast.error(error.data.message);
      },
    });
  };

  const handleDeleteConfirm = () => {
    deleteReferralPack({
      payload: { referralPackIds: selectedIds },
      onSuccess: (response: { message: string }) => {
        toast.success(response.message);
        refetch();
        setPopup({ show: false, data: null, type: POPUPTYPES.NONE });
      },
      onFailure: (error: ErrorResponse) => {
        toast.error(error.data.message);
      },
    });
  };

  const handleDeleteClick = (data: Record<string, unknown>) => {
    setPopup({ show: true, data, type: POPUPTYPES.DELETE });
    setSelectedIds([data?._id as string]);
  };

  const handleDeleteCancel = () => {
    setPopup({ show: false, data: null, type: POPUPTYPES.NONE });
    setSelectedIds([]);
  };

  const handleEdit = (data: Record<string, unknown>) => {
    setPopup({ show: true, data, type: POPUPTYPES.EDIT });
  };

  const handleStatusChange = useCallback(
    (data: Record<string, unknown>) => {
      const payload = {
        referralPackId: data?._id,
        isEnabled: !data?.isEnabled,
      };
      editReferralPack({
        payload,
        onSuccess: (response: { message: string }) => {
          toast.success(response.message);
          refetch();
        },
        onFailure: (error: ErrorResponse) => {
          toast.error(error.data.message);
        },
      });
    },
    [editReferralPack, refetch]
  );

  const handleView = useCallback(
    (data: Record<string, unknown>) => {
      navigate(`${ROUTES.REFERRAL_LISTING}/${data?._id}`);
    },
    [navigate]
  );

  const handleSelectMultiple = (id: string) => {
    setSelectedIds((prevSelectedIds) => {
      const foundIndex = prevSelectedIds?.findIndex((f) => f === id);
      if (foundIndex !== undefined && foundIndex > -1) {
        return prevSelectedIds?.filter((f) => f !== id);
      }
      return [...(prevSelectedIds || []), id];
    });
  };

  // Memoized columns for table
  const columns = useMemo(
    () =>
      CreateReferralColumns({
        handleView,
        handleEdit,
        handleDelete: handleDeleteClick,
        handleStatusChange,
        handleSelectMultiple,
        selectedIds,
      }),
    [handleStatusChange, handleView, selectedIds]
  );

  return (
    <div>
      {/* Filters */}
      <TableFilterHeader
        handleClearSearch={() => setSearch('')}
        search={search}
        handleSearch={debounceSearch}
        handleAddNew={() =>
          setPopup({ show: true, data: null, type: POPUPTYPES.ADD })
        }
        handleDeleteAll={() =>
          setPopup({ show: true, data: null, type: POPUPTYPES.DELETE })
        }
        handleClearAll={() => setSelectedIds([])}
        selectedIds={selectedIds}
        addButton
      />

      {/* Table */}
      <CustomTableView
        rows={(listing?.data as unknown as Row[]) || []}
        columns={columns as unknown as Column[]}
        pageSize={PAGE_LIMIT}
        noDataFound={STRINGS.NO_RESULT}
        handleSortingClick={handleSortingClick}
        quickEditRowId={null}
        pagination
        pageCount={Math.ceil((listing?.count || 0) / PAGE_LIMIT)}
        currentPage={currentPage}
        onPageChange={handlePageClick}
      />

      {/* Add Popup */}
      <AddEditReferralPack
        open={
          (popup.type === POPUPTYPES.ADD || popup.type === POPUPTYPES.EDIT) &&
          popup.show
        }
        onClose={() =>
          setPopup({ show: false, data: null, type: POPUPTYPES.NONE })
        }
        type={popup.type}
        handleSubmit={handleAddEditPopupSubmit}
        initialValues={
          popup.data
            ? {
                name: popup.data?.name,
                rewardBids: popup.data?.rewardBids,
                refereeBidRequirement: popup.data?.refereeBidRequirement,
                startDate: formatDate(
                  popup.data?.startDate as string,
                  'YYYY-MM-DD'
                ),
                isEnabled: popup.data?.isEnabled,
              }
            : {}
        }
      />

      {/* Delete Popup */}
      <ConfirmationModal
        title={BUTTON_LABELS.DELETE}
        subTitle={STRINGS.ARE_YOU_SURE_YOU_WANT_TO_DELETE}
        open={popup.type === POPUPTYPES.DELETE && popup.show}
        handleClose={handleDeleteCancel}
        showCancelButton
        submitButtonText={BUTTON_LABELS.YES}
        cancelButtonText={BUTTON_LABELS.NO}
        icon={RED_WARNING}
        handleSubmit={handleDeleteConfirm}
        showClose={false}
      />
    </div>
  );
}

export default CreateReferral;
