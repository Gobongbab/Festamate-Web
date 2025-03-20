import { AppScreen } from '@stackflow/plugin-basic-ui'
import { Appbar, Dock } from '@/shared/ui'

export default function UserScreen() {
  return (
    <AppScreen appBar={Appbar}>
      <div className='scrollbar-hide container-mobile flex size-full flex-col gap-y-6 overflow-scroll overflow-y-scroll p-6 pb-19'></div>
      <Dock />
    </AppScreen>
  )
}
