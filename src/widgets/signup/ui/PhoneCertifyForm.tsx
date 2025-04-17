import React, { type Dispatch, type SetStateAction, useState } from 'react';

import { Button, Input } from '@/shared/ui';
import { useSubmitCode, useSubmitPhoneNumber } from '../api';

interface PhoneCertifyFormProps {
  phoneNumber: string;
  setProcess: Dispatch<SetStateAction<number>>;
}

export default function PhoneCertifyForm({
  phoneNumber,
  setProcess,
}: PhoneCertifyFormProps) {
  const [value, setValue] = useState<string>('');
  const { mutate, isSuccess } = useSubmitCode();
  const resend = useSubmitPhoneNumber().mutate;

  const handleClick = () => {
    mutate({ phoneNumber: phoneNumber, code: value });
    if (isSuccess) setProcess(prev => prev + 1);
  };

  const resendClick = () => {
    resend({ phoneNumber });
  };

  return (
    <div className='flex w-full flex-col gap-6'>
      <div className='flex w-full flex-col gap-2'>
        <div className='flex-1'>
          <Input
            id='phone-number'
            placeholder={phoneNumber}
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
          onClick={resendClick}
          className='focus:outline-none'
        >
          <u>인증번호가 오지 않나요? 다시 전송하기</u>
        </button>
      </div>
    </div>
  );
}
