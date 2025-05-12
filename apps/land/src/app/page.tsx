'use client';
export default function Home() {
  return (
    <div className='grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20'>
      <a
        className='text-3xl text-red-500'
        href='https://festamate-web.vercel.app/'
      >
        테스트1
      </a>
      <button
        className='text-3xl text-red-500'
        onClick={() =>
          window.open('https://festamate-web.vercel.app/', '_blank')
        }
      >
        테스트2(아마 이게 될거임)
      </button>
    </div>
  );
}
