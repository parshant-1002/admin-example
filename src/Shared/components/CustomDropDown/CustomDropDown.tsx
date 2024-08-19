/* eslint-disable react/button-has-type */
// import { Dropdown } from 'react-bootstrap';
import './CustomDropDown.scss';

export interface SubmenuItem {
  buttonLabel: string;
  buttonAction: (row: unknown) => void;
  className?: string;
  icon?: string;
}

interface ActionsDropdownProps {
  toggleImage: string; // URL or path to the toggle image
  submenu?: SubmenuItem[]; // Array of submenu items
}

function CustomDropDown({ toggleImage, submenu }: ActionsDropdownProps) {
  console.log('🚀 ~ CustomDropDown ~ toggleImage:', toggleImage);
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

      <div className="d-flex gap-3">
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

export default CustomDropDown;
