import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CustomTabs from '../../../Shared/components/CustomTabs';
import ProfileRelatedLists from './components/ProfileRelatedLists';
import UserProfile from './components/UserProfile';
import { UserDetailsTabs } from './helpers/constants';

export default function UserDetails() {
  const { state } = useLocation();
  const [activeTab, setActiveTab] = useState(
    UserDetailsTabs.BIDS_PURCHASE_HISTORY
  );
  const userTabs = Object.values(UserDetailsTabs);

  return (
    <div>
      <UserProfile userId={state} />
      <CustomTabs
        tabs={userTabs}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />
      <ProfileRelatedLists userId={state} currentTab={activeTab} />
    </div>
  );
}
