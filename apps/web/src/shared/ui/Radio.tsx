import React, { InputHTMLAttributes } from 'react';

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  checked?: boolean;
  label: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
}

export default function Radio({
  id,
  checked = false,
  label,
  value,
  onChange = () => {},
  ...rest
}: RadioProps) {
  return (
    <div className='flex items-center gap-x-2'>
      <input
        type='radio'
        id={id}
        name={id}
        value={value}
        checked={checked}
        onChange={onChange}
        {...rest}
        className='cursor-pointer'
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
