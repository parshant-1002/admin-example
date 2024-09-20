// libs
import React, { useEffect, useRef, useState } from 'react';

// consts
import { SingleValue } from 'react-select';
import { BUTTON_LABELS } from '../../constants/constants';

// components
import Button from '../form/Button';
import Breadcrumbs from '../layouts/components/breadcrumb';

// styles
import { SelectOption } from '../../../Models/common';
import { Filter, addIcon, cross } from '../../../assets';
import CustomSelect from '../form/Select/Select';
import DateRange from './components/DateRange';
import PriceRangeSlider from './components/PriceRange';
import { FiltersState, PriceRange } from './helpers/models';
import './style.scss';
import DateFilterButtons from '../../../Views/Dashboard/components/DateFilterButtons';

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
  showDateFilterTabs?: boolean;
  heading?: string;
}

function StatsFilters({
  setAddData,
  heading,
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
  showDateFilterTabs,
}: Readonly<StatsFiltersProps>) {
  const clearDateRangeFilterRef = useRef<HTMLButtonElement>(null);

  const intitialFilterState: FiltersState = {
    priceRange: [priceRange?.min ?? 0, priceRange?.max ?? 0],
    selectedBrand: null,
    selectedStatus: null,
    selectedSecondaryOptions: null,
    secondaryPriceRange: [
      secondaryPriceRange?.min ?? 0,
      secondaryPriceRange?.max ?? 0,
    ],
  };

  const [activeDateButtonIndex, setActiveDateButtonIndex] = useState<
    number | null
  >(0);

  const [showFilters, setShowFilters] = useState(false);
  const [isFiltersOn, setIsFiltersOn] = useState(false);
  const [isInitialEmptyForDate, setIsInitialEmptyForDate] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [filtersState, setFiltersState] =
    useState<FiltersState>(intitialFilterState);

  const handleClear = () => {
    setIsFiltersOn(false);
    setSearchValue('');
    handleClearSearch();
    handleClearAll();
    setFiltersState(intitialFilterState);
    handleApply(intitialFilterState);
  };
  const handleClickAllData = () => {
    setActiveDateButtonIndex(0);
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
  const handleChangeStatusOptions = (newValue: SingleValue<SelectOption>) => {
    setIsFiltersOn(true);

    setFiltersState((prev: FiltersState) => ({
      ...prev,
      selectedStatus: newValue,
    }));
  };

  const handleChangeSecondarySelectOptions = (
    newValue: SingleValue<SelectOption>
  ) => {
    setIsFiltersOn(true);

    setFiltersState((prev: FiltersState) => ({
      ...prev,
      selectedSecondaryOptions: newValue,
    }));
  };
  const handleChangeBrandFilter = (newValue: SingleValue<SelectOption>) => {
    setIsFiltersOn(true);

    setFiltersState((prev: FiltersState) => ({
      ...prev,
      selectedBrand: newValue,
    }));
  };
  const handleChangePriceRange = (selctedPriceRange: [number, number]) => {
    setIsFiltersOn(true);
    setFiltersState((prev: FiltersState) => ({
      ...prev,
      priceRange: [selctedPriceRange[0], selctedPriceRange[1]],
    }));
  };
  const handleChangeSecondaryPriceRange = (
    selctedPriceRange: [number, number]
  ) => {
    setIsFiltersOn(true);
    setFiltersState((prev: FiltersState) => ({
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
    <div className="filter-wrapper">
      <div className="w-100 align-items-center d-flex flex-sm-row flex-column justify-content-between filter_main">
        <div className="col-sm-6 col-md-5 col-xl-6 text-primary">
          {showHeading ? heading ?? <Breadcrumbs /> : null}
        </div>
        <div className=" col-12 col-sm-6 col-md-7 col-xl-6 mb-sm-3">
          <div className="d-flex justify-content-between justify-content-sm-end align-items-start stats_filter">
            {selectedIds?.length ? (
              <Button
                className="btn btn-sm btn-danger onlyIcon"
                btnType="primary"
                onClick={handleDeleteAll}
              >
                <img
                  src="/src/assets/icons/delete.svg"
                  alt="filters"
                  className="d-block d-md-none"
                  width={30}
                />
                {BUTTON_LABELS.DELETE_ALL}
              </Button>
            ) : null}
            {showDateFilterTabs ? (
              <DateFilterButtons
                handleApply={handleApply}
                activeDateButtonIndex={activeDateButtonIndex}
                setActiveDateButtonIndex={setActiveDateButtonIndex}
              />
            ) : null}
            {showSearch ? (
              <div className="dark-form-control position-relative w-100 w-sm-auto">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search..."
                  value={searchValue}
                  onChange={handleSearchChange}
                />
                {searchValue ? (
                  <button onClick={handleClear} type="button">
                    <em className="cross-icon">
                      <img
                        src={cross} // Replace with an actual path or URL
                        alt=""
                      />
                    </em>
                  </button>
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
                <img
                  src={addIcon}
                  className="d-none"
                  alt="w-cross"
                  width={50}
                />
              </Button>
            ) : null}
            {setAddData ? (
              <Button
                className="btn btn-sm onlyIcon"
                btnType="primary"
                onClick={() => setAddData()}
              >
                <img
                  src="/src/assets/icons/add-icon.svg"
                  alt="filters"
                  className="d-block d-md-none"
                  width={30}
                />
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
        <div className="w-100 align-items-start align-items-md-end d-flex flex-md-row flex-wrap gap-2 mt-1 mb-3 filter-items-box">
          {brandOptions ? (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xxl-2">
              <CustomSelect
                options={brandOptions}
                onChange={handleChangeBrandFilter}
                value={filtersState.selectedBrand}
                className="react-select"
                classNamePrefix="react-select-prefix"
                placeholder="Select Company"
              />
            </div>
          ) : null}
          {showDateFilter ? (
            <div className="col-12 col-sm-5 col-md-3 col-xxl-2">
              <DateRange
                startDate={filtersState?.startDate}
                endDate={filtersState?.endDate}
                setFilterState={setFiltersState}
                isInitialEmpty={isInitialEmptyForDate}
                clearFilterRef={clearDateRangeFilterRef}
                setIsInitialEmpty={setIsInitialEmptyForDate}
                setIsFiltersOn={setIsFiltersOn}
              />
            </div>
          ) : null}
          {priceRange ? (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xxl-3">
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
            <div className="col-12 col-sm-5 col-md-4 col-lg-3 col-xxl-3">
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
            <div className="col-12 col-sm-6 col-md-3 col-xxl-2">
              <CustomSelect
                options={statusOptions}
                onChange={handleChangeStatusOptions}
                value={filtersState?.selectedStatus}
                placeholder="Status"
              />
            </div>
          ) : null}
          {secondarySelectOptions ? (
            <div className="col-12 col-sm-5 col-md-3 col-xxl-2">
              <CustomSelect
                options={secondarySelectOptions}
                onChange={handleChangeSecondarySelectOptions}
                value={filtersState?.selectedSecondaryOptions}
                placeholder={secondarySelectPlaceHolder}
              />
            </div>
          ) : null}

          {isFiltersOn ? (
            <Button
              className="btn btn-sm"
              btnType="primary"
              onClick={() => {
                setActiveDateButtonIndex(null);
                handleApply(filtersState);
              }}
            >
              {BUTTON_LABELS.APPLY}
            </Button>
          ) : null}

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
    </div>
  );
}

export default StatsFilters;
