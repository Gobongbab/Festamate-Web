import React, { useState } from 'react';

import { cn } from '@/shared/utils';
import { GroupDetailForm, GroupTitleForm } from '@/widgets/create/ui';

export default function CreateContainer() {
  const [mode, setMode] = useState(0);

  const MODE = [
    {
      title: '1. 모임방 이름, 설명',
      form: <GroupTitleForm />,
      button: '생성하기',
    },
    {
      title: '2. 모임방 세부 정보',
      form: <GroupDetailForm />,
      button: '다음으로',
    },
  ];

  return (
    <div className='flex size-full flex-col justify-between'>
      <div className='flex flex-col gap-y-6'>
        <div className='flex w-fit'>
          {MODE.map(({ title }, index) => (
            <button
              key={title}
              className={cn(
                'border-sub text-light border-b-2 px-3 py-2 text-lg font-semibold focus:outline-none',
                MODE[mode].title === title && 'text-dark border-black',
              )}
              name='group-data-details'
              onClick={() => {
                if (index === 0) setMode(index);
              }}
            >
              {title}
            </button>
          ))}
        </div>
        {MODE[mode].form}
      </div>
      <button
        className='box-shadow-buttonLg rounded-10 hover:bg-primary-hover z-30 mb-6 h-16 w-full flex-shrink-0 cursor-pointer bg-[#775bf0] text-lg font-semibold text-white'
        onClick={() => setMode(prev => (prev === 0 ? 1 : 1))}
      >
        {MODE[mode].button}
      </button>
    </div>
  );
}
