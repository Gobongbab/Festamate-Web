import { Gender } from '@/shared/types';

export interface RoomFormData {
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
