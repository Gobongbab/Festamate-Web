import React, {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useState,
} from 'react';

import { Button, Input } from '@/shared/ui';
import { useSubmitCode, useSubmitPhoneNumber } from '../api';
import { cn } from '@festamate/utils';

interface PhoneCertifyFormProps {
  phoneNumber: string;
  setProcess: Dispatch<SetStateAction<number>>;
}

export default function PhoneCertifyForm({
  phoneNumber,
  setProcess,
}: PhoneCertifyFormProps) {
  const [timeOver, setTimeOver] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [count, setCount] = useState<number>(300);
  const { mutate, isPending, isError } = useSubmitCode({
    setProcess,
  });
  const resend = useSubmitPhoneNumber().mutate;

  const handleClick = () => {
    let phoneNumberWithoutHypen = '';
    phoneNumber.split('-').forEach(v => (phoneNumberWithoutHypen += v));
    mutate({ phoneNumber: phoneNumberWithoutHypen, code: value });
  };

  const resendClick = () => {
    resend({ phoneNumber });
    setTimeOver(false);
  };

  const timeFormat = (time: number) => {
    const minute = Math.floor(time / 60);
    const second = time % 60;
    const isDigit = time.toString().length === 1;
    return `${minute}:${isDigit ? `0${second}` : second}`;
  };
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    if (timeOver === false) {
      intervalId = setInterval(() => {
        setCount(prev => {
          if (prev <= 1) {
            clearInterval(intervalId);
            setTimeOver(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [timeOver]);

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
        <div className='relative flex-1'>
          <Input
            id='phone-number-certification'
            placeholder='인증번호를 입력해 주세요'
            type='number'
            value={value}
            onChange={e => setValue(e.target.value)}
            disabled={timeOver}
          />
          <span
            className={cn(
              count < 60 ? 'text-important' : 'text-light',
              'absolute top-2.5 right-4',
            )}
          >
            {timeFormat(count)}
          </span>
        </div>
      </div>

      <div className='flex flex-col items-center justify-center gap-4'>
        <Button
          name='check-certifications'
          size='sm'
          onClick={handleClick}
          disabled={!(value.length > 3) || isPending}
          label={
            isPending
              ? '인증 중..'
              : isError
                ? '번호 확인에 실패했어요. 다시 시도하기'
                : '인증번호 확인'
          }
        />
        <button
          name='resend-certifications'
          onClick={resendClick}
          className='focus:outline-none'
        >
          <u>
            {timeOver
              ? '시간이 초과되었어요. 인증번호를 다시 요청해 주세요.'
              : '인증번호가 오지 않나요? 다시 전송하기'}
          </u>
        </button>
      </div>
    </div>
  );
}
