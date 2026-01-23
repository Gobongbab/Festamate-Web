import React, { type ReactNode } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import { Gender, type RoomListItem } from '@/shared/types';

export interface EditFormData {
  title: string;
  place: string;
  content: string;
  preferredGender: Gender;
  preferredStudentIdMin: string;
  preferredStudentIdMax: string;
  maxParticipants: 2 | 4 | 6;
  openChatUrl: string;

  mode: number;
  maxParticipantsRender: number;
  file?: File;
  image: string;
  date: Date;
  friendPhoneNumbers: string[];
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
