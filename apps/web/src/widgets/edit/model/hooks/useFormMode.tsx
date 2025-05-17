import React from 'react';

import type {
  UseFormSetValue,
  UseFormWatch,
  UseFormRegister,
} from 'react-hook-form';

import { Room } from '@/shared/types';
import {
  CONTENT_MAX_LENGTH,
  PLACE_MAX_LENGTH,
  TITLE_MIN_LENGTH,
  TITLE_MAX_LENGTH,
} from '@/shared/constants';

import { GroupDetailForm, GroupTitleForm } from '@/widgets/edit/ui';
import { useRoomEditContext } from '@/widgets/edit/model';

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
  const {
    title,
    content,
    preferredGender,
    maxParticipants,
    place,
    openChatUrl,
  } = watch();
  const { maxParticipantsRender, friendPhoneNumbers, date } =
    useRoomEditContext();

  const MODE = [
    {
      title: '모임 기본 정보',
      form: <GroupTitleForm register={register} watch={watch} />,
      button: '다음으로',
      isFormValid:
        title?.length >= TITLE_MIN_LENGTH &&
        content.length > 0 &&
        title?.length <= TITLE_MAX_LENGTH &&
        content.length <= CONTENT_MAX_LENGTH &&
        place?.length > 0 &&
        place?.length <= PLACE_MAX_LENGTH,
    },
    {
      title: '모임 세부 정보',
      form: (
        <GroupDetailForm
          register={register}
          watch={watch}
          setValue={setValue}
        />
      ),
      button: '수정하기',
      isFormValid:
        date &&
        preferredGender &&
        maxParticipants &&
        openChatUrl.length > 0 &&
        (maxParticipantsRender !== 2
          ? friendPhoneNumbers.length === maxParticipantsRender / 2 - 1
          : true),
    },
  ];

  return { MODE: [...MODE] };
}
