import { WalkthroughStep } from './presentation-store';

export const globalPresentationSteps: WalkthroughStep[] = [
  {
    id: 'intro',
    title: 'Welcome to KubeMind AI',
    description: 'Autonomous Infrastructure Intelligence for Kubernetes Edge Environments.',
    insight: 'This guided tour will showcase how our platform correlates telemetry and predicts failures before they happen.',
    route: '/overview',
    position: 'center'
  },
  {
    id: 'overview-hero',
    title: 'Mission Overview',
    description: 'Moving beyond reactive monitoring to predictive operational intelligence.',
    insight: 'KubeMind provides real-time causality reasoning across distributed multi-cluster setups.',
    targetSelector: '[data-tour="overview-hero"]',
    route: '/overview',
    position: 'bottom'
  },
  {
    id: 'command-center',
    title: 'Global Command Center',
    description: 'Real-time telemetry ingestion and infrastructure saturation monitoring.',
    insight: 'Millions of metrics are correlated per second to identify anomalies across nodes and namespaces.',
    route: '/',
    targetSelector: '[data-tour="command-center"]',
    position: 'center'
  },
  {
    id: 'dependency-graph',
    title: 'Dependency Intelligence',
    description: 'Live service topology mapping and blast radius analysis.',
    insight: 'AI automatically maps how latency propagation cascades through microservices.',
    route: '/graph',
    targetSelector: '[data-tour="dependency-graph"]',
    position: 'center'
  },
  {
    id: 'ai-insights',
    title: 'Insight Engine',
    description: 'Autonomous root cause reasoning and remediation intelligence.',
    insight: 'The AI correlates seemingly unrelated metrics to find the true causal chain of any degradation.',
    route: '/insights',
    targetSelector: '[data-tour="insights"]',
    position: 'center'
  },
  {
    id: 'forecasting',
    title: 'Predictive Forecasting',
    description: 'Identify future degradation windows before they impact end-users.',
    insight: 'Using historical operational data to predict memory exhaustion and PVC contention.',
    route: '/forecasting',
    targetSelector: '[data-tour="forecasting"]',
    position: 'center'
  },
  {
    id: 'nlp-assistant',
    title: 'NLP Operations',
    description: 'Query your infrastructure using natural language.',
    insight: 'Instantly retrieve historical incident intelligence without touching a query language.',
    route: '/assistant',
    targetSelector: '[data-tour="nlp-assistant"]',
    position: 'center'
  }
];

// Page-specific walkthrough steps can also be defined here if needed.
export const getStepsForRoute = (route: string): WalkthroughStep[] => {
  switch (route) {
    case '/':
      return [
        {
          id: 'dash-main',
          title: 'Command Center',
          description: 'High-level operational health of your edge clusters.',
          insight: 'Real-time saturation and utilization telemetry.',
          position: 'center'
        }
      ];
    case '/graph':
      return [
        {
          id: 'graph-main',
          title: 'Topology Reasoning',
          description: 'Visualize workload dependencies and traffic intensity.',
          insight: 'Dynamically updates as services scale or degrade.',
          position: 'center'
        }
      ];
    // ... add more if needed
    default:
      return [];
  }
};
