import React from 'react';

interface RadioProps {
  id: string;
  checked?: boolean;
  label: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Radio({
  id,
  checked = false,
  label,
  onChange = () => {},
}: RadioProps) {
  return (
    <div className='flex items-center gap-x-2'>
      <input
        type='radio'
        id={id}
        name={id}
        value={id}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
