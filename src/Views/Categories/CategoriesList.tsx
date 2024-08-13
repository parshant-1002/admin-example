// Libraries
import { debounce } from 'lodash';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';

// Components
import ConfirmationModal from '../../Shared/components/ConfirmationModal/ConfirmationModal';
import CustomModal from '../../Shared/components/CustomModal';
import CustomTableView, {
  Column,
  Row,
} from '../../Shared/components/CustomTableView';
import ActionsDropDown from './components/ActionsDropDown';
import StatsFilters from './components/Filters';

// Constants
import { BUTTON_LABELS, FilterOrder, STRINGS } from '../../Shared/constants';
import { RED_WARNING } from '../../assets';
import {
  CONFIRMATION_DESCRIPTION,
  categoriesColumns,
} from './helpers/constants';

// Models
import { CategoryResponsePayload } from './helpers/model';

// API

// Utilities
import {
  useDeleteCategoriesMutation,
  useGetCategoriesQuery,
} from '../../Services/Api/module/catgories';
import ERROR_MESSAGES from '../../Shared/constants/messages';
import { removeEmptyValues } from '../../Shared/utils/functions';
import CategoryForm from './CategoriesForm';

// Interfaces
interface EditData {
  data: object | null;
  show: boolean;
}

interface DeleteData {
  data: { id?: string; ids?: string[] } | null;
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
const CATEGORY_PAGE_LIMIT = 5;

export default function CategoriesList() {
  // State Management
  const [deleteModal, setDeleteModal] = useState<DeleteData>({
    show: false,
    data: { id: '', ids: [''] },
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedIds, setSelectedIds] = useState<string[]>();
  const [search, setSearch] = useState<string>('');
  const [sortKey, setSortKey] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<FilterOrder>(
    FilterOrder.ASCENDING
  );
  const [editData, setEditData] = useState<EditData>({ data: {}, show: false });
  const [addData, setAddData] = useState<boolean>(false);

  // Refs
  const onComponentMountRef = useRef(false);

  // Query Parameters
  const queryParams: QueryParams = {
    skip: currentPage * CATEGORY_PAGE_LIMIT,
    limit: CATEGORY_PAGE_LIMIT,
    searchString: search,
    sortKey,
    sortDirection,
  };

  // API Queries
  const { data: categoriesListing, refetch } = useGetCategoriesQuery({
    params: removeEmptyValues(
      queryParams as unknown as Record<string, unknown>
    ),
  });
  const [deleteCategories] = useDeleteCategoriesMutation();

  // Function to handle page click
  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  // Function to handle edit action
  const handleEdit = (row: CategoryResponsePayload) => {
    setEditData({
      data: {
        ...row,
      },
      show: true,
    });
  };

  // Function to handle delete action
  const handleDelete = (row: CategoryResponsePayload) => {
    setDeleteModal({ show: true, data: { id: row?._id } });
  };

  // Function to handle successful edit
  const handleEditSuccess = () => {
    setEditData({ data: null, show: false });
    refetch();
  };

  // Function to handle successful addition
  const handleAddSuccess = () => {
    setAddData(false);
    refetch();
  };

  // Function to close delete modal
  const handleCloseDelete = () => {
    setDeleteModal({ data: null, show: false });
  };

  // Function to handle delete confirmation
  // eslint-disable-next-line consistent-return
  const handleDeleteClick = async () => {
    try {
      let deletePayload;
      if (!deleteModal?.data?.id && !deleteModal?.data?.ids) return null;
      if (deleteModal?.data?.id) {
        deletePayload = {
          categoryIds: [deleteModal?.data?.id],
        };
      }
      if (deleteModal?.data?.ids) {
        deletePayload = {
          categoryIds: deleteModal?.data?.ids,
        };
      }
      await deleteCategories({
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

  // Render actions column
  const renderActions = useCallback(
    (_: unknown, row: CategoryResponsePayload) => (
      <div className="d-flex">
        <ActionsDropDown
          row={row}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
    ),
    []
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
    () => categoriesColumns(renderActions, handleChangeCheckBox, selectedIds),
    [renderActions, selectedIds]
  );

  // Effect to refetch data on dependencies change
  useEffect(() => {
    if (onComponentMountRef.current) {
      refetch();
    }
    onComponentMountRef.current = true;
  }, [refetch, currentPage, search, sortKey, sortDirection]);

  return (
    <div>
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

      {editData?.show && (
        <CustomModal
          title="Edit"
          show={editData?.show}
          onClose={() => setEditData({ data: null, show: false })}
        >
          <div className="p-4">
            <CategoryForm
              isEdit
              initialData={editData?.data}
              onEdit={handleEditSuccess}
            />
          </div>
        </CustomModal>
      )}

      {addData && (
        <CustomModal
          title="Add"
          show={addData}
          onClose={() => setAddData(false)}
        >
          <div className="p-4">
            <CategoryForm
              isEdit={false}
              initialData={{}}
              onAdd={handleAddSuccess}
            />
          </div>
        </CustomModal>
      )}

      <StatsFilters
        handleClearSearch={() => setSearch('')}
        search={search}
        handleSearch={debounceSearch}
        setAddData={setAddData}
        selectedIds={selectedIds}
        handleDeleteAll={handleDeleteAll}
      />

      <CustomTableView
        rows={(categoriesListing?.data as unknown as Row[]) || []}
        columns={columns as unknown as Column[]}
        pageSize={CATEGORY_PAGE_LIMIT}
        noDataFound={STRINGS.NO_RESULT}
        handleSortingClick={handleSortingClick}
        quickEditRowId={null}
        renderTableFooter={() => (
          <ReactPaginate
            pageCount={(categoriesListing?.count || 1) / CATEGORY_PAGE_LIMIT}
            onPageChange={handlePageClick}
            activeClassName={STRINGS.ACTIVE}
            nextClassName={`${STRINGS.NEXT_BTN} ${
              Math.ceil(
                (categoriesListing?.count || 1) / CATEGORY_PAGE_LIMIT
              ) !==
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
    </div>
  );
}
