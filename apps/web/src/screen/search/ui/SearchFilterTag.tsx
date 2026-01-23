import React from 'react';
import { cn } from '@festamate/utils';
import { GENDER_LABEL, PARTICIPANTS, ROOM_STATUS } from '@/shared/constants';
import { Filter } from '@/screen/search/types';

interface SearchFilterTagProps {
  onClick: () => void;
  label: string;
  filter: Filter;
}

export default function SearchFilterTag({
  onClick,
  label,
  filter,
}: SearchFilterTagProps) {
  const filterKey =
    label === '매칭 상태'
      ? 'status'
      : label === '모집 성별'
        ? 'gender'
        : 'participants';

  const getStatusText = () => {
    if (label === '매칭 상태' && filter.status) {
      return ROOM_STATUS[filter.status];
    }
    if (label === '모집 성별' && filter.gender) {
      return GENDER_LABEL[filter.gender];
    }
    if (label === '모임 인원' && filter.participants) {
      return PARTICIPANTS[filter.participants];
    }
    return null;
  };

  const status = getStatusText();

  return (
    <button
      className={cn(
        'border-border flex w-fit cursor-pointer items-center gap-1 rounded-full border-[1px] px-4 py-2 text-[13px]',
        filter[filterKey] && 'bg-point text-white',
      )}
      onClick={onClick}
    >
      {label} {status && <span className='text-xs'>{status}</span>}
    </button>
  );
}
