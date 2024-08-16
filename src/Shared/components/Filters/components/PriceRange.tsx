// PriceRangeSlider.tsx

import { useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { Tooltip } from 'react-tooltip';
import Button from '../../form/Button';
import { downArrow } from '../../../../assets';

interface PriceRangeSliderProps {
  min: number;
  max: number;
  value?: [number, number];
  onChange: (value: [number, number]) => void;
}

function PriceRangeSlider({
  min,
  max,
  value,
  onChange,
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

  return (
    <div>
      <div
        className="price-filter"
        onClick={() => setIsOpen((prev) => !prev)}
        data-tooltip-id="my-tooltip"
      >
        Price (${value?.[0]} - ${value?.[1]}){' '}
        <span className={!open ? 'arrow-down' : 'arrow-right'}>
          <img src={downArrow} alt="" width={15} />
        </span>{' '}
      </div>
      <Tooltip
        id="my-tooltip"
        isOpen={open}
        clickable
        className="tooltip"
        place="bottom-end"
        opacity={1}
      >
        <div className="d-flex justify-content-between">
          <div className="tooltip__range">
            <h6>Price Range Slider</h6>${value?.[0]} - ${value?.[1]}
          </div>
          <div>
            <Button
              className="clear-Button btn-outline-primary"
              onClick={handleClear}
            >
              Clear
            </Button>
          </div>
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
