import React, { type ReactNode } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import { type RoomListItem } from '@/shared/types';
import { RoomFormData } from '@/widgets/room-form';

export interface EditFormData extends Omit<RoomFormData, 'date'> {
  date: Date; // EditFormData는 date가 필수 (null 불가)
}

interface EditProviderProps {
  children: ReactNode;
  initialData: RoomListItem;
}

export default function EditProvider({
  children,
  initialData,
}: EditProviderProps) {
  const {
    title,
    place,
    content,
    preferredGender,
    preferredStudentIdMin,
    preferredStudentIdMax,
    maxParticipants,
    openChatUrl,
    thumbnail,
    meetingDateTime,
  } = initialData;

  const methods = useForm<EditFormData>({
    defaultValues: {
      title,
      place,
      content,
      preferredGender,
      preferredStudentIdMin,
      preferredStudentIdMax,
      maxParticipants,
      openChatUrl,
      mode: 0,
      maxParticipantsRender: maxParticipants as number,
      file: undefined,
      image: thumbnail.url,
      date: new Date(meetingDateTime),
      friendPhoneNumbers: [],
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
}
