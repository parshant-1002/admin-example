// Libraries
import { debounce } from 'lodash';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

// Components
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ConfirmationModal from '../../../Shared/components/ConfirmationModal';
import CustomTableView, {
  Column,
  Row,
} from '../../../Shared/components/CustomTableView';
import AddEditPlan from '../components/AddEditPlan';

// Constants
import {
  BID_PLAN_TYPES,
  BUTTON_LABELS,
  FilterOrder,
  POPUPTYPES,
  ROUTES,
  STRINGS,
} from '../../../Shared/constants';
import { PLAN_FORM_FIELDS, PlansColumns } from '../helpers/constants';

// API
import {
  useAddBidPlanMutation,
  useDeleteBidPlanMutation,
  useEditBidPlanMutation,
  useGetBidPlansQuery,
} from '../../../Services/Api/module/plans';

// Utilities
import { ErrorResponse } from '../../../Models/Apis/Error';
import Filters from '../../../Shared/components/Filters';
import { FiltersState } from '../../../Shared/components/Filters/helpers/models';
import { removeEmptyValues } from '../../../Shared/utils/functions';
import { Filter, RED_WARNING } from '../../../assets';
import ViewMultiTableItem from '../../Products/components/ViewMultiTableItem';
import { ViewMultiData } from '../../Products/helpers/model';

interface Popup {
  show: boolean;
  data: Record<string, unknown> | null;
  type: POPUPTYPES;
}

// Constants
const PAGE_LIMIT = 10;

