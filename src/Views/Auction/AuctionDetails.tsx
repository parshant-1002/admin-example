// components/AuctionDetails.tsx
import { useParams } from 'react-router-dom';
import DetailsWrapperCard from '../../Shared/components/DetailsCard';
import { useAuctionData } from './helpers/useAuctionData';
import { AuctionColumn } from './helpers/constants';
// import { useAuctionData } from '../../hooks/useAuctionData';

export default function AuctionDetails() {
  const { id } = useParams();
  const { isLoading, isError, data, saveChanges } = useAuctionData(id || '');

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data.</div>;

  return (
    <div>
      <DetailsWrapperCard details={data} columns={AuctionColumn()} />
      <button onClick={saveChanges}>Save Changes</button>
    </div>
  );
}
