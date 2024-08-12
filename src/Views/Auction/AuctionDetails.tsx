// libs
import { useParams } from 'react-router-dom';
import { useGetAuctionDetailsQuery } from '../../Services/Api/module/auction';

export default function AuctionDetails() {
  const { id } = useParams();
  // query
  const { data: auctionDetail } = useGetAuctionDetailsQuery({
    params: {
      auctionId: id,
    },
  });

  return (
    <div>
      <span>data : {auctionDetail.data}</span>
    </div>
  );
}
