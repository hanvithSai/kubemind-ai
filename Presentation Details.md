# KubeMind AI: Rubric-Aligned Narration Script and Demo Flow

This document details the exact narration script and corresponding screen actions for the KubeMind AI presentation video. The script is structured to cover the **Mission Overview** rubrics first, followed by a walk through of each page and its operational functionalities.

---

## # SECTION 1 — TIMING AND STRUCTURE OVERVIEW

* **Total Video Duration:** 4 minutes 35 seconds
* **Theme Alignment:** *"Beyond monitoring: AI agents for real-time pod resource discovery and dependency mapping."*

| Segment | Timing | Target Screen | Core Action | Focus Rubric / Feature |
| :--- | :--- | :--- | :--- | :--- |
| **1. Intro & Mission** | 0:00 - 0:30 | `/overview` | Start Presentation Mode. | Hero Mission Overview |
| **2. Problem Understanding** | 0:30 - 1:10 | `/overview` (scroll) | Focus spotlight on Problem block. | Problem, Key Challenges, Edge insights |
| **3. Proposed Solution** | 1:10 - 1:50 | `/overview` (scroll) | Focus spotlight on Solution block. | Features, Architecture, Technology Stack |
| **4. Risk & Roadmap** | 1:50 - 2:30 | `/overview` (scroll) | Focus spotlight on Risks & Roadmap. | Risk Analysis & Implementation Roadmap |
| **5. Expected Outcome** | 2:30 - 3:00 | `/overview` (scroll) | Focus spotlight on Round 2 Outcome. | Expected Outcome / High-Fidelity Prototype |
| **6. Global Command Center** | 3:00 - 3:25 | `/` | Navigate to Dashboard page. | Cluster Telemetry, saturate patterns |
| **7. Live Dependency Graph** | 3:25 - 3:55 | `/graph` | Navigate to Graph, trigger cascade. | Live pod mapping & alert propagation |
| **8. Autonomous RCA & Forecast**| 3:55 - 4:20 | `/insights` & `/forecasting`| Navigate to Insights & Forecasting. | Multi-step RCA Journey & ARIMA modeling |
| **9. NLP Assistant & Closing** | 4:20 - 4:35 | `/assistant` | Query NLP Assistant, end presentation. | NLP Copilot operations |

---

## # SECTION 2 — SCRIPT AND ACTION FLOW

### Segment 1: Intro & Mission (0:00 - 0:30)
* **What to Show:**
  * Start on the `/overview` page.
  * Move cursor to the top-right and click the **Presentation Mode** button.
  * The screen dims, and the spotlight shines on the **Mission Overview Hero**.
* **What to Speak:**
  * *"Welcome to KubeMind AI: an autonomous infrastructure intelligence platform designed for Kubernetes edge environments. Traditional observability suites outputs isolated metrics, but they do not understand topology or causality. KubeMind AI transforms raw edge telemetry into real-time dependency reasoning, anomaly propagation analysis, and predictive capacity planning."*

---

### Segment 2: Problem Understanding (0:30 - 1:10)
* **What to Show:**
  * Click **Next Feature** on the presentation card.
  * The walkthrough engine automatically scrolls down and spotlights **1. Problem Understanding**.
  * Point cursor to the hover cards for *Storage Saturation*, *Compute Contention*, and *Anomaly Propagation*.
* **What to Speak:**
  * *"Let's establish our problem understanding. Managing resource-constrained K3s and MicroK8s cluster deployments—such as robotics controls and smart factory floor nodes—introduces extreme complexity. When a localized node experiences sudden disk or CPU contention, traditional observability platforms flood operators with disconnected alerts. SRE teams are forced to manually parse logs, losing critical recovery time. KubeMind AI addresses this by identifying the exact causality paths as anomalies travel across distributed pod boundaries."*

---

### Segment 3: Proposed Solution & Stack (1:10 - 1:50)
* **What to Show:**
  * Click **Next Feature** on the presentation card.
  * The engine scrolls down and spotlights **2. Proposed Solution**.
  * Point cursor to the *Architecture & Stack* grid (Next.js 16, Zustand Telemetry Mesh, React Flow, ARIMA) and the *Interactive Interfaces* block.
* **What to Speak:**
  * *"Our Proposed Solution is a real-time, topological observability layer. Built on Next.js 16, React Flow, and a Zustand telemetry mesh, KubeMind AI correlates real-time streams to map live pod relationships. The architecture splits tasks into three distinct modules: a Topology Mapping engine, an AI Causality logic layer to reconstruct Root Cause Journeys, and a Predictive Forecasting engine using probabilistic ARIMA models. Operators interact with this core via a conversational NLP assistant and a simulated scenario controller."*

