"use client";

import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { Button, Modal, Group, Text } from "@mantine/core";

interface ActivityCardProps {
  activity: {
    _id?: string ;
    title?: string;
    subtitle?: string;
    image?: string;
    ministryName?: string;
    visibility?: "public" | "private";
  };
  onDelete: (id: string) => void; // Delete handler passed as a prop
}

export default function ActivityCard({ activity, onDelete }: ActivityCardProps) {
  const [opened, setOpened] = useState(false); // To manage the modal state
  const member = useSelector((state: RootState) => state.auth.member);

  const handleDelete = () => {
    if (activity._id) {
      onDelete(activity._id); 
    }
    setOpened(false); 
  };

  return (
    <div className="border p-4 rounded-md shadow-md bg-white dark:bg-gray-800">
      {/* Image */}
      {activity?.image && (
        <div className="w-full h-40 relative mb-3">
          <Image
            src={activity?.image}
            alt={activity?.title || "Activity Image"}
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
          Ministry: <span className="text-blue-600">{activity.ministryName || "N/A"}</span>
        </p>
        <p
          className={`px-2 py-1 rounded-md ${
            activity.visibility === "public" ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {activity.visibility}
        </p>
      </div>

      {/* Delete Button (Visible only to admins with the right permissions) */}
      {member?.role === "admin" && member?.hasPermission && (member?.permissionLevel === "full" || member?.permissionLevel === "limited") && (
        <Button onClick={() => setOpened(true)} color="red" className="mt-4">
          Delete Activity
        </Button>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Confirm Deletion"
      >
        <Text size="sm">Are you sure you want to delete this activity? This action cannot be undone.</Text>
        <Group align="right" mt="md">
          <Button variant="outline" onClick={() => setOpened(false)}>
            Cancel
          </Button>
          <Button color="red" onClick={handleDelete}>
            Delete
          </Button>
        </Group>
      </Modal>
    </div>
  );
}
