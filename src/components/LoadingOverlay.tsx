import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingOverlayProps {
  /**
   * Whether the overlay is visible
   */
  isLoading: boolean;

  /**
   * Optional custom message to display
   */
  message?: string;

  /**
   * Optional additional classes for the overlay
   */
  className?: string;

  /**
   * Whether to blur the background content
   */
  blur?: boolean;

  /**
   * Intensity of the blur
   */
  blurintensity?: number;

  /**
   * Optional z-index for the overlay
   */
  zIndex?: number;
}

const LoadingOverlay = ({
  isLoading,
  message = 'Loading...',
  className,
  blur = true,
  blurintensity = 2,
  zIndex = 100,
}: LoadingOverlayProps) => {
  if (!isLoading) return null;

  return (
    <div
      className={cn(
        'absolute inset-0 flex flex-col items-center justify-center',
        blur ? `backdrop-blur-[${blurintensity}px]` : 'bg-black/70',
        className
      )}
      style={{ zIndex }}
    >
      <div className="flex flex-col items-center justify-center gap-3 px-4 py-3 rounded-lg bg-background/90 shadow-sm border border-border">
        <Loader2 className="h-6 w-6 text-primary animate-spin" />
        {message && <p className="text-sm text-muted-foreground">{message}</p>}
      </div>
    </div>
  );
};

export default LoadingOverlay;
