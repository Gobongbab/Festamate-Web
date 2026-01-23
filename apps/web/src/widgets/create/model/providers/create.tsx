import React, { type ReactNode } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import { Gender } from '@/shared/types';

export interface CreateFormData {
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
  date: Date | null;
  friendPhoneNumbers: string[];
}

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
