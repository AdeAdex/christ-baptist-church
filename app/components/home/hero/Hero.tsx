import React from 'react'
import Header from './Header'

const mobileVideos = [
  "https://assets.mixkit.co/videos/1259/1259-720.mp4",
  "https://assets.mixkit.co/videos/39745/39745-720.mp4",
  "https://assets.mixkit.co/videos/13762/13762-720.mp4",
  "https://assets.mixkit.co/videos/39931/39931-720.mp4",
  "https://assets.mixkit.co/videos/26096/26096-720.mp4",
  "https://assets.mixkit.co/videos/49869/49869-720.mp4",
];

const desktopVideos = [
  "https://worshiphousemedia.s3.amazonaws.com/previews/s/mm/hpm/mm/welcome_to_our_church_072123.mp4",
  
];

const Hero = () => {
  return (
    <div>
      <Header mobileVideos={mobileVideos} desktopVideos={desktopVideos}/>
    </div>
  )
}

export default Hero