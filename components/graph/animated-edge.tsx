import { getBezierPath, BaseEdge } from '@xyflow/react';
import { cn } from '@/lib/utils';

export function AnimatedEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}: any) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const isError = data?.status === 'error';
  const isHighLatency = data?.status === 'high-latency';
  
  // Calculate particle speed based on throughput (bytesPerSec)
  const bytes = data?.bytesPerSec || 1000;
  // High bytes -> lower duration -> faster particle
  const particleDur = Math.max(0.5, 3 - (bytes / 5000));
  
  // Calculate latency severity for stroke styling
  const currentLatency = data?.latency || 10;
  const baseLatency = data?.baseLatency || 10;
  const latencyRatio = currentLatency / baseLatency;

  const color = isError ? '#ef4444' : 
                isHighLatency ? '#f59e0b' : 
                latencyRatio > 2 ? '#8b5cf6' : '#334155';

  return (
    <>
      <BaseEdge 
        path={edgePath} 
        markerEnd={markerEnd} 
        style={{
          ...style,
          strokeWidth: isError ? 4 : isHighLatency ? 3 : 2,
          stroke: color,
          opacity: 0.7,
        }} 
      />
      <circle r={isError ? "5" : isHighLatency ? "4" : "3"} fill={color} className="drop-shadow-lg">
        <animateMotion dur={`${particleDur}s`} repeatCount="indefinite" path={edgePath} />
      </circle>
      
      {/* Show Latency overlay if it's struggling */}
      {latencyRatio > 1.5 && (
        <foreignObject
          width={60}
          height={20}
          x={(sourceX + targetX) / 2 - 30}
          y={(sourceY + targetY) / 2 - 10}
          className="overflow-visible"
        >
          <div className={cn(
            "text-[8px] font-mono font-bold px-1.5 py-0.5 rounded text-center border shadow-lg whitespace-nowrap",
            isError ? "bg-red-950/80 text-red-400 border-red-500/50" : 
            isHighLatency ? "bg-amber-950/80 text-amber-400 border-amber-500/50" : 
            "bg-purple-950/80 text-purple-400 border-purple-500/50"
          )}>
            {currentLatency.toFixed(0)}ms
          </div>
        </foreignObject>
      )}
    </>
  );
}
