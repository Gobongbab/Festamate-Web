import React, { useState, type ReactNode } from 'react';

import { RoomCreateContext } from '@/widgets/create/model';

export default function CreateProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState(0);
  const [headCountRender, setHeadCountRender] = useState(2);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [image, setImage] = useState<string>('');

  return (
    <RoomCreateContext.Provider
      value={{
        mode,
        setMode,
        headCountRender,
        setHeadCountRender,
        file,
        setFile,
        image,
        setImage,
      }}
    >
      {children}
    </RoomCreateContext.Provider>
  );
}
