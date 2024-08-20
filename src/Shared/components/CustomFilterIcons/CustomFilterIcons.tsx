/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/button-has-type */
// import { Dropdown } from 'react-bootstrap';
import './CustomFilterIcons.scss';

export interface SubmenuItem {
  buttonLabel: string;
  buttonAction: (row: unknown) => void;
  className?: string;
  icon?: string;
}

interface ActionsDropdownProps {
  submenu?: SubmenuItem[]; // Array of submenu items
}

function CustomFilterIcons({ submenu }: ActionsDropdownProps) {
  return (
    // <Dropdown>
    //   <Dropdown.Toggle id="dropdown-basic" className="btn-transparent btn">
    //     <span className="text-primary">
    //       <img src={toggleImage} alt="Actions" width={30} />
    //     </span>
    //   </Dropdown.Toggle>

    //   <Dropdown.Menu>
    //     {submenu?.map((item) => (
    //       <Dropdown.Item
    //         key={item.buttonLabel}
    //         onClick={item.buttonAction}
    //         className={item.className}
    //       >
    //         {item.buttonLabel}
    //       </Dropdown.Item>
    //     ))}
    //   </Dropdown.Menu>
    // </Dropdown>
    <div>
      {/* <Dropdown.Toggle id="dropdown-basic" className="btn-transparent btn">
        <span className="text-primary">
          <img src={toggleImage} alt="Actions" width={30} />
        </span>
      </Dropdown.Toggle> */}

      <div className="d-flex gap-sm-3 gap-2 justify-content-end">
        {submenu?.map((item) => (
          <button
            key={item.buttonLabel}
            onClick={item.buttonAction}
            className={item.className}
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
