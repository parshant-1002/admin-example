import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CustomModal from '../../../Shared/components/CustomModal';
import CustomTabs from '../../../Shared/components/CustomTabs';
import Filters from '../../../Shared/components/Filters';
import { BUTTON_LABELS, FilterOrder } from '../../../Shared/constants';
import AddBidForm from './components/AddBidForm';
import ProfileRelatedLists from './components/ProfileRelatedLists';
import UserProfile from './components/UserProfile';
import { UserDetailsTabs } from './helpers/constants';

export default function UserDetails() {
  const { state } = useLocation();
  const [activeTab, setActiveTab] = useState(
    UserDetailsTabs.BIDS_PURCHASE_HISTORY
  );
  const [search, setSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(0);
  const [sortKey, setSortKey] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<FilterOrder>(
    FilterOrder.ASCENDING
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

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSearch('');
    setCurrentPage(0);
    setSortKey('');
    setSortDirection(FilterOrder.ASCENDING);
  };
  return (
    <>
      {addData && (
        <CustomModal
          title="Add Bids"
          show={addData}
          onClose={() => setAddData(false)}
        >
          <AddBidForm
            initialData={{ userId: state }}
            onAdd={handleAddSuccess}
          />
        </CustomModal>
      )}
      <Filters
        showSearch={false}
        addButtonLabel={BUTTON_LABELS.ADD_BIDS}
        setAddData={handleAddBids}
        showFiltersToggle={false}
      />
      <UserProfile userId={state} />
      <div className="mt-4 mt-lg-5 tab-with-filter">
        <CustomTabs
          tabs={userTabs}
          setActiveTab={handleTabChange}
          activeTab={activeTab}
        />
        <ProfileRelatedLists
          search={search}
          setSearch={setSearch}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          sortKey={sortKey}
          sortDirection={sortDirection}
          setSortKey={setSortKey}
          setSortDirection={setSortDirection}
          userId={state}
          currentTab={activeTab}
          callBidsCreditApi={callBidsCreditApi}
        />
      </div>
    </>
  );
}
