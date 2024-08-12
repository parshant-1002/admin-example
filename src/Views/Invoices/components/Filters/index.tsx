/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
// libs
import React from 'react';

// consts
import { Filter } from '../../../../assets';

// components
import CustomDropDown from '../../../../Shared/components/CustomDropDown';

// styles
import TextField from '../../../../Shared/components/form/TextInput/TextInput';
import './style.scss';

// types
interface StatsFiltersProps {
  search?: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClearSearch: () => void;
  // heading?: string;
}

function StatsFilters({
  search = '',
  handleSearch,
  handleClearSearch, // heading = 'Transactions',
}: StatsFiltersProps) {
  return (
    <div className="w-100 align-items-end align-items-md-end d-flex flex-md-row flex-column">
      <div className="col-md-4 col-xl-6 mb-2">
        {/* <h2 className="h5 mb-0">{heading}</h2> */}
      </div>

      <div className="col-md-8 col-xl-6 my-2">
        <div className="d-flex justify-content-end align-items-start stats_filter">
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
              value={search}
              onChange={handleSearch}
            />
            {search ? (
              <em
                role="button"
                tabIndex={0}
                className="cross-icon"
                onClick={handleClearSearch}
              >
                <img
                  src="" // Replace with an actual path or URL
                  alt=""
                  width={12}
                />
              </em>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsFilters;
