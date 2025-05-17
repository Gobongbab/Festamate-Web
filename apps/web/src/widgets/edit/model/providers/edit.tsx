import React, { useState, type ReactNode } from 'react';

import type { RoomListItem } from '@/shared/types';

import { RoomEditContext } from '@/widgets/edit/model';

interface EditProviderProps {
  children: ReactNode;
  initialData: RoomListItem;
}

export default function EditProvider({
  children,
  initialData,
}: EditProviderProps) {
  const { maxParticipants, thumbnail, meetingDateTime } = initialData;
  const [mode, setMode] = useState(0);
  const [maxParticipantsRender, setMaxParticipantsRender] = useState(
    maxParticipants as number,
  );
  const [file, setFile] = useState<File | undefined>(undefined);
  const [image, setImage] = useState<string>(thumbnail.url);
  const [date, setDate] = useState<Date>(new Date(meetingDateTime));
  const [friendPhoneNumbers, setFriendPhoneNumbers] = useState<string[]>([]);

  return (
    <RoomEditContext.Provider
      value={{
        mode,
        setMode,
        maxParticipantsRender,
        setMaxParticipantsRender,
        file,
        setFile,
        image,
        setImage,
        date,
        setDate,
        friendPhoneNumbers,
        setFriendPhoneNumbers,
      }}
    >
      {children}
    </RoomEditContext.Provider>
  );
}
