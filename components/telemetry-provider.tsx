'use client';

import { useEffect } from 'react';
import { useStore } from '@/lib/store';

export function TelemetryProvider({ children }: { children: React.ReactNode }) {
  const tickTelemetry = useStore(state => state.tickTelemetry);

  useEffect(() => {
    const interval = setInterval(() => {
      tickTelemetry();
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, [tickTelemetry]);

  return <>{children}</>;
}
