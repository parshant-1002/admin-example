/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
// libs
import React, { useRef, useState } from 'react';

// consts
import { BUTTON_LABELS } from '../../constants';

// components
import CustomDropDown from '../CustomDropDown';
import { SubmenuItem } from '../CustomDropDown/CustomDropDown';
import Button from '../form/Button';
import TextField from '../form/TextInput/TextInput';
import Breadcrumbs from '../layouts/components/breadcrumb';

// styles
import './style.scss';
import { Filter } from '../../../assets';

// types
interface StatsFiltersProps {
  setAddData?: () => void;
  handleClearAll?: () => void;
  search?: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClearSearch: () => void;
  selectedIds?: string[];
  handleDeleteAll?: () => void;
  submenu?: SubmenuItem[];
  filterToggleImage?: string;
}

function StatsFilters({
  setAddData,
  search = '',
  handleSearch,
  handleClearSearch, // heading = 'Transactions',
  selectedIds,
  handleDeleteAll,
  submenu,
  filterToggleImage,
  handleClearAll = () => {},
}: StatsFiltersProps) {
  const clearDateRangeFilterRef = useRef<HTMLButtonElement>(null);
  const [searchValue, setSearchValue] = useState('');
  const handleClear = () => {
    setSearchValue('');
    handleClearSearch();
    handleClearAll();
  };
  const handleClickAllData = () => {
    handleClear();
    if (clearDateRangeFilterRef.current) {
      clearDateRangeFilterRef.current.click();
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    handleSearch(e);
  };

  return (
    <div className="w-100 align-items-end align-items-md-end d-flex flex-md-row flex-column">
      <div className="col-md-4 col-xl-6">
        <Breadcrumbs />
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
          <CustomDropDown
            toggleImage={filterToggleImage || Filter}
            submenu={submenu}
          />
          <div className="dark-form-control">
            <TextField
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={handleSearchChange}
            />
            {search ? (
              <em className="cross-icon" onClick={handleClear}>
                <img
                  src="" // Replace with an actual path or URL
                  alt=""
                  width={12}
                />
              </em>
            ) : null}
          </div>
          {selectedIds?.length || searchValue ? (
            <Button
              className="btn btn-sm"
              btnType="secondary"
              onClick={handleClickAllData}
            >
              {BUTTON_LABELS.CLEAR_ALL}
            </Button>
          ) : null}
          {setAddData ? (
            <Button
              className="btn btn-sm"
              btnType="primary"
              onClick={() => setAddData()}
            >
              {BUTTON_LABELS.ADD}
            </Button>
          ) : null}
          {/* You may need to add the ref to the button or element you want to clear */}
          <button
            type="button"
            ref={clearDateRangeFilterRef}
            style={{ display: 'none' }}
          />
        </div>
      </div>
    </div>
  );
}

export default StatsFilters;
