"use client";

import Image from "next/image";

interface ActivityCardProps {
  activity: {
    _id: string;
    title: string;
    subtitle: string;
    image?: string;
    ministryName?: string;
    visibility: "public" | "private";
  };
}

export default function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <div className="border p-4 rounded-md shadow-md bg-white dark:bg-gray-800">
      {/* Image */}
      {activity.image && (
        <div className="w-full h-40 relative mb-3">
          <Image
            src={activity.image}
            alt={activity.title}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
      )}

      {/* Title and Subtitle */}
      <h3 className="font-semibold text-lg">{activity.title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">{activity.subtitle}</p>

      {/* Ministry & Visibility */}
      <div className="flex justify-between items-center mt-2 text-sm">
        <p className="font-medium">
          {/* Ministry: <span className="text-blue-600">{activity.ministryName || "N/A"}</span> */}
        </p>
        <p
          className={`px-2 py-1 rounded-md ${
            activity.visibility === "public" ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {activity.visibility}
        </p>
      </div>
    </div>
  );
}
