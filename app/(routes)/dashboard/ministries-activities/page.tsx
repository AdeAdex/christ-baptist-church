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
import { deleteActivity } from "@/app/actions/admin/activityActions";
import { Activity } from "@/app/redux/slices/activitiesSlice";
import Loader from "@/app/components/Loader";


export default function MinistryActivitiesPage() {
  const { ministries } = useSelector(
    (state: RootState) => state.ministries
  );
  const member = useSelector((state: RootState) => state.auth.member);
  const { activities, loading, dispatch } = useActivities();
  const { enqueueSnackbar } = useSnackbar();

    console.log("Activities On Page", activities)       

  const {
    form,
    loading,
    imagePreview,
    handleChange,
    handleSubmit,
    handleImageChange,
  } = useActivityForm(member?._id || null, enqueueSnackbar);

  const [opened, { open, close }] = useDisclosure(false);

  const handleDelete = async (activityId: string) => {
    const result = await deleteActivity(activityId, dispatch);
    if (result.success) {
      enqueueSnackbar("Activity deleted successfully.", { variant: "success" });
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Open Modal Button */}
      {member?.role === "admin" &&
        member?.hasPermission &&
        (member?.permissionLevel === "full" ||
          member?.permissionLevel === "limited") && (
          <Button onClick={open} className="mb-6">
            Add New Activity
          </Button>
        )}

      {/* Activities Grid */}
      {/* Activities Grid */}
{loading ? (
  <div className="flex justify-center items-center py-10">
    <Loader />
  </div>
) : (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    {activities.length === 0 ? (
      <p>No activities found.</p>
    ) : (
      activities.map((activity: Activity, index: number) => (
        <ActivityCard
          key={activity._id || index}
          activity={activity}
          onDelete={handleDelete}
        />
      ))
    )}
  </div>
)}


      {/* Activity Modal */}
      {member?.role === "admin" &&
        member?.hasPermission &&
        (member?.permissionLevel === "full" ||
          member?.permissionLevel === "limited") && (
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
        )}
    </div>
  );
}
