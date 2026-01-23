import React from 'react';

import type {
  UseFormSetValue,
  UseFormWatch,
  UseFormRegister,
} from 'react-hook-form';

import {
  CONTENT_MAX_LENGTH,
  PLACE_MAX_LENGTH,
  TITLE_MIN_LENGTH,
  TITLE_MAX_LENGTH,
} from '@/shared/constants';

import { RoomGroupDetailForm, RoomGroupTitleForm } from '@/widgets/room-form';
import { usePostCertifyUser } from '@/screen/create/api';
import { CreateFormData } from '@/screen/create/model';

interface RoomModeProps {
  register: UseFormRegister<CreateFormData>;
  watch: UseFormWatch<CreateFormData>;
  setValue: UseFormSetValue<CreateFormData>;
}

export default function useFormMode({
  register,
  watch,
  setValue,
}: RoomModeProps) {
  const title = watch('title');
  const content = watch('content');
  const preferredGender = watch('preferredGender');
  const maxParticipants = watch('maxParticipants');
  const place = watch('place');
  const openChatUrl = watch('openChatUrl');
  const maxParticipantsRender = watch('maxParticipantsRender');
  const friendPhoneNumbers = watch('friendPhoneNumbers');
  const date = watch('date');

  const MODE = [
    {
      title: '모임 기본 정보',
      form: (
        <RoomGroupTitleForm
          register={register}
          watch={watch}
          setValue={setValue}
        />
      ),
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
        <RoomGroupDetailForm
          register={register as any}
          watch={watch as any}
          setValue={setValue as any}
          useSubmitFriendPhone={usePostCertifyUser}
        />
      ),
      button: '생성하기',
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
