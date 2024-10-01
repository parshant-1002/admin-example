import { useLocation } from 'react-router-dom';
import Filters from '../../../Shared/components/Filters';
import { BUTTON_LABELS } from '../../../Shared/constants/constants';
import { useGetUsersQuery } from '../../../Services/Api/module/users';
import UserProfile from './components/UserProfile';

export default function UserDetails() {
  const { state } = useLocation();

  const { data: userDetails } = useGetUsersQuery({
    params: { userId: state },
  });

  return (
    <>
      <Filters
        showSearch={false}
        addButtonLabel={BUTTON_LABELS.ADD_BIDS}
        showFiltersToggle={false}
      />
      <UserProfile userDetails={userDetails} />
    </>
  );
}
