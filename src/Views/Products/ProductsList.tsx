// libs
import { debounce } from 'lodash';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactPaginate from 'react-paginate';

// components
import { toast } from 'react-toastify';
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

// consts
import { BUTTON_LABELS, FilterOrder, STRINGS } from '../../Shared/constants';
import { RED_WARNING } from '../../assets';
import {
  CONFIRMATION_DESCRIPTION,
  PRODUCT_STATUS,
  productsColumns,
} from './helpers/constants';

// models
import { ProductResponsePayload, ViewMultiData } from './helpers/model';

// api
import { ErrorResponse } from '../../Models/Apis/Error';
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from '../../Services/Api/module/products';

// utils
import { removeEmptyValues } from '../../Shared/utils/functions';

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
  searchString?: string; // Optional property
  sortKey: string;
  sortDirection: FilterOrder;
}

const ADD_ONS_PAGE_LIMIT = 5;

export default function TopInvesterList() {
  // state
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

  // other hooks
  const onComponentMountRef = useRef(false);
  const queryParams: QueryParams = {
    skip: currentPage * ADD_ONS_PAGE_LIMIT,
    limit: ADD_ONS_PAGE_LIMIT,
    searchString: search,
    sortKey,
    sortDirection,
  };
  // api
  const { data: productListing, refetch } = useGetProductsQuery({
    params: removeEmptyValues(
      queryParams as unknown as Record<string, unknown>
    ),
  });
  const [deleteProduct] = useDeleteProductMutation();

  // functions

  const handlePageClick = (selectedItem: { selected: number }) => {
    const selectedPageNumber = selectedItem.selected as unknown as number;
    setCurrentPage(selectedPageNumber);
  };

  const handleEdit = (row: ProductResponsePayload) => {
    setEditData({
      data: {
        ...row,
        status: {
          value: row?.status,
          label:
            PRODUCT_STATUS &&
            PRODUCT_STATUS?.find((status) => status.value === row?.status)
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

  const handleDelete = (row: ProductResponsePayload) => {
    const payload = {
      id: row?._id,
    };
    setDeleteModal({ show: true, data: payload });
  };

  const handleEditSuccess = () => {
    setEditData({ data: null, show: false });
    refetch();
  };
  const handleAddSuccess = () => {
    setAddData(false);
    refetch();
  };

  const handleCloseDelete = () => {
    setDeleteModal({ data: null, show: false });
  };
  const handleDeleteClick = async () => {
    const deletePaylaod = { productIds: [deleteModal?.data?.id] };
    await deleteProduct({
      payload: deletePaylaod,
      onSuccess: (data: { message: string }) => {
        toast.success(data?.message);
        setDeleteModal({ data: null, show: false });
        refetch();
      },
      onFailure: (error: ErrorResponse) => {
        toast.error(error?.data?.message);
      },
    });
  };
  const renderActions = useCallback(
    (_: unknown, row: ProductResponsePayload) => {
      return (
        <div className="d-flex">
          <ActionsDropDown
            row={row}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>
      );
    },
    []
  );

  // sorting

  const handleSortingClick = (
    selectedOrder: number = FilterOrder.DESCENDING,
    selectedSortKey: string = ''
  ) => {
    setSortKey(selectedSortKey);
    setSortDirection(selectedOrder);
  };
  // search
  const debounceSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(0);
    setSearch(e.target.value);
  }, 1000);

  const columns = useMemo(
    () => productsColumns(renderActions, setShowMultiItemView),
    [renderActions]
  );

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
        // toggleRowData={[]}
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
