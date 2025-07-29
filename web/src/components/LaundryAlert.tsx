import { useState, useEffect, useRef } from 'react'
import { LaundryStatusCard } from './LaundryStatusCard'
import { NotificationButton } from './NotificationButton'
// import { TurnOffButton } from "./TurnOffButton";
import { findDeviceOnNetwork, subscribeToNotifications } from '@/api'
import { urlBase64ToUint8Array } from '@/utils'

const VAPID_PUBLIC_KEY =
  'BLwKBVim7SJHtsVqxpiXKhyp38br6vBCGBeX6FKYPuBLSlpfpthU_JEzCFjh6DewQXMut1mzCBR5h7isxZQEebA'

type LaundryState = 'loading' | 'error' | 'washing' | 'done'

const statusMessages = {
  loading: 'Connecting to the monitoring device...',
  error:
    "Maybe you're on connected to a different network? Check your Wi-Fi connection and try again.",
  washing:
    "Your laundry is currently being washed. We'll notify you when it's ready!",
  done: 'Your laundry is ready! Time to take it out of the machine.',
}

export const LaundryAlert = () => {
  const [state, setState] = useState<LaundryState>('loading')
  const [isNotificationSubscribed, setIsNotificationSubscribed] =
    useState(false)
  const serviceWorker = useRef<ServiceWorkerRegistration | null>(null)

  useEffect(() => {
    ;(async () => {
      const status = await findDeviceOnNetwork()
      if (status) {
        setState(status.isWashing ? 'washing' : 'done')
      } else {
        setState('error')
        return
      }

      // A service worker must be registered in order to send notifications on iOS
      const svcWorker = await navigator.serviceWorker.register(
        './serviceworker.js',
        { scope: './' },
      )
      serviceWorker.current = svcWorker
      console.log('Service Worker registered:', svcWorker)

      const channel = new BroadcastChannel('service-worker')
      channel.addEventListener('message', (event) => {
        if (event.data.type === 'laundry-done') {
          setState('done')
        }
      })
    })()
  }, [])

  const handleNotificationSubscribe = async () => {
    // Triggers popup to request access to send notifications
    const permissionsResult = await window.Notification.requestPermission()
    if (permissionsResult !== 'granted' || !serviceWorker.current) {
      console.warn('Notification permission not granted', {
        permissionsResult,
      })
      return
    }

    console.log('Subscribing to notifications')
    const subscription = await serviceWorker.current.pushManager.subscribe({
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      userVisibleOnly: true,
    })

    console.log('Sending subscription to the API')
    await subscribeToNotifications(subscription)
    setIsNotificationSubscribed(true)

    // show test notification
    serviceWorker.current.showNotification('Laundry Alert', {
      body: 'You have successfully subscribed to laundry notifications!',
    })
  }

  // const handleTurnOff = async () => {
  //   // Here you would implement actual turn off functionality
  //   console.log('Turning off watcher...');

  //   // Simulate API call
  //   await new Promise(resolve => setTimeout(resolve, 1500));

  //   setState('loading');
  //   setIsNotificationSubscribed(false);

  //   // Show confirmation or redirect to off state
  //   setTimeout(() => {
  //     setState('error'); // Could be a specific "turned off" state
  //   }, 1000);
  // };

  const shouldShowNotificationButton = state === 'washing' || state === 'done'
  // const shouldShowTurnOffButton = state === 'washing' || state === 'done';

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="pt-8 pb-6 px-6">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="text-center flex-1">
            <h1 className="text-3xl font-bold text-foreground">
              Laundry Alert
            </h1>
            <p className="text-muted-foreground">
              Smart monitoring for your laundry cycle
            </p>
          </div>

          {/* {shouldShowTurnOffButton && (
            <div className="ml-4">
              <TurnOffButton onTurnOff={handleTurnOff} />
            </div>
          )} */}
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-8 space-y-8">
        <LaundryStatusCard status={state} message={statusMessages[state]} />

        {shouldShowNotificationButton && (
          <NotificationButton
            disabled={!('serviceWorker' in navigator) || !serviceWorker.current}
            onSubscribe={handleNotificationSubscribe}
            isSubscribed={isNotificationSubscribed}
          />
        )}
      </main>
    </div>
  )
}
