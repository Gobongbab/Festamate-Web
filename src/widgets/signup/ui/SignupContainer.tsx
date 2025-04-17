import React, { useState } from 'react';

import { cn } from '@/shared/utils';

import { SIGNUP_PROCESS } from '@/widgets/signup/model';
import {
  StudentCertifyForm,
  GenderForm,
  PhoneCertifyForm,
  PhoneForm,
  SignupComplete,
} from '@/widgets/signup/ui';

export default function SignupContainer() {
  const [process, setProcess] = useState<number>(0);
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const { title, width } = SIGNUP_PROCESS[process];
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
        return <GenderForm setProcess={setProcess} />;
      case 3:
        return <StudentCertifyForm setProcess={setProcess} />;
    }
  };

  return (
    <>
      {process < 4 && (
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
      {process === 4 && <SignupComplete />}
    </>
  );
}
