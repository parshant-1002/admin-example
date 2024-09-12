import { Dropdown } from 'react-bootstrap';
import { actions } from '../../../assets';
import './CustomFilterIcons.scss';

// Define the schema for the submenu items
export interface SubmenuItem<T> {
  buttonLabel: string;
  buttonAction: (row: T) => void;
  className?: string;
  icon?: string;
  isPrimary?: boolean;
  isDanger?: boolean;
}

interface CustomFilterIconsProps<T> {
  row: T; // The row data associated with the actions
  schema: SubmenuItem<T>[]; // Array of submenu items (actions)
  isDropDown?: boolean; // Determines the display mode
}

function CustomFilterIcons<T>({
  row,
  schema,
  isDropDown,
}: CustomFilterIconsProps<T>) {
  // Function to determine the class for each button based on conditions
  const getButtonClass = (
    isPrimary: boolean = false,
    isDanger: boolean = false
  ): string => {
    if (isDropDown) {
      return isPrimary ? 'text-primary' : 'text-danger';
    }

    const baseClass = 'btn44 btn';
    const buttonTypeClass = isDanger ? 'btn-danger' : 'btn-primary';

    return `${baseClass} ${buttonTypeClass}`;
  };

  return isDropDown ? (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic" className="btn-transparent btn">
        <span className="text-primary">
          <img src={actions} alt="Actions" width={30} />
        </span>
      </Dropdown.Toggle>

      <Dropdown.Menu className="filter-menu">
        {schema.map((item) => (
          <Dropdown.Item
            key={item.buttonLabel}
            onClick={() => item.buttonAction(row)}
            className={
              item.className || getButtonClass(item.isPrimary, item.isDanger)
            }
          >
            {item.buttonLabel}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  ) : (
    <div>
      <div className="d-flex gap-sm-3 gap-2 justify-content-end">
        {schema.map((item) => (
          <button
            type="button"
            key={item.buttonLabel}
            onClick={() => item.buttonAction(row)}
            className={
              item.className || getButtonClass(item.isPrimary, item.isDanger)
            }
          >
            {item?.icon ? (
              <img src={item?.icon} alt={item.buttonLabel} width={10} />
            ) : (
              item.buttonLabel
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CustomFilterIcons;
