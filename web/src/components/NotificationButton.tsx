import { Bell, BellRing } from 'lucide-react'
import { Button } from '@/components/button'
import { useState } from 'react'

interface NotificationButtonProps {
  onSubscribe: () => void
  isSubscribed: boolean
  disabled?: boolean
}

export const NotificationButton = ({
  onSubscribe,
  isSubscribed,
  disabled = false,
}: NotificationButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)
    try {
      await onSubscribe()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Button
        onClick={handleClick}
        disabled={disabled || isLoading}
        className="
          w-full h-14 rounded-xl text-base font-medium
          bg-gradient-primary hover:opacity-90
          shadow-soft hover:shadow-glow
          transition-all duration-300
          disabled:opacity-50 disabled:cursor-not-allowed
          group relative overflow-hidden
        "
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        <div className="relative flex items-center justify-center gap-3">
          {isSubscribed ? (
            <BellRing size={20} className="animate-gentle-bounce" />
          ) : (
            <Bell size={20} />
          )}
          <span>
            {isLoading
              ? 'Setting up...'
              : isSubscribed
                ? 'Notifications enabled'
                : 'Notify me when done'}
          </span>
        </div>
      </Button>
    </div>
  )
}
