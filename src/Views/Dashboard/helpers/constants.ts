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
    value: 5900,
    isCurrency: false,
    badge: { icon: profitIcon, percentage: '55%', color: 'bg-success' },
  },
  {
    icon: NewUserIcon,
    label: 'Active Users',
    value: 4900,
    isCurrency: false,
    badge: { icon: profitIcon, percentage: '55%', color: 'bg-success' },
  },
  {
    icon: SupportIcon,
    label: 'Users Contacted Live Support',
    value: 600,
    isCurrency: false,
    badge: { icon: profitIcon, percentage: '55%', color: 'bg-success' },
  },
  {
    icon: TotalBidIcon,
    label: 'Total Bids',
    value: 90,
    isCurrency: false,
    badge: { icon: profitIcon, percentage: '5%', color: 'bg-success' },
  },
  {
    icon: AuctionIcon,
    label: 'Active Auctions',
    value: 8500,
    isCurrency: false,
    badge: { icon: Lossicon, percentage: '5%', color: 'bg-danger' },
  },
  {
    icon: ReserveIcon,
    label: 'Auctions with Reserve Met',
    value: 800,
    isCurrency: false,
    badge: { icon: Lossicon, percentage: '12%', color: 'bg-danger' },
  },
  {
    icon: earnings,
    label: 'Earnings',
    value: 80000.009,
    isCurrency: true,
    badge: { icon: Lossicon, percentage: '12%', color: 'bg-danger' },
  },
  {
    icon: bidsSold,
    label: 'Sold Bids',
    value: 1700,
    isCurrency: false,
    badge: { icon: Lossicon, percentage: '12%', color: 'bg-danger' },
  },
];

export default cardData;
