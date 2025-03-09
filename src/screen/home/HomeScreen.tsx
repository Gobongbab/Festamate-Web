import { type ActivityComponentType } from '@stackflow/react'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { Card, Dock } from '@/shared/ui'

const HomeScreen: ActivityComponentType = () => {
  const arr = Array.from({ length: 7 })
  return (
    <AppScreen
      appBar={{
        renderLeft: () => (
          <span className='agbalumo-regular ml-2 text-lg font-bold'>
            Festamate!
          </span>
        ),
        renderRight: () => (
          <div
            className='mr-2 size-10 rounded-[50%] bg-cover bg-center'
            style={{
              backgroundImage:
                'url(https://i.pinimg.com/736x/04/15/e3/0415e3a6c56fc6e8f1e0ac1bed4b6aaf.jpg)',
            }}
          />
        ),
        height: '60px',
        backgroundColor: '#f4f4f4',
      }}
    >
      <div className='scrollbar-hide flex size-full flex-col gap-y-6 overflow-scroll overflow-y-scroll p-6'>
        <div className='rounded-10 from-primary/50 to-primary-hover/90 flex h-fit w-full flex-col gap-y-2 bg-gradient-to-r p-6 text-white'>
          <div className='flex items-baseline justify-between'>
            <span className='agbalumo-regular text-xl font-bold'>
              Festamate!
            </span>
            <span className='hover:text-dark cursor-pointer text-sm text-white'>
              <u>위치보기</u>
            </span>
          </div>
          <span className='text-xl font-semibold'>부스에 방문해보세요!</span>
        </div>
        <div className='flex w-full flex-col gap-y-3'>
          <div className='flex items-baseline gap-x-2'>
            <span className='text-lg font-semibold'>개설된 모임방</span>
            <span className='text-light hover:text-dark cursor-pointer text-sm'>
              <u>더보기</u>
            </span>
          </div>
          <div className='scrollbar-hide flex h-71 items-center gap-x-3 overflow-x-scroll'>
            {arr.map(() => (
              <Card />
            ))}
          </div>
        </div>
        <div className='mb-34 flex w-full flex-col gap-y-3'>
          <div className='flex items-baseline gap-x-2'>
            <span className='text-lg font-semibold'>참여한 모임방</span>
            <span className='text-light hover:text-dark cursor-pointer text-sm'>
              <u>더보기</u>
            </span>
          </div>
          <div className='scrollbar-hide flex h-71 items-center gap-x-3 overflow-x-scroll'>
            {arr.map(() => (
              <Card />
            ))}
          </div>
        </div>
        <button className='box-shadow-buttonLg rounded-10 text-md hover:bg-primary-hover fixed bottom-20 z-30 h-16 w-[calc(100%-3rem)] cursor-pointer bg-[#775bf0] font-semibold text-white'>
          모임방 생성하기
        </button>
      </div>
      <Dock />
    </AppScreen>
  )
}

export default HomeScreen
