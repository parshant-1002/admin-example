import { useCallback, useEffect, useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { Tooltip } from 'react-tooltip';
import { downArrowFilter } from '../../../../assets';
import Button from '../../form/Button';
import { BUTTON_LABELS, STRINGS } from '../../../constants/constants';

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
  rangeSilderTitle = STRINGS.PRICE,
}: Readonly<PriceRangeSliderProps>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
        isOpen &&
        event.target instanceof HTMLElement &&
        !event.target.closest('.tooltip') &&
        !event.target.closest('.price-filter')
      ) {
        setIsOpen(false);
      }
    },
    [isOpen]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside, isOpen]);

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
      <button
        type="button"
        className="price-filter w-100"
        onClick={toggleTooltip}
        data-tooltip-id={isOpen ? `my-tooltip-${rangeSilderTitle}` : ''}
      >
        {rangeSilderTitle} ({min} - {max}) SEK{' '}
        <span className={!isOpen ? 'arrow-down' : 'arrow-right'}>
          <img src={downArrowFilter} alt="" height={20} width={20} />
        </span>{' '}
      </button>
      <Tooltip
        id={`my-tooltip-${rangeSilderTitle}`}
        clickable
        className="tooltip"
        place="bottom-end"
        opacity={1}
        isOpen={isOpen}
      >
        <div className="d-flex justify-content-between">
          <div className="tooltip__range">
            <h6>{rangeSilderTitle} Range Selector</h6>({min} -{max}) SEK
          </div>
          {isFiltersOn ? (
            <div>
              <Button
                className="clear-Button btn-outline-primary"
                onClick={handleClear}
              >
                {BUTTON_LABELS.CLEAR}
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
