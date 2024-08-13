import { useGetUsersQuery } from '../../../../Services/Api/module/users';
import CustomDetailsBoard from '../../../../Shared/components/CustomDetailsBoard';
import { USER_DETAILS_SCHEMA } from '../helpers/constants';

function UserProfile({ userId }: { userId: string }) {
  const { data } = useGetUsersQuery({
    params: { userId },
  });

  const userData = data?.data?.data?.[0] || {};

  return <CustomDetailsBoard schema={USER_DETAILS_SCHEMA} data={userData} />;
}

export default UserProfile;
