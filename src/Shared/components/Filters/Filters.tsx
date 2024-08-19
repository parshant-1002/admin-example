/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
// libs
import React, { useEffect, useRef, useState } from 'react';

// consts
import { SingleValue } from 'react-select';
import { BUTTON_LABELS } from '../../constants';

// components
import Button from '../form/Button';
import TextField from '../form/TextInput/TextInput';
import Breadcrumbs from '../layouts/components/breadcrumb';

// styles
import { SelectOption } from '../../../Models/common';
import { Filter, cross } from '../../../assets';
import CustomSelect from '../form/Select/Select';
import DateRange from './components/DateRange';
import PriceRangeSlider from './components/PriceRange';
import { FiltersState, PriceRange } from './helpers/models';
import './style.scss';

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
  brandOptions?: SelectOption[];
  showDateFilter?: boolean;
  showFiltersToggle?: boolean;
  priceRange?: PriceRange;
  secondaryPriceRange?: PriceRange;
  secondarySelectPlaceHolder?: string;
  statusOptions?: SelectOption[];
  handleApply?: (filter: FiltersState) => void;
  secondarySelectOptions?: SelectOption[];
  rangeSilderTitle?: string;
  secondaryRangeSilderTitle?: string;
}

function StatsFilters({
  setAddData,
  addButtonLabel = BUTTON_LABELS.ADD,
  handleSearch = () => {},
  handleClearSearch = () => {}, // heading = 'Transactions',
  selectedIds,
  handleDeleteAll,
  filterToggleImage = Filter,
  showHeading = true,
  showSearch = true,
  handleClearAll = () => {},
  brandOptions,
  showDateFilter,
  secondaryRangeSilderTitle,
  secondaryPriceRange,
  showFiltersToggle = true,
  priceRange,
  statusOptions,
  secondarySelectOptions,
  secondarySelectPlaceHolder,
  rangeSilderTitle,
  handleApply = () => {},
}: StatsFiltersProps) {
  const clearDateRangeFilterRef = useRef<HTMLButtonElement>(null);
  const intitialFilterState: FiltersState = {
    priceRange: [priceRange?.min || 0, priceRange?.max || 0],
    selectedBrand: null,
    selectedStatus: null,
    selectedSecondaryOptions: null,
  };
  const [showFilters, setShowFilters] = useState(false);
  const [isFiltersOn, setIsFiltersOn] = useState(false);
  const [isInitialEmptyForDate, setIsInitialEmptyForDate] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [filtersState, setFilterState] =
    useState<FiltersState>(intitialFilterState);
  const handleClear = () => {
    setIsFiltersOn(false);
    setSearchValue('');
    handleClearSearch();
    handleClearAll();
    setFilterState(intitialFilterState);
    handleApply(intitialFilterState);
  };
  const handleClickAllData = () => {
    handleClear();
    if (clearDateRangeFilterRef.current) {
      clearDateRangeFilterRef.current.click();
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFiltersOn(true);
    setSearchValue(e.target.value);
    handleSearch(e);
  };
  const handleShowFilter = () => {
    setShowFilters((prev) => !prev);
  };
  const handleChangeStatusOptions = (
    newValue: SingleValue<SelectOption>
    // actionMeta: ActionMeta<SelectOption>
  ) => {
    // console.log(' ~ actionMeta:', actionMeta);
    setIsFiltersOn(true);

    setFilterState((prev: FiltersState) => ({
      ...prev,
      selectedStatus: newValue,
    }));
  };

  const handleChangeSecondarySelectOptions = (
    newValue: SingleValue<SelectOption>
    // actionMeta: ActionMeta<SelectOption>
  ) => {
    // console.log(' ~ actionMeta:', actionMeta);
    setIsFiltersOn(true);

    setFilterState((prev: FiltersState) => ({
      ...prev,
      secondarySelectOptions: newValue,
    }));
  };
  const handleChangeBrandFilter = (
    newValue: SingleValue<SelectOption>
    // actionMeta: ActionMeta<SelectOption>
  ) => {
    // console.log(' ~ actionMeta:', actionMeta);
    setIsFiltersOn(true);

    setFilterState((prev: FiltersState) => ({
      ...prev,
      selectedBrand: newValue,
    }));
  };
  const handleChangePriceRange = (selctedPriceRange: [number, number]) => {
    setIsFiltersOn(true);
    setFilterState((prev: FiltersState) => ({
      ...prev,
      priceRange: [selctedPriceRange[0], selctedPriceRange[1]],
    }));
  };
  const handleChangeSecondaryPriceRange = (
    selctedPriceRange: [number, number]
  ) => {
    setFilterState((prev: FiltersState) => ({
      ...prev,
      secondaryPriceRange: [selctedPriceRange[0], selctedPriceRange[1]],
    }));
  };

  useEffect(() => {
    if (selectedIds) {
      setIsFiltersOn(true);
    }
  }, [selectedIds]);

  return (
    <>
      <div className="w-100 align-items-center d-flex flex-sm-row flex-column justify-content-between filter_main">
        <div className="col-sm-4 col-md-5 col-xl-6">
          {showHeading ? <Breadcrumbs /> : null}
        </div>
        <div className=" col-12 col-sm-8 col-md-7 col-xl-6 mb-sm-3">
          <div className="d-flex justify-content-between justify-content-sm-end align-items-start stats_filter">
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
              <div className="dark-form-control position-relative w-100 w-sm-auto">
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
            {showFiltersToggle ? (
              <Button
                btnType="primary"
                onClick={handleShowFilter}
                className="btn44 filterbtn"
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
        <div className="w-100 align-items-start align-items-md-end d-flex flex-md-row flex-wrap gap-2 mt-1 mb-3">
          {brandOptions ? (
            <div className="col-lg-2 col-xl-2">
              <CustomSelect
                options={brandOptions}
                onChange={handleChangeBrandFilter}
                value={filtersState.selectedBrand}
                className="react-select"
                classNamePrefix="react-select-prefix"
                placeholder="Category"
              />
            </div>
          ) : null}
          {showDateFilter ? (
            <div className="col-12 col-sm-5 col-md-3 col-xxl-2">
              <DateRange
                startDate={filtersState?.startDate}
                endDate={filtersState?.endDate}
                setFilterState={setFilterState}
                isInitialEmpty={isInitialEmptyForDate}
                clearFilterRef={clearDateRangeFilterRef}
                setIsInitialEmpty={setIsInitialEmptyForDate}
                setIsFiltersOn={setIsFiltersOn}
              />
            </div>
          ) : null}
          {priceRange ? (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xxl-2">
              <PriceRangeSlider
                isFiltersOn={isFiltersOn}
                rangeSilderTitle={rangeSilderTitle}
                min={priceRange.min}
                max={priceRange.max}
                value={filtersState?.priceRange}
                onChange={handleChangePriceRange}
              />
            </div>
          ) : null}
          {secondaryPriceRange ? (
            <div className="col-md-2 col-xl-2">
              <PriceRangeSlider
                isFiltersOn={isFiltersOn}
                rangeSilderTitle={secondaryRangeSilderTitle}
                min={secondaryPriceRange.min}
                max={secondaryPriceRange.max}
                value={filtersState?.secondaryPriceRange}
                onChange={handleChangeSecondaryPriceRange}
              />
            </div>
          ) : null}
          {statusOptions ? (
            <div className="col-12 col-sm-5 col-md-3 col-xxl-2 ">
              <CustomSelect
                options={statusOptions}
                onChange={handleChangeStatusOptions}
                value={filtersState?.selectedStatus}
                placeholder="Status"
              />
            </div>
          ) : null}
          {secondarySelectOptions ? (
            <div className="col-md-2 col-xl-2 ">
              <CustomSelect
                options={secondarySelectOptions}
                onChange={handleChangeSecondarySelectOptions}
                value={filtersState?.selectedSecondaryOptions}
                placeholder={secondarySelectPlaceHolder}
              />
            </div>
          ) : null}

          <Button
            className="btn btn-sm"
            btnType="primary"
            onClick={() => {
              handleApply(filtersState);
            }}
          >
            {BUTTON_LABELS.APPLY}
          </Button>

          {isFiltersOn ? (
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
