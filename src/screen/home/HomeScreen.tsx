import React from 'react'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { Appbar, Dock } from '@/shared/ui'
import { HomeContainer } from '@/widgets/home/ui'
import { getToken } from 'firebase/messaging'
import { messaging } from '@/app/fcm'

export default function HomeScreen() {
  async function handleAllowNotification() {
    const permission = await Notification.requestPermission()

    if (permission === 'granted') {
      console.log('알림 권한이 허용되었습니다.')
      await getDeviceToken()
      console.log('ok')
    } else if (permission === 'denied') {
      console.log('알림 권한이 거부되었습니다.')
    } else {
      console.log('사용자가 알림 권한을 결정하지 않았습니다.')
    }
  }

  async function getDeviceToken() {
    await getToken(messaging, {
      vapidKey: import.meta.env.VITE_VAPID_KEY,
    })
      .then(currentToken => {
        if (currentToken) {
          console.log('토큰: ', currentToken)
          alert('토큰: ' + currentToken)
        } else {
          console.log('토큰을 가져오지 못했습니다. 권한을 다시 요청하세요.')
        }
      })
      .catch(err => {
        alert(err)
        console.log('토큰을 가져오는 중 에러 발생: ', err)
      })
  }

  handleAllowNotification()

  return (
    <AppScreen appBar={Appbar}>
      <div className='scrollbar-hide container-mobile flex size-full flex-col gap-y-6 overflow-scroll overflow-y-scroll p-6 pb-19'>
        <HomeContainer />
      </div>
      <Dock />
    </AppScreen>
  )
}
