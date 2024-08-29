import { ROUTES } from '../../../Shared/constants';
import {
  AuctionIcon,
  NewUserIcon,
  ReserveIcon,
  // SupportIcon,
  TotalBidIcon,
  UserIcon,
  bidsSold,
  earnings,
} from '../../../assets';

const cardData = [
  {
    icon: UserIcon,
    label: 'Total Users',
    field: 'totalUsers',
    isCurrency: false,
    redirectionRoute: ROUTES.USERS,
    percentageField: 'usersIncreasePercentage',
  },
  {
    icon: NewUserIcon,
    label: 'Active Users',
    field: 'activeUsers',
    isCurrency: false,
    redirectionRoute: ROUTES.USERS,
    percentageField: 'activeUsersIncreasePercentage',
  },
  // {
  //   icon: SupportIcon,
  //   label: 'Users Contacted Live Support',
  //   field: 'usersWhoContactedLiveSupport',
  //   isCurrency: false,
  //   percentageField: 'usersWhoContactedLiveSupportIncreasePercentage',
  // },
  {
    icon: TotalBidIcon,
    label: 'Total Bids',
    field: 'bidsCount',
    isCurrency: false,
    redirectionRoute: ROUTES.TRANSACTIONS_BIDS_HISTORY,
    percentageField: 'bidsCountIncreasePercentage',
  },
  {
    icon: AuctionIcon,
    label: 'Active Auctions',
    field: 'activeAuctions',
    isCurrency: false,
    redirectionRoute: ROUTES.AUCTION_MANAGEMENT,
    percentageField: 'activeAuctionsIncreasePercentage',
  },
  {
    icon: ReserveIcon,
    label: 'Auctions with Reserve Met',
    field: 'reservePriceMetAuctions',
    isCurrency: false,
    redirectionRoute: ROUTES.AUCTION_MANAGEMENT,
    percentageField: 'reservePriceMetAuctionsIncreasePercentage',
  },
  {
    icon: earnings,
    label: 'Earnings',
    field: 'earnings',
    isCurrency: true,
    redirectionRoute: ROUTES.TRANSACTIONS_PLANS_HISTORY,
    percentageField: 'earningsIncreasePercentage',
  },
  {
    icon: bidsSold,
    label: 'Sold Bids',
    field: 'soldBids',
    isCurrency: false,
    redirectionRoute: ROUTES.TRANSACTIONS_PLANS_HISTORY,
    percentageField: 'soldBidsIncreasePercentage',
  },
];

export default cardData;
