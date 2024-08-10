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
import StatsFilters from './components/Filters';
import ViewMultiTableItem from './components/ViewMultiTableItem';
import ProductAdd from './ProductsForm';
import ActionsDropDown from './components/ActionsDropDown';

// Constants
import { BUTTON_LABELS, FilterOrder, STRINGS } from '../../Shared/constants';
import { RED_WARNING } from '../../assets';
import {
  CONFIRMATION_DESCRIPTION,
  PRODUCT_STATUS,
  productsColumns,
} from './helpers/constants';

// Models
import { ProductResponsePayload, ViewMultiData } from './helpers/model';

// API
import { ErrorResponse } from '../../Models/Apis/Error';
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from '../../Services/Api/module/products';

// Utilities
import { removeEmptyValues } from '../../Shared/utils/functions';

// Interfaces
interface EditData {
  data: object | null;
  show: boolean;
}

interface DeleteData {
  data: { id: string } | null;
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
const ADD_ONS_PAGE_LIMIT = 5;

export default function TopInvestorList() {
  // State Management
  const [deleteModal, setDeleteModal] = useState<DeleteData>({
    show: false,
    data: { id: '' },
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState<string>('');
  const [sortKey, setSortKey] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<FilterOrder>(
    FilterOrder.ASCENDING
  );
  const [editData, setEditData] = useState<EditData>({ data: {}, show: false });
  const [addData, setAddData] = useState<boolean>(false);
  const [showMultiItemView, setShowMultiItemView] = useState<ViewMultiData>({
    data: { title: '' },
    show: false,
  });

  // Refs
  const onComponentMountRef = useRef(false);

  // Query Parameters
  const queryParams: QueryParams = {
    skip: currentPage * ADD_ONS_PAGE_LIMIT,
    limit: ADD_ONS_PAGE_LIMIT,
    searchString: search,
    sortKey,
    sortDirection,
  };

  // API Queries
  const { data: productListing, refetch } = useGetProductsQuery({
    params: removeEmptyValues(
      queryParams as unknown as Record<string, unknown>
    ),
  });
  const [deleteProduct] = useDeleteProductMutation();

  // Function to handle page click
  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  // Function to handle edit action
  const handleEdit = (row: ProductResponsePayload) => {
    setEditData({
      data: {
        ...row,
        status: {
          value: row?.status,
          label: PRODUCT_STATUS?.find((status) => status.value === row?.status)
            ?.label,
        },
        category: row?.categories?.map((category) => ({
          value: category._id,
          label: category?.name,
        })),
      },
      show: true,
    });
  };

  // Function to handle delete action
  const handleDelete = (row: ProductResponsePayload) => {
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
  const handleDeleteClick = async () => {
    const deletePayload = { productIds: [deleteModal?.data?.id] };
    await deleteProduct({
      payload: deletePayload,
      onSuccess: (data: { message: string }) => {
        toast.success(data?.message);
        handleCloseDelete();
        refetch();
      },
      onFailure: (error: ErrorResponse) => {
        toast.error(error?.data?.message);
      },
    });
  };

  // Render actions column
  const renderActions = useCallback(
    (_: unknown, row: ProductResponsePayload) => (
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

  // Function to handle search with debounce
  const debounceSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(0);
    setSearch(e.target.value);
  }, 1000);

  // Memoized columns for table
  const columns = useMemo(
    () => productsColumns(renderActions, setShowMultiItemView),
    [renderActions]
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
      <ViewMultiTableItem
        show={showMultiItemView}
        setShow={setShowMultiItemView}
      />

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
            <ProductAdd
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
            <ProductAdd
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
      />

      <CustomTableView
        rows={(productListing?.data as unknown as Row[]) || []}
        columns={columns as unknown as Column[]}
        pageSize={ADD_ONS_PAGE_LIMIT}
        noDataFound={STRINGS.NO_RESULT}
        handleSortingClick={handleSortingClick}
        quickEditRowId={null}
        renderTableFooter={() => (
          <ReactPaginate
            pageCount={(productListing?.count || 1) / ADD_ONS_PAGE_LIMIT}
            onPageChange={handlePageClick}
            activeClassName={STRINGS.ACTIVE}
            nextClassName={`${STRINGS.NEXT_BTN} ${
              Math.ceil((productListing?.count || 1) / ADD_ONS_PAGE_LIMIT) !==
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
