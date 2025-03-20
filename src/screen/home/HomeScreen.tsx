import { AppScreen } from '@stackflow/plugin-basic-ui'
import { Dock } from '@/shared/ui'
import { HomeContainer } from '@/widgets/home/ui'

export default function HomeScreen() {
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
      <div className='scrollbar-hide container-mobile flex size-full flex-col gap-y-6 overflow-scroll overflow-y-scroll p-6 pb-19'>
        <HomeContainer />
      </div>
      <Dock />
    </AppScreen>
  )
}
