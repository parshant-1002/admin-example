/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Accordion } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { ROUTES } from '../../../constants';
import SIDEBAR_NAV from './routes';
import './style.scss';

interface SidebarItem {
  label: string;
  iconClass?: string;
  icon?: string;
  route?: string;
  children?: SidebarItem[];
  isOnClick?: boolean;
}

function Sidebar() {
  const sidebarNavRef = useRef<HTMLUListElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 1200);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1200;
      setIsMobile(mobile);
      if (sidebarNavRef.current) {
        sidebarNavRef.current.classList.toggle('below-mac', mobile);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarNavRef.current?.classList.contains('below-mac') &&
        sidebarNavRef.current &&
        !sidebarNavRef.current.contains(event.target as Node) &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setActiveAccordion(null);
      }
    };

    const handleDropdownItemClick = (event: MouseEvent) => {
      if (
        sidebarNavRef.current?.classList.contains('below-mac') &&
        (event.target as HTMLElement).classList.contains('dropdown-item')
      ) {
        setActiveAccordion(null);
      }
    };

    handleResize(); // Initial check on mount

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('click', handleDropdownItemClick);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('click', handleDropdownItemClick);
      if (sidebarNavRef.current) {
        sidebarNavRef.current.classList.remove('below-mac'); // Clean up on unmount
      }
    };
  }, []);

  const handleButtonClick = (item: SidebarItem) => {
    if (item.label === 'Logout') {
      // Implement logout functionality
    }
  };

  const toggleAccordion = (label: string) => {
    setActiveAccordion((prevActive) => (prevActive === label ? null : label));
  };

  const handleItemClick = () => {
    if (isMobile) {
      setActiveAccordion(null);
    }
  };

  const mapChilds = useCallback(
    (sidebar: SidebarItem, childrens: SidebarItem[]) => {
      return (
        <li className="nav-item" key={`sidebar-${sidebar.label}`}>
          <Accordion activeKey={activeAccordion === sidebar.label ? '0' : ''}>
            <Accordion.Item eventKey="0">
              <Accordion.Header onClick={() => toggleAccordion(sidebar.label)}>
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
                        <button
                          type="button"
                          className="dropdown-item"
                          onClick={handleItemClick}
                        >
                          {children.label}
                        </button>
                      ) : (
                        <NavLink
                          className="dropdown-item d-flex"
                          to={children.route || ''}
                          onClick={handleItemClick}
                        >
                          <>
                            <figure className="me-3">
                              <svg
                                fill="#ffffff66"
                                viewBox="0 0 56 56"
                                height="15px"
                                width="15px"
                                xmlns="http://www.w3.org/2000/svg"
                                stroke="#ffffff"
                              >
                                <path d="M 27.9883 52 C 29.2774 52 29.9336 51.1328 31.2461 49.3516 L 45.2383 30.6719 C 45.8711 29.8047 46.2461 28.9375 46.2461 28 C 46.2461 27.0390 45.8711 26.1953 45.2383 25.3281 L 31.2461 6.6250 C 29.9336 4.8672 29.2774 4.0000 27.9883 4.0000 C 26.7227 4.0000 26.0664 4.8672 24.7539 6.6250 L 10.7617 25.3281 C 10.1289 26.1953 9.7539 27.0390 9.7539 28 C 9.7539 28.9375 10.1289 29.8047 10.7617 30.6719 L 24.7539 49.3516 C 26.0664 51.1328 26.7227 52 27.9883 52 Z M 27.9883 47.0547 C 27.8945 47.0547 27.8242 46.9844 27.7774 46.8672 L 14.2070 28.6328 C 13.9961 28.3750 13.9727 28.1875 13.9727 28 C 13.9727 27.8125 13.9961 27.6250 14.2070 27.3672 L 27.7774 9.1094 C 27.8242 9.0156 27.8945 8.9453 27.9883 8.9453 C 28.1055 8.9453 28.1758 9.0156 28.2227 9.1094 L 41.7930 27.3672 C 42.0039 27.6250 42.0274 27.8125 42.0274 28 C 42.0274 28.1875 42.0039 28.3750 41.7930 28.6328 L 28.2227 46.8672 C 28.1758 46.9844 28.1055 47.0547 27.9883 47.0547 Z" />
                              </svg>
                            </figure>
                            {children.label}
                          </>
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
    [activeAccordion, handleItemClick]
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
    <aside id="sidebar" className="sidebar" ref={sidebarRef}>
      <Link
        to={ROUTES.HOMEPAGE}
        className="text-center py-2 w-100 d-block aside_logo"
      >
        <h4 className="admin-brand-logo text-center d-none d-xl-block">
          Penny Auction
        </h4>
      </Link>
      <ul
        className="sidebar-nav mt-3 pt-4 pt-xl-0"
        id="sidebar-nav"
        ref={sidebarNavRef}
      >
        {sidebar}
      </ul>
    </aside>
  );
}

export default Sidebar;
