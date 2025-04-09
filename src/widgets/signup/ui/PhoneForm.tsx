import React, { type Dispatch, type SetStateAction, useState } from 'react';

import { useAtomValue } from 'jotai';

import { Button, Input } from '@/shared/ui';
import { getFormattedPhone } from '@/shared/utils';
import { useCertifyPhoneNumber } from '@/widgets/signup/api';
import { KakaoAccessTokenAtom } from '@/shared/atom';

interface PhoneFormProps {
  setProcess: Dispatch<SetStateAction<number>>;
}

export default function PhoneForm({ setProcess }: PhoneFormProps) {
  const [value, setValue] = useState<string>('');
  const { access_token } = useAtomValue(KakaoAccessTokenAtom);
  const { mutate } = useCertifyPhoneNumber();

  const handleClick = () => {
    let phoneNumber = '';
    value.split('-').forEach(v => (phoneNumber += v));
    mutate({ phone: phoneNumber, token: access_token });
    setProcess(prev => prev + 1);
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
          disabled={!(value.length === 13)}
          label='인증번호 전송'
        />
      </div>
    </div>
  );
}
