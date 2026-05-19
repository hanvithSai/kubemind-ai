'use client';

import { useMemo } from 'react';
import { ReactFlow, Background, Controls, Node, Edge, MiniMap } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useStore } from '@/lib/store';
import { ServiceNode } from '@/components/graph/service-node';
import { AnimatedEdge } from '@/components/graph/animated-edge';
import { Activity, Network, Wifi } from 'lucide-react';
import { motion } from 'framer-motion';

const nodeTypes = {
  serviceNode: ServiceNode,
};

const edgeTypes = {
  animatedEdge: AnimatedEdge,
};

const nodePositions: Record<string, { x: number, y: number }> = {
  'api-gateway': { x: 400, y: 50 },
  'edge-cache': { x: 650, y: 150 },
  'frontend-service': { x: 200, y: 150 },
  'auth-service': { x: 50, y: 300 },
  'payment-service': { x: 300, y: 300 },
  'recommendation-engine': { x: 500, y: 300 },
  'inventory-db': { x: 400, y: 450 },
  'analytics-engine': { x: 600, y: 450 },
  'pvc-storage': { x: 400, y: 600 },
};

export default function DependencyGraph() {
  const storeNodes = useStore((state) => state.nodes);
  const storeEdges = useStore((state) => state.edges);
  const pvcThroughput = useStore((state) => state.pvcThroughput);
  
  // Simulated jitter for live active connections
  const activeConnections = 438 + Math.floor(Math.random() * 15 - 5);

  const nodes: Node[] = useMemo(() => {
    return storeNodes.map((node) => ({
      id: node.id,
      type: 'serviceNode',
      position: nodePositions[node.id] || { x: 0, y: 0 },
      data: node as unknown as Record<string, unknown>,
    }));
  }, [storeNodes]);

  const edges: Edge[] = useMemo(() => {
    return storeEdges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      type: 'animatedEdge',
      data: { status: edge.status },
      animated: true,
    }));
  }, [storeEdges]);

  return (
    <div data-tour="dependency-graph" className="h-full w-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Live Dependency Intelligence Graph</h1>
        <p className="text-sm text-slate-400 mt-1">Real-time architecture topology and traffic flow</p>
      </div>
      
      <div className="flex-1 bg-[#0a0f1c] border border-slate-800 rounded-xl overflow-hidden relative shadow-2xl">
        <div className="absolute top-4 left-4 z-10 bg-slate-900/80 backdrop-blur border border-slate-800 p-3 rounded-lg text-xs">
          <div className="font-semibold text-slate-300 mb-2">Legend</div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-emerald-500" /> <span className="text-slate-400">Healthy</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" /> <span className="text-slate-400">Degraded</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" /> <span className="text-slate-400">Critical</span>
          </div>
        </div>

        {/* Live Network Overlay */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-4 right-4 z-10 bg-slate-900/80 backdrop-blur border border-slate-800 p-4 rounded-xl shadow-2xl w-64 pointer-events-none"
        >
          <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-2">
            <Network className="w-4 h-4 text-blue-500" />
            <span className="font-bold text-slate-200 text-xs tracking-wider uppercase">Live Mesh Fabric</span>
            <div className="ml-auto w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Active Connections</span>
                <Wifi className="w-3 h-3 text-slate-600" />
              </div>
              <div className="text-xl font-mono font-bold text-slate-100">{activeConnections}</div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Mesh Throughput</span>
                <Activity className="w-3 h-3 text-slate-600" />
              </div>
              <div className="text-xl font-mono font-bold text-purple-400">{(pvcThroughput * 2.4).toFixed(1)} <span className="text-sm text-slate-500">GB/s</span></div>
            </div>
          </div>
        </motion.div>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          colorMode="dark"
          fitView
          className="bg-[#030712]"
          minZoom={0.2}
        >
          <Background color="#1e293b" gap={20} size={1} />
          <Controls className="bg-slate-900 border-slate-800 fill-slate-300" />
          <MiniMap 
            nodeColor={(n: any) => {
              if (n.data?.status === 'critical') return '#ef4444';
              if (n.data?.status === 'warning' || n.data?.status === 'degraded') return '#f59e0b';
              return '#10b981';
            }}
            nodeStrokeWidth={3}
            nodeStrokeColor="#0f172a"
            maskColor="rgba(3, 7, 18, 0.7)"
            pannable
            zoomable
            className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden shadow-2xl"
          />
        </ReactFlow>
      </div>
    </div>
  );
}
