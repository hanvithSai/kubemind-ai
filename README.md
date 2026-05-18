# KubeMind AI Platform

KubeMind AI is an enterprise-grade operational intelligence platform designed for deep observability, predictive analytics, and automated root cause analysis (RCA) in modern infrastructure. It leverages artificial intelligence to provide real-time insights, interactive topology graphing, and an NLP-powered copilot for advanced infrastructure management.

## 🌟 Key Features

- **Interactive Service Graph:** High-fidelity, real-time visualization of service dependencies, network topologies, and live telemetry using React Flow.
- **Advanced RCA Reasoning:** Automated root cause analysis to quickly identify, trace, and troubleshoot anomalies across your clusters.
- **Predictive Forecasting:** Data-driven resource forecasting to preemptively address capacity limits, performance degradations, and bottlenecks.
- **NLP Infrastructure Copilot:** A conversational AI assistant for querying infrastructure state, retrieving logs, and generating insights naturally.
- **Dynamic Timeline & Live Logs:** Comprehensive chronological tracking of events, deployments, and streaming container logs.
- **Actionable Insights:** Intelligent alerts and performance health summaries powered by continuous telemetry analysis.

## 🛠️ Technology Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4, Framer Motion for micro-animations
- **State Management:** Zustand
- **Visualizations:** Recharts for data plotting, `@xyflow/react` for topology graphs
- **Icons:** Lucide React

## 🚀 Getting Started

### Prerequisites

Ensure you have Node.js (v18 or higher) and npm (or yarn/pnpm) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/hanvithSai/kubemind-ai.git
   cd kubemind-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## 📂 Project Structure

```text
kubemind-ai/
├── app/
│   ├── assistant/     # NLP Copilot interface
│   ├── forecasting/   # Predictive analytics dashboard
│   ├── graph/         # Interactive topology visualizer
│   ├── insights/      # AI-driven actionable insights
│   ├── timeline/      # Incident and deployment timeline
│   └── globals.css    # Global styles & Tailwind config
├── components/
│   ├── graph/         # Custom nodes & animated edges for topology
│   ├── demo-controller.tsx # State controller for mock demonstrations
│   ├── live-logs.tsx  # Streaming log viewer component
│   ├── sidebar.tsx    # Main application navigation
│   └── telemetry-provider.tsx # Context for telemetry data
├── lib/
│   ├── store.ts       # Zustand state management
│   ├── utils.ts       # Shared utility functions (clsx, tailwind-merge)
│   └── mock-data.ts   # Synthetic data for prototype demonstration
└── public/            # Static assets
```

## 🤝 Contributing

We welcome contributions! Please follow the standard fork-and-pull request workflow.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.
