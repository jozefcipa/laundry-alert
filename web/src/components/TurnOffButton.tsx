import { Power } from 'lucide-react'
import { Button } from '@/components/button'
import { useState } from 'react'

interface TurnOffButtonProps {
  onTurnOff: () => void
  disabled?: boolean
}

export const TurnOffButton = ({
  onTurnOff,
  disabled = false,
}: TurnOffButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)
    try {
      await onTurnOff()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleClick}
      disabled={disabled || isLoading}
      variant="outline"
      size="sm"
      className="
        h-10 px-4 rounded-lg text-sm font-medium
        border-destructive/30 text-destructive 
        hover:bg-destructive hover:text-destructive-foreground hover:border-destructive
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        group relative overflow-hidden
      "
    >
      <div className="flex items-center gap-2">
        <Power
          size={16}
          className={`transition-transform duration-200 ${isLoading ? 'animate-spin' : 'group-hover:scale-110'}`}
        />
        <span>{isLoading ? 'Turning off...' : 'Turn Off'}</span>
      </div>
    </Button>
  )
}
