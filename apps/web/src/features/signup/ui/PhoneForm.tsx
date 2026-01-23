import React, { type Dispatch, type SetStateAction, useState } from 'react';

import { Button, Input } from '@/shared/ui';
import { getFormattedPhone } from '@festamate/utils';
import { useSubmitPhoneNumber } from '@/features/signup/api';

interface PhoneFormProps {
  setProcess: Dispatch<SetStateAction<number>>;
  setPhoneNumber: Dispatch<SetStateAction<string>>;
}

export default function PhoneForm({
  setProcess,
  setPhoneNumber,
}: PhoneFormProps) {
  const [value, setValue] = useState<string>('');
  const { mutate, isError, isPending } = useSubmitPhoneNumber();

  const handleClick = () => {
    let phoneNumber = '';
    setPhoneNumber(value);
    value.split('-').forEach(v => (phoneNumber += v));
    mutate({ phoneNumber: phoneNumber });
    if (!isError && !isPending) setProcess(prev => prev + 1);
  };

  return (
    <div className='flex w-full flex-col gap-6'>
      <div className='flex w-full gap-2'>
        <div className='border-border rounded-5 flex items-center border-[1px] px-4 py-2'>
          🇰🇷 +82
        </div>
        <div className='flex-1'>
          <Input
            id='phone-number'
            placeholder='전화번호를 입력해 주세요'
            type='phone'
            value={value}
            onChange={e => {
              const rawValue = e.target.value;
              const formattedValue = getFormattedPhone(rawValue);
              setValue(formattedValue);
            }}
          />
        </div>
      </div>
      <div className='flex items-center justify-center'>
        <Button
          name='phone-number-auth'
          size='sm'
          onClick={handleClick}
          disabled={!(value.length === 13) || isPending}
          label={
            isPending ? (
              <>전송 중이에요..</>
            ) : isError ? (
              <>다시 시도</>
            ) : (
              <>인증번호 전송</>
            )
          }
        />
      </div>
    </div>
  );
}
