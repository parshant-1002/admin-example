/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
// libs
import React, { useRef, useState } from 'react';

// consts
import { BUTTON_LABELS } from '../../constants';

// components
import Button from '../form/Button';
import TextField from '../form/TextInput/TextInput';
import Breadcrumbs from '../layouts/components/breadcrumb';

// styles
import CustomSelect from '../form/Select/Select';
import DateRange from './components/DateRange';
import './style.scss';
import { cross } from '../../../assets';
import PriceRangeSlider from './components/PriceRange';
import { FiltersState } from './helpers/models';

// types
interface StatsFiltersProps {
  setAddData?: () => void;
  handleClearAll?: () => void;
  addButtonLabel?: string;
  handleSearch?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClearSearch?: () => void;
  selectedIds?: string[];
  handleDeleteAll?: () => void;
  filterToggleImage?: string;
  showHeading?: boolean;
  showSearch?: boolean;
}

function StatsFilters({
  setAddData,
  addButtonLabel = BUTTON_LABELS.ADD,
  handleSearch = () => {},
  handleClearSearch = () => {}, // heading = 'Transactions',
  selectedIds,
  handleDeleteAll,
  filterToggleImage = '',
  showHeading = true,
  showSearch = true,
  handleClearAll = () => {},
}: StatsFiltersProps) {
  const clearDateRangeFilterRef = useRef<HTMLButtonElement>(null);

  const [showFilters, setShowFilters] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filtersState, setFilterState] = useState<FiltersState>({
    startDate: '',
    endDate: '',
  });
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
  const handleShowFilter = () => {
    setShowFilters((prev) => !prev);
  };
  return (
    <>
      <div className="w-100 align-items-center d-flex flex-md-row flex-column">
        <div className="col-md-4 col-xl-6">
          {showHeading ? <Breadcrumbs /> : null}
        </div>
        <div className="col-md-8 col-xl-6 mb-3">
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
            {showSearch ? (
              <div className="dark-form-control position-relative">
                <TextField
                  type="search"
                  placeholder="Search..."
                  value={searchValue}
                  onChange={handleSearchChange}
                />
                {searchValue ? (
                  <em className="cross-icon" onClick={handleClear}>
                    <img
                      src={cross} // Replace with an actual path or URL
                      alt=""
                    />
                  </em>
                ) : null}
              </div>
            ) : null}
            {filterToggleImage ? (
              <Button
                btnType="primary"
                onClick={handleShowFilter}
                className="btn44"
              >
                <img src={filterToggleImage} alt="filters" width={30} />
              </Button>
            ) : null}
            {setAddData ? (
              <Button
                className="btn btn-sm"
                btnType="primary"
                onClick={() => setAddData()}
              >
                {addButtonLabel}
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
      {showFilters ? (
        <div className="w-100 align-items-start align-items-md-end d-flex flex-md-row flex-wrap gap-3 mt-4 mb-3">
          <div className="col-5 col-md-2 col-xxl-2 ">
            <CustomSelect />
          </div>
          <div className="col-5 col-md-2 col-xl-3 col-xxl-2">
            <DateRange
              startDate={filtersState?.startDate}
              endDate={filtersState?.endDate}
              setFilterState={setFilterState}
              isInitialEmpty
              clearFilterRef={clearDateRangeFilterRef}
              setIsInitialEmpty={() => {}}
            />
          </div>
          <div className="col-5 col-md-2 col-xl-3 col-xxl-2">
            <PriceRangeSlider min={10} max={100} onChange={() => {}} />
          </div>
          <div className="col-5 col-md-2 col-xl-2 ">
            <CustomSelect />
          </div>

          <Button
            className="btn btn-sm"
            btnType="primary"
            onClick={handleClickAllData}
          >
            {BUTTON_LABELS.APPLY}
          </Button>

          {selectedIds?.length || searchValue ? (
            <Button
              className="btn btn-sm"
              btnType="secondary"
              onClick={handleClickAllData}
            >
              {BUTTON_LABELS.CLEAR_ALL}
            </Button>
          ) : null}
        </div>
      ) : null}
    </>
  );
}

export default StatsFilters;
