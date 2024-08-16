// libs
import { useCallback, useEffect, useMemo, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';

// components
import { debounce } from 'lodash';
import { toast } from 'react-toastify';
import CustomModal from '../../Shared/components/CustomModal';
import CustomTableView, {
  Column,
  Row,
} from '../../Shared/components/CustomTableView';

// consts
import { BUTTON_LABELS, ROUTES, STRINGS } from '../../Shared/constants';

import ConfirmationModal from '../../Shared/components/ConfirmationModal/ConfirmationModal';
import { Filter, RED_WARNING } from '../../assets';
import { AuctionResponsePayload } from './helpers/model';
import ERROR_MESSAGES from '../../Shared/constants/messages';
import { AuctionColumns } from './helpers/constants';
import {
  useDeleteAuctionMutation,
  useGetAuctionsQuery,
} from '../../Services/Api/module/auction';
import ViewMultiTableItem from '../Products/components/ViewMultiTableItem';
import { ViewMultiData } from '../Products/helpers/model';
import ActionsDropDown from '../../Shared/components/ActionsDropDown';
import AuctionForm from './AuctionForm';
import StatsFilters from '../../Shared/components/Filters/Filters';
import { AuctionStatus } from './AuctionDetails/Helpers/constants';

interface EditData {
  data: object | null;
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
  const [addData, setAddData] = useState<boolean>(false);

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
    params: {
      skip: currentPage * ADD_ONS_PAGE_LIMIT,
      limit: ADD_ONS_PAGE_LIMIT,
    },
  });

  const handlePageClick = (selectedItem: { selected: number }) => {
    const selectedPageNumber = selectedItem.selected as unknown as number;
    setCurrentPage(selectedPageNumber);
  };

  const handleEdit = (row: AuctionResponsePayload) => {
    // console.log('row data', row);
    setEditData({
      data: {
        ...row,
        status: {
          value: row?.status,
          label:
            AuctionStatus &&
            AuctionStatus?.find((status) => status.value === row?.status)
              ?.label,
        },
        productId: { value: row.product._id, label: row.product.title },
        categoryIds: row?.categories?.map((category) => ({
          value: category._id,
          label: category?.name,
        })),
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

  // Render actions column
  const renderActions = useCallback(
    (_: unknown, row: AuctionResponsePayload) => (
      <div className="d-flex">
        <ActionsDropDown<AuctionResponsePayload>
          row={row}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
    ),
    []
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
  }, [refetch, currentPage]);

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
          <div className="p-4">
            <AuctionForm
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
            <AuctionForm
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
        setAddData={() => setAddData(true)}
        // handleDeleteAll={handleDeleteAll}
        filterToggleImage={Filter}
      />

      <CustomTableView
        rows={(AuctionListing?.data as unknown as Row[]) || []}
        columns={columns as unknown as Column[]}
        pageSize={ADD_ONS_PAGE_LIMIT}
        noDataFound={STRINGS.NO_RESULT}
        quickEditRowId={null}
        handleRowClick={(row) => {
          navigate(`${ROUTES.AUCTION_DETAILS}/${row._id}`);
        }}
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
