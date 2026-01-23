import React from 'react';

import { cn, getDate } from '@festamate/utils';
import { Button } from '@/shared/ui';

import { useRoomCreateContext, useFormMode } from '@/screen/create/model';
import { usePostRoom } from '@/screen/create/api';

export default function CreateContainer() {
  const { register, watch, setValue } = useRoomCreateContext();
  const mode = watch('mode');
  const file = watch('file');
  const date = watch('date');
  const friendPhoneNumbers = watch('friendPhoneNumbers');

  const { MODE } = useFormMode({ register, watch, setValue });
  const { form, isFormValid, button } = MODE[mode];
  const { mutate, isPending } = usePostRoom();

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('imageFiles', file!);
    const postData = JSON.stringify({
      ...watch(),
      maxParticipants: Number(watch('maxParticipants')) as 2 | 4 | 6,
      meetingDateTime: getDate(date!, 'YYYY-MM-DD HH:mm:ss'),
      friendPhoneNumbers: {
        friendPhoneNumbers: [...friendPhoneNumbers],
      },
    });
    console.log(postData);
    const blob = new Blob([postData], { type: 'application/json' });
    formData.append('request', blob);
    mutate(formData);
  };

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
                if (index === 0) setValue('mode', index);
              }}
            >
              {title}
            </button>
          ))}
        </div>
        {form}
      </div>
      <Button
        name='group-form-submit'
        type='button'
        size='lg'
        disabled={!isFormValid || isPending}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          if (mode === 0) setValue('mode', 1);
          else handleSubmit();
        }}
        label={isPending ? '방을 만드는 중..' : button}
        className='mb-normal-spacing'
      />
    </form>
  );
}
