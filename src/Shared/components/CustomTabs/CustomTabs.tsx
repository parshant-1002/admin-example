/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Dispatch, SetStateAction } from 'react';
import './CustomTabs.scss'; // Import your custom SCSS if needed

function CustomTabs({
  tabs,
  setActiveTab,
  activeTab,
}: {
  tabs: string[];
  setActiveTab: Dispatch<SetStateAction<string>>;
  activeTab: string;
}) {
  return (
    <ul className="nav nav-tabs mt-3 bg-white row mx-1 rounded">
      {tabs?.map((tab: string) => (
        <li
          key={tab}
          className={` col-${Math.floor(12 / tabs.length)} ${
            activeTab === tab ? 'nav-item-active' : 'nav-item'
          }`}
          onClick={() => setActiveTab(tab)}
        >
          <a
            className={`nav-link ${
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
