import { create } from 'zustand';
import { initialNodes, initialEdges, initialIncidents, ServiceNode, ServiceEdge, Incident, TelemetryPoint } from './mock-data';

interface KubeMindState {
  nodes: ServiceNode[];
  edges: ServiceEdge[];
  incidents: Incident[];
  telemetry: TelemetryPoint[];
  activeScenario: string | null;
  
  clusterCpu: number;
  clusterMemory: number;
  activePods: number;
  
  // Scale Indicators
  totalMetrics: number;
  pvcThroughput: number; // in GB
  activeLogs: number;
  stabilityScore: number;
  
  addIncident: (incident: Omit<Incident, 'id' | 'timestamp'>) => void;
  updateNodeStatus: (nodeId: string, updates: Partial<ServiceNode>) => void;
  updateEdgeStatus: (edgeId: string, updates: Partial<ServiceEdge>) => void;
  triggerScenario: (scenario: 'cpu-spike' | 'memory-leak' | 'pvc-latency' | 'cascading-failure' | 'network-congestion' | 'reset') => void;
  tickTelemetry: () => void;
}

const generateInitialTelemetry = () => {
  const data: TelemetryPoint[] = [];
  const now = new Date();
  for (let i = 20; i >= 0; i--) {
    const t = new Date(now.getTime() - i * 5000);
    data.push({
      time: t.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      cpu: 30 + Math.random() * 10,
      memory: 45 + Math.random() * 5,
      networkIn: 500 + Math.random() * 200,
      networkOut: 400 + Math.random() * 150,
    });
  }
  return data;
};

