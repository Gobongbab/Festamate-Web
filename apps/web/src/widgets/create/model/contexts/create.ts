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
  date: Date | null;
  setDate: Dispatch<SetStateAction<Date | null>>;
  friendPhoneNumbers: string[];
  setFriendPhoneNumbers: Dispatch<SetStateAction<string[]>>;
} | null>(null);
