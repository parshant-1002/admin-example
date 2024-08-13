import { useEffect } from 'react';
import { useGetBidsSpentHistoryQuery } from '../../../../../Services/Api/module/auctions';
import { removeEmptyValues } from '../../../../../Shared/utils/functions';

export default function AuctionBidsDetails({
  selectedAuctionId,
}: {
  selectedAuctionId: string | number;
}) {
  const { data: userBidsSpentHistory, refetch } = useGetBidsSpentHistoryQuery({
    params: removeEmptyValues({
      auctionId: selectedAuctionId,
    } as unknown as Record<string, unknown>),
  });
  useEffect(() => {
    if (selectedAuctionId) {
      refetch();
    }
  }, [refetch, selectedAuctionId]);
  console.log(userBidsSpentHistory, 'userBidsSpentHistory');
  return <div>AuctionBidsDetails</div>;
}
