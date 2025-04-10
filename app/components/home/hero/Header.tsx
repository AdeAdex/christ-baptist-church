
"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import ReactPlayer from "react-player";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useScreenSize } from "@/app/hooks/useScreenSize";
import Image from "next/image";
import { StaticImageData } from "next/image";
import SectionHeader from "../SectionHeader";
import SectionContent from "../SectionContent";
import SectionButton from "../SectionButton";

interface ImageSlide {
  image: string | StaticImageData; // Can accept both string or StaticImageData
  title: string;
  subtitle: string;
  subtitle2?: string;
  buttonText: string;
}

interface HeaderProps {
  mobileVideos: string[];
  desktopVideos: string[];
  imageSlides?: ImageSlide[]; // Accept imageSlides as an optional prop
}

interface ArrowProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <div
    className="absolute top-1/2 right-4 z-10 transform -translate-y-1/2 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    onClick={onClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="50"
      height="50"
      className="text-gray-400 hover:text-white transition-colors"
    >
      <circle
        cx="12"
        cy="12"
        r="11"
        fill="none"
        stroke="#cbd5e0"
        strokeWidth="1"
      />
      <path
        d="M10 8l4 4-4 4"
        fill="none"
        stroke="#cbd5e0"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <div
    className="absolute top-1/2 left-4 z-10 transform -translate-y-1/2 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    onClick={onClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="50"
      height="50"
      className="text-gray-400 hover:text-white transition-colors"
    >
      <circle
        cx="12"
        cy="12"
        r="11"
        fill="none"
        stroke="#cbd5e0"
        strokeWidth="1"
      />
      <path
        d="M14 8l-4 4 4 4"
        fill="none"
        stroke="#cbd5e0"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

const Header: React.FC<HeaderProps> = ({
  mobileVideos,
  desktopVideos,
  imageSlides,
}) => {
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const swiperRef = useRef<SwiperInstance | null>(null);
  const screen = useScreenSize();

  const heroVideos = screen === "mobile" ? mobileVideos : desktopVideos;

  const shouldShowVideos = heroVideos.length > 0;

  const toggleAutoplay = () => {
    setIsPaused((prev) => !prev);
    setIsAutoplay((prev) => !prev);
  };

  useEffect(() => {
    if (isAutoplay && !isPaused) {
      const intervalId = setInterval(() => {
        swiperRef.current?.slideNext();
      }, 5000);
      return () => clearInterval(intervalId);
    }
  }, [isAutoplay, isPaused, currentVideoIndex]);

  return (
    <header className="relative h-[85vh] md:h-[calc(100vh-64px)] overflow-hidden group">
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setCurrentVideoIndex(swiper.activeIndex)}
        slidesPerView={1}
        spaceBetween={0}
        loop={heroVideos.length > 1}
        autoplay={
          isAutoplay && !isPaused
            ? { delay: 5000, disableOnInteraction: false }
            : false
        }
        modules={[Navigation, Pagination]}
        className="w-full h-full"
      >
        {/* First, display image slides */}
        {imageSlides?.map((slide, index) => (
          <SwiperSlide key={index} className="relative w-full h-full bg-black">
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 z-20 bg-black/50">
              <SectionHeader title={slide.title} className="font-bold uppercase text-[28px] md:text-[32px] lg:text-[40px]"/>
              <SectionContent content={slide.subtitle} className="font-semibold text-center"/>
              <span className="font-semibold text-[14px] sm:text-[15px] md:text-[16px] lg:text-[16px] leading-relaxed text-center">{slide.subtitle2}</span>
              <SectionButton
                title={slide.buttonText}
                className="hover:bg-primary-button-hover text-white py-2 px-8 text-[16px] font-[500] rounded-3xl transition mt-8"
              />
            </div>
          </SwiperSlide>
        ))}

        {/* Then, display video slides */}
        {shouldShowVideos &&
          heroVideos.map((video, index) => (
            <SwiperSlide
              key={index}
              className="relative w-full h-full bg-black"
            >
              <ReactPlayer
                url={video}
                playing={!isPaused}
                muted
                loop
                controls={false}
                width="100%"
                height="100%"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
      </Swiper>

      <NextArrow onClick={() => swiperRef.current?.slideNext()} />
      <PrevArrow onClick={() => swiperRef.current?.slidePrev()} />

      <button
        onClick={toggleAutoplay}
        className="absolute bottom-5 md:bottom-8 left-10 lg:left-20 transform -translate-x-1/2 bg-black border border-1 p-2 rounded-full w-[50px] h-[50px] flex justify-center items-center z-40"
      >
        {isPaused ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-white"
          >
            <path d="M5 3.879v16.242c0 .684.58 1.112 1.216.821l13.242-8.121c.637-.391.637-1.251 0-1.642L6.216 3.057C5.58 2.766 5 3.194 5 3.879z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-white"
          >
            <path d="M6 4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h1zm11 0a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h1z" />
          </svg>
        )}
      </button>
    </header>
  );
};

export default Header;
