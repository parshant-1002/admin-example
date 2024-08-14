import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CustomTabs from '../../../Shared/components/CustomTabs';
import ProfileRelatedLists from './components/ProfileRelatedLists';
import UserProfile from './components/UserProfile';
import { UserDetailsTabs } from './helpers/constants';
import CustomModal from '../../../Shared/components/CustomModal';
import AddBidForm from './components/AddBidForm';
import Button from '../../../Shared/components/form/Button';
import { BUTTON_LABELS } from '../../../Shared/constants';

export default function UserDetails() {
  const { state } = useLocation();
  const [activeTab, setActiveTab] = useState(
    UserDetailsTabs.BIDS_PURCHASE_HISTORY
  );
  const [addData, setAddData] = useState<boolean>(false);
  const [callBidsCreditApi, setCallBidsCreditApi] = useState<boolean>(false);
  const handleAddSuccess = () => {
    setAddData(false);
    setCallBidsCreditApi(true);
  };

  const handleAddBids = () => {
    setAddData(true);
    setCallBidsCreditApi(false);
  };

  const userTabs = useMemo(() => Object.values(UserDetailsTabs), []);

  return (
    <div>
      {addData && (
        <CustomModal
          title="Add Bids"
          show={addData}
          onClose={() => setAddData(false)}
        >
          <div className="p-4">
            <AddBidForm
              initialData={{ userId: state }}
              onAdd={handleAddSuccess}
            />
          </div>
        </CustomModal>
      )}
      <div
        className="w-100 d-flex m-2 justify-content-end"
        onClick={handleAddBids}
      >
        <Button className="btn-pad-three mb-4" btnType="primary">
          {BUTTON_LABELS.ADD_BIDS}
        </Button>
      </div>
      <UserProfile userId={state} />
      <CustomTabs
        tabs={userTabs}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />
      <ProfileRelatedLists
        userId={state}
        currentTab={activeTab}
        callBidsCreditApi={callBidsCreditApi}
      />
    </div>
  );
}
