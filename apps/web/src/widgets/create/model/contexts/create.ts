import { createContext, type Dispatch, type SetStateAction } from 'react';

export const RoomCreateContext = createContext<{
  mode: number;
  setMode: Dispatch<SetStateAction<number>>;
  maxParticipantsRender: number;
  setMaxParticipantsRender: Dispatch<SetStateAction<number>>;
  file: File | undefined;
  setFile: Dispatch<SetStateAction<File | undefined>>;
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
} | null>(null);
