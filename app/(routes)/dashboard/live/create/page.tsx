// /app/(routes)/dashboard/live/create/page.tsx

import LiveStream from "@/app/components/liveVideo/LiveStream";

const LiveStreamPage = () => {

  return (
    <div className="h-full p-4 w-full relative flex flex-col">
      <h1 className="text-2xl font-bold ">Live Stream</h1>
      <LiveStream />
    </div>
  );
};

export default LiveStreamPage;
