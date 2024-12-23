// Libraries
import { debounce } from 'lodash';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';

// Components
import { useDispatch, useSelector } from 'react-redux';
import ConfirmationModal from '../../Shared/components/ConfirmationModal/ConfirmationModal';
import CustomModal from '../../Shared/components/CustomModal';
import CustomTableView, {
  Column,
  Row,
} from '../../Shared/components/CustomTableView';
import StatsFilters from '../../Shared/components/Filters';
import ViewMultiTableItem from '../../Shared/components/ViewMultiTableItem';
import PlanForm from './PlansForm';

// Constants
import { BUTTON_LABELS, STRINGS } from '../../Shared/constants/constants';
import { Delete, Filter, RED_WARNING, edit } from '../../assets';
import {
  // CAR_BODY_TYPE_OPTIONS,
  CONFIRMATION_DESCRIPTION,
  PlansColumns,
  SPECIFICATIONS,
  filterSchema,
} from './helpers/constants';
import dummyData from './helpers/data.json';

// Models
import {
  PlanResponsePayload,
  SelectedFilters,
  ViewMultiData,
  ViewSpecificationData,
} from './helpers/model';

// API

// Utilities
import { Image } from '../../Models/common';
import {
  useDeletePlanMutation,
  useGetPlansQuery,
} from '../../Services/Api/module/plans';
import CustomDetailsBoard from '../../Shared/components/CustomDetailsBoard';
import CustomFilterIcons from '../../Shared/components/CustomFilterIcons';
import { SubmenuItem } from '../../Shared/components/CustomFilterIcons/CustomFilterIcons';
import { FiltersState } from '../../Shared/components/Filters/helpers/models';
import { FilterOrder } from '../../Shared/constants/enums';
import ERROR_MESSAGES from '../../Shared/constants/messages';
import { removeEmptyValues } from '../../Shared/utils/functions';
import { RootState } from '../../Store';
import { updateUploadedImages } from '../../Store/UploadedImages';

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
const PLANS_PAGE_LIMIT = 10;

