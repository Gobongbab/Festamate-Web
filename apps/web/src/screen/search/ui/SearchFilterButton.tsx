import React, { memo } from 'react';
import { cn } from '@festamate/utils';

interface SearchFilterButtonProps {
  label: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const SearchFilterButton = memo(function SearchFilterButton({
  label,
  isSelected,
  onClick,
}: SearchFilterButtonProps) {
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
});

export default SearchFilterButton;
