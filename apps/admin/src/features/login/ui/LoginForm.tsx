import React, { useState } from 'react';

import { useForm } from 'react-hook-form';

import { Input } from '@/shared/ui';
import { Login } from '@/features/login/types';
import { useLoginHandler } from '@/features/login/model';

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, watch } = useForm<Login>({
    defaultValues: {
      loginId: '',
      password: '',
    },
  });
  const { handleLoginSubmit } = useLoginHandler({ setError });
  const { loginId, password } = watch();
  const isFormValid = loginId.length > 0 && password.length > 0;

  return (
    <form
      className='flex size-full flex-col gap-8'
      onSubmit={handleSubmit(handleLoginSubmit)}
    >
      <div className='flex flex-col gap-3'>
        <Input
          label='아이디'
          error={error}
          placeholder='아이디를 입력하세요'
          {...register('loginId', { required: true })}
        />
        <Input
          label='비밀번호'
          error={error}
          type='password'
          placeholder='비밀번호를 입력하세요'
          {...register('password', { required: true })}
        />
      </div>
      <button
        type='submit'
        name='loginSubmit'
        className='disabled:bg-border bg-point rounded-10 hover:bg-point-hover cursor-pointer py-3 text-lg text-white transition duration-150 focus:outline-none disabled:pointer-events-none'
        disabled={!isFormValid}
      >
        로그인
      </button>
    </form>
  );
}
