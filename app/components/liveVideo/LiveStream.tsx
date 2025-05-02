//  /app/components/liveVideo/LiveStream.tsx


"use client";

import React, { useRef, useState } from "react";
import AgoraRTC, {
  IAgoraRTCClient,
  IMicrophoneAudioTrack,
  ICameraVideoTrack,
} from "agora-rtc-sdk-ng";
import axios from "axios";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <div className="relative w-full max-w-3xl aspect-video bg-black rounded-lg overflow-hidden shadow-lg border border-gray-700">
        <div ref={videoRef} className="w-full h-full" />
        {isLive && (
          <div className="absolute top-4 left-4 bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-full animate-pulse">
            LIVE
          </div>
        )}
      </div>

      <div className="mt-6 space-x-4">
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
    </div>
  );
};

export default LiveStream;
