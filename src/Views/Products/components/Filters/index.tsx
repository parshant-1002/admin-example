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
  setAddData: (bool: boolean) => void;
  search?: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClearSearch: () => void;
  // heading?: string;
}

function StatsFilters({
  setAddData,
  search = '',
  handleSearch,
  handleClearSearch, // heading = 'Transactions',
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
          {/* <div className="dark-form-control">
            <Select
              options={TRANSACTION_STATUS}
              value={status}
              onChange={setStatus}
              className="form-control"
            />
          </div> */}
          <FiltersDropDown />
          <div className="dark-form-control">
            <TextField
              type="text"
              placeholder="Search..."
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
          <Button
            className="btn btn-sm"
            btnType="primary"
            onClick={handleClickAllData}
          >
            {BUTTON_LABELS.CLEAR}
          </Button>
          <Button
            className="btn btn-sm"
            btnType="primary"
            onClick={() => setAddData(true)}
          >
            {BUTTON_LABELS.ADD}
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
