/* eslint-disable jsx-a11y/alt-text */
import React, { useCallback, useMemo } from 'react';
import { Accordion } from 'react-bootstrap';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './style.scss';
import SIDEBAR_NAV from './routes';
import { ROUTES } from '../../../constants';

// Define types for sidebar items and props
interface SidebarItem {
  label: string;
  iconClass?: string;
  icon?: string;
  route?: string;
  children?: SidebarItem[];
  isOnClick?: boolean;
}

function Sidebar() {
  const location = useLocation();

  const handleButtonClick = (item: SidebarItem) => {
    if (item.label === 'Logout') {
      // Implement logout functionality
    }
  };

  const mapChilds = useCallback(
    (sidebar: SidebarItem, childrens: SidebarItem[]) => {
      const findIndex = childrens.findIndex(
        (children) => children.route === location.pathname
      );
      return (
        <li className="nav-item" key={`sidebar-${sidebar.label}`}>
          <Accordion defaultActiveKey={findIndex > -1 ? '0' : ''}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <span className="curve-top" />
                <span className="curve-bottom" />
                {sidebar.iconClass && <i className={sidebar.iconClass} />}
                {sidebar.icon && (
                  <img width={18} className="me-2" src={sidebar.icon} />
                )}
                {sidebar.label}
              </Accordion.Header>
              <Accordion.Body className="nav-content collapse show">
                <ul className="sub-menu">
                  {childrens.map((children) => (
                    <li key={`sidebar-${children.label}-`}>
                      {children?.isOnClick ? (
                        <button type="button" className="dropdown-item">
                          {children.label}
                        </button>
                      ) : (
                        <NavLink
                          className="dropdown-item"
                          to={children.route || ''}
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
    },
    [location.pathname]
  );

  const recursiveSidebar = useCallback(
    (menues?: SidebarItem[]) =>
      menues?.map((sidebar) => {
        if (sidebar?.children) {
          return mapChilds(sidebar, sidebar.children);
        }
        return (
          <React.Fragment key={`sidebar-${sidebar.label}`}>
            {sidebar.route ? (
              <li className="nav-item">
                <NavLink className="nav-link" to={sidebar.route}>
                  <span className="curve-top" />
                  <span className="curve-bottom" />
                  {sidebar.iconClass && <i className={sidebar.iconClass} />}
                  {sidebar.icon && (
                    <img width={18} className="me-2" src={sidebar.icon} />
                  )}
                  {sidebar.label}
                </NavLink>
              </li>
            ) : (
              <li className="nav-item">
                <button
                  className="nav-link"
                  type="button"
                  onClick={() => handleButtonClick(sidebar)}
                >
                  <em>
                    {sidebar.iconClass && <i className={sidebar.iconClass} />}
                    {sidebar.icon && (
                      <img width={18} className="me-2" src={sidebar.icon} />
                    )}
                  </em>
                  {sidebar.label}
                </button>
              </li>
            )}
          </React.Fragment>
        );
      }),
    [mapChilds]
  );
  const sidebar = useMemo(
    () => recursiveSidebar(SIDEBAR_NAV),
    [recursiveSidebar]
  );
  return (
    <aside id="sidebar" className="sidebar">
      <Link
        to={ROUTES.HOMEPAGE}
        className="text-center py-2 w-100 d-block aside_logo"
      >
        <h4 className="admin-brand-logo text-center d-none d-xl-block">Penny Auction</h4>
        {/* <img src={Logo} alt="Logo" width={180} /> */}
      </Link>
      <ul className="sidebar-nav mt-3 pt-4 pt-xl-0" id="sidebar-nav">
        {sidebar}
      </ul>
    </aside>
  );
}

export default Sidebar;
