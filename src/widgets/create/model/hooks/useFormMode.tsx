import React from 'react';

import type {
  UseFormSetValue,
  UseFormWatch,
  UseFormRegister,
} from 'react-hook-form';

import { Room } from '@/shared/types';

import { GroupDetailForm, GroupTitleForm } from '@/widgets/create/ui';
import {
  CONTENT_MAX_LENGTH,
  TITLE_MAX_LENGTH,
  TITLE_MIN_LENGTH,
} from '@/widgets/create/model';

interface RoomModeProps {
  register: UseFormRegister<Room>;
  watch: UseFormWatch<Room>;
  setValue: UseFormSetValue<Room>;
}

export default function useFormMode({
  register,
  watch,
  setValue,
}: RoomModeProps) {
  const { title, content, preferredGender, maxParticipants, place } = watch();

  const MODE = [
    {
      title: '모임방 기본 정보',
      form: <GroupTitleForm register={register} watch={watch} />,
      button: '다음으로',
      isFormValid:
        title?.length >= TITLE_MIN_LENGTH &&
        content.length > 0 &&
        title?.length <= TITLE_MAX_LENGTH &&
        content.length <= CONTENT_MAX_LENGTH &&
        place?.length > 0,
    },
    {
      title: '모임방 세부 정보',
      form: (
        <GroupDetailForm
          register={register}
          watch={watch}
          setValue={setValue}
        />
      ),
      button: '생성하기',
      isFormValid: preferredGender && maxParticipants,
    },
  ];

  return { MODE: [...MODE] };
}
