export interface ServiceNode {
  id: string;
  name: string;
  type: 'gateway' | 'service' | 'database' | 'cache' | 'storage';
  namespace: string;
  status: 'healthy' | 'warning' | 'degraded' | 'critical';
  cpu: number;
  memory: number;
  restarts: number;
  
  // Infrastructure Identity
  clusterId: string;
  region: string;
  site: string;
  deploymentVersion: string;
  replicaCount: number;
  owner: string;
  environment: string;
  stressScore: number;
}

export interface ServiceEdge {
  id: string;
  source: string;
  target: string;
  latency: number;
  status: 'normal' | 'high-latency' | 'error';
  bytesPerSec: number;
  baseLatency: number;
}

export const initialNodes: ServiceNode[] = [
  { 
    id: 'api-gateway', name: 'API Gateway', type: 'gateway', namespace: 'ingress-edge', status: 'healthy', cpu: 12, memory: 45, restarts: 0,
    clusterId: 'edge-cluster-ap-south-1', region: 'ap-south-1', site: 'ABB-SmartFactory-04', deploymentVersion: 'v4.1.2', replicaCount: 6, owner: 'platform-edge-routing', environment: 'industrial-production', stressScore: 12
  },
  { 
    id: 'frontend-service', name: 'Frontend', type: 'service', namespace: 'app-production', status: 'healthy', cpu: 5, memory: 60, restarts: 0,
    clusterId: 'edge-cluster-ap-south-1', region: 'ap-south-1', site: 'ABB-SmartFactory-04', deploymentVersion: 'v2.8.4', replicaCount: 4, owner: 'product-experience', environment: 'industrial-production', stressScore: 5
  },
  { 
    id: 'auth-service', name: 'Auth Service', type: 'service', namespace: 'security-core', status: 'healthy', cpu: 8, memory: 40, restarts: 0,
    clusterId: 'core-eu-central-1', region: 'eu-central-1', site: 'Global-Control-Plane', deploymentVersion: 'v1.19.0', replicaCount: 8, owner: 'secops-identity', environment: 'global-production', stressScore: 2
  },
  { 
    id: 'payment-service', name: 'Payment Engine', type: 'service', namespace: 'finance-ops', status: 'healthy', cpu: 15, memory: 55, restarts: 1,
    clusterId: 'core-eu-central-1', region: 'eu-central-1', site: 'Global-Control-Plane', deploymentVersion: 'v3.0.1', replicaCount: 12, owner: 'fin-infra', environment: 'global-production', stressScore: 18
  },
  { 
    id: 'recommendation-engine', name: 'AI Recommendations', type: 'service', namespace: 'ml-inference', status: 'healthy', cpu: 45, memory: 80, restarts: 0,
    clusterId: 'gpu-cluster-us-east', region: 'us-east-1', site: 'Cloud-Inference-Hub', deploymentVersion: 'v8.2.1-cuda', replicaCount: 3, owner: 'ml-platform', environment: 'global-production', stressScore: 40
  },
  { 
    id: 'inventory-db', name: 'Inventory DB', type: 'database', namespace: 'data-persistence', status: 'healthy', cpu: 20, memory: 70, restarts: 0,
    clusterId: 'edge-cluster-ap-south-1', region: 'ap-south-1', site: 'ABB-SmartFactory-04', deploymentVersion: 'v14.9-pg', replicaCount: 3, owner: 'dba-edge', environment: 'industrial-production', stressScore: 25
  },
  { 
    id: 'pvc-storage', name: 'Persistent Vol', type: 'storage', namespace: 'csi-system', status: 'healthy', cpu: 2, memory: 10, restarts: 0,
    clusterId: 'edge-cluster-ap-south-1', region: 'ap-south-1', site: 'ABB-SmartFactory-04', deploymentVersion: 'csi-v2.1', replicaCount: 1, owner: 'storage-ops', environment: 'industrial-production', stressScore: 5
  },
  { 
    id: 'edge-cache', name: 'Edge Cache', type: 'cache', namespace: 'edge-acceleration', status: 'healthy', cpu: 8, memory: 30, restarts: 0,
    clusterId: 'edge-cluster-ap-south-1', region: 'ap-south-1', site: 'Robotics-Control-Node-01', deploymentVersion: 'v7.0-redis', replicaCount: 5, owner: 'platform-edge-routing', environment: 'industrial-production', stressScore: 10
  },
  { 
    id: 'analytics-engine', name: 'Analytics', type: 'service', namespace: 'data-processing', status: 'healthy', cpu: 30, memory: 65, restarts: 0,
    clusterId: 'core-eu-central-1', region: 'eu-central-1', site: 'Global-Control-Plane', deploymentVersion: 'v5.4.0', replicaCount: 2, owner: 'data-engineering', environment: 'global-production', stressScore: 35
  },
];

export const initialEdges: ServiceEdge[] = [
  { id: 'e1', source: 'api-gateway', target: 'frontend-service', latency: 12, baseLatency: 12, status: 'normal', bytesPerSec: 5000 },
  { id: 'e2', source: 'api-gateway', target: 'auth-service', latency: 45, baseLatency: 45, status: 'normal', bytesPerSec: 1200 },
  { id: 'e3', source: 'frontend-service', target: 'recommendation-engine', latency: 85, baseLatency: 85, status: 'normal', bytesPerSec: 8000 },
  { id: 'e4', source: 'frontend-service', target: 'payment-service', latency: 65, baseLatency: 65, status: 'normal', bytesPerSec: 3000 },
  { id: 'e5', source: 'payment-service', target: 'auth-service', latency: 10, baseLatency: 10, status: 'normal', bytesPerSec: 900 },
  { id: 'e6', source: 'payment-service', target: 'inventory-db', latency: 155, baseLatency: 155, status: 'normal', bytesPerSec: 4000 },
  { id: 'e7', source: 'recommendation-engine', target: 'inventory-db', latency: 120, baseLatency: 120, status: 'normal', bytesPerSec: 6000 },
  { id: 'e8', source: 'inventory-db', target: 'pvc-storage', latency: 5, baseLatency: 5, status: 'normal', bytesPerSec: 15000 },
  { id: 'e9', source: 'api-gateway', target: 'edge-cache', latency: 4, baseLatency: 4, status: 'normal', bytesPerSec: 12000 },
  { id: 'e10', source: 'edge-cache', target: 'frontend-service', latency: 10, baseLatency: 10, status: 'normal', bytesPerSec: 5000 },
  { id: 'e11', source: 'inventory-db', target: 'analytics-engine', latency: 185, baseLatency: 185, status: 'normal', bytesPerSec: 9000 },
];

export interface Incident {
  id: string;
  timestamp: Date;
  severity: 'info' | 'warning' | 'degraded' | 'high' | 'critical' | 'cascading_failure';
  message: string;
  source: string;
}

export const initialIncidents: Incident[] = [
  { id: 'inc-1', timestamp: new Date(Date.now() - 1000 * 60 * 60), severity: 'info', message: 'HPA triggered scale-up for frontend-service deployment (target CPU threshold met)', source: 'kube-controller-manager' },
  { id: 'inc-2', timestamp: new Date(Date.now() - 1000 * 60 * 30), severity: 'warning', message: 'Intermittent readiness probe failure observed on payment-service-7f9d8d4b6f-hx92q', source: 'kubelet' },
];

export interface TelemetryPoint {
  time: string;
  cpu: number;
  memory: number;
  networkIn: number;
  networkOut: number;
}
