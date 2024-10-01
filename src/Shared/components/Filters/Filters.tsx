// libs
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';

// consts
import { BUTTON_LABELS, STRINGS } from '../../constants/constants';

// components
import Button from '../form/Button';
import Breadcrumbs from '../layouts/components/breadcrumb';

// styles
import DateFilterButtons from '../../../Views/Dashboard/components/DateFilterButtons';
import { Filter, addIcon, cross } from '../../../assets';
import CustomSelect from '../form/Select/Select';
import DateRange from './components/DateRange';
import PriceRangeSlider from './components/PriceRange';
import {
  DateRangeState,
  FilterFieldTypes,
  FilterSchema,
  FiltersState,
} from './helpers/models';
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
  showFiltersToggle?: boolean;
  handleApply?: (filter: FiltersState) => void;
  showDateFilterTabs?: boolean;
  heading?: string;
  filterSchema?: FilterSchema[];
  setFiltersState?: Dispatch<SetStateAction<FiltersState>>;
  filtersState?: FiltersState;
}

function StatsFilters({
  setAddData,
  heading,
  filterSchema = [],
  addButtonLabel = BUTTON_LABELS.ADD,
  handleSearch = () => {},
  handleClearSearch = () => {}, // heading = 'Transactions',
  selectedIds,
  handleDeleteAll,
  filterToggleImage = Filter,
  showHeading = true,
  showSearch = true,
  handleClearAll = () => {},
  showFiltersToggle = true,
  handleApply = () => {},
  showDateFilterTabs,
  filtersState = {},
  setFiltersState = () => {},
}: Readonly<StatsFiltersProps>) {
  const clearDateRangeFilterRef = useRef<HTMLButtonElement>(null);

  const [activeDateButtonIndex, setActiveDateButtonIndex] = useState<
    number | null
  >(0);

  const [showFilters, setShowFilters] = useState(false);
  const [isInitialEmptyForDate, setIsInitialEmptyForDate] = useState(true);
  const [searchValue, setSearchValue] = useState(STRINGS.EMPTY_STRING);
  const [dateRange, setDateRange] = useState<DateRangeState>({});

  const handleClear = () => {
    setSearchValue(STRINGS.EMPTY_STRING);
    handleClearSearch();
    handleClearAll();
    setFiltersState({});
    handleApply({});
  };
  const handleClickAllData = () => {
    setActiveDateButtonIndex(0);
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

  const renderFilterComponent = (filter: FilterSchema) => {
    switch (filter.type) {
      case FilterFieldTypes.select:
        return (
          <div className={filter.className} key={filter.placeholder}>
            <CustomSelect
              options={filter.options}
              onChange={filter.onChange}
              value={filter.value ?? null}
              className="react-select"
              classNamePrefix="react-select-prefix"
              placeholder={filter.placeholder}
            />
          </div>
        );
      case FilterFieldTypes.dateRange:
        return (
          <div className="col-12 col-sm-5 col-md-3 col-xxl-2" key="dateRange">
            <DateRange
              startDate={dateRange?.startDate}
              endDate={dateRange?.endDate}
              setSelectedDateRange={setDateRange}
              onChange={filter.onChange}
              isInitialEmpty={isInitialEmptyForDate}
              clearFilterRef={clearDateRangeFilterRef}
              setIsInitialEmpty={setIsInitialEmptyForDate}
            />
          </div>
        );
      case FilterFieldTypes.slider:
        return (
          <div className={filter.className} key={filter.title}>
            <PriceRangeSlider
              isFiltersOn={!!Object.keys(filtersState)?.length}
              rangeSilderTitle={filter.title}
              min={filter.min}
              max={filter.max}
              value={filter.value}
              onChange={filter.onChange}
            />
          </div>
        );
      default:
        return null;
    }
  };

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
                  <button
                    onClick={handleClear}
                    type="button"
                    className="btn btn-transparent cross-icon m-0 p-0"
                  >
                    <em>
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
      {showFilters && (
        <div className="w-100 align-items-start align-items-md-end d-flex flex-md-row flex-wrap gap-2 mt-1 mb-3 filter-items-box">
          {filterSchema.map((filter) => renderFilterComponent(filter))}

          {searchValue ||
            selectedIds?.length ||
            (!!Object.keys(filtersState)?.length && (
              <>
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

                <Button
                  className="btn btn-sm"
                  btnType="secondary"
                  onClick={handleClickAllData}
                >
                  {BUTTON_LABELS.CLEAR_ALL}
                </Button>
              </>
            ))}
        </div>
      )}
    </div>
  );
}

export default StatsFilters;
