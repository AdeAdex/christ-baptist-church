// /app/(routes)/dashboard/live/create/page.tsx

import LiveStream from "@/app/components/liveVideo/LiveStream";

const LiveStreamPage = () => {

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 w-full">
      <h1 className="text-2xl font-bold mb-4">Live Stream</h1>
      <LiveStream />
    </div>
  );
};

export default LiveStreamPage;
