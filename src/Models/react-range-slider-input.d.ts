// src/types/react-range-slider-input.d.ts

declare module 'react-range-slider-input' {
    import React from 'react';
  
    export interface RangeSliderProps {
      min?: number;
      max?: number;
      value?: [number, number];
      onInput?: (value: number[]) => void;
      className?: string;
    }
  
    const RangeSlider: React.FC<RangeSliderProps>;
  
    export default RangeSlider;
  }
  