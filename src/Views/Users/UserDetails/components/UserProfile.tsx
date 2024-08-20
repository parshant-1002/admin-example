import CustomDetailsBoard from '../../../../Shared/components/CustomDetailsBoard';
import { USER_DETAILS_SCHEMA } from '../helpers/constants';

function UserProfile({
  userDetails,
}: {
  userDetails: { data: { data: unknown[] } };
}) {
  const userData = userDetails?.data?.data?.[0] || {};

  return <CustomDetailsBoard schema={USER_DETAILS_SCHEMA} data={userData} />;
}

export default UserProfile;
