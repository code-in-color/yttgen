import React, { useRef, useState } from 'react'
import OneSignal from 'react-onesignal'

const useOneSignal = () => {
  const [userId, setUserId] = useState<string | null>(null)
  const onesignalInitializingRef = useRef(false)

  React.useEffect(() => {
    const init = async () => {
      try {
        if (!onesignalInitializingRef.current) {
          onesignalInitializingRef.current = true
          await OneSignal.init({
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            appId: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID!,
            allowLocalhostAsSecureOrigin: true,
            notifyButton: {
              enable: true,
              size: 'large'
            }
          })

          OneSignal.User.PushSubscription.addEventListener(
            'subscriptionChange',
            (event) => {
              event.current.id
                ? setUserId(event.current.id)
                : setUserId('Anonymous')
            }
          )

          OneSignal.Notifications.addEventListener('willDisplay', (event) => {
            console.info('Notification willDisplay', event)
          })

          console.log('OneSignal initialized')
        }
      } catch (e) {
        console.error('OneSignal Initilization', e)
      } finally {
        onesignalInitializingRef.current = false
      }
    }

    void init()
  }, [])

  return { user: userId }
}

export default useOneSignal
