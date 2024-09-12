/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { DateRange, Range } from 'react-date-range';

// styles
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DATE_FORMATS } from '../../constants/constants';
import './style.scss';
import CONSTS from './helpers/Constants';

// Define types for dateRange and props
interface DateRangeType {
  startDate?: string | Date;
  endDate?: string | Date;
}

interface DateRangeSelectorProps {
  dateRange?: DateRangeType;
  setDateRange?: (
    range: DateRangeType,
    setIsOpen: (bool: boolean) => void,
    isOpen?: boolean
  ) => void;
  daysError?: string;
  titleText?: string;
  isInitialEmpty?: boolean;
  icon?: string;
  maxDate?: Date;
  setClickCount?: (num: number) => void;
}

function DateRangeSelector({
  dateRange = { startDate: '', endDate: '' },
  setDateRange = () => {},
  daysError,
  titleText = 'Select Date Range',
  icon,
  maxDate = new Date(),
  isInitialEmpty = true,
  setClickCount = () => {},
}: DateRangeSelectorProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const datePickerRef = useRef<HTMLDivElement>(null);

  const toggleCalendar = () => {
    // function to toggle opening and closing of calendar
    setIsOpen(!isOpen);
    if (!isOpen && !dateRange?.startDate) {
      setDateRange(
        { startDate: moment().format(CONSTS.dateFormat) },
        setIsOpen,
        isOpen
      );
    }
  };

  const renderRange = () => {
    const { startDate = '', endDate = '' } = dateRange;
    return `${moment(startDate).format(DATE_FORMATS.FOR_DATE_RANGE)} - ${moment(
      endDate
    ).format(DATE_FORMATS.FOR_DATE_RANGE)}`;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setClickCount(0);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setClickCount]);

  const handleCalendarMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const createDateRange = () => {
    // Define the type of range based on your usage
    const temoDateRange = { ...dateRange };
    if (!dateRange?.endDate) {
      temoDateRange.endDate = dateRange.startDate;
    }
    return temoDateRange;
  };

  return (
    <div ref={datePickerRef} className="calender_field">
      <div className="form-control position-relative" onClick={toggleCalendar}>
        {isInitialEmpty ? (
          <span>{titleText}</span>
        ) : (
          <span>{renderRange()}</span>
        )}
        {daysError && <span className="error">{daysError}</span>}
        {icon && <img src={icon} alt="Icon" className="icon calIcon" />}
      </div>
      {isOpen && (
        <div className="calendar-wrapper" onMouseDown={handleCalendarMouseDown}>
          <DateRange
            editableDateInputs
            ranges={[createDateRange()] as unknown as Range[]} // pass in currently selected date range to DateRange component
            onChange={(item) => {
              setDateRange(item?.selection, setIsOpen, isOpen); // update 'dateRange' prop with newly selected dates
            }}
            maxDate={maxDate}
          />
        </div>
      )}
    </div>
  );
}

export default DateRangeSelector;