export default function PlansList() {
  // State Management
  const dispatch = useDispatch();
  const uploadedImages = useSelector(
    (state: RootState) => state.UploadedImages.images
  );
  const [deleteModal, setDeleteModal] = useState<DeleteData>({
    show: false,
    data: { id: STRINGS.EMPTY_STRING, ids: [STRINGS.EMPTY_STRING] },
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
  const [editData, setEditData] = useState<EditData>({ data: {}, show: false });
  const [viewSpecifications, setViewSpecifications] =
    useState<ViewSpecificationData>({
      data: {},
      show: false,
    });
  const [addData, setAddData] = useState<boolean>(false);
  const [showMultiItemView, setShowMultiItemView] = useState<ViewMultiData>({
    data: { title: STRINGS.EMPTY_STRING },
    show: false,
  });

  // Refs
  const onComponentMountRef = useRef(false);

  // Query Parameters
  const queryParams: QueryParams = {
    skip: currentPage * PLANS_PAGE_LIMIT,
    limit: PLANS_PAGE_LIMIT,
    searchString: search,
    sortKey,
    sortDirection,
    ...filters,
  };

  // API Queries
  // const { data: categoryList } = useGetCategorysQuery(
  //   {},
  //   { refetchOnMountOrArgChange: true }
  // );

  const { data: plansList, refetch } = useGetPlansQuery({
    params: removeEmptyValues(
      queryParams as unknown as Record<string, unknown>
    ),
  });
  const [deletePlan] = useDeletePlanMutation();

  // // Function to handle page click
  // const handlePageClick = (selectedItem: { selected: number }) => {
  //   setCurrentPage(selectedItem.selected);
  // };

  // Function to handle edit action
  const handleEdit = (row: PlanResponsePayload) => {
    setEditData({
      data: {
        ...row,
      },
      show: true,
    });
  };

  // Function to handle delete action
  const handleDelete = (row: PlanResponsePayload) => {
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
      await deletePlan({
        payload: deleteModal?.data?.id,
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
  const getActionsSchema = useCallback(
    (row: PlanResponsePayload): SubmenuItem<PlanResponsePayload>[] => [
      {
        buttonLabel: BUTTON_LABELS.EDIT,
        buttonAction: () => handleEdit(row),
        isPrimary: true,
        icon: edit,
      },
      {
        buttonLabel: BUTTON_LABELS.DELETE,
        buttonAction: () => handleDelete(row), // Make sure to use the row parameter here
        icon: Delete,
        isDanger: true,
      },
    ],
    [] // Include all dependencies
  );
  // Render actions column
  const renderActions = useCallback(
    (_: unknown, row: PlanResponsePayload) => (
      <div className="d-flex justify-content-end justify-content-lg-start">
        <CustomFilterIcons
          row={row}
          schema={getActionsSchema(row)}
          isDropDown // or true based on your needs
        />
      </div>
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

  // const handleChangeCheckBox = (id: string) => {
  //   setSelectedIds((prevSelectedIds) => {
  //     const foundIndex = prevSelectedIds?.findIndex((f) => f === id);
  //     if (foundIndex !== undefined && foundIndex > -1) {
  //       return prevSelectedIds?.filter((f) => f !== id);
  //     }
  //     return [...(prevSelectedIds || []), id];
  //   });
  // };

  // Memoized columns for table
  const columns = useMemo(
    () =>
      PlansColumns(
        renderActions
        // setShowMultiItemView
        // handleChangeCheckBox,
        // selectedIds
        // setViewSpecifications
      ),
    [renderActions]
  );

  // Effect to refetch data on dependencies change
  useEffect(() => {
    if (onComponentMountRef.current) {
      refetch();
    }
    onComponentMountRef.current = true;
  }, [refetch, currentPage, search, sortKey, sortDirection, filters]);

  // const categoryOptions = useMemo(
  //   () =>
  //     categoryList?.data?.map((category: Category) => ({
  //       value: category?._id,
  //       label: category?.name,
  //     })),
  //   [categoryList?.data]
  // );

  const handleApplyFilters = (filterState: FiltersState) => {
    const selectedFilters = filterState as SelectedFilters;
    setFilters({
      fromDate: selectedFilters?.dateRange?.startDate,
      toDate: selectedFilters?.dateRange?.endDate,
      priceRangeMin: selectedFilters?.priceRange?.[0],
      priceRangeMax: selectedFilters?.priceRange?.[1],
      categoryId: selectedFilters?.company?.value,
    });
    setCurrentPage(0);
  };
  const handleCloseForm = () => {
    if (!(uploadedImages as unknown as Image[])?.length) {
      refetch();
    }
    setEditData({ data: null, show: false });
    setViewSpecifications({ data: {}, show: false });
    setAddData(false);
    dispatch(updateUploadedImages([]));
  };
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
      {viewSpecifications?.show && (
        <CustomModal
          title={STRINGS.SPECIFICATIONS}
          show={viewSpecifications?.show}
          onClose={handleCloseForm}
        >
          <CustomDetailsBoard
            data={viewSpecifications?.data}
            schema={SPECIFICATIONS}
          />
        </CustomModal>
      )}
      {(editData?.show || addData) && (
        <PlanForm
          title={editData?.show ? BUTTON_LABELS.EDIT : BUTTON_LABELS.ADD}
          show={editData?.show || addData}
          onClose={handleCloseForm}
          isEdit={!!editData?.show}
          initialData={editData?.show ? editData?.data : {}}
          onEdit={handleEditSuccess}
          onAdd={handleAddSuccess}
          // categoryOptions={categoryOptions}
        />
      )}

      <StatsFilters
        handleClearSearch={() => setSearch(STRINGS.EMPTY_STRING)}
        handleSearch={debounceSearch}
        setAddData={() => setAddData(true)}
        selectedIds={selectedIds}
        handleDeleteAll={handleDeleteAll}
        filterToggleImage={Filter}
        filterSchema={filterSchemaConfig}
        setFiltersState={setFiltersState}
        filtersState={filtersState}
        handleApply={handleApplyFilters}
        handleClearAll={() => setSelectedIds([])}
      />

      <CustomTableView
        rows={plansList?.plans || (dummyData as unknown as Row[]) || []}
        columns={columns as unknown as Column[]}
        pageSize={PLANS_PAGE_LIMIT}
        noDataFound={STRINGS.NO_RESULT}
        handleSortingClick={handleSortingClick}
        quickEditRowId={null}
        // renderTableFooter={() => (
        //   <ReactPaginate
        //     pageCount={(plansList?.count || 1) / PLANS_PAGE_LIMIT}
        //     onPageChange={handlePageClick}
        //     activeClassName={STRINGS.ACTIVE}
        //     nextClassName={`${STRINGS.NEXT_BTN} ${
        //       Math.ceil((plansList?.count || 1) / PLANS_PAGE_LIMIT) !==
        //       currentPage + 1
        //         ? STRINGS.EMPTY_STRING
        //         : STRINGS.DISABLED
        //     }`}
        //     previousClassName={STRINGS.PREV_BTN}
        //     disabledClassName={STRINGS.DISABLED}
        //     forcePage={currentPage}
        //   />
        // )}
      />
    </div>
  );
}
