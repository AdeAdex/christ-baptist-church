//  /app/(route)/dashboard/ministries-activities/page.tsx

"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { useActivityForm } from "@/app/hooks/admin/useActivityForm";
import { useSnackbar } from "notistack";
import { useDisclosure } from "@mantine/hooks";
import { useActivities } from "@/app/hooks/admin/useActivities";
import ActivityCard from "@/app/components/ministriesActivities/ActivityCard";
import ActivityModal from "@/app/components/ministriesActivities/ActivityModal";
import { Button } from "@mantine/core";

export default function MinistryActivitiesPage() {
  const { ministries, isLoading } = useSelector(
    (state: RootState) => state.ministries
  );
  const member = useSelector((state: RootState) => state.auth.member);
  const { activities } = useActivities();
  const { enqueueSnackbar } = useSnackbar();

  console.log("Activities", activities)

  const {
    form,
    loading,
    imagePreview,
    handleChange,
    handleSubmit,
    handleImageChange,
  } = useActivityForm(member?._id || null, enqueueSnackbar);

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Open Modal Button */}
      <Button onClick={open} className="mb-6">
        Add New Activity
      </Button>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {activities.length === 0 ? (
          <p>No activities found.</p>
        ) : (
          activities.map((activity, index) => (
            <ActivityCard key={activity._id || index} activity={activity} />
          ))
        )}
      </div>

      {/* Activity Modal */}
      <ActivityModal
        opened={opened}
        close={close}
        form={form}
        loading={loading}
        imagePreview={imagePreview}
        ministries={ministries}
        handleChange={handleChange}
        handleImageChange={handleImageChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
