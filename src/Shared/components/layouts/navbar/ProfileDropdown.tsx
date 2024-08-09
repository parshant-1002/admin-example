import { Dropdown } from 'react-bootstrap';

// Define the types for ProfileDropdown props
interface ProfileDropdownProps {
  userData: { profilePicture: string }; // Adjust the type based on your user data structure
  handleLogout: () => void;
}

function ProfileDropdown({ userData, handleLogout }: ProfileDropdownProps) {
  return (
    <Dropdown as="li" className="nav-item dropdown pe-3">
      <Dropdown.Toggle as="a" className="nav-link nav-icon">
        <img
          src={userData?.profilePicture || 'default-profile.png'}
          alt="Profile"
          className="rounded-circle"
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
