import React from 'react'
import Header from './Header'
import heroImage1 from '@/public/images/1.jpg'
import heroImage2 from '@/public/images/4.webp'

const mobileVideos = [
  "https://assets.mixkit.co/videos/39745/39745-720.mp4",
  "https://assets.mixkit.co/videos/13762/13762-720.mp4",
  "https://assets.mixkit.co/videos/49869/49869-720.mp4",  
];

const desktopVideos = [
  "https://worshiphousemedia.s3.amazonaws.com/previews/s/mm/hpm/mm/welcome_to_our_church_072123.mp4",
  "https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/Btw9Lp04ipguag6m/woman-praying-on-a-black-background_bwm9k30i__94641087ce882db508b77bef0574f780__P360.mp4",
];


const imageSlides = [
  {
    image: heroImage1,
    title: "Welcome to Christ BAptist Church",
    subtitle: "Where Faith, Community, and Hope Come Together. Join us in worship and",
    subtitle2: "experience a place of belonging",
    buttonText: "Join Us",
  },
  {
    image: heroImage2,
    title: "Stay Connected",
    subtitle: "Access anywhere, anytime.",
    buttonText: "Get Started",
  },
];

const Hero = () => {
  return (
    <div>
      <Header mobileVideos={mobileVideos} desktopVideos={desktopVideos} imageSlides={imageSlides}/>
    </div>
  )
}

export default Hero