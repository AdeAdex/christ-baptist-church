//  /app/(auth)/[role]/[dashboard]/home/page.tsx

"use client";

import { useMember } from "@/app/context/MemberContext";

export default function HomePage() {
  const { member } = useMember();
  return <h1 className="text-black dark:text-white">Welcome {member?.firstName}</h1>;
}

