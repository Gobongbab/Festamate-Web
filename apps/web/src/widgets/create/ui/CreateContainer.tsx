import React from 'react';

import { useForm } from 'react-hook-form';

import { cn, getDate } from '@festamate/utils';
import { Button } from '@/shared/ui';

import { useRoomCreateContext, useFormMode } from '@/widgets/create/model';
import { Room } from '@/shared/types';
import { useFormSubmit } from '@/widgets/create/api';

export default function CreateContainer() {
  const { mode, setMode, file, date } = useRoomCreateContext();

  const { register, watch, setValue } = useForm<Room>({
    defaultValues: {
      content: '',
      preferredStudentIdMin: '20',
      preferredStudentIdMax: '23',
      friendPhoneNumbers: {
        friendPhoneNumbers: [],
      },
    },
  });

  const { MODE } = useFormMode({ register, watch, setValue });
  const { form, isFormValid, button } = MODE[mode];
  const { mutate, isPending } = useFormSubmit();

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('imageFiles', file!);
    const postData = JSON.stringify({
      ...watch(),
      maxParticipants: Number(watch('maxParticipants')) as 2 | 4 | 6,
      meetingDateTime: getDate(date, 'YYYY-MM-DD HH:mm:ss'),
    });
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
                if (index === 0) setMode(index);
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
          if (mode === 0) setMode(1);
          else handleSubmit();
        }}
        label={isPending ? '방을 만드는 중..' : button}
        className='mb-normal-spacing'
      />
    </form>
  );
}
