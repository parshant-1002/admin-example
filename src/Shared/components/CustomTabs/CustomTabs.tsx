/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import './CustomTabs.scss'; // Import your custom SCSS if needed

function CustomTabs({
  tabs,
  setActiveTab,
  activeTab,
}: {
  tabs: string[];
  setActiveTab: (tab: string) => void;
  activeTab: string;
}) {
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
          onClick={() => setActiveTab(tab)}
        >
          <a
            className={`text-center nav-link ${
              activeTab === tab ? 'text-white font-weight-bold' : 'text-dark'
            }`}
          >
            {tab}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default CustomTabs;
