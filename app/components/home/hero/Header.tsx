"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper"; 
import ReactPlayer from "react-player";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface HeaderProps {
  mobileVideos: string[];
  desktopVideos: string[];
}

interface ArrowProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <div
    className="absolute top-1/2 right-4 z-10 transform -translate-y-1/2 cursor-pointer"
    onClick={onClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 70"
      width="50"
      height="70"
    >
      <polygon points="10,5 25,35 10,65" fill="#cbd5e0" />
    </svg>
  </div>
);

const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <div
    className="absolute top-1/2 left-4 z-10 transform -translate-y-1/2 cursor-pointer"
    onClick={onClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 70"
      width="50"
      height="70"
    >
      <polygon points="40,5 25,35 40,65" fill="#cbd5e0" />
    </svg>
  </div>
);

const Header: React.FC<HeaderProps> = ({ mobileVideos, desktopVideos }) => {
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  const swiperRef = useRef<SwiperInstance | null>(null); // Use SwiperInstance for the ref

  const heroVideos =
    isMobile === null
      ? [mobileVideos[0]]
      : isMobile
      ? mobileVideos
      : desktopVideos;

  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth <= 768);
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

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

  if (isMobile === null) return null;

  return (
    <header className="relative h-[85vh] md:h-[calc(100vh-64px)] overflow-hidden">
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
        {heroVideos.map((video, index) => (
          <SwiperSlide key={index} className="relative w-full bg-black">
            <ReactPlayer
              url={video}
              playing={!isPaused}
              muted
              loop
              controls={false}
              width="100%"
              height="100%"
              className="absolute inset-0 w-full h-full"
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
