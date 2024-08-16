// Libraries
import { debounce } from 'lodash';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';

// Components
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../Shared/components/ConfirmationModal/ConfirmationModal';
import CustomTableView, {
  Column,
  Row,
} from '../../Shared/components/CustomTableView';
import StatsFilters from '../../Shared/components/Filters';
import ActionsDropDown from './components/ActionsDropDown';

// Constants
import {
  BUTTON_LABELS,
  FilterOrder,
  ROUTES,
  STRINGS,
} from '../../Shared/constants';
import { Filter, RED_WARNING } from '../../assets';
import {
  CONFIRMATION_DESCRIPTION,
  USER_STATUS,
  usersColumns,
} from './helpers/constants';

// Models
import { UsersResponsePayload } from './helpers/model';

// Utilities
import {
  useDeleteUsersMutation,
  useEditUsersMutation,
  useGetUsersQuery,
} from '../../Services/Api/module/users';
import ERROR_MESSAGES from '../../Shared/constants/messages';
import { removeEmptyValues } from '../../Shared/utils/functions';
import { FiltersState } from '../../Shared/components/Filters/helpers/models';

interface DeleteData {
  data: { id?: string; ids?: string[] } | null;
  show: boolean;
}
interface BlockData {
  data: { id?: string; isBlocked?: boolean } | null;
  show: boolean;
}
interface QueryParams {
  skip: number;
  limit: number;
  searchString?: string;
  sortKey: string;
  sortDirection: FilterOrder;
}

// Constants
const USERS_PAGE_LIMIT = 5;

