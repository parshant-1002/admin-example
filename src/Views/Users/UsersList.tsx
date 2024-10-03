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

// Constants
import {
  BUTTON_LABELS,
  ROUTES,
  STRINGS,
} from '../../Shared/constants/constants';
import { block, Delete, Filter, RED_WARNING, view } from '../../assets';
import {
  CONFIRMATION_DESCRIPTION,
  filterSchema,
  usersColumns,
} from './helpers/constants';

// Models
import { SelectedFilters, UsersResponsePayload } from './helpers/model';

// Utilities
import {
  useDeleteUsersMutation,
  useEditUsersMutation,
  useGetUsersQuery,
} from '../../Services/Api/module/users';
import CustomFilterIcons, {
  SubmenuItem,
} from '../../Shared/components/CustomFilterIcons/CustomFilterIcons';
import { FiltersState } from '../../Shared/components/Filters/helpers/models';
import { FilterOrder } from '../../Shared/constants/enums';
import ERROR_MESSAGES from '../../Shared/constants/messages';
import { removeEmptyValues } from '../../Shared/utils/functions';
import { ActionType } from './UserDetails/helpers/model';

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
const USERS_PAGE_LIMIT = 10;

export default function UsersList() {
  // State Management
  const [deleteModal, setDeleteModal] = useState<DeleteData>({
    show: false,
    data: { id: STRINGS.EMPTY_STRING, ids: [STRINGS.EMPTY_STRING] },
  });
  const [blockModal, setBlockModal] = useState<BlockData>({
    show: false,
    data: { id: STRINGS.EMPTY_STRING },
  });
  const [filtersState, setFiltersState] = useState<FiltersState>({});
  const [currentPage, setCurrentPage] = useState(0);
  const [filters, setFilters] = useState({});
  const [selectedIds, setSelectedIds] = useState<string[]>();
  const [search, setSearch] = useState<string>(STRINGS.EMPTY_STRING);
  const [sortKey, setSortKey] = useState<string>(STRINGS.EMPTY_STRING);
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
  const handleDelete = useCallback((row: UsersResponsePayload) => {
    setDeleteModal({ show: true, data: { id: row?._id } });
  }, []);

  const handleView = useCallback(
    (row: UsersResponsePayload) => {
      navigate(`${ROUTES.USERS}/${row?.name}`, { state: row?._id });
    },
    [navigate]
  );

  const handleBlock = useCallback((row: UsersResponsePayload) => {
    setBlockModal({
      show: true,
      data: { id: row?._id, isBlocked: row?.isBlocked },
    });
  }, []);
  // Function to close delete modal
  const handleCloseModal = (modalType: ActionType) => {
    if (modalType === ActionType.DELETE)
      setDeleteModal({ data: null, show: false });
    else setBlockModal({ data: null, show: false });
  };
  const getActionsSchema = useCallback(
    (row: UsersResponsePayload): SubmenuItem<UsersResponsePayload>[] => [
      {
        buttonLabel: BUTTON_LABELS.VIEW,
        buttonAction: () => handleView(row), // Make sure to use the row parameter here
        icon: view,
        isPrimary: true,
      },
      {
        buttonLabel: row.isBlocked
          ? BUTTON_LABELS.UNBLOCK
          : BUTTON_LABELS.BLOCK,
        buttonAction: () => handleBlock(row), // Make sure to use the row parameter here
        icon: block,
        isDanger: row.isBlocked,
      },
      {
        buttonLabel: BUTTON_LABELS.DELETE,
        buttonAction: () => handleDelete(row), // Make sure to use the row parameter here
        icon: Delete,
        isDanger: true,
      },
    ],
    [handleView, handleBlock, handleDelete] // Include all dependencies
  );

  // Render actions column
  const renderActions = useCallback(
    (_: unknown, row: UsersResponsePayload) => (
      <CustomFilterIcons
        row={row}
        schema={getActionsSchema(row)}
        isDropDown // or true based on your needs
      />
    ),
    [getActionsSchema]
  );

  // Function to handle sorting click
  const handleSortingClick = (
    selectedOrder: number = FilterOrder.DESCENDING,
    selectedSortKey: string = STRINGS.EMPTY_STRING
  ) => {
    setSortKey(selectedSortKey);
    setSortDirection(selectedOrder);
  };

  const handleDeleteAll = () => {
    setDeleteModal({ show: true, data: { ids: selectedIds } });
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
      return [...(prevSelectedIds ?? []), id];
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
    const selectedFilter = filterState as SelectedFilters;
    setFilters({
      fromDate: selectedFilter?.dateRange?.startDate,
      toDate: selectedFilter?.dateRange?.endDate,
      blockedStatus: selectedFilter?.userStatus?.value,
    });
    setCurrentPage(0);
  };
  const handleSuccessDeleteOrBlock = (data: { message: string }) => {
    toast.success(data?.message);
    handleCloseModal(ActionType.DELETE);
    handleCloseModal(ActionType.BLOCK);
    setSelectedIds([]);
    refetch();
  };
  const handleSubmit = async (actionType: ActionType) => {
    try {
      if (actionType === ActionType.DELETE) {
        if (!deleteModal?.data?.id && !deleteModal?.data?.ids) return;
        const deletePayload = deleteModal?.data?.id
          ? { userIds: [deleteModal?.data?.id] }
          : { userIds: deleteModal?.data?.ids };
        await deleteUser({
          payload: deletePayload,
          onSuccess: handleSuccessDeleteOrBlock,
        });
      } else if (actionType === ActionType.BLOCK) {
        if (!blockModal?.data?.id) return;
        const blockPayload = {
          userId: blockModal?.data?.id,
          isBlocked: !blockModal?.data?.isBlocked,
        };
        await editUser({
          payload: blockPayload,
          onSuccess: handleSuccessDeleteOrBlock,
        });
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : ERROR_MESSAGES().SOMETHING_WENT_WRONG
      );
    }
  };
  const getModalTitle = (actionType: ActionType) => {
    if (actionType === ActionType.DELETE) {
      return CONFIRMATION_DESCRIPTION.DELETE;
    }
    if (actionType === ActionType.BLOCK) {
      if (blockModal?.data?.isBlocked) {
        return CONFIRMATION_DESCRIPTION.UNBLOCK;
      }
      return CONFIRMATION_DESCRIPTION.BLOCK;
    }
    return STRINGS.EMPTY_STRING;
  };
  const renderConfirmationModal = (
    modalData: DeleteData | BlockData,
    actionType: ActionType
  ) => (
    <ConfirmationModal
      title={getModalTitle(actionType)}
      open={modalData.show}
      handleClose={() => handleCloseModal(actionType)}
      showCancelButton
      submitButtonText={BUTTON_LABELS.YES}
      cancelButtonText={BUTTON_LABELS.NO}
      icon={RED_WARNING}
      handleSubmit={() => handleSubmit(actionType)}
      showClose={false}
    />
  );
  const onChangeFilter = (key: string, newValue: unknown) => {
    setFiltersState((prev: FiltersState) => ({
      ...prev,
      [key]: newValue,
    }));
  };

  const filterSchemaConfig = useMemo(
    () => filterSchema(onChangeFilter, filtersState),
    [filtersState]
  );
  return (
    <>
      {renderConfirmationModal(deleteModal, ActionType.DELETE)}
      {renderConfirmationModal(blockModal, ActionType.BLOCK)}
      <StatsFilters
        handleClearSearch={() => setSearch(STRINGS.EMPTY_STRING)}
        handleSearch={debounceSearch}
        selectedIds={selectedIds}
        handleDeleteAll={handleDeleteAll}
        filterToggleImage={Filter}
        filterSchema={filterSchemaConfig}
        handleApply={handleApplyFilters}
        setFiltersState={setFiltersState}
        filtersState={filtersState}
      />

      <CustomTableView
        rows={(usersListing?.data?.data as unknown as Row[]) ?? []}
        columns={columns as unknown as Column[]}
        pageSize={USERS_PAGE_LIMIT}
        noDataFound={STRINGS.NO_RESULT}
        handleSortingClick={handleSortingClick}
        quickEditRowId={null}
        renderTableFooter={() => (
          <ReactPaginate
            pageCount={(usersListing?.data?.count ?? 1) / USERS_PAGE_LIMIT}
            onPageChange={handlePageClick}
            activeClassName={STRINGS.ACTIVE}
            nextClassName={`${STRINGS.NEXT_BTN} ${
              Math.ceil((usersListing?.data?.count ?? 1) / USERS_PAGE_LIMIT) !==
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
