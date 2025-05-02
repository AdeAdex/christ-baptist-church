// /app/(routes)/dashboard/live/join/page.tsx

import JoinLiveStream from "@/app/components/liveVideo/JoinLiveStream";

const JoinLiveStreamPage = () => {
  return (
    <div className="h-full p-4 w-full relative flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Join Live Stream</h1>
      <JoinLiveStream />
    </div>
  );
};

export default JoinLiveStreamPage;
