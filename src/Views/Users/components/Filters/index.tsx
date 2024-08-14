/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
// libs
import React, { useRef } from 'react';

// consts

// components

// styles
import Button from '../../../../Shared/components/form/Button';
import TextField from '../../../../Shared/components/form/TextInput/TextInput';
import './style.scss';
import { BUTTON_LABELS } from '../../../../Shared/constants';
import FiltersDropDown from '../FiltersDropDown';

// types
interface StatsFiltersProps {
  search?: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClearSearch: () => void;
  selectedIds?: string[];
  handleDeleteAll: () => void;
  // heading?: string;
}

function StatsFilters({
  search = '',
  handleSearch,
  handleClearSearch, // heading = 'Transactions',
  selectedIds,
  handleDeleteAll,
}: StatsFiltersProps) {
  const clearDateRangeFilterRef = useRef<HTMLButtonElement>(null);

  const handleClickAllData = () => {
    handleClearSearch();
    if (clearDateRangeFilterRef.current) {
      clearDateRangeFilterRef.current.click();
    }
  };

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
              {BUTTON_LABELS.DELETE}
            </Button>
          ) : null}
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
                  src="/src/assets/icons/filter.svg" // Replace with an actual path or URL
                  alt="icon"
                  width={12}
                />
              </em>
            ) : null}
          </div>
          <FiltersDropDown />
          <Button
            className="btn-pad-two"
            btnType="outline"
            onClick={handleClickAllData}
          >
            {BUTTON_LABELS.CLEAR}
          </Button>

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
