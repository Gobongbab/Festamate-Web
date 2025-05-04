import React, { useState, type ReactNode } from 'react';

import { RoomCreateContext } from '@/widgets/create/model';

export default function CreateProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState(0);
  const [maxParticipantsRender, setMaxParticipantsRender] = useState(2);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [image, setImage] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [friendPhoneNumbers, setFriendPhoneNumbers] = useState<string[]>([]);

  return (
    <RoomCreateContext.Provider
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
    </RoomCreateContext.Provider>
  );
}
