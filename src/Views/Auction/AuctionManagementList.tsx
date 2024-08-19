/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-unused-vars */
// libs
import { useCallback, useEffect, useMemo, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';

// components
import { debounce } from 'lodash';
import moment from 'moment';
import { toast } from 'react-toastify';
import CustomModal from '../../Shared/components/CustomModal';
import CustomTableView, {
  Column,
  Row,
} from '../../Shared/components/CustomTableView';

// consts
import {
  BUTTON_LABELS,
  DATE_FORMATS,
  FilterOrder,
  PRICE_RANGE,
  ROUTES,
  STRINGS,
} from '../../Shared/constants';

import {
  useDeleteAuctionMutation,
  useGetAuctionsQuery,
} from '../../Services/Api/module/auction';
import { useGetCategorysQuery } from '../../Services/Api/module/category';
import ActionsDropDown from '../../Shared/components/ActionsDropDown';
import ConfirmationModal from '../../Shared/components/ConfirmationModal/ConfirmationModal';
import StatsFilters from '../../Shared/components/Filters/Filters';
import { FiltersState } from '../../Shared/components/Filters/helpers/models';
import ERROR_MESSAGES from '../../Shared/constants/messages';
import { removeEmptyValues } from '../../Shared/utils/functions';
import { Filter, RED_WARNING } from '../../assets';
import ViewMultiTableItem from '../Products/components/ViewMultiTableItem';
import { Category, ViewMultiData } from '../Products/helpers/model';
import {
  AuctionStatus,
  PurchaseStatus,
} from './AuctionDetails/Helpers/constants';
import AuctionForm from './AuctionForm';
import { AuctionColumns } from './helpers/constants';
import { AuctionResponsePayload } from './helpers/model';

interface EditData {
  data: AuctionResponsePayload | null;
  show: boolean;
}

interface DeleteData {
  data: { id: string | undefined } | null;
  open: boolean;
}
const ADD_ONS_PAGE_LIMIT = 10;

export default function AuctionManagementList() {
  const [deleteModal, setDeleteModal] = useState<DeleteData>({
    open: false,
    data: { id: '' },
  });
  const [filters, setFilters] = useState({});
  const [addData, setAddData] = useState<boolean>(false);
  const { data: categoryList } = useGetCategorysQuery({ skip: 0 });
  const [sortKey, setSortKey] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<FilterOrder>(
    FilterOrder.ASCENDING
  );
  const [showMultiItemView, setShowMultiItemView] = useState<ViewMultiData>({
    data: { title: '' },
    show: false,
  });

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [editData, setEditData] = useState<EditData>({ data: {}, show: false });
  const [search, setSearch] = useState<string>('');
  const [deleteAuction] = useDeleteAuctionMutation();
  // query
  const { data: AuctionListing, refetch } = useGetAuctionsQuery({
    params: removeEmptyValues({
      skip: currentPage * ADD_ONS_PAGE_LIMIT,
      limit: ADD_ONS_PAGE_LIMIT,
      sortKey,
      sortDirection,
      ...filters,
    }),
  });

  const handlePageClick = (selectedItem: { selected: number }) => {
    const selectedPageNumber = selectedItem.selected as unknown as number;
    setCurrentPage(selectedPageNumber);
  };

  const handleEdit = (row: AuctionResponsePayload) => {
    setEditData({
      data: {
        ...row,
        statusData: {
          value: row?.status,
          label:
            (AuctionStatus &&
              AuctionStatus?.find((status) => status.value === row?.status)
                ?.label) ||
            '',
        },
        productId: { value: row?.product?._id, label: row?.product?.title },
        categoryIds: row?.categories?.map((category) => ({
          value: category._id,
          label: category?.name,
        })),
        bidStartDate: moment(row.bidStartDate).format(
          DATE_FORMATS.DISPLAY_DATE_REVERSE
        ),
        reserveWaitingEndDate: moment(row.reserveWaitingEndDate).format(
          DATE_FORMATS.DISPLAY_DATE_REVERSE
        ),
      },
      show: true,
    });
  };

  const handleDelete = (row: {
    isExpired?: boolean;
    date?: string;
    _id?: string;
  }) => {
    const payload = {
      id: row?._id,
    };
    setDeleteModal({ open: true, data: payload });
  };

  // Function to handle search with debounce
  const debounceSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(0);
    setSearch(e.target.value);
  }, 1000);

  const handleView = useCallback(
    (row: AuctionResponsePayload) => {
      navigate(`${ROUTES.AUCTION_DETAILS}/${row._id}`);
    },
    [navigate]
  );
  // Render actions column
  const renderActions = useCallback(
    (_: unknown, row: AuctionResponsePayload) => (
      <div className="d-flex justify-content-end justify-content-lg-start">
        <ActionsDropDown<AuctionResponsePayload>
          row={row}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleView={handleView}
        />
      </div>
    ),
    [handleView]
  );
  const handleAddSuccess = () => {
    setAddData(false);
    refetch();
  };
  const handleEditSuccess = () => {
    setEditData({ data: null, show: false });
    refetch();
  };

  const columns = useMemo(
    () => AuctionColumns(renderActions, setShowMultiItemView),
    [renderActions]
  );
  const handleCloseDelete = () => {
    setDeleteModal({ data: null, open: false });
  };
  const handleDeleteClick = async () => {
    try {
      if (!deleteModal?.data?.id) return null;
      const deletePayload = {
        auctionIds: [deleteModal?.data?.id],
      };
      await deleteAuction({
        payload: deletePayload,
        onSuccess: (data: { message: string }) => {
          toast.success(data?.message);
          handleCloseDelete();
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
    return '';
  };

  useEffect(() => {
    refetch();
  }, [refetch, currentPage, search, filters, sortDirection, sortKey]);

  const handleApplyFilters = (filterState: FiltersState) => {
    setFilters({
      fromDate: filterState?.startDate,
      toDate: filterState?.endDate,
      productPriceMin: filterState?.priceRange?.[0],
      productPriceMax: filterState?.priceRange?.[1],
      reservePriceMin: filterState?.secondaryPriceRange?.[0],
      reservePriceMax: filterState?.secondaryPriceRange?.[1],
      status: filterState?.selectedStatus?.value,
      categoryId: filterState?.selectedBrand?.value,
      productPurchaseStatus: filterState?.selectedSecondaryOptions?.value,
    });
  };

  const categoryOptions = useMemo(
    () =>
      categoryList?.data?.map((category: Category) => ({
        value: category?._id,
        label: category?.name,
      })),
    [categoryList?.data]
  );
  const handleSortingClick = (
    selectedOrder: number = FilterOrder.DESCENDING,
    selectedSortKey: string = ''
  ) => {
    setSortKey(selectedSortKey);
    setSortDirection(selectedOrder);
  };
  return (
    <div>
      <ViewMultiTableItem
        show={showMultiItemView}
        setShow={setShowMultiItemView}
      />
      <ConfirmationModal
        title={ERROR_MESSAGES().DELETE_ITEM}
        open={deleteModal?.open}
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
          <AuctionForm
            isEdit
            initialData={editData?.data}
            onEdit={handleEditSuccess}
          />
        </CustomModal>
      )}

      {addData && (
        <CustomModal
          title="Add"
          show={addData}
          onClose={() => setAddData(false)}
        >
          <AuctionForm
            isEdit={false}
            initialData={{}}
            onAdd={handleAddSuccess}
          />
        </CustomModal>
      )}

      <StatsFilters
        handleClearSearch={() => setSearch('')}
        handleSearch={debounceSearch}
        setAddData={() => setAddData(true)}
        statusOptions={AuctionStatus}
        showDateFilter
        brandOptions={categoryOptions}
        rangeSilderTitle="Item Price"
        secondaryRangeSilderTitle="Reserve Price"
        secondarySelectPlaceHolder="Prize Status"
        handleApply={handleApplyFilters}
        priceRange={PRICE_RANGE}
        secondaryPriceRange={PRICE_RANGE}
        filterToggleImage={Filter}
        secondarySelectOptions={PurchaseStatus}
      />

      <CustomTableView
        rows={(AuctionListing?.data as unknown as Row[]) || []}
        columns={columns as unknown as Column[]}
        pageSize={ADD_ONS_PAGE_LIMIT}
        noDataFound={STRINGS.NO_RESULT}
        quickEditRowId={null}
        handleSortingClick={handleSortingClick}
        // handleRowClick={(row) => {
        //   navigate(`${ROUTES.AUCTION_DETAILS}/${row._id}`);
        // }}
        renderTableFooter={() => (
          <ReactPaginate
            pageCount={(AuctionListing?.count || 1) / ADD_ONS_PAGE_LIMIT}
            onPageChange={handlePageClick}
            activeClassName={STRINGS.ACTIVE}
            nextClassName={`${STRINGS.NEXT_BTN} ${
              Math.ceil((AuctionListing?.count || 1) / ADD_ONS_PAGE_LIMIT) !==
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
