import React from 'react'

import { GroupCarousel } from '@/widgets/home/ui'

export default function HomeContainer() {
  return (
    <>
      <BoothInfo />
      <GroupCarousel label='개설된 모임방' key='openedGroup' />
      <GroupCarousel label='참여한 모임방' key='joinedGroup' />
      <button className='box-shadow-buttonLg rounded-10 text-md hover:bg-primary-hover z-30 mb-6 h-16 w-full flex-shrink-0 cursor-pointer bg-[#775bf0] font-semibold text-white'>
        모임방 생성하기
      </button>
    </>
  )
}

const BoothInfo = () => (
  <div className='rounded-10 from-primary/50 to-primary-hover/90 flex h-fit w-full flex-col gap-y-2 bg-gradient-to-r p-6 text-white'>
    <div className='flex items-baseline justify-between'>
      <span className='agbalumo-regular text-xl font-bold'>Festamate!</span>
      <span className='hover:text-dark cursor-pointer text-sm text-white'>
        <u>위치보기</u>
      </span>
    </div>
    <span className='text-xl font-semibold'>부스에 방문해보세요!</span>
  </div>
)
