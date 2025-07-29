import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Waves,
  WifiOff,
} from 'lucide-react'
import { cn } from '@/utils'

interface LaundryStatusCardProps {
  status: 'loading' | 'error' | 'api-error' | 'washing' | 'done'
  message: string
}

const statusConfig = {
  loading: {
    icon: Loader2,
    color: 'text-primary',
    bgColor: 'bg-primary/5',
    animation: 'animate-spin',
    title: 'Connecting...',
  },
  error: {
    icon: AlertCircle,
    color: 'text-error',
    bgColor: 'bg-error/5',
    animation: '',
    title: 'Monitoring device not responding',
  },
  'api-error': {
    icon: WifiOff,
    color: 'text-error',
    bgColor: 'bg-error/5',
    animation: 'animate-pulse',
    title: 'API Connection Failed',
  },
  washing: {
    icon: Waves,
    color: 'text-washing',
    bgColor: 'bg-washing/5',
    animation: 'animate-gentle-bounce',
    title: 'Washing in Progress',
  },
  done: {
    icon: CheckCircle2,
    color: 'text-done',
    bgColor: 'bg-done/5',
    animation: '',
    title: 'Laundry Complete!',
  },
}

export const LaundryStatusCard = ({
  status,
  message,
}: LaundryStatusCardProps) => {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className={cn(
          'relative overflow-hidden rounded-2xl bg-gradient-card border border-border/50 shadow-card backdrop-blur-sm',
          'p-8 text-center transition-all duration-500',
          config.bgColor,
        )}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        </div>

        {/* Icon */}
        <div className="relative mb-6">
          <div
            className={cn(
              'mx-auto w-20 h-20 rounded-full flex items-center justify-center',
              config.bgColor,
              'border border-current/20',
            )}
          >
            <Icon size={32} className={cn(config.color, config.animation)} />
          </div>
        </div>

        {/* Content */}
        <div className="relative space-y-3">
          <h2 className="text-xl font-semibold text-foreground">
            {config.title}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {message}
          </p>
        </div>

        {/* Subtle glow effect for washing state */}
        {status === 'washing' && (
          <div className="absolute inset-0 rounded-2xl opacity-20 animate-pulse-glow" />
        )}
      </div>
    </div>
  )
}
