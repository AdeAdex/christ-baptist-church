// app/(routes)/about-us/leadership/layout.tsx

import { metadataConfig } from "@/app/utils/metadata";

// Set metadata here for the leadership section
export const metadata = metadataConfig.leadership;

export default function LeadershipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
    </div>
  );
}
