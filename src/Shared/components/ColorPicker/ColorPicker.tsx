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
  return (
    <div className="color-picker-palette">
      <div className="color-picker-cover">
        <Controller
          name={id}
          control={control}
          defaultValue=""
          render={({ field: { onChange, value: colorValue } }) => (
            <ChromePicker
              color={colorValue}
              onChange={(color: ColorResult) => onChange(color.hex)}
            />
          )}
        />
      </div>
    </div>
  );
}
