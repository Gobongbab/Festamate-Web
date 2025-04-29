import React, { useState, type Dispatch, type SetStateAction } from 'react';

import { cn } from '@festamate/utils';
import { Button } from '@/shared/ui';
import { Gender } from '@/shared/types';

interface GenderFormProps {
  setProcess: Dispatch<SetStateAction<number>>;
  setGender: Dispatch<SetStateAction<Gender>>;
}

export default function GenderForm({ setProcess, setGender }: GenderFormProps) {
  const GENDER: Record<string, Gender> = { 여성: 'FEMALE', 남성: 'MALE' };
  const [selected, setSelected] = useState<'여성' | '남성' | undefined>(
    undefined,
  );

  const GenderButton = ({ label }: { label: string }) => (
    <button
      name='phone-number-auth'
      className={cn(
        'bg-fill border-border rounded-5 hover:bg-sub flex-1 cursor-pointer border-[1px] p-2 px-6 transition duration-150',
        label === selected && 'bg-point/80 text-white',
      )}
      onClick={() => {
        setSelected(label as '여성' | '남성');
        setGender(GENDER[label]);
      }}
    >
      {label}
    </button>
  );

  return (
    <div className='flex w-full flex-col gap-6'>
      <div className='flex w-60 items-center gap-2'>
        {Object.keys(GENDER).map(gender => (
          <GenderButton label={gender} key={gender} />
        ))}
      </div>
      <Button
        name='gender-form-next'
        size='sm'
        onClick={() => setProcess(prev => prev + 1)}
        label='다음'
      />
    </div>
  );
}
