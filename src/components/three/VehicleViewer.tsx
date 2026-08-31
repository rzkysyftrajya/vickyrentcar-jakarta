import {
  Component,
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ErrorInfo,
  type ReactNode,
} from "react";
import { AlertCircle, Maximize2, Minimize2, Pause, Play, RefreshCw, RotateCcw } from "lucide-react";
import type { ViewAngle } from "./VehicleCanvas";

const VehicleCanvas = lazy(() => import("./VehicleCanvas"));

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: (error: Error, retry: () => void) => ReactNode;
  resetKey?: string | number;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class VehicleErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn("VehicleViewer 3D canvas failed to render:", error, errorInfo);
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false, error: null });
    }
  }

  retry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      return this.props.fallback(this.state.error, this.retry);
    }
    return this.props.children;
  }
}

function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

export function VehicleViewer({
  url,
  name,
  image,
  angle = null,
  className = "",
}: {
  url: string;
  name: string;
  image?: string;
  angle?: ViewAngle | null;
  className?: string;
}) {
  const mounted = useMounted();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [resetKey, setResetKey] = useState(0);
  const [retryCount, setRetryCount] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void wrapRef.current?.requestFullscreen?.();
    }
  }, []);

  const btn =
    "glass inline-flex h-10 w-10 items-center justify-center rounded-full text-gold transition-all duration-300 hover:bg-gold hover:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

  return (
    <div
      ref={wrapRef}
      className={`relative overflow-hidden rounded-xl bg-[radial-gradient(80%_60%_at_50%_20%,color-mix(in_oklab,var(--navy)_75%,transparent),var(--background))] ${className}`}
    >
      <div className="absolute inset-0 touch-none">
        {mounted ? (
          url ? (
            <VehicleErrorBoundary
              resetKey={`${url}-${retryCount}`}
              fallback={(_err, retry) => (
                <div className="relative flex h-full w-full flex-col items-center justify-center p-6 text-center">
                  {image ? (
                    <img
                      src={image}
                      alt={name}
                      className="max-h-[70%] max-w-[85%] object-contain opacity-90 drop-shadow-2xl transition-transform duration-500 hover:scale-105"
                    />
                  ) : null}
                  <div className="glass mt-3 flex items-center gap-2 rounded-full px-4 py-2 text-xs text-muted-foreground">
                    <AlertCircle className="h-4 w-4 text-gold" />
                    <span>3D preview sedang tidak tersedia</span>
                    <button
                      type="button"
                      onClick={() => {
                        setRetryCount((c) => c + 1);
                        retry();
                      }}
                      className="ml-2 inline-flex items-center gap-1 rounded-full bg-gold/20 px-2.5 py-1 text-[0.65rem] font-medium text-gold hover:bg-gold/30"
                    >
                      <RefreshCw className="h-3 w-3" /> Coba Lagi
                    </button>
                  </div>
                </div>
              )}
            >
              <Suspense
                fallback={
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                      <span className="h-8 w-8 animate-spin rounded-full border border-gold/30 border-t-gold" />
                      <span className="text-[0.65rem] tracking-[0.3em] text-gold uppercase">Loading 3D</span>
                    </div>
                  </div>
                }
              >
                <VehicleCanvas
                  url={url}
                  autoRotate={autoRotate}
                  angle={angle}
                  resetKey={resetKey}
                />
              </Suspense>
            </VehicleErrorBoundary>
          ) : (
            <div className="relative flex h-full w-full flex-col items-center justify-center p-6 text-center">
              {image ? (
                <img
                  src={image}
                  alt={name}
                  className="max-h-[85%] max-w-[90%] object-contain opacity-95 drop-shadow-2xl transition-transform duration-500 hover:scale-105"
                />
              ) : null}
            </div>
          )
        ) : null}
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-4">
        <span className="glass rounded-full px-4 py-1.5 text-[0.6rem] tracking-[0.28em] text-gold uppercase">
          {url ? "360° Viewer" : "Galeri Unit"}
        </span>
      </div>

      {url && (
        <div className="pointer-events-auto absolute right-4 bottom-4 flex flex-col gap-2">
          <button
            type="button"
            className={btn}
            onClick={() => setAutoRotate((v) => !v)}
            aria-label={autoRotate ? "Hentikan auto rotate" : "Mulai auto rotate"}
          >
            {autoRotate ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <button
            type="button"
            className={btn}
            onClick={() => setResetKey((k) => k + 1)}
            aria-label="Reset kamera"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            type="button"
            className={btn}
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? "Keluar layar penuh" : "Layar penuh"}
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>
      )}

      <p className="pointer-events-none absolute bottom-4 left-4 text-[0.65rem] tracking-[0.2em] text-muted-foreground/70 uppercase">
        Drag · Pinch · Zoom — {name}
      </p>
    </div>
  );
}