export const useStore = create<KubeMindState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  incidents: initialIncidents,
  telemetry: generateInitialTelemetry(),
  activeScenario: null,
  
  clusterCpu: 35,
  clusterMemory: 48,
  activePods: 284,
  
  totalMetrics: 12400000,
  pvcThroughput: 1840,
  activeLogs: 6200000,
  stabilityScore: 98,
  
  addIncident: (incident) => set((state) => ({
    incidents: [{
      ...incident,
      id: `inc-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date()
    }, ...state.incidents]
  })),
  
  updateNodeStatus: (nodeId, updates) => set((state) => ({
    nodes: state.nodes.map(n => n.id === nodeId ? { ...n, ...updates } : n)
  })),
  
  updateEdgeStatus: (edgeId, updates) => set((state) => ({
    edges: state.edges.map(e => e.id === edgeId ? { ...e, ...updates } : e)
  })),
  
  triggerScenario: (scenario) => {
    const state = get();
    set({ activeScenario: scenario });
    
    if (scenario === 'reset') {
      set({
        nodes: initialNodes,
        edges: initialEdges,
        activeScenario: null,
        clusterCpu: 35,
        clusterMemory: 48,
        stabilityScore: 98,
      });
      state.addIncident({ severity: 'info', message: 'Infrastructure telemetry forcibly reset to baseline operating parameters.', source: 'admin-controller' });
      return;
    }
    
    if (scenario === 'cpu-spike') {
      state.updateNodeStatus('recommendation-engine', { status: 'warning', cpu: 75, stressScore: 60 });
      set({ stabilityScore: 82 });
      
      setTimeout(() => {
        state.updateNodeStatus('recommendation-engine', { status: 'critical', cpu: 99, stressScore: 95 });
        set({ clusterCpu: 85, stabilityScore: 65 });
        state.addIncident({ severity: 'critical', message: 'Anomalous compute saturation detected on recommendation-engine cluster node.', source: 'ai-correlator' });
      }, 2000);
      
      setTimeout(() => {
        state.updateEdgeStatus('e3', { status: 'high-latency', latency: 450 });
        state.addIncident({ severity: 'high', message: 'Downstream dependency latency amplification observed from frontend-service to recommendation-engine.', source: 'service-mesh-proxy' });
      }, 4000);
    }
    else if (scenario === 'memory-leak') {
      state.updateNodeStatus('payment-service', { status: 'warning', memory: 82, stressScore: 50 });
      state.addIncident({ severity: 'warning', message: 'Monotonic heap growth detected on payment-service. GC reclamation rate below threshold.', source: 'ai-correlator' });
      
      setTimeout(() => {
        state.updateNodeStatus('payment-service', { status: 'degraded', memory: 94, stressScore: 85 });
        set({ stabilityScore: 78 });
      }, 3000);
    }
    else if (scenario === 'pvc-latency') {
      state.updateNodeStatus('pvc-storage', { status: 'warning', stressScore: 60 });
      state.addIncident({ severity: 'warning', message: 'PVC write latency exceeds 150ms on edge-cluster-ap-south-1.', source: 'csi-driver-metrics' });
      
      setTimeout(() => {
        state.updateNodeStatus('pvc-storage', { status: 'critical', stressScore: 100 });
        state.updateEdgeStatus('e8', { status: 'error', latency: 850 });
        state.updateNodeStatus('inventory-db', { status: 'degraded', stressScore: 75 });
        set({ stabilityScore: 72 });
        state.addIncident({ severity: 'critical', message: 'Storage IOPS exhaustion. inventory-db experiencing thread starvation.', source: 'db-operator' });
      }, 2500);
    }
    else if (scenario === 'cascading-failure') {
      // Step 1: DB fails
      state.updateNodeStatus('inventory-db', { status: 'critical', stressScore: 98 });
      state.updateEdgeStatus('e8', { status: 'error', latency: 1200 });
      set({ stabilityScore: 60 });
      state.addIncident({ severity: 'critical', message: 'Catastrophic storage detachment on inventory-db.', source: 'csi-node' });
      
      // Step 2: Payment degrades
      setTimeout(() => {
        state.updateEdgeStatus('e6', { status: 'error', latency: 800 });
        state.updateNodeStatus('payment-service', { status: 'critical', stressScore: 90 });
        state.addIncident({ severity: 'cascading_failure', message: 'Distributed retry amplification exhausting connection pools on payment-service.', source: 'ai-correlator' });
        set({ stabilityScore: 45 });
      }, 3000);
      
      // Step 3: Analytics fails
      setTimeout(() => {
        state.updateEdgeStatus('e11', { status: 'error', latency: 950 });
        state.updateNodeStatus('analytics-engine', { status: 'degraded', stressScore: 80 });
      }, 4500);
      
      // Step 4: Frontend affected
      setTimeout(() => {
        state.updateEdgeStatus('e4', { status: 'high-latency', latency: 500 });
        state.updateNodeStatus('frontend-service', { status: 'warning', stressScore: 65 });
        state.addIncident({ severity: 'high', message: 'End-user latency degradation propagating to frontend layer.', source: 'ingress-controller' });
        set({ stabilityScore: 32 });
      }, 6000);
    }
    else if (scenario === 'network-congestion') {
      state.updateEdgeStatus('e1', { status: 'high-latency', latency: 350 });
      state.updateEdgeStatus('e2', { status: 'high-latency', latency: 280 });
      state.updateEdgeStatus('e9', { status: 'high-latency', latency: 310 });
      state.updateNodeStatus('api-gateway', { status: 'warning', stressScore: 70 });
      state.addIncident({ severity: 'warning', message: 'Ingress routing congestion detected. Packet drop rate elevated.', source: 'service-mesh' });
      set({ stabilityScore: 88 });
    }
  },
  
  tickTelemetry: () => set((state) => {
    const last = state.telemetry[state.telemetry.length - 1];
    
    // Global metric jitters
    const newTotalMetrics = state.totalMetrics + Math.floor(Math.random() * 500);
    const newPvcThroughput = state.pvcThroughput + (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 5);
    const newActiveLogs = state.activeLogs + Math.floor(Math.random() * 200);
    
    // CPU/Memory jitter
    let cpuJitter = (Math.random() - 0.5) * 5;
    let memJitter = (Math.random() - 0.5) * 2;
    
    if (state.activeScenario === 'cpu-spike') cpuJitter += (Math.random() * 10);
    if (state.activeScenario === 'memory-leak') memJitter += 1.5;
    
    let nextCpu = Math.max(0, Math.min(100, state.clusterCpu + cpuJitter));
    let nextMem = Math.max(0, Math.min(100, state.clusterMemory + memJitter));
    
    // Jitter node internal metrics randomly
    const newNodes = state.nodes.map(node => {
      let nodeCpuJitter = (Math.random() - 0.5) * 4;
      let nodeMemJitter = (Math.random() - 0.5) * 2;
      
      // Keep within bounds, don't jitter critical nodes too much down
      if (node.status === 'critical') { nodeCpuJitter = Math.abs(nodeCpuJitter); nodeMemJitter = Math.abs(nodeMemJitter); }
      
      return {
        ...node,
        cpu: Math.max(0, Math.min(100, node.cpu + nodeCpuJitter)),
        memory: Math.max(0, Math.min(100, node.memory + nodeMemJitter)),
        // Jitter stress score slightly to cause glowing effects to pulse
        stressScore: Math.max(0, Math.min(100, node.stressScore + (Math.random() - 0.5) * 2))
      };
    });

    // Jitter edges
    const newEdges = state.edges.map(edge => {
      const isBad = edge.status !== 'normal';
      let latencyJitter = isBad ? (Math.random() * 50 - 10) : (Math.random() * 10 - 5);
      return {
        ...edge,
        latency: Math.max(1, edge.latency + latencyJitter),
        bytesPerSec: edge.bytesPerSec * 0.95 + (Math.random() * 1000)
      };
    });

    const now = new Date();
    const newPoint: TelemetryPoint = {
      time: now.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      cpu: nextCpu,
      memory: nextMem,
      networkIn: last.networkIn * 0.9 + (Math.random() * 200),
      networkOut: last.networkOut * 0.9 + (Math.random() * 150),
    };
    
    return {
      telemetry: [...state.telemetry.slice(1), newPoint],
      clusterCpu: nextCpu,
      clusterMemory: nextMem,
      totalMetrics: newTotalMetrics,
      pvcThroughput: newPvcThroughput,
      activeLogs: newActiveLogs,
      nodes: newNodes,
      edges: newEdges,
    };
  })
}));
