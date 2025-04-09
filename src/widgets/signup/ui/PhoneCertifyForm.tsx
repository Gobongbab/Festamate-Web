import React, { type Dispatch, type SetStateAction, useState } from 'react';

import { useAtomValue } from 'jotai';

import { Button, Input } from '@/shared/ui';
import { KakaoAccessTokenAtom } from '@/shared/atom';

interface PhoneCertifyFormProps {
  setProcess: Dispatch<SetStateAction<number>>;
}

export default function PhoneCertifyForm({
  setProcess,
}: PhoneCertifyFormProps) {
  const [value, setValue] = useState<string>('');
  const { access_token } = useAtomValue(KakaoAccessTokenAtom);

  const handleClick = () => {
    console.log(access_token);
    setProcess(prev => prev + 1);
  };

  return (
    <div className='flex w-full flex-col gap-6'>
      <div className='flex w-full flex-col gap-2'>
        <div className='flex-1'>
          <Input
            id='phone-number'
            placeholder='전화번호를 입력해 주세요'
            type='phone'
            disabled
          />
        </div>
        <div className='flex-1'>
          <Input
            id='phone-number-certification'
            placeholder='인증번호를 입력해 주세요'
            type='number'
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        </div>
      </div>

      <div className='flex flex-col items-center justify-center gap-4'>
        <Button
          name='check-certifications'
          size='sm'
          onClick={handleClick}
          disabled={!(value.length > 3)}
          label='인증번호 확인'
        />
        <button
          name='resend-certifications'
          onClick={handleClick}
          className='focus:outline-none'
        >
          <u>인증번호가 오지 않나요?</u>
        </button>
      </div>
    </div>
  );
}
