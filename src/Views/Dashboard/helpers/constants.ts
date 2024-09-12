import { ROUTES } from '../../../Shared/constants';
import { NewUserIcon, UserIcon } from '../../../assets';

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

export default cardData;
