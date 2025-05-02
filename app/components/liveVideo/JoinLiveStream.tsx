//  /app/components/liveVideo/JoinLiveStream.tsx


"use client";

import React, { useRef, useState } from "react";
import AgoraRTC, {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  IRemoteVideoTrack,
  IRemoteAudioTrack,
} from "agora-rtc-sdk-ng";
import axios from "axios";
import LiveChat from "@/app/components/liveVideo/LiveChat";

const APP_ID = process.env.NEXT_PUBLIC_AGORA_APP_ID || "";

const JoinLiveStream = () => {
  const [isJoined, setIsJoined] = useState(false);
  const [client, setClient] = useState<IAgoraRTCClient | null>(null);
  const videoRef = useRef<HTMLDivElement | null>(null);
  const channelName = "my-channel";
  const uid = String(Math.floor(Math.random() * 10000));

  const joinLive = async () => {
    try {
      const response = await axios.get(
        `/api/agora-token?channelName=${channelName}&uid=${uid}`
      );
      const { token } = response.data;

      const agoraClient = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
      await agoraClient.setClientRole("audience");

      agoraClient.on(
        "user-published",
        async (user: IAgoraRTCRemoteUser, mediaType) => {
          // Subscribe to the user
          await agoraClient.subscribe(user, mediaType);

          // If the mediaType is 'video', play the video track
          if (mediaType === "video") {
            const remoteVideoTrack = user.videoTrack as IRemoteVideoTrack;
            if (videoRef.current) {
              remoteVideoTrack.play(videoRef.current);
            }
          }

          // If the mediaType is 'audio', play the audio track
          if (mediaType === "audio") {
            const remoteAudioTrack = user.audioTrack as IRemoteAudioTrack;
            remoteAudioTrack.play(); // Plays through the device speaker
          }
        }
      );

      agoraClient.on("user-unpublished", (user: IAgoraRTCRemoteUser) => {
        // Handle when the user stops streaming (e.g., unsubscribing)
        if (user.videoTrack) {
          user.videoTrack.stop();
        }
        if (user.audioTrack) {
          user.audioTrack.stop();
        }
      });

      await agoraClient.join(APP_ID, channelName, token, uid);
      setClient(agoraClient);
      setIsJoined(true);
    } catch (error) {
      console.error("Failed to join live stream:", error);
    }
  };

  const leaveLive = async () => {
    try {
      if (client) {
        await client.leave();
        setClient(null);
        setIsJoined(false);
      }
    } catch (error) {
      console.error("Failed to leave live stream:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center h-[100%] px-4 w-full gap-6 mt-6">
      <div className="relative w-full max-w-3xl aspect-video bg-black rounded-lg overflow-hidden shadow-lg border border-gray-700">
        <div ref={videoRef} className="w-full h-full" />
        {isJoined && (
          <div className="absolute top-4 left-4 bg-green-600 text-white text-sm font-semibold px-3 py-1 rounded-full animate-pulse">
            Watching Live
          </div>
        )}
      </div>

      <div className="space-x-4 absolute top-0 right-0 md:right-1/2">
        {!isJoined ? (
          <button
            onClick={joinLive}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Join Live
          </button>
        ) : (
          <button
            onClick={leaveLive}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Leave Live
          </button>
        )}
      </div>

      {/* Integrate LiveChat here */}
      <div className="lg:w-1/3 w-full rounded-lg p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 shadow-lg h-full">
      <LiveChat />
      </div>
    </div>
  );
};

export default JoinLiveStream;