function Plans() {
  const navigate = useNavigate();
  // State Management
  const [currentPage, setCurrentPage] = useState(0);
  const [filters, setFilters] = useState({});

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
  const queryParams = {
    skip: currentPage * PAGE_LIMIT,
    limit: PAGE_LIMIT,
    searchString: search,
    sortKey,
    sortDirection,
    ...filters,
  };

  // API Queries
  const { data: listing, refetch } = useGetBidPlansQuery({
    params: removeEmptyValues(
      queryParams as unknown as Record<string, unknown>
    ),
  });
  const [showMultiItemView, setShowMultiItemView] = useState<ViewMultiData>({
    data: { title: '' },
    show: false,
  });

  const [editBidPlan] = useEditBidPlanMutation();
  const [addBidPlan] = useAddBidPlanMutation();
  const [deleteBidPlan] = useDeleteBidPlanMutation();

  // Effect to refetch data on dependencies change
  useEffect(() => {
    if (onComponentMountRef.current) {
      refetch();
    }
    onComponentMountRef.current = true;
  }, [refetch, currentPage, search, sortKey, sortDirection, filters]);

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

  const handleAddEditPopupSubmit = (
    data: Record<string, unknown>,
    reset: Dispatch<SetStateAction<number>>
  ) => {
    const payload = { ...data };
    payload[PLAN_FORM_FIELDS.BID_PLAN_TYPE] =
      (payload[PLAN_FORM_FIELDS.BID_PLAN_TYPE] as { value: unknown })?.value ||
      '';
    // payload.endDate = formatDate(
    //   payload.endDate as string,
    //   'YYYY-MM-DD HH:mm:ss'
    // );
    delete payload?.[PLAN_FORM_FIELDS.DISCOUNT_PRICE];
    delete payload?.[PLAN_FORM_FIELDS.YEARLY_PRICE];

    // if (payload[PLAN_FORM_FIELDS.BID_PLAN_TYPE] === BID_PLAN_TYPES.REGULAR) {
    //   delete payload[PLAN_FORM_FIELDS.DISCOUNT_PERCENTAGE];
    //   delete payload[PLAN_FORM_FIELDS.END_DATE];
    // }

    // payload[PLAN_FORM_FIELDS.IMAGE_URL] =
    //   (data[PLAN_FORM_FIELDS.IMAGE_URL] as { fileURL: string }[])[0]?.fileURL ||
    //   '';

    if (popup.type === POPUPTYPES.EDIT) {
      payload.bidPlanId = popup.data?._id;
    }

    const action = popup.type === POPUPTYPES.EDIT ? editBidPlan : addBidPlan;

    action({
      payload: removeEmptyValues(payload),
      onSuccess: (response: { message: string }) => {
        toast.success(response.message);
        refetch();
        reset(0);
        setPopup({ show: false, data: null, type: POPUPTYPES.NONE });
      },
      // onFailure: (error: ErrorResponse) => {
      //   toast.error(error.data.message);
      // },
    });
  };

  const handleDeleteConfirm = () => {
    deleteBidPlan({
      payload: { bidPlanIds: selectedIds },
      onSuccess: (response: { message: string }) => {
        toast.success(response.message);
        refetch();
        setPopup({ show: false, data: null, type: POPUPTYPES.NONE });
        setSelectedIds([]);
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
        bidPlanId: data?._id,
        type: data?.type,
        isEnabled: !data?.isEnabled,
      };
      editBidPlan({
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
    [editBidPlan, refetch]
  );

  const handleView = useCallback(
    (data: Record<string, unknown>) => {
      navigate(`${ROUTES.BIDS_PLANS}/${data?._id}`);
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
      PlansColumns({
        handleView,
        handleEdit,
        handleDelete: handleDeleteClick,
        handleStatusChange,
        handleSelectMultiple,
        setShowMultiItemView,
        selectedIds,
      }),
    [handleStatusChange, handleView, selectedIds]
  );

  const formInitialValues = useMemo(
    () =>
      popup?.type === POPUPTYPES.EDIT && popup?.data
        ? {
            [PLAN_FORM_FIELDS.NAME]: popup.data?.[PLAN_FORM_FIELDS.NAME] || '',
            // [PLAN_FORM_FIELDS.PRICE]: popup.data?.[PLAN_FORM_FIELDS.PRICE],
            [PLAN_FORM_FIELDS.MONTHLY_PRICE]:
              popup.data?.[PLAN_FORM_FIELDS.MONTHLY_PRICE],
            [PLAN_FORM_FIELDS.YEARLY_PRICE]:
              popup.data?.[PLAN_FORM_FIELDS.YEARLY_PRICE],
            [PLAN_FORM_FIELDS.BIDS]: popup.data?.[PLAN_FORM_FIELDS.BIDS],
            [PLAN_FORM_FIELDS.BID_PLAN_TYPE]:
              popup.data?.[PLAN_FORM_FIELDS.BID_PLAN_TYPE] ===
              BID_PLAN_TYPES.CUSTOM
                ? {
                    label: STRINGS.CUSTOM,
                    value: BID_PLAN_TYPES.CUSTOM,
                  }
                : {
                    label: STRINGS.REGULAR,
                    value: BID_PLAN_TYPES.REGULAR,
                  },
            [PLAN_FORM_FIELDS.DISCOUNT_PERCENTAGE]:
              popup.data?.[PLAN_FORM_FIELDS.DISCOUNT_PERCENTAGE],
            // [PLAN_FORM_FIELDS.DISCOUNT_PRICE]: calculateDiscountedPrice(
            //   popup.data?.[PLAN_FORM_FIELDS.PRICE] as number,
            //   popup.data?.[PLAN_FORM_FIELDS.DISCOUNT_PERCENTAGE] as number
            // ),
            // ...(popup?.data?.[PLAN_FORM_FIELDS.BID_PLAN_TYPE] ===
            //   BID_PLAN_TYPES.CUSTOM
            //   ? {
            //     [PLAN_FORM_FIELDS.END_DATE]: formatDate(
            //       popup.data?.[PLAN_FORM_FIELDS.END_DATE] as string,
            //       'YYYY-MM-DD'
            //     ),
            //   }
            //   : ''),
            ...(popup?.data?.[PLAN_FORM_FIELDS.BID_PLAN_TYPE] ===
            BID_PLAN_TYPES.CUSTOM
              ? {
                  [PLAN_FORM_FIELDS.BID_COVERSION]:
                    popup.data?.[PLAN_FORM_FIELDS.BID_COVERSION],
                }
              : ''),
            [PLAN_FORM_FIELDS.STATUS]:
              popup.data?.[PLAN_FORM_FIELDS.STATUS] || false,
          }
        : {
            [PLAN_FORM_FIELDS.NAME]: '',
            [PLAN_FORM_FIELDS.PRICE]: '',
            [PLAN_FORM_FIELDS.BIDS]: '',
            [PLAN_FORM_FIELDS.BID_PLAN_TYPE]: '',
            [PLAN_FORM_FIELDS.DISCOUNT_PERCENTAGE]: '',
            [PLAN_FORM_FIELDS.DISCOUNT_PRICE]: '',
            [PLAN_FORM_FIELDS.END_DATE]: '',
            [PLAN_FORM_FIELDS.STATUS]: false,
          },
    [popup?.data, popup?.type]
  );

  const handleApplyFilters = (filter: FiltersState) => {
    setFilters({
      fromDate: filter?.startDate,
      toDate: filter?.endDate,
    });
    setCurrentPage(0);
  };
  return (
    <div>
      <ViewMultiTableItem
        show={showMultiItemView}
        setShow={setShowMultiItemView}
      />

      {/* Filters */}
      <Filters
        handleClearSearch={() => setSearch('')}
        handleSearch={debounceSearch}
        setAddData={() =>
          setPopup({ show: true, data: null, type: POPUPTYPES.ADD })
        }
        selectedIds={selectedIds}
        handleDeleteAll={() =>
          setPopup({ show: true, data: null, type: POPUPTYPES.DELETE })
        }
        handleClearAll={() => setSelectedIds([])}
        filterToggleImage={Filter}
        showDateFilter
        handleApply={handleApplyFilters}
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

      {/* Add Edit Popup */}
      <AddEditPlan
        open={
          (popup.type === POPUPTYPES.ADD || popup.type === POPUPTYPES.EDIT) &&
          popup.show
        }
        onClose={() =>
          setPopup({ show: false, data: null, type: POPUPTYPES.NONE })
        }
        type={popup.type}
        handleSubmit={handleAddEditPopupSubmit}
        initialValues={formInitialValues}
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

export default Plans;
