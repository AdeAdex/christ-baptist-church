import Hero from "./components/home/hero/Hero";
import { metadataConfig } from "./utils/metadata";
import { Metadata } from "next";
import WorshipSection from "./components/home/WorshipSection";
// import WelcomeSection from "./components/home/WelcomeSection";
import Activities from "./components/home/Activities";
import Testimonies from "./components/home/Testimonies";
import ContactUs from "./components/home/ContactUs";
import OurCommunity from "./components/home/OurCommunity";
import VideoSection from "./components/home/VideoSection";
import OurMinistries from "./components/home/OurMinistries";

export const metadata: Metadata = metadataConfig.home;

export default function Home() {
  return (
    <main className="">
      <section>
        <Hero />
      </section>
      <WorshipSection />
      <OurCommunity />
      <VideoSection />
      <OurMinistries />
      {/* <WelcomeSection /> */}
      <Activities />
      <Testimonies />
      <ContactUs />
    </main>
  );
}
