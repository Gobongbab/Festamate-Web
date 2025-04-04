import { Input } from '@/shared/ui';
import { cn } from '@/shared/utils';
import { StudentIdSample } from '@/assets/images';

export const SIGNUP_PROCESS = [
  {
    title: '전화번호를 인증할게요!',
    element: <Input />,
    width: 'w-1/5',
  },
  {
    title: '인증번호를 입력해주세요',
    element: (
      <div className='flex w-full flex-col gap-y-3'>
        <Input disabled placeholder='01032764823' />
        <Input />
      </div>
    ),
    width: 'w-2/5',
  },
  {
    title: '성별을 알려주세요',
    element: (
      <div className='flex gap-x-2'>
        <button
          name='next-step'
          className='bg-fill border-border rounded-5 w-fit cursor-pointer border-[1px] p-2 px-6'
        >
          여성
        </button>
        <button
          name='next-step'
          className='bg-fill border-border rounded-5 w-fit cursor-pointer border-[1px] p-2 px-6'
        >
          남성
        </button>
      </div>
    ),
    width: 'w-3/5',
  },
  {
    title: '경기대학교 학생만 사용할 수 있어요!',
    element: (
      <>
        <div className='text-light font-light text-wrap'>
          <p>모바일 학생증을 캡쳐해서 올려주세요!</p>
          <p>학적 인증에만 사용되고, 다른 용도로는 사용되지 않아요.</p>
        </div>
        <div className='border-border rounded-5 w-full border-[1px] p-3'>
          <p className='mb-2 text-lg font-medium'>학생증 사진 예시</p>
          <div className='grid grid-cols-[auto_6fr] gap-4'>
            <img src={StudentIdSample} />
            <ul className='flex flex-col gap-2'>
              <li className={cn(`before:mr-2 before:content-['✅']`)}>
                이름, 학과, 학번
                <br />
                QR코드와 바코드가 포함된 학생증 사진
              </li>
              <li className={cn(`before:mr-2 before:content-['✅']`)}>
                경기대학교 전자출결 어플에서 <br /> 접근할 수 있는 학생증 사진
              </li>
            </ul>
          </div>
        </div>
      </>
    ),
    width: 'w-4/5',
  },
  {
    title: '환영해요!\n가입이 완료되었어요!',
    element: <></>,
    width: 'w-full',
  },
];
