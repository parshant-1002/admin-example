import './CustomTabs.scss'; // Import your custom SCSS if needed

interface CustomTabsType {
  tabs: string[];
  setActiveTab: (tab: string) => void;
  activeTab: string;
}
function CustomTabs({
  tabs,
  setActiveTab,
  activeTab,
}: Readonly<CustomTabsType>) {
  return (
    <ul className="nav nav-tabs mt-3 mx-0 mb-3 flex-column flex-lg-row bg-white border d-flex">
      {tabs?.map((tab: string) => (
        <li
          key={tab}
          className={
            activeTab === tab
              ? `nav-item active text-center col-lg-${Math.floor(
                  12 / tabs.length
                )}`
              : `nav-item  col-lg-${Math.floor(12 / tabs.length)}`
          }
        >
          <button
            onClick={() => setActiveTab(tab)}
            type="button"
            className={`text-center nav-link ${
              activeTab === tab ? 'text-white font-weight-bold' : 'text-dark'
            }`}
          >
            {tab}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default CustomTabs;
