// /app/components/home/WelcomeSection.tsx
import React from "react";
import Image from "next/image";
import welcomeImage from "@/public/images/welcome_to_our_church.jpg";

const WelcomeSection = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-center text-2xl md:text-4xl font-bold text-heading mb-8">
          Welcome to Christ Baptist Church
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Text Section */}
          <div className="w-full md:w-1/2 flex justify-center text-center md:text-left">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Christ Baptist Church is a community dedicated to worship,
              spiritual growth, and connecting with others in faith. Join us as
              we grow in love and share the gospel led by{" "}
              <span className="text-heading font-medium">
                Rev. J.I Oyelekan
              </span>
              .
            </p>
          </div>
          {/* Image Section */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="rounded-lg overflow-hidden shadow-lg transform transition hover:scale-105">
              <Image
                src={welcomeImage}
                alt="Welcome to Christ Baptist Church"
                width={800}
                height={600}
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
