import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/home/Hero";
import { FeatureCards } from "@/components/home/FeatureCards";
import { StatsSection } from "@/components/home/StatsSection";
import { Footer } from "@/components/layout/Footer";
import { ChatButton } from "@/components/chat/ChatButton";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <FeatureCards />
        <StatsSection />
      </main>
      <Footer />
      <ChatButton />
    </div>
  );
}
