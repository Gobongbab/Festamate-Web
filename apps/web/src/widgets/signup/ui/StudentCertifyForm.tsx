import React, {
  ChangeEvent,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';

import { useAtomValue } from 'jotai';

import { cn } from '@festamate/utils';

import { StudentIdSample } from '@/assets/images';

import { KakaoAccessTokenAtom } from '@/shared/atom';
import { Gender } from '@/shared/types';

import { useCertifyStudent, useSignup } from '@/widgets/signup/api';

interface StudentCertifyFormProps {
  setProcess: Dispatch<SetStateAction<number>>;
  phoneNumber: string;
  gender: Gender;
}

export default function StudentCertifyForm({
  setProcess,
  phoneNumber,
  gender,
}: StudentCertifyFormProps) {
  const [image, setImage] = useState<string>('');
  const [file, setFile] = useState<File | undefined>(undefined);
  const [certifyError, setCertifyError] = useState<string>('');
  const [processStatus, setProcessStatus] = useState<
    'idle' | 'certifying' | 'signing' | 'complete'
  >('idle');

  const { kakaoAccessToken } = useAtomValue(KakaoAccessTokenAtom);
  const { mutate: signup } = useSignup({ setProcess });
  const { mutateAsync: certifyStudent, isError: isCertifyError } =
    useCertifyStudent();

  const handleClick = async () => {
    if (!file) return;

    setCertifyError('');
    setProcessStatus('certifying');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const data = await certifyStudent(formData);
      const { name, studentId, studentDepartment } = data.result;

      setProcessStatus('signing');

      const signupInfo = {
        name,
        studentId,
        phoneNumber,
        gender,
        department: studentDepartment,
        kakaoAccessToken,
      };

      signup(signupInfo, {
        onSuccess: () => {
          setProcessStatus('complete');
        },
        onError: () => {
          setCertifyError('회원가입 중 오류가 발생했어요.');
          setProcessStatus('idle');
        },
      });
    } catch {
      setCertifyError(
        '학적 인증 중 오류가 발생했어요. 사진을 다시 확인해주세요.',
      );
      setProcessStatus('idle');
    }
  };

  const handleImageInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setCertifyError('');
    } else {
      setImage('');
      setFile(undefined);
    }
  };

  const getButtonText = () => {
    switch (processStatus) {
      case 'certifying':
        return '인증 중..';
      case 'signing':
        return '가입 중..';
      case 'complete':
        return '인증 성공';
      default:
        return isCertifyError ? '다시 시도하기' : '학적 인증하기';
    }
  };

  const isButtonDisabled = () => {
    return (
      image === '' ||
      processStatus === 'certifying' ||
      processStatus === 'signing' ||
      processStatus === 'complete'
    );
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
          disabled={processStatus !== 'idle'}
        />
        <div
          className='border-border rounded-5 grid h-20 w-full place-items-center border-[1px] bg-cover bg-center'
          style={{ backgroundImage: `url(${image ?? ''})` }}
        >
          {image === '' && (
            <button className='text-light -z-10 cursor-pointer font-light focus:outline-none'>
              여기를 클릭해 학생증 사진을 올려주세요!
            </button>
          )}
        </div>
        {image !== '' && !certifyError && (
          <p className='text-positive mt-2 text-sm'>사진 업로드 완료!</p>
        )}
        {certifyError && (
          <p className='text-important mt-2 text-sm'>{certifyError}</p>
        )}
      </label>
      <button
        name='phone-number-auth'
        className={cn(
          'border-border rounded-5 w-fit cursor-pointer border-[1px] p-2 px-6 transition duration-150',
          processStatus === 'complete'
            ? 'bg-green-500 text-white'
            : 'bg-fill hover:bg-sub',
          isButtonDisabled() && 'text-light cursor-not-allowed',
        )}
        onClick={handleClick}
        disabled={isButtonDisabled()}
      >
        {getButtonText()}
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
