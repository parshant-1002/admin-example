import { ROUTES } from '../../../Shared/constants';
import {
  AuctionIcon,
  Lossicon,
  NewUserIcon,
  ReserveIcon,
  SupportIcon,
  TotalBidIcon,
  UserIcon,
  bidsSold,
  earnings,
  profitIcon,
} from '../../../assets';

const cardData = [
  {
    icon: UserIcon,
    label: 'Total Users',
    field: 'totalUsers',
    isCurrency: false,
    redirectionRoute: ROUTES.USERS,
    badge: { icon: profitIcon, percentage: '55%', color: 'bg-success' },
  },
  {
    icon: NewUserIcon,
    label: 'Active Users',
    field: 'newUsers',
    isCurrency: false,
    redirectionRoute: ROUTES.USERS,
    badge: { icon: profitIcon, percentage: '55%', color: 'bg-success' },
  },
  {
    icon: SupportIcon,
    label: 'Users Contacted Live Support',
    field: 'usersWhoContactedLiveSupport',
    isCurrency: false,
    badge: { icon: profitIcon, percentage: '55%', color: 'bg-success' },
  },
  {
    icon: TotalBidIcon,
    label: 'Total Bids',
    field: 'bidsCount',
    isCurrency: false,
    redirectionRoute: ROUTES.TRANSACTIONS_BIDS_HISTORY,
    badge: { icon: profitIcon, percentage: '5%', color: 'bg-success' },
  },
  {
    icon: AuctionIcon,
    label: 'Active Auctions',
    field: 'activeAuctions',
    isCurrency: false,
    redirectionRoute: ROUTES.AUCTION_MANAGEMENT,
    badge: { icon: Lossicon, percentage: '5%', color: 'bg-danger' },
  },
  {
    icon: ReserveIcon,
    label: 'Auctions with Reserve Met',
    field: 'reservePriceMetAuctions',
    isCurrency: false,
    redirectionRoute: ROUTES.AUCTION_MANAGEMENT,
    badge: { icon: Lossicon, percentage: '12%', color: 'bg-danger' },
  },
  {
    icon: earnings,
    label: 'Earnings',
    field: 'earnings',
    isCurrency: true,
    redirectionRoute: ROUTES.TRANSACTIONS_PLANS_HISTORY,
    badge: { icon: Lossicon, percentage: '12%', color: 'bg-danger' },
  },
  {
    icon: bidsSold,
    label: 'Sold Bids',
    field: 'soldBids',
    isCurrency: false,
    redirectionRoute: ROUTES.TRANSACTIONS_PLANS_HISTORY,
    badge: { icon: Lossicon, percentage: '12%', color: 'bg-danger' },
  },
];

export default cardData;
