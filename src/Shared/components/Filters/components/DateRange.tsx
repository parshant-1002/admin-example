/* eslint-disable jsx-a11y/control-has-associated-label */
// libs
import moment from 'moment';
import React, { useEffect, useState } from 'react';

// components
import DateRangeSelector from '../../DateRangeSelector';
import { FILTER_CONSTS } from '../../../constants';

// types
interface DateRangeProps {
  startDate?: string;
  endDate?: string;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  isInitialEmpty?: boolean;
  clearFilterRef?: React.RefObject<HTMLButtonElement>;
  setIsInitialEmpty: (value: boolean) => void;
}

const KEY_FOR_DATE_RANGE = 'selection';

function DateRange({
  startDate = '',
  endDate = '',
  setStartDate,
  setEndDate,
  isInitialEmpty = false,
  clearFilterRef,
  setIsInitialEmpty,
}: DateRangeProps) {
  const [dateRange, setDateRange] = useState<
    { from?: string | Date; to?: string | Date } | string
  >(
    isInitialEmpty
      ? ''
      : {
          to: moment().format(FILTER_CONSTS.dateFormat),
          from: moment().format(FILTER_CONSTS.dateFormat),
        }
  );
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    if (
      !dateRange ||
      typeof dateRange === 'string' ||
      (!dateRange.to && clickCount <= 2)
    )
      return; // if both dates are not selected return the function
    setStartDate(moment(dateRange.from).format(FILTER_CONSTS.dateFormat));
    setEndDate(moment(dateRange.to).format(FILTER_CONSTS.dateFormat));
    setIsInitialEmpty(false);
    setClickCount(0);
  }, [clickCount, dateRange, setEndDate, setIsInitialEmpty, setStartDate]);

  useEffect(() => {
    if (isInitialEmpty) setDateRange('');
  }, [isInitialEmpty]);

  const initialDateRange = {
    startDate:
      dateRange && typeof dateRange !== 'string'
        ? new Date(dateRange.from || startDate)
        : '',
    endDate:
      dateRange && typeof dateRange !== 'string'
        ? new Date(dateRange.to || endDate)
        : '',
    key: KEY_FOR_DATE_RANGE,
  };

  const settingDateRange = (
    val: { startDate: Date | string; endDate: Date | string },
    isOpen?: boolean
  ) => {
    const { startDate: selectedStartDate, endDate: selectedEndDate } = val;
    const isBothDatesSame = moment(selectedStartDate).isSame(selectedEndDate);
    setDateRange({ from: selectedStartDate }); // set the startDate so that there is initial date in the range picker

    if (isBothDatesSame && isOpen) {
      // checking if date range is open and date selected is same.
      setClickCount((prevCount) => prevCount + 1);
    }
  };

  return (
    <>
      <button
        type="button"
        ref={clearFilterRef}
        className="d-none"
        onClick={() => setDateRange('')}
      />
      <DateRangeSelector
        dateRange={initialDateRange}
        setDateRange={settingDateRange}
        // icon={CalenderIcon}
        // isInitialEmpty
        // clickCount={clickCount}
      />
    </>
  );
}

export default DateRange;
