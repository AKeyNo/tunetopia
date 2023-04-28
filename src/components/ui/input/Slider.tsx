import { forwardRef } from 'react';

export const Slider = forwardRef<
  HTMLInputElement,
  {
    className?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    max: number;
    value: number;
  }
>(({ className, onChange, max, value }, ref) => {
  return (
    <input
      className={`h-1 bg-slate-700 ${className}`}
      type='range'
      value={value}
      max={max}
      onChange={onChange}
      ref={ref}
    />
  );
});

Slider.displayName = 'Slider';
