//  /app/components/liveVideo/LiveStream.tsx

"use client";

import React, { useRef, useState } from "react";
import AgoraRTC, {
  IAgoraRTCClient,
  IMicrophoneAudioTrack,
  ICameraVideoTrack,
} from "agora-rtc-sdk-ng";
import axios from "axios";
import LiveChat from "./LiveChat"; // Import the LiveChat component

const APP_ID = process.env.NEXT_PUBLIC_AGORA_APP_ID || "";

const LiveStream = () => {
  const [isLive, setIsLive] = useState(false);
  const [client, setClient] = useState<IAgoraRTCClient | null>(null);
  const [micTrack, setMicTrack] = useState<IMicrophoneAudioTrack | null>(null);
  const [camTrack, setCamTrack] = useState<ICameraVideoTrack | null>(null);

  const videoRef = useRef<HTMLDivElement | null>(null);
  const channelName = "my-channel";
  const uid = String(Math.floor(Math.random() * 10000));

  const startLive = async () => {
    try {
      const response = await axios.get(
        `/api/agora-token?channelName=${channelName}&uid=${uid}`
      );
      const { token } = response.data;

      const agoraClient = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
      await agoraClient.setClientRole("host");
      await agoraClient.join(APP_ID, channelName, token, uid);

      const [mic, cam] = await AgoraRTC.createMicrophoneAndCameraTracks();
      setMicTrack(mic);
      setCamTrack(cam);

      if (videoRef.current) cam.play(videoRef.current);
      await agoraClient.publish([mic, cam]);

      setClient(agoraClient);
      setIsLive(true);
    } catch (error) {
      console.error("Failed to start live stream:", error);
    }
  };

  const stopLive = async () => {
    try {
      if (client) {
        if (micTrack) {
          micTrack.stop();
          micTrack.close();
        }
        if (camTrack) {
          camTrack.stop();
          camTrack.close();
        }

        await client.unpublish();
        await client.leave();

        setClient(null);
        setMicTrack(null);
        setCamTrack(null);
        setIsLive(false);
      }
    } catch (error) {
      console.error("Failed to stop live stream:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center h-[100%] px-4 w-full gap-6 mt-6">
      {/* Video Section */}
      <div className="lg:w-2/3 w-full rounded-lg overflow-hidden shadow-lg mb-6 lg:mb-0 h-full relative">
        <div
          ref={videoRef}
          className="w-full aspect-video h-full bg-gray-200 dark:bg-gray-800"
        />
        {isLive && (
          <div className="absolute top-4 left-4 bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-full animate-pulse">
            LIVE
          </div>
        )}
      </div>
        <div className="space-x-4 absolute top-0 right-0 md:right-1/2">
          {!isLive ? (
            <button
              onClick={startLive}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition"
            >
              Start Live
            </button>
          ) : (
            <button
              onClick={stopLive}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition"
            >
              Stop Live
            </button>
          )}
        </div>

      {/* Chat Section */}
      <div className="lg:w-1/3 w-full rounded-lg p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 shadow-lg h-full">
        <LiveChat />
      </div>
    </div>
  );
};

export default LiveStream;
