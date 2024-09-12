/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/control-has-associated-label */
// libs
import moment from 'moment';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

// components
import { FILTER_CONSTS } from '../../../constants/constants';
import DateRangeSelector from '../../DateRangeSelector';
import { FiltersState } from '../helpers/models';
import { calender } from '../../../../assets';
// types
interface DateRangeProps {
  startDate?: string | Date;
  endDate?: string | Date;
  setFilterState?: Dispatch<SetStateAction<FiltersState>>;
  isInitialEmpty?: boolean;
  clearFilterRef?: React.RefObject<HTMLButtonElement>;
  setIsInitialEmpty?: (value: boolean) => void;
  setIsFiltersOn?: (value: boolean) => void;
}

const KEY_FOR_DATE_RANGE = 'selection';

function DateRange({
  startDate = '',
  endDate = '',
  setFilterState = () => {},
  isInitialEmpty = false,
  clearFilterRef,
  setIsInitialEmpty = () => {},
  setIsFiltersOn = () => {},
}: DateRangeProps) {
  const [dateRange, setDateRange] = useState<{
    from?: string | Date;
    to?: string | Date;
  }>({});
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    if (!dateRange || (!dateRange.to && clickCount <= 2)) return; // if both dates are not selected return the function
    setFilterState((prev: FiltersState) => ({
      ...(prev || {}),
      startDate: moment(dateRange.from).format(FILTER_CONSTS.dateFormat),
      endDate: moment(dateRange.to).format(FILTER_CONSTS.dateFormat),
    }));
    setClickCount(0);
  }, [clickCount, dateRange.to]);

  useEffect(() => {
    if (isInitialEmpty) setDateRange({});
  }, [isInitialEmpty]);

  const initialDateRange = {
    startDate: dateRange.from
      ? new Date(dateRange.from || startDate)
      : new Date(),
    endDate: dateRange.to ? new Date(dateRange.to || endDate) : new Date(),
    key: KEY_FOR_DATE_RANGE,
  };

  const settingDateRange = (
    val: { startDate?: Date | string; endDate?: Date | string },
    setIsOpen: (bool: boolean) => void,
    isOpen?: boolean
  ) => {
    const { startDate: selectedStartDate, endDate: selectedEndDate } = val;
    const isBothDatesSame = moment(selectedStartDate).isSame(selectedEndDate);
    setDateRange({ from: selectedStartDate, to: selectedEndDate }); // set the startDate so that there is initial date in the range picker
    setIsInitialEmpty(false);
    setIsFiltersOn(true);
    if (isBothDatesSame && isOpen) {
      // checking if date range is open and date selected is same.
      setClickCount((prevCount) => prevCount + 1);
      if (clickCount < 1)
        return setFilterState((prev: FiltersState) => ({
          ...(prev || {}),
          endDate: '',
        }));
    }
    setDateRange((prevDates: { from?: string | Date; to?: string | Date }) => ({
      ...(prevDates || {}),
      to: selectedEndDate,
    }));
    setIsOpen(false);
    setClickCount(0);
  };

  const handleClickReset = () => {
    setDateRange({});
    setFilterState((prev: FiltersState) => ({
      ...(prev || {}),
      startDate: undefined,
      endDate: undefined,
    }));
    setIsInitialEmpty(true);
  };
  return (
    <>
      <button
        type="button"
        ref={clearFilterRef}
        className="d-none"
        onClick={handleClickReset}
      />
      <DateRangeSelector
        dateRange={initialDateRange}
        setDateRange={settingDateRange}
        setClickCount={setClickCount}
        isInitialEmpty={isInitialEmpty}
        icon={calender}
      />
    </>
  );
}

export default DateRange;
