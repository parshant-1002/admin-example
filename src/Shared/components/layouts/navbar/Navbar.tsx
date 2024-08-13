/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// import { logoutRequest } from '../../../../../store/actions/auth';
// import { ROUTES } from '../../../../constants/routes';
import { toast } from 'react-toastify';
import { useLogoutMutation } from '../../../../Services/Api/module/auth';
import { updateAuthTokenRedux } from '../../../../Store/Common';
import ProfileDropdown from './ProfileDropdown';
import './navbar.scss';

// Define the state type for useSelector
interface RootState {
  common: {
    userData: { profilePicture: string }; // Adjust the type based on your user data structure
  };
}

function Navbar() {
  const userData = useSelector((state: RootState) => state?.common?.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
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
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <Link to="" className="logo d-flex align-items-center">
          {/* <img src="assets/img/logo.png" alt="Logo" /> */}
          <h4 className="admin-brand-logo ms-xl-4">Penny Auction Admin</h4>
        </Link>
        <i className="bi bi-list toggle-sidebar-btn" onClick={toggleSidebar} />
      </div>

      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
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
    </header>
  );
}

export default Navbar;
