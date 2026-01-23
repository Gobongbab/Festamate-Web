import React from 'react';

import { cn } from '@festamate/utils';

import { useSignupProcess } from '@/screen/signup/model';
import {
  StudentCertifyForm,
  GenderForm,
  PhoneCertifyForm,
  PhoneForm,
  SignupComplete,
} from '@/screen/signup/ui';

export default function SignupContainer() {
  const {
    process,
    setProcess,
    phoneNumber,
    setPhoneNumber,
    gender,
    setGender,
    processInfo,
    isComplete,
    isInProgress,
  } = useSignupProcess();

  const { title, width } = processInfo;

  const renderForm = () => {
    switch (process) {
      case 0:
        return (
          <PhoneForm setProcess={setProcess} setPhoneNumber={setPhoneNumber} />
        );
      case 1:
        return (
          <PhoneCertifyForm setProcess={setProcess} phoneNumber={phoneNumber} />
        );
      case 2:
        return <GenderForm setProcess={setProcess} setGender={setGender} />;
      case 3:
        return (
          <StudentCertifyForm
            setProcess={setProcess}
            phoneNumber={phoneNumber}
            gender={gender}
          />
        );
    }
  };

  return (
    <>
      {isInProgress && (
        <>
          <div className='relative h-1 w-full'>
            <div className={cn('bg-dark absolute left-0 h-full', width)} />
          </div>
          <div className='gap-y-normal-spacing flex size-full flex-col p-12'>
            <p className='text-xl font-bold'>{title}</p>
            {renderForm()}
          </div>
        </>
      )}
      {isComplete && <SignupComplete />}
    </>
  );
}
