import React, { useState } from 'react';

import { useForm } from 'react-hook-form';

import { cn, getCookie, getDate } from '@/shared/utils';
import { GroupDetailForm, GroupTitleForm } from '@/widgets/create/ui';
import { Room } from '../types';
import { CONTENT_MAX_LENGTH, TITLE_MAX_LENGTH } from '../model';
import { post, REQUEST } from '@/shared/api';

export default function CreateContainer() {
  const [mode, setMode] = useState(0);
  const { register, watch } = useForm<Room>({
    defaultValues: {
      content: '',
      meetingDateTime: getDate(new Date(), 'YYYY-MM-DD HH:MM:') + '00',
    },
  });

  const { title, content, openChatLink, preferredGender, headCount } = watch();
  const handleSubmit = async () => {
    const postData = {
      ...watch(),
      headCount: Number(watch('headCount')) as 2 | 4 | 6,
    };
    const token = getCookie();
    console.log(postData);
    await post<Room>(REQUEST.ROOM, postData, token);
  };

  const MODE = [
    {
      title: '1. 모임방 이름, 설명',
      form: <GroupTitleForm register={register} watch={watch} />,
      button: '다음으로',
      isFormValid:
        title?.length > 0 &&
        content.length > 0 &&
        title?.length < TITLE_MAX_LENGTH &&
        content.length < CONTENT_MAX_LENGTH,
    },
    {
      title: '2. 모임방 세부 정보',
      form: <GroupDetailForm register={register} watch={watch} />,
      button: '생성하기',
      isFormValid: openChatLink && preferredGender && headCount,
    },
  ];

  return (
    <form className='flex size-full flex-col justify-between'>
      <div className='scrollbar-hide flex flex-col gap-y-6 overflow-scroll'>
        <div className='flex w-fit'>
          {MODE.map(({ title }, index) => (
            <button
              type='button'
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
        name='group-form-submit'
        type='button'
        className='disabled:bg-sub disabled:text-border box-shadow-buttonLg rounded-10 hover:bg-primary-hover z-30 mb-6 h-16 w-full flex-shrink-0 cursor-pointer bg-[#775bf0] text-lg font-semibold text-white transition duration-300'
        disabled={!MODE[mode].isFormValid}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          if (mode === 0) setMode(prev => (prev === 0 ? 1 : 1));
          else handleSubmit();
        }}
      >
        {MODE[mode].button}
      </button>
    </form>
  );
}
