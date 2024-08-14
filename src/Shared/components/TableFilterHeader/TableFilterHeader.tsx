/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
// libs
import React from 'react';

// consts
import { BUTTON_LABELS } from '../../constants';

// components
import CustomDropDown from '../CustomDropDown';
import TextField from '../form/TextInput/TextInput';
import Button from '../form/Button';
import { Filter } from '../../../assets';

// // styles
// import './style.scss';

// types
interface TableFilterHeaderProps {
  handleAddNew?: () => void;
  search?: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClearSearch: () => void;
  selectedIds?: string[];
  handleDeleteAll?: () => void;
  handleClearAll?: () => void;
  addButton?: boolean;
  // heading?: string;
}

function TableFilterHeader({
  handleAddNew,
  search = '',
  handleSearch,
  handleClearSearch,
  selectedIds = [],
  handleDeleteAll = () => {},
  handleClearAll = () => {},
  addButton = false,
}: TableFilterHeaderProps) {
  return (
    <div className="w-100 align-items-end align-items-md-end d-flex flex-md-row flex-column">
      <div className="col-md-4 col-xl-6 mb-2">
        {/* <h2 className="h5 mb-0">{heading}</h2> */}
      </div>

      <div className="col-md-8 col-xl-6 my-2">
        <div className="d-flex justify-content-end align-items-start stats_filter">
          {selectedIds?.length ? (
            <Button
              className="btn btn-sm btn-danger"
              btnType="primary"
              onClick={handleDeleteAll}
            >
              {BUTTON_LABELS.DELETE_ALL}
            </Button>
          ) : null}
          {selectedIds?.length ? (
            <Button
              className="btn btn-sm btn-secondary"
              btnType="primary"
              onClick={handleClearAll}
            >
              {BUTTON_LABELS.CLEAR_ALL}
            </Button>
          ) : null}
          <CustomDropDown
            toggleImage={Filter}
            submenu={[
              { buttonLabel: 'Category', buttonAction: () => {} },
              {
                buttonLabel: 'Date Range',
                buttonAction: () => {},
              },
            ]}
          />
          <div className="dark-form-control">
            <TextField
              type="text"
              placeholder="Search..."
              className="search-primary"
              value={search}
              onChange={handleSearch}
            />
            {search ? (
              <em className="cross-icon" onClick={handleClearSearch}>
                <img
                  src="" // Replace with an actual path or URL
                  alt=""
                  width={12}
                />
              </em>
            ) : null}
          </div>
          {addButton ? (
            <Button
              className="btn btn-pad-one"
              btnType="primary"
              onClick={handleAddNew}
            >
              {BUTTON_LABELS.ADD}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default TableFilterHeader;
