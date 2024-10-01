import { useLocation } from 'react-router-dom';
import { useGetUsersQuery } from '../../../Services/Api/module/users';
import UserProfile from './components/UserProfile';

export default function UserDetails() {
  const { state } = useLocation();

  const { data: userDetails } = useGetUsersQuery({
    params: { userId: state },
  });

  return <UserProfile userDetails={userDetails} />;
}
