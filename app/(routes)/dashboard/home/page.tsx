//  /app/(auth)/[role]/[dashboard]/home/page.tsx


"use client";

import DashBoardCalendar from "@/app/components/dashboard/DashboardCalendar";
import { useMember } from "@/app/context/MemberContext";

export default function HomePage() {
  const { member } = useMember();

  const formattedDate = member?.createdAt
    ? new Date(member.createdAt).toISOString().split("T")[0] // YYYY-MM-DD format
    : "";

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 p-6">
      <div className="w-full lg:w-4/6">
        <small
          className="flex flex-col px-4 mb-5 text-white py-4"
          style={{ backgroundColor: "#030552", borderRadius: "5px" }}
        >
          <h6 className="uppercase flex flex-wrap items-center gap-2 font-bold md:text-xl text-base">
  Welcome to your dashboard:
  <span className="break-words">{member?.firstName} {member?.lastName}</span>
</h6>


          <span className="my-3">
            You created an account with us on: {formattedDate}
          </span>
        </small>
      </div>

      <div className="w-full lg:w-2/6">
        <DashBoardCalendar />
      </div>
    </div>
  );
}
