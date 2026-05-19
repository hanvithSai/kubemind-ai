import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { DemoController } from "@/components/demo-controller";
import { TelemetryProvider } from "@/components/telemetry-provider";
import { WalkthroughEngine } from "@/components/presentation/walkthrough-engine";
import { PresentationController } from "@/components/presentation-controller";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KubeMind AI | Autonomous Infrastructure Intelligence",
  description: "Beyond monitoring → infrastructure intelligence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#030712] text-slate-100 flex h-screen overflow-hidden antialiased`}>
        <TelemetryProvider>
          <Sidebar />
          <main className="flex-1 h-full overflow-y-auto relative bg-[#030712]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.1),rgba(255,255,255,0))] pointer-events-none" />
            <div className="relative p-8 pb-24 h-full">
              {children}
            </div>
          </main>
          <DemoController />
          <PresentationController />
          <WalkthroughEngine />
        </TelemetryProvider>
      </body>
    </html>
  );
}
