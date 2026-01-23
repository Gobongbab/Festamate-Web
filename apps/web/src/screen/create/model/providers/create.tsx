import React, { type ReactNode } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import { RoomFormData } from '@/widgets/room-form';

export interface CreateFormData extends RoomFormData {}

export default function CreateProvider({ children }: { children: ReactNode }) {
  const methods = useForm<CreateFormData>({
    defaultValues: {
      title: '',
      place: '',
      content: '',
      preferredGender: 'MALE',
      preferredStudentIdMin: '20',
      preferredStudentIdMax: '23',
      maxParticipants: 2,
      openChatUrl: '',
      mode: 0,
      maxParticipantsRender: 2,
      file: undefined,
      image: '',
      date: null,
      friendPhoneNumbers: [],
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
}
