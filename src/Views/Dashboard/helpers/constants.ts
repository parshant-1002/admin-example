import { ROUTES } from '../../../Shared/constants/constants';
import { NewUserIcon, UserIcon } from '../../../assets';

// Constants for button labels
const TODAY = 'Today';
const YESTERDAY = 'Yesterday';
const SEVEN_DAYS = '7 days';
const THIS_MONTH = 'This month';
const LAST_MONTH = 'Last month';
const THIS_YEAR = 'This year';

const BUTTON_LABELS = {
  TODAY,
  YESTERDAY,
  SEVEN_DAYS,
  THIS_MONTH,
  LAST_MONTH,
  THIS_YEAR,
} as const;

const DateRange = {
  DAY: 'days',
  MONTH: 'month',
  YEAR: 'year',
  SEVEN_DAYS: 7,
  ONE_DAY: 1,
};

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
];

export { cardData, BUTTON_LABELS, DateRange };
