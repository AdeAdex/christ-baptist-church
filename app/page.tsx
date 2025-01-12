import Hero from "./components/home/hero/Hero";
import { metadataConfig } from "./utils/metadata";
import { Metadata } from "next";
import WorshipSection from "./components/home/WorshipSection";
import WelcomeSection from "./components/home/WelcomeSection";

export const metadata: Metadata = metadataConfig.home;

export default function Home() {
  return (
    <main>
      <section>
        <Hero />
      </section>
      <WorshipSection />
      <WelcomeSection />
    </main>
  );
}
