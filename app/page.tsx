import Hero from "./components/home/hero/Hero";
import { metadataConfig } from "./utils/metadata";
import { Metadata } from "next";
import WorshipSection from "./components/home/WorshipSection";
// import WelcomeSection from "./components/home/WelcomeSection";
// import Activities from "./components/home/Activities";
// import Testimonies from "./components/home/Testimonies";
import OurCommunity from "./components/home/DiscoverOurCommunity";
import VideoSection from "./components/home/VideoSection";
import OurMinistries from "./components/home/ministry-section/OurMinistries";
import AboutUsSection from "./components/home/AboutUsSection";
import ConnectWithOurCommunity from "./components/home/ConnectWithOurCommunity";

export const metadata: Metadata = metadataConfig.home;

export default function Home() {
  return (
    <main className="">
      <section>
        <Hero />
      </section>
      <WorshipSection />
      <OurCommunity />
      <OurMinistries />
      <VideoSection />
      <AboutUsSection />
      <ConnectWithOurCommunity />
      {/* <WelcomeSection /> */}
      {/* <Activities />
      <Testimonies /> */}
    </main>
  );
}
