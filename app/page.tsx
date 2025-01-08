import Image from "next/image";
import Hero from "./components/home/hero/Hero";
import welcomeImage from "@/public/images/welcome_to_our_church.jpg";

export default function Home() {
  return (
    <main>
      <section>
        <Hero />
      </section>
      <section>
        <h1>Welcome to Christ Baptist Church</h1>
        <p>
          Christ Baptist Church is a community dedicated to worship, spiritual
          growth, and connecting with others in faith. Join us as we grow in
          love and share the gospel led by Rev J.I Oyelekan.
        </p>
        <Image
          src={welcomeImage}
          alt="Welcome to Christ Baptist Church"
          width={800}
          height={600}
          priority
        />
      </section>
    </main>
  );
}
