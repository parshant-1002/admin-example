// libs
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';

// components
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
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [editData, setEditData] = useState<EditData>({ data: {}, show: false });

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
        category: { value: row?.category._id, label: row?.category?.name },
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

  const renderActions = useCallback(
    (_: unknown, row: AuctionResponsePayload) => {
      return (
        <div className="d-flex">
          <Button variant="primary mx-2" onClick={() => handleEdit(row)}>
            {BUTTON_LABELS.EDIT}
          </Button>
          <Button variant="danger mx-2" onClick={() => handleDelete(row)}>
            {BUTTON_LABELS.DELETE}
          </Button>
        </div>
      );
    },
    []
  );

  const columns = useMemo(() => AuctionColumns(renderActions), [renderActions]);
  const handleCloseDelete = () => {
    setDeleteModal({ data: null, open: false });
  };
  const handleDeleteClick = () => {
    // dispatch(
    //   deleteAddOns(
    //     deleteModal?.data,
    //     (
    //       data: {
    //         message:
    //           | string
    //           | number
    //           | boolean
    //           | ReactElement<any, string | JSXElementConstructor<any>>
    //           | Iterable<ReactNode>
    //           | ReactPortal
    //           | ((props: ToastContentProps<unknown>) => ReactNode)
    //           | null
    //           | undefined;
    //       },
    //       status: string
    //     ) => {
    //       if (status === STATUS.SUCCESS) {
    //         toast.success(data?.message);
    //         getTokenPriceList();
    //         setDeleteModal(null);
    //       }
    //     }
    //   )
    // );
  };

  useEffect(() => {
    refetch();
  }, [refetch, currentPage]);
  return (
    <div>
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
          title="Edit Add on"
          show={editData?.show}
          onClose={() => setEditData({ data: null, show: false })}
        />
      )}
      <CustomTableView
        rows={(AuctionListing?.data as unknown as Row[]) || []}
        columns={columns as unknown as Column[]}
        pageSize={ADD_ONS_PAGE_LIMIT}
        noDataFound={STRINGS.NO_RESULT}
        quickEditRowId={null}
        onRowClick={(row) => {
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
