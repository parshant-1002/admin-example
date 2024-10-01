import { useState, useRef, useEffect } from 'react';
import { ChromePicker, ColorResult } from 'react-color';
import { Control, Controller } from 'react-hook-form';
import './styles.scss';
import { STRINGS } from '../../constants/constants';

interface ColorPickerProps {
  id: string;
  control: Control;
}

export default function ColorPicker({
  id,
  control,
}: Readonly<ColorPickerProps>) {
  const [showPicker, setShowPicker] = useState(false); // State to toggle picker visibility
  const pickerRef = useRef<HTMLDivElement | null>(null); // Ref for ChromePicker

  // Function to handle clicks outside the color picker
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setShowPicker(false);
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on cleanup
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Function to reset the color to a default value
  const onSelectColor = (
    onChange: (value: string) => void,
    defaultColor = '#ffffff'
  ) => {
    onChange(defaultColor);
  };

  // Function to render the color picker field
  const renderColorSelectField = ({
    field: { onChange, value: colorValue },
  }: {
    field: { onChange: (value: string) => void; value: string };
  }) => (
    <>
      <div
        className="selected-color"
        style={{ backgroundColor: colorValue || '#fff' }}
      />
      <div className="d-flex flex-column align-items-center justify-content-center">
        <div className="color-picker-header">
          {STRINGS.SELECT_COLOR}
          <button
            className="refresh-icon"
            type="button"
            onClick={() => onSelectColor(onChange)}
            aria-label="Reset color to default" // Provides a label for screen readers
          >
            🔄
          </button>
        </div>
        <button
          className="pointer color-code"
          type="button"
          onClick={() => setShowPicker((prev) => !prev)}
          aria-expanded={showPicker} // Optional, to indicate the state of the picker
        >
          {colorValue || STRINGS.NO_COLOR_SELECTED}
        </button>
      </div>
      {showPicker && (
        <div className="color-picker-cover">
          <ChromePicker
            color={colorValue || '#fff'}
            onChange={(color: ColorResult) => onChange(color.hex)}
          />
        </div>
      )}
    </>
  );

  return (
    <div className="color-picker-container">
      <div className="color-picker-wrapper">
        <div className="color-box position-relative" ref={pickerRef}>
          <Controller
            name={id}
            control={control}
            defaultValue=""
            render={renderColorSelectField}
          />
        </div>
      </div>
    </div>
  );
}
