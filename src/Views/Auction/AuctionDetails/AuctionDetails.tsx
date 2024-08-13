// components/AuctionDetails.tsx
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
// import { DateRange } from 'react-date-range';
import { useState } from 'react';
import DetailsWrapperCard from '../../../Shared/components/DetailsCard';
import { useAuctionData } from '../helpers/useAuctionData';
import { AuctionColumn } from '../helpers/constants';
import BidsList from './BidsList';
import { BUTTON_LABELS } from '../../../Shared/constants';
import { ViewMultiData } from '../../Products/helpers/model';
import ViewMultiTableItem from '../../Products/components/ViewMultiTableItem';
// import { useAuctionData } from '../../hooks/useAuctionData';

export default function AuctionDetails() {
  const { id } = useParams();
  const { isLoading, isError, data, saveChanges } = useAuctionData(id || '');
  const [showMultiItemView, setShowMultiItemView] = useState<ViewMultiData>({
    data: { title: '' },
    show: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data.</div>;

  return (
    <div>
      <ViewMultiTableItem
        show={showMultiItemView}
        setShow={setShowMultiItemView}
      />
      <DetailsWrapperCard
        details={data}
        dataScema={AuctionColumn(setShowMultiItemView)}
      />

      <Button className="btn btn-sm" onClick={saveChanges}>
        {BUTTON_LABELS.SAVE}
      </Button>
      <Button className="btn btn-sm" onClick={saveChanges}>
        {BUTTON_LABELS.CANCEL}
      </Button>

      {/* <div className="calendar-container">
        <DateRange
          editableDateInputs
          onChange={(change) => {
          }}
          ranges={[
            {
              startDate: new Date(),
              endDate: new Date(),
              key: 'selection',
            },
          ]}
        />
      </div> */}
      {/* <button type="button" onClick={saveChanges}>
        Save Changes
      </button>
      <button type="button" onClick={saveChanges}>
        Cancel Changes
      </button> */}
      <BidsList auctionId={id} />
    </div>
  );
}
