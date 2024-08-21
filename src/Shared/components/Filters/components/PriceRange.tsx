import { useCallback, useEffect, useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { Tooltip } from 'react-tooltip';
import { downArrow } from '../../../../assets';
import Button from '../../form/Button';

interface PriceRangeSliderProps {
  min: number;
  max: number;
  isFiltersOn?: boolean;
  rangeSilderTitle?: string;
  value?: [number, number];
  onChange: (value: [number, number]) => void;
}

function PriceRangeSlider({
  min,
  max,
  value,
  onChange,
  isFiltersOn,
  rangeSilderTitle = 'Price',
}: PriceRangeSliderProps) {
  const [open, setIsOpen] = useState<boolean>(false);

  const handleSliderChange = (newValue: number[]) => {
    const updatedValue: [number, number] = [newValue[0], newValue[1]];
    if (onChange) {
      onChange(updatedValue);
    }
  };

  const handleClear = () => {
    const resetValue: [number, number] = [min, max];
    if (onChange) {
      onChange(resetValue);
    }
  };

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        open &&
        event.target instanceof HTMLElement &&
        !event.target.closest('.tooltip') &&
        !event.target.closest('.price-filter')
      ) {
        setIsOpen(false);
      }
    },
    [open]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside, open]);

  useEffect(() => {
    if (!isFiltersOn) {
      setIsOpen(false);
    }
  }, [isFiltersOn]);

  const toggleTooltip = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <div
        className="price-filter"
        onClick={toggleTooltip}
        data-tooltip-id={open ? `my-tooltip-${rangeSilderTitle}` : ''}
      >
        {rangeSilderTitle} (${value?.[0]} - ${value?.[1]}){' '}
        <span className={!open ? 'arrow-down' : 'arrow-right'}>
          <img src={downArrow} alt="" width={15} />
        </span>{' '}
      </div>
      <Tooltip
        id={`my-tooltip-${rangeSilderTitle}`}
        clickable
        className="tooltip"
        place="bottom-end"
        opacity={1}
        isOpen={open}
      >
        <div className="d-flex justify-content-between">
          <div className="tooltip__range">
            <h6>{rangeSilderTitle} Range Slider</h6>${value?.[0]} - $
            {value?.[1]}
          </div>
          {isFiltersOn ? (
            <div>
              <Button
                className="clear-Button btn-outline-primary"
                onClick={handleClear}
              >
                Clear
              </Button>
            </div>
          ) : null}
        </div>
        <div className="slider-container">
          <RangeSlider
            min={min}
            max={max}
            value={value}
            onInput={handleSliderChange}
          />
        </div>
      </Tooltip>
    </div>
  );
}

export default PriceRangeSlider;
