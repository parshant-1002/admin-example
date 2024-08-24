// components/AuctionDetails.tsx
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import moment from 'moment';
import { useAuctionData } from '../helpers/useAuctionData';

import BidsList from './BidsList';
import {
  Category,
  ViewMultiData,
  ViewSpecificationData,
} from '../../Products/helpers/model';
import ViewMultiTableItem from '../../Products/components/ViewMultiTableItem';
import { AuctionColumn, AuctionStatus } from './Helpers/constants';
import DetailsWrapperEditableCard from '../../../Shared/components/DetailsEditableCard';
import { CustomModal } from '../../../Shared/components';
import AuctionForm from '../AuctionForm';
import { AuctionResponsePayload } from '../helpers/model';
import {
  BUTTON_LABELS,
  DATE_FORMATS,
  STRINGS,
} from '../../../Shared/constants';
import { useGetAuctionsQuery } from '../../../Services/Api/module/auction';
import { removeEmptyValues } from '../../../Shared/utils/functions';
import Button from '../../../Shared/components/form/Button';

import '../Auction.scss';
import { edit } from '../../../assets';
import CustomDetailsBoard from '../../../Shared/components/CustomDetailsBoard';
import { SPECIFICATIONS } from '../../Products/helpers/constants';

interface EditData {
  data: AuctionResponsePayload | null;
  show: boolean;
}
export default function AuctionDetails() {
  const { id } = useParams();
  const { isLoading, isError, data, refetch } = useAuctionData(id || '');
  const [editData, setEditData] = useState<EditData>({ data: {}, show: false });
  const { data: auctionData, refetch: auctionRefetch } = useGetAuctionsQuery({
    params: removeEmptyValues({
      auctionId: id,
    }),
  });
  const [viewSpecifications, setViewSpecifications] =
    useState<ViewSpecificationData>({
      data: {},
      show: false,
    });
  const [showMultiItemView, setShowMultiItemView] = useState<ViewMultiData>({
    data: { title: '' },
    show: false,
  });
  const auctionDataa = auctionData?.data?.[0];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data.</div>;

  const handleEdit = () => {
    setEditData({
      data: {
        ...auctionDataa,
        statusData: {
          value: auctionDataa?.status,
          label:
            (AuctionStatus &&
              AuctionStatus?.find(
                (status) => status.value === auctionDataa?.status
              )?.label) ||
            '',
        },
        productId: {
          value: auctionDataa?.product?._id,
          label: auctionDataa?.product?.title,
        },
        categoryIds: auctionDataa?.categories?.map((category: Category) => ({
          value: category._id,
          label: category?.name,
        })),
        bidStartDate: moment(auctionDataa.bidStartDate).format(
          DATE_FORMATS.DISPLAY_DATE_REVERSE
        ),
        reserveWaitingEndDate: moment(
          auctionDataa.reserveWaitingEndDate
        ).format(DATE_FORMATS.DISPLAY_DATE_REVERSE),
        images: auctionDataa?.images,
      },
      show: true,
    });
  };
  const handleEditSuccess = () => {
    setEditData({ data: null, show: false });
    refetch();
    auctionRefetch();
  };

  const handleCloseForm = () => {
    setEditData({ data: null, show: false });
    setViewSpecifications({ data: {}, show: false });
  };
  return (
    <div className="position-relative">
      <ViewMultiTableItem
        show={showMultiItemView}
        setShow={setShowMultiItemView}
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
      <DetailsWrapperEditableCard
        details={data}
        setViewSpecifications={setViewSpecifications}
        dataScema={AuctionColumn(setShowMultiItemView)}
      />
      {editData?.show && (
        <CustomModal
          title="Edit"
          show={editData?.show}
          onClose={handleCloseForm}
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
      <Button
        className="btn btn44 position-absolute auction-details-edit"
        onClick={handleEdit}
      >
        <img src={edit} alt={BUTTON_LABELS.EDIT} />
      </Button>
      {/* <Button className="btn btn-sm" onClick={saveChanges}>
        {BUTTON_LABELS.CANCEL}
      </Button> */}
      <BidsList auctionId={id} />
    </div>
  );
}
