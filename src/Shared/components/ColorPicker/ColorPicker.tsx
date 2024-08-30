import { useState, useRef, useEffect } from 'react';
import { ChromePicker, ColorResult } from 'react-color';
import { Control, Controller } from 'react-hook-form';
import './styles.scss';

export default function ColorPicker({
  id,
  control,
}: {
  id: string;
  control: Control;
}) {
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
  }, [pickerRef]);

  return (
    <div className="color-picker-container">
      <div className="color-picker-wrapper">
        <div
          className="color-box position-relative"
          ref={pickerRef}
          // Toggle picker visibility on click
        >
          <Controller
            name={id}
            control={control}
            defaultValue=""
            render={({ field: { onChange, value: colorValue } }) => (
              <>
                <div
                  className="selected-color"
                  style={{ backgroundColor: colorValue || '#fff' }}
                />
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <div className="color-picker-header">
                    Select Color{' '}
                    <span
                      className="refresh-icon"
                      onClick={() => {
                        onChange('#ffffff');
                      }}
                    >
                      🔄
                    </span>
                  </div>
                  <span
                    className="pointer color-code"
                    onClick={() => setShowPicker((prev) => !prev)}
                  >
                    {colorValue}
                  </span>
                </div>
                {showPicker && (
                  <div className="color-picker-cover">
                    <ChromePicker
                      color={colorValue}
                      onChange={(color: ColorResult) => onChange(color.hex)}
                    />
                  </div>
                )}
              </>
            )}
          />
        </div>
      </div>
    </div>
  );
}
