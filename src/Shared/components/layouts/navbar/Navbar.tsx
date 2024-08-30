/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// import { logoutRequest } from '../../../../../store/actions/auth';
// import { ROUTES } from '../../../../constants/routes';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useLogoutMutation } from '../../../../Services/Api/module/auth';
import { RootState } from '../../../../Store';
import { updateAuthTokenRedux } from '../../../../Store/Common';
import NotificationModal from '../../../../Views/NotificationModal';
import NotificationToast from '../../../../Views/NotificationToast';
import ProfileDropdown from './ProfileDropdown';
import './navbar.scss';

function Navbar() {
  const userData = useSelector((state: RootState) => state?.common?.userData);
  const unseenCount = useSelector(
    (state: RootState) => state?.unseenCount?.count
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const [notificationListingData, setNotificationListingData] = useState(false);
  const onSuccess = (data: { message: string }) => {
    toast.success(data?.message);
    dispatch(updateAuthTokenRedux({ token: null }));
    navigate('/');
  };

  const handleLogout = async () => {
    try {
      await logout({ onSuccess });
    } catch {
      toast.error('Error in Logout');
    }
  };

  const toggleSidebar = () => {
    document.body.classList.toggle('toggle-sidebar');
  };

  return (
    <header
      id="header"
      className="header fixed-top d-flex align-items-center ms-auto"
    >
      <NotificationToast />

      <div className="d-flex align-items-center justify-content-between">
        <div
          aria-label="Hide Sidebar"
          className="d-flex text-center position-relative align-items-center sidemenu-toggle header-link animated-arrow hor-toggle horizontal-navtoggle"
          data-bs-toggle="sidebar"
          onClick={toggleSidebar}
          // href="/spruha-js/preview/apps/tables/tables/"
        >
          <span />
        </div>
        <Link to="/" className="logo d-flex align-items-center">
          {/* <img src="assets/img/logo.png" alt="Logo" /> */}
          <h4 className="admin-brand-logo ms-xl-4">Penny Auction</h4>
        </Link>
        <i className="bi bi-list toggle-sidebar-btn" onClick={toggleSidebar} />
      </div>
      <nav className="header-nav ms-auto">
        <ul className="d-flex gap-2 align-items-center">
          <button
            onClick={() => {
              setNotificationListingData(!notificationListingData);
            }}
            type="button"
            className="custom-close-button position-relative"
          >
            {unseenCount ? (
              <div className="unseen-count">{unseenCount}</div>
            ) : null}
            <svg
              className="icon"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
          </button>
          <li className="nav-item d-block d-lg-none">
            <Link className="nav-link nav-icon search-bar-toggle " to="#">
              <i className="bi bi-search" />
            </Link>
          </li>
          {userData && (
            <ProfileDropdown handleLogout={handleLogout} userData={userData} />
          )}
        </ul>
      </nav>
      {notificationListingData ? (
        <NotificationModal
          handleChange={() => {
            setNotificationListingData(!notificationListingData);
          }}
        />
      ) : null}
    </header>
  );
}

export default Navbar;
