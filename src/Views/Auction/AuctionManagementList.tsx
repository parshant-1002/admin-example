// libs
import { useCallback, useEffect, useMemo, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';

// components
import { debounce } from 'lodash';
import CustomModal from '../../Shared/components/CustomModal';
import CustomTableView, {
  Column,
  Row,
} from '../../Shared/components/CustomTableView';

// consts
import { BUTTON_LABELS, ROUTES, STRINGS } from '../../Shared/constants';

import ConfirmationModal from '../../Shared/components/ConfirmationModal/ConfirmationModal';
import { RED_WARNING } from '../../assets';
import { AuctionResponsePayload } from './helpers/model';
import ERROR_MESSAGES from '../../Shared/constants/messages';
import { AUCTION_STATUS, AuctionColumns } from './helpers/constants';
import { useGetAuctionsQuery } from '../../Services/Api/module/auction';
import ViewMultiTableItem from '../Products/components/ViewMultiTableItem';
import { ViewMultiData } from '../Products/helpers/model';
import ActionsDropDown from '../../Shared/components/ActionsDropDown';
import AuctionForm from './AuctionForm';
import StatsFilters from '../Products/components/Filters';
// import StatsFilters from '../Users/components/Filters';

interface EditData {
  data: object | null;
  show: boolean;
}

interface DeleteData {
  data: object | null;
  open: boolean;
}
const ADD_ONS_PAGE_LIMIT = 10;

export default function AuctionManagementList() {
  const [deleteModal, setDeleteModal] = useState<DeleteData>({
    open: false,
    data: {},
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

  const handleDeleteAll = () => {};

  const handleEdit = (row: AuctionResponsePayload) => {
    // console.log('row data', row);
    setEditData({
      data: {
        ...row,
        status: {
          value: row?.status,
          label:
            AUCTION_STATUS &&
            AUCTION_STATUS?.find((status) => status.value === row?.status)
              ?.label,
        },
        categoryIds: row?.product.categories?.map((category) => ({
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
  const handleDeleteClick = () => {};

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
        setAddData={setAddData}
        handleDeleteAll={handleDeleteAll}
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