export default function UsersList() {
  // State Management
  const [deleteModal, setDeleteModal] = useState<DeleteData>({
    show: false,
    data: { id: '', ids: [''] },
  });
  const [blockModal, setBlockModal] = useState<BlockData>({
    show: false,
    data: { id: '' },
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [filters, setFilters] = useState({});
  const [selectedIds, setSelectedIds] = useState<string[]>();
  const [search, setSearch] = useState<string>('');
  const [sortKey, setSortKey] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<FilterOrder>(
    FilterOrder.ASCENDING
  );

  // Refs
  const onComponentMountRef = useRef(false);

  // navigate
  const navigate = useNavigate();

  // Query Parameters
  const queryParams: QueryParams = {
    skip: currentPage * USERS_PAGE_LIMIT,
    limit: USERS_PAGE_LIMIT,
    searchString: search,
    sortKey,
    sortDirection,
    ...filters,
  };

  // API Queries
  const { data: usersListing, refetch } = useGetUsersQuery({
    params: removeEmptyValues(
      queryParams as unknown as Record<string, unknown>
    ),
  });
  const [deleteUser] = useDeleteUsersMutation();
  const [editUser] = useEditUsersMutation();

  // Function to handle page click
  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  // Function to handle delete action
  const handleDelete = (row: UsersResponsePayload) => {
    setDeleteModal({ show: true, data: { id: row?._id } });
  };

  const handleView = useCallback(
    (row: UsersResponsePayload) => {
      navigate(`${ROUTES.USERS}/${row?.name}`, { state: row?._id });
    },
    [navigate]
  );

  const handleBlock = (row: UsersResponsePayload) => {
    setBlockModal({
      show: true,
      data: { id: row?._id, isBlocked: row?.isBlocked },
    });
  };
  // Function to close delete modal
  const handleCloseDelete = () => {
    setDeleteModal({ data: null, show: false });
  };
  const handleCloseBlock = () => {
    setBlockModal({ data: null, show: false });
  };

  // Function to handle delete confirmation
  // eslint-disable-next-line consistent-return
  const handleDeleteClick = async () => {
    try {
      let deletePayload;
      if (!deleteModal?.data?.id && !deleteModal?.data?.ids) return null;
      if (deleteModal?.data?.id) {
        deletePayload = {
          userIds: [deleteModal?.data?.id],
        };
      }
      if (deleteModal?.data?.ids) {
        deletePayload = {
          userIds: deleteModal?.data?.ids,
        };
      }
      await deleteUser({
        payload: deletePayload,
        onSuccess: (data: { message: string }) => {
          toast.success(data?.message);
          handleCloseDelete();
          setSelectedIds([]);
          refetch();
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(ERROR_MESSAGES().SOMETHING_WENT_WRONG);
      }
    }
  };
  const handleBlockClick = async () => {
    try {
      let blockPayload;
      if (blockModal?.data?.id) {
        blockPayload = {
          userId: blockModal?.data?.id,
          isBlocked: !blockModal?.data?.isBlocked,
        };
      }
      await editUser({
        payload: blockPayload,
        onSuccess: (data: { message: string }) => {
          toast.success(data?.message);
          handleCloseBlock();
          setSelectedIds([]);
          refetch();
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(ERROR_MESSAGES().SOMETHING_WENT_WRONG);
      }
    }
  };

  // Render actions column
  const renderActions = useCallback(
    (_: unknown, row: UsersResponsePayload) => (
      <ActionsDropDown
        row={row}
        handleView={handleView}
        handleDelete={handleDelete}
        handleBlock={handleBlock}
      />
    ),
    [handleView]
  );

  // Function to handle sorting click
  const handleSortingClick = (
    selectedOrder: number = FilterOrder.DESCENDING,
    selectedSortKey: string = ''
  ) => {
    setSortKey(selectedSortKey);
    setSortDirection(selectedOrder);
  };

  const handleDeleteAll = () => {
    setDeleteModal({ show: true, data: { ids: selectedIds } });
  };

  const handleRowClick = (row: Row) => {
    navigate(`${ROUTES.USERS}/${row?.name}`, { state: row?._id });
  };
  // Function to handle search with debounce
  const debounceSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(0);
    setSearch(e.target.value);
  }, 1000);

  const handleChangeCheckBox = (id: string) => {
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
    () => usersColumns(renderActions, handleChangeCheckBox, selectedIds),
    [renderActions, selectedIds]
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
      blockedStatus: filterState?.selectedStatus?.value,
    });
  };
  return (
    <>
      <ConfirmationModal
        title={CONFIRMATION_DESCRIPTION.DELETE}
        open={deleteModal?.show}
        handleClose={handleCloseDelete}
        showCancelButton
        submitButtonText={BUTTON_LABELS.YES}
        cancelButtonText={BUTTON_LABELS.NO}
        icon={RED_WARNING}
        handleSubmit={handleDeleteClick}
        showClose={false}
      />
      <ConfirmationModal
        title={CONFIRMATION_DESCRIPTION.BLOCK}
        open={blockModal?.show}
        handleClose={handleCloseBlock}
        showCancelButton
        submitButtonText={BUTTON_LABELS.YES}
        cancelButtonText={BUTTON_LABELS.NO}
        icon={RED_WARNING}
        handleSubmit={handleBlockClick}
        showClose={false}
      />
      <StatsFilters
        handleClearSearch={() => setSearch('')}
        handleSearch={debounceSearch}
        selectedIds={selectedIds}
        handleDeleteAll={handleDeleteAll}
        filterToggleImage={Filter}
        statusOptions={USER_STATUS}
        showDateFilter
        handleApply={handleApplyFilters}
      />

      <CustomTableView
        rows={(usersListing?.data?.data as unknown as Row[]) || []}
        columns={columns as unknown as Column[]}
        pageSize={USERS_PAGE_LIMIT}
        noDataFound={STRINGS.NO_RESULT}
        handleSortingClick={handleSortingClick}
        handleRowClick={handleRowClick}
        quickEditRowId={null}
        renderTableFooter={() => (
          <ReactPaginate
            pageCount={(usersListing?.data?.count || 1) / USERS_PAGE_LIMIT}
            onPageChange={handlePageClick}
            activeClassName={STRINGS.ACTIVE}
            nextClassName={`${STRINGS.NEXT_BTN} ${
              Math.ceil((usersListing?.data?.count || 1) / USERS_PAGE_LIMIT) !==
              currentPage + 1
                ? STRINGS.EMPTY_STRING
                : STRINGS.DISABLED
            }`}
            previousClassName={STRINGS.PREV_BTN}
            disabledClassName={STRINGS.DISABLED}
            forcePage={currentPage}
          />
        )}
      />
    </>
  );
}
