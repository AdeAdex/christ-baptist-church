import Hero from "./components/home/hero/Hero";
import { metadataConfig } from "./utils/metadata";
import { Metadata } from "next";
import WorshipSection from "./components/home/WorshipSection";
import WelcomeSection from "./components/home/WelcomeSection";
import Activities from "./components/home/Activities";
import Testimonies from "./components/home/Testimonies";
import ContactUs from "./components/home/ContactUs";

export const metadata: Metadata = metadataConfig.home;

export default function Home() {
  return (
    <main className="">
      <section>
        <Hero />
      </section>
      <WorshipSection />
      <WelcomeSection />
      <Activities />
      <Testimonies />
      <ContactUs />
    </main>
  );
}
