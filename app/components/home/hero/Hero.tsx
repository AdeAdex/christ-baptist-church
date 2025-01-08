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
  "https://v.ftcdn.net/05/29/96/29/700_F_529962985_EVBQ0kttJYlQey3VvnJSEzWWvOUbdh4E_ST.mp4",
  "https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/Btw9Lp04ipguag6m/woman-praying-on-a-black-background_bwm9k30i__94641087ce882db508b77bef0574f780__P360.mp4",
  "https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/Sx6dK9lQiok4v2i0/videoblocks-back-view-of-a-man-at-a-concert-listening-to-slow-music-a-lot-of-people-are-in-front-of-him-some-of-them-are-raising-up-their-hands-worship_r_gglth9q__bd8dd1e14e77b3e1b621e76f5fe2f154__P360.mp4",
];

const Hero = () => {
  return (
    <div>
      <Header mobileVideos={mobileVideos} desktopVideos={desktopVideos}/>
    </div>
  )
}

export default Hero