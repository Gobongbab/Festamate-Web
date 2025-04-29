import { IoMdMale, IoMdFemale } from 'react-icons/io';

export const GENDER = {
  MALE: (
    <span className='flex items-center gap-x-1'>
      <IoMdMale size={12} />
      남성 입장 가능
    </span>
  ),
  FEMALE: (
    <span className='flex items-center gap-x-1'>
      <IoMdFemale size={12} />
      여성 입장 가능
    </span>
  ),
} as const;
