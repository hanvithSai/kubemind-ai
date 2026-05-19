import { WalkthroughStep } from './presentation-store';

export const globalPresentationSteps: WalkthroughStep[] = [
  {
    id: 'intro',
    title: 'KubeMind AI Mission',
    description: 'Autonomous Infrastructure Intelligence for Kubernetes Edge Environments.',
    insight: 'Transitioning observability from reactive metrics to topology-aware system reasoning.',
    route: '/overview',
    targetSelector: '[data-tour="overview-hero"]',
    position: 'center'
  },
  {
    id: 'overview-problem',
    title: '1. Problem Understanding',
    description: 'Distributed K3s/MicroK8s edge clusters face sudden resource starvation and cascading storage bottlenecks.',
    insight: 'Legacy monitoring storms operators with alerts instead of tracing anomaly propagation paths.',
    route: '/overview',
    targetSelector: '[data-tour="overview-problem"]',
    position: 'center'
  },
  {
    id: 'overview-solution',
    title: '2. Proposed Solution',
    description: 'A topological observability layer combining React Flow graphs, ARIMA forecasting, and an autonomous RCA logic mesh.',
    insight: 'Integrates Next.js 16, Zustand state streaming, and natural language operations.',
    route: '/overview',
    targetSelector: '[data-tour="overview-solution"]',
    position: 'center'
  },
  {
    id: 'overview-risks',
    title: '3. Risk Analysis & Mitigation',
    description: 'Addresses resource scarcity, temporary offline states, and anomaly false-positives at the edge.',
    insight: 'Utilizes local event buffering, lightweight state queries, and weighted correlation heuristics.',
    route: '/overview',
    targetSelector: '[data-tour="overview-risks"]',
    position: 'center'
  },
  {
    id: 'overview-roadmap',
    title: '4. Implementation Roadmap',
    description: 'Execution timeline spanning from scaffolding, topology integration, AI engine scripting, and production hardening.',
    insight: 'Ensures a solid, iterative engineering flow from concept to physical verification.',
    route: '/overview',
    targetSelector: '[data-tour="overview-roadmap"]',
    position: 'center'
  },
  {
    id: 'overview-outcome',
    title: '5. Expected Outcome (Round 2)',
    description: 'Showcasing real cluster integration, closed-loop mitigation scripts, and a localized Vector DB search assistant.',
    insight: 'Validates automated recovery times in less than 45 seconds under synthetic stress tests.',
    route: '/overview',
    targetSelector: '[data-tour="overview-outcome"]',
    position: 'center'
  },
  {
    id: 'command-center',
    title: 'Global Command Center',
    description: 'Real-time telemetry ingestion and edge cluster health monitoring.',
    insight: 'Correlates log rates, log anomalies, and core node metrics in a unified control window.',
    route: '/',
    targetSelector: '[data-tour="command-center"]',
    position: 'center'
  },
  {
    id: 'dependency-graph',
    title: 'Dependency Intelligence',
    description: 'Live topological mesh showing real-time traffic flow and alert propagation.',
    insight: 'Visualizes cascading failures as they travel across pod boundaries.',
    route: '/graph',
    targetSelector: '[data-tour="dependency-graph"]',
    position: 'center'
  },
  {
    id: 'ai-insights',
    title: 'Autonomous RCA Engine',
    description: 'Maps anomalies to a structured, multi-step causality timeline.',
    insight: 'Calculates the overall blast radius and outputs remediation steps with high confidence scores.',
    route: '/insights',
    targetSelector: '[data-tour="insights"]',
    position: 'center'
  },
  {
    id: 'forecasting',
    title: 'Predictive Forecasting',
    description: 'Predicts memory saturation and PVC capacity limit windows 60 minutes out.',
    insight: 'Allows proactive scaling or draining before a cluster degradation impacts nodes.',
    route: '/forecasting',
    targetSelector: '[data-tour="forecasting"]',
    position: 'center'
  },
  {
    id: 'nlp-assistant',
    title: 'NLP Operations Assistant',
    description: 'Interact with KubeMind AI using natural language queries.',
    insight: 'Queries past incidents, current pod states, and mitigation logs without SQL/PromQL overhead.',
    route: '/assistant',
    targetSelector: '[data-tour="nlp-assistant"]',
    position: 'center'
  }
];

export const getStepsForRoute = (route: string): WalkthroughStep[] => {
  return globalPresentationSteps.filter(step => step.route === route);
};