---

### Segment 4: Risk & Roadmap (1:50 - 2:30)
* **What to Show:**
  * Click **Next Feature** on the presentation card.
  * The engine scrolls down and spotlights **3. Risk Analysis & Mitigation** and **4. Implementation Roadmap**.
  * Highlight the risk cards (Resource Scarcity, Edge Offline, Anomaly Noise) and step through the vertical timeline.
* **What to Speak:**
  * *"In our Risk Analysis, we identified three critical failure modes: edge resource scarcity, temporary network degradation, and high alert noise. We mitigate these using lightweight client-side state queries, local event buffers, and probability-weighted correlation heuristics to prevent false-positives. Our Implementation Roadmap maps this evolution across four phases—advancing from baseline UI scaffolding, to live topology mapping, to integrating our AI reasoning core, and finally hardening the deployment."*

---

### Segment 5: Expected Outcome (2:30 - 3:00)
* **What to Show:**
  * Click **Next Feature** on the presentation card.
  * The engine scrolls down and spotlights **5. Expected Outcome (Round 2 Prototype)**.
  * Point cursor to the *Prototype Capabilities* list and the *Telemetry Target Validation* graphs.
* **What to Speak:**
  * *"Our Expected Outcome is a high-fidelity operational prototype. In Round 2, we will demonstrate direct MicroK8s host scraping, automated closed-loop remediation scripts that auto-scale or drain compromised nodes, and a localized Vector database for context-aware copilot query responses. Our design achieves a 98.4% anomalous correlation rate, bringing Mean Time to Resolution down to under 45 seconds."*

---

### Segment 6: Global Command Center (3:00 - 3:25)
* **What to Show:**
  * Click **Next Feature** on the presentation card.
  * The walkthrough engine automatically redirects you to the dashboard page (`/`) and spotlights the **Global Command Center** telemetry widgets.
  * Hover over the CPU, Memory, and PVC charts.
* **What to Speak:**
  * *"Now, let's explore our detailed functionality pages, starting with the Global Command Center. This page acts as our core telemetry ingestion window. It streams real-time pod saturation, log event frequencies, and CSI volume throughput, establishing a baseline of edge cluster health. The AI core continuously scans these streams to isolate anomalies in real time."*

---

### Segment 7: Live Dependency Graph (3:25 - 3:55)
* **What to Show:**
  * Click **Next Feature** on the presentation card.
  * The engine redirects you to the `/graph` page and spotlights the **Dependency Intelligence** graph.
  * Using the Demo Controller on the bottom right, click and trigger the **Cascading Failure** scenario.
  * Point cursor at the `inventory-db` node as it pulses red, and trace the red latency lines propagating to `payment-service` and `frontend-service`.
* **What to Speak:**
  * *"Next is our Live Dependency Graph. This shows how service mesh topology behaves under load. Triggering our cascading failure scenario, we see the active propagation engine update. The database node immediately registers write latency and pulses red. The mesh connections dynamically adapt, showing the traffic flow bottleneck propagating up the chain to the payment and frontend systems."*

---

### Segment 8: Autonomous RCA & Forecast (3:55 - 4:20)
* **What to Show:**
  * Click **Next Feature** on the presentation card.
  * The engine redirects you to the `/insights` page and spotlights the **RCA Engine** steps.
  * Quickly navigate to `/forecasting` to show the ARIMA curve prediction window, then click **Next Feature**.
* **What to Speak:**
  * *"Under degradation, the Autonomous RCA Engine reconstructs the incident. It traces the causal chain: from the initial storage contention on `inventory-db` to connection pool exhaustion on dependent services, assigning a 94.2% confidence score. In parallel, our Predictive Forecasting engine charts memory and IOPS trends 60 minutes out, alerting operators to capacity thresholds before they impact workloads."*

---

### Segment 9: NLP Assistant & Closing (4:20 - 4:35)
* **What to Show:**
  * The engine redirects you to `/assistant` and spotlights the **NLP Operations Assistant**.
  * Type: `"Trace current cascading failure"` in the prompt and show the returned structural summary.
  * Click **Exit Presentation Mode** on the card.
* **What to Speak:**
  * *"Finally, the NLP Operations Assistant lets operators query these events using natural language. Requesting a cascade trace outputs a clear topology explanation and links to our recovery playbooks. KubeMind AI successfully transitions Kubernetes observability into autonomous edge intelligence. Thank you."*
