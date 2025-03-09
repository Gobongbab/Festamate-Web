import React from 'react'

export default function Card() {
  return (
    <div
      className='card h-70 w-50 flex-shrink-0 bg-cover bg-center shadow-sm'
      style={{
        backgroundImage:
          'url(https://i.pinimg.com/736x/81/09/5c/81095c402f3fda5bff8cb19692d96dd9.jpg)',
      }}
    >
      <div className='rounded-10 absolute inset-0 z-0 bg-black/20' />
      <div className='card-body z-10 justify-between text-white'>
        <div className='flex justify-between'>
          <div className='badge bg-female flex items-center border-none text-white'>
            ♀ ONLY
          </div>
          <span>2/6</span>
        </div>
        <div className='flex flex-col items-start gap-y-1'>
          <div
            className='border-male size-10 rounded-[50%] border-2 bg-cover bg-center'
            style={{
              backgroundImage:
                'url(https://i.pinimg.com/736x/04/15/e3/0415e3a6c56fc6e8f1e0ac1bed4b6aaf.jpg)',
            }}
          />
          <p>1월 27일 18:00</p>
          <p className='text-lg leading-tight font-semibold'>
            오늘 같이
            <br /> 놀 사람
          </p>
          <p className='w-full overflow-hidden text-nowrap text-ellipsis'>
            둘째날 같이 노실 분 구해요 놀아줘요
          </p>
        </div>
      </div>
    </div>
  )
}
