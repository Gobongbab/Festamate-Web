import React, { useState } from 'react';

import { cn } from '@/shared/utils';
import { GroupDetailForm, GroupTitleForm } from '@/widgets/create/ui';

export default function CreateContainer() {
  const MODE = [
    { title: '세부 정보', form: <GroupDetailForm /> },
    { title: '제목 설명', form: <GroupTitleForm /> },
  ];
  const [mode, setMode] = useState(0);

  return (
    <div className='flex size-full flex-col justify-between'>
      <div className='flex flex-col gap-y-6'>
        <div className='flex w-fit'>
          {MODE.map(({ title }, index) => (
            <button
              key={title}
              className={cn(
                'border-sub text-md text-light border-b-2 px-3 py-2 font-semibold focus:outline-none',
                MODE[mode].title === title && 'text-dark border-black',
              )}
              name='group-data-details'
              onClick={() => setMode(index)}
            >
              {title}
            </button>
          ))}
        </div>
        {MODE[mode].form}
      </div>
      <button>다음으로</button>
    </div>
  );
}
