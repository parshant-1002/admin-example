/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { DateRange, RangeKeyDict } from 'react-date-range';

// styles
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DATE_FORMATS } from '../../constants';
import './style.scss';
import CONSTS from './helpers/Constants';

// Define types for dateRange and props
interface DateRangeType {
  startDate: string | Date;
  endDate: string | Date;
}

interface DateRangeSelectorProps {
  dateRange?: DateRangeType;
  setDateRange?: (range: DateRangeType, isOpen?: boolean) => void;
  daysError?: string;
  titleText?: string;
  icon?: string;
  maxDate?: Date;
}

function DateRangeSelector({
  dateRange = { startDate: '', endDate: '' },
  setDateRange = () => {},
  daysError,
  titleText = '',
  icon,
  maxDate = new Date(),
}: DateRangeSelectorProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const datePickerRef = useRef<HTMLDivElement>(null);

  const toggleCalendar = () => {
    setIsOpen(!isOpen);
    if (!isOpen && !dateRange?.startDate) {
      setDateRange(
        {
          startDate: moment().format(CONSTS.dateFormat),
          endDate: moment().format(CONSTS.dateFormat),
        },
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
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCalendarMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const createDateRange = (range: RangeKeyDict) => {
    // Define the type of range based on your usage
    setDateRange({
      startDate: moment(range?.selection?.startDate).format(CONSTS.dateFormat),
      endDate: moment(range?.selection?.endDate).format(CONSTS.dateFormat),
    });
  };

  return (
    <div ref={datePickerRef} className="calender_field">
      <div className="form-control position-relative" onClick={toggleCalendar}>
        {icon && <img src={icon} alt="Icon" className="icon" />}
        <span>{titleText}</span>
        <span>{renderRange()}</span>
        {daysError && <span className="error">{daysError}</span>}
      </div>
      {isOpen && (
        <div className="calendar-wrapper" onMouseDown={handleCalendarMouseDown}>
          <DateRange
            editableDateInputs
            onChange={createDateRange}
            ranges={[
              {
                startDate: new Date(dateRange.startDate),
                endDate: new Date(dateRange.endDate),
                key: 'selection',
              },
            ]}
            maxDate={maxDate}
          />
        </div>
      )}
    </div>
  );
}

export default DateRangeSelector;
