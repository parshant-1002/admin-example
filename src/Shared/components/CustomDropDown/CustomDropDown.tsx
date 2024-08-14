import { Dropdown } from 'react-bootstrap';
import './CustomDropDown.scss';

export interface SubmenuItem {
  buttonLabel: string;
  buttonAction: (row: unknown) => void;
  className?: string;
}

interface ActionsDropdownProps {
  toggleImage: string; // URL or path to the toggle image
  submenu?: SubmenuItem[]; // Array of submenu items
}

function CustomDropDown({ toggleImage, submenu }: ActionsDropdownProps) {
  return (
    <Dropdown>
      <Dropdown.Toggle
        id="dropdown-basic"
        className="btn-primary btn btn-pad-two"
      >
        <span className="text-primary">
          <img src={toggleImage} alt="Actions" width={30} />
        </span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {submenu?.map((item) => (
          <Dropdown.Item
            key={item.buttonLabel}
            onClick={item.buttonAction}
            className={item.className}
          >
            {item.buttonLabel}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default CustomDropDown;
