import { ROUTES } from '../../../Shared/constants';
import {
  AuctionIcon,
  NewUserIcon,
  ReserveIcon,
  SupportIcon,
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
    percentageField: 'totalUsersPercenatge',
  },
  {
    icon: NewUserIcon,
    label: 'Active Users',
    field: 'newUsers',
    isCurrency: false,
    redirectionRoute: ROUTES.USERS,
    percentageField: 'newUsersPercenatge',
  },
  {
    icon: SupportIcon,
    label: 'Users Contacted Live Support',
    field: 'usersWhoContactedLiveSupport',
    isCurrency: false,
    percentageField: 'usersWhoContactedLiveSupportPercentage',
  },
  {
    icon: TotalBidIcon,
    label: 'Total Bids',
    field: 'bidsCount',
    isCurrency: false,
    redirectionRoute: ROUTES.TRANSACTIONS_BIDS_HISTORY,
    percentageField: 'bidsCountPercentage',
  },
  {
    icon: AuctionIcon,
    label: 'Active Auctions',
    field: 'activeAuctions',
    isCurrency: false,
    redirectionRoute: ROUTES.AUCTION_MANAGEMENT,
    percentageField: 'activeAuctionsPercentage',
  },
  {
    icon: ReserveIcon,
    label: 'Auctions with Reserve Met',
    field: 'reservePriceMetAuctions',
    isCurrency: false,
    redirectionRoute: ROUTES.AUCTION_MANAGEMENT,
    percentageField: 'reservePriceMetAuctionsPercentage',
  },
  {
    icon: earnings,
    label: 'Earnings',
    field: 'earnings',
    isCurrency: true,
    redirectionRoute: ROUTES.TRANSACTIONS_PLANS_HISTORY,
    percentageField: 'earningsPercentage',
  },
  {
    icon: bidsSold,
    label: 'Sold Bids',
    field: 'soldBids',
    isCurrency: false,
    redirectionRoute: ROUTES.TRANSACTIONS_PLANS_HISTORY,
    percentageField: 'soldBidsPercentage',
  },
];

export default cardData;
