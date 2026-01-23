import React from 'react';
import { cn } from '@festamate/utils';

interface FilterButtonProps {
  label: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function FilterButton({
  label,
  isSelected,
  onClick,
}: FilterButtonProps) {
  return (
    <button
      className={cn(
        'border-border rounded-10 border-[1px] px-3 py-2',
        isSelected && 'bg-point text-white',
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
