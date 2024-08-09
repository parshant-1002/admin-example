import React from 'react';
import { Accordion } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import './style.scss';

// Define types for sidebar items and props
interface SidebarItem {
  label: string;
  iconClass?: string;
  icon?: string;
  route?: string;
  children?: SidebarItem[];
  isOnClick?: boolean;
}

interface SidebarProps {
  items?: SidebarItem[];
}

function Sidebar({ items }: SidebarProps) {
  const location = useLocation();

  const handleButtonClick = (item: SidebarItem) => {
    if (item.label === 'Logout') {
      // Implement logout functionality
    }
  };

  const mapChilds = (sidebar: SidebarItem, childrens: SidebarItem[]) => {
    const findIndex = childrens.findIndex(
      (children) => children.route === location.pathname
    );
    return (
      <li className="nav-item" key={`sidebar-${sidebar.label}`}>
        <Accordion defaultActiveKey={findIndex > -1 ? '0' : ''}>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              {sidebar.iconClass && <i className={sidebar.iconClass} />}
              {sidebar.icon && (
                <img width={18} className="me-2" src={sidebar.icon} alt="" />
              )}
              {sidebar.label}
            </Accordion.Header>
            <Accordion.Body className="nav-content collapse show">
              <ul className="sub-menu">
                {childrens.map((children) => (
                  <li key={`sidebar-${children.label}`}>
                    {children?.isOnClick ? (
                      <button
                        type="button"
                        className="dropdown-item"
                        onClick={() => handleButtonClick(children)}
                      >
                        {children.label}
                      </button>
                    ) : (
                      <NavLink
                        className="dropdown-item"
                        to={children.route || '#'}
                      >
                        {children.label}
                      </NavLink>
                    )}
                  </li>
                ))}
              </ul>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </li>
    );
  };

  const recursiveSidebar = (menues?: SidebarItem[]) =>
    menues?.map((sidebar) => {
      if (sidebar?.children) {
        return mapChilds(sidebar, sidebar.children);
      }
      return (
        <React.Fragment key={`sidebar-${sidebar.label}`}>
          <li className="nav-item">
            <NavLink className="nav-link" to={sidebar.route || '#'}>
              {sidebar.iconClass && <i className={sidebar.iconClass} />}
              {sidebar.icon && (
                <img width={18} className="me-2" src={sidebar.icon} alt="" />
              )}
              {sidebar.label}
            </NavLink>
          </li>
        </React.Fragment>
      );
    });

  return (
    <aside className="sidebar">
      {/* <Logo /> */}
      <ul className="nav-list">{recursiveSidebar(items)}</ul>
    </aside>
  );
}

export default Sidebar;
