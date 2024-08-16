import { Dropdown } from 'react-bootstrap';
import { DEFAULT_PROFILE } from '../../../../assets';

// Define the types for ProfileDropdown props
interface ProfileDropdownProps {
  userData: { profilePicture: string }; // Adjust the type based on your user data structure
  handleLogout: () => void;
}

function ProfileDropdown({ userData, handleLogout }: ProfileDropdownProps) {
  return (
    <Dropdown as="li" className="nav-item dropdown pe-3">
      <Dropdown.Toggle as="a" className="nav-link nav-icon overflow-hidden">
        <img
          src={userData?.profilePicture || DEFAULT_PROFILE}
          alt="Profile"
          className="rounded-circle avtar44 object-fit-cover"
          width="100%"
        />
        {/* Add more profile details here if needed */}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ProfileDropdown;
