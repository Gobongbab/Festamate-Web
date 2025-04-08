import React, {
  ChangeEvent,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';

import { StudentIdSample } from '@/assets/images';
import { cn } from '@/shared/utils';

interface StudentCertifyFormProps {
  setProcess: Dispatch<SetStateAction<number>>;
}

export default function StudentCertifyForm({
  setProcess,
}: StudentCertifyFormProps) {
  const [image, setImage] = useState<string>('');

  const handleImageInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImage('');
    }
  };

  const handleClick = () => {
    setProcess(prev => prev + 1);
  };

  return (
    <>
      <div className='text-light font-light text-wrap'>
        <p>모바일 학생증을 캡쳐해서 올려주세요!</p>
        <p>오직 학적 인증 용도로만 사용돼요.</p>
      </div>
      <StudentCertifyGuide />
      <label htmlFor='file'>
        <input
          id='file'
          type='file'
          accept='image/*'
          onChange={handleImageInputChange}
          className='hidden'
        />
        <div
          className='border-border rounded-5 grid h-20 w-full place-items-center border-[1px] bg-cover bg-center'
          style={{ backgroundImage: `url(${image ?? ''})` }}
        >
          {image === '' && (
            <button className='-z-10 cursor-pointer focus:outline-none'>
              경기대 전자출결 앱 내부의 학생증 사진을 올려주세요!
            </button>
          )}
        </div>
        {image !== '' && (
          <p className='text-positive mt-1 text-sm'>✅ 사진 업로드 완료!</p>
        )}
      </label>

      <button
        name='phone-number-auth'
        className='disabled:text-light bg-fill border-border rounded-5 hover:bg-sub w-fit cursor-pointer border-[1px] p-2 px-6 transition duration-150'
        onClick={handleClick}
        disabled={image === ''}
      >
        학적 인증하기
      </button>
    </>
  );
}

const StudentCertifyGuide = () => (
  <div className='border-border rounded-5 w-full border-[1px] p-3'>
    <p className='mb-1 font-semibold'>학생증 사진 예시</p>
    <div className='grid grid-cols-[auto_6fr] gap-3'>
      <img src={StudentIdSample} className='border-border border-[1px]' />
      <ul className='flex flex-col gap-2 text-sm'>
        <li className={cn(`before:mr-2 before:content-['✅']`)}>
          <b className='font-semibold'>경기대학교 전자출결 어플</b>에서 접근할
          수 있는 학생증 사진
        </li>
        <li className={cn(`before:mr-2 before:content-['✅']`)}>
          <b className='font-semibold'>이름, 학과, 학번</b>, 그리고 QR코드와
          바코드가 포함된 학생증 사진
        </li>
        <li className={cn(`before:mr-2 before:content-['❌']`)}>
          전자출결 어플의 학생증 사진과 다른 형식의 학생증 사진
        </li>
      </ul>
    </div>
  </div>
);
