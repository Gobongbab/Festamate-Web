import { useState, useMemo } from 'react';
import { Gender } from '@/shared/types';
import { SIGNUP_PROCESS } from './signup';

export const useSignupProcess = () => {
  const [process, setProcess] = useState<number>(0);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [gender, setGender] = useState<Gender>('MALE');

  const processInfo = useMemo(
    () => SIGNUP_PROCESS[process],
    [process],
  );

  const isComplete = useMemo(() => process === 4, [process]);
  const isInProgress = useMemo(() => process < 4, [process]);

  return {
    process,
    setProcess,
    phoneNumber,
    setPhoneNumber,
    gender,
    setGender,
    processInfo,
    isComplete,
    isInProgress,
  };
};
