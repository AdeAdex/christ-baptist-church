
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { useAppDispatch } from "@/app/redux/hooks";
import { fetchActivities } from "@/app/actions/admin/activityActions";
import { Activity } from "@/app/redux/slices/activitiesSlice";

export const useActivities = () => {
  const dispatch = useAppDispatch();
  const activities = useSelector((state: RootState) => state.activities.activities);
  const isLoading = useSelector((state: RootState) => state.activities.isLoading);
  const member = useSelector((state: RootState) => state.auth.member);

  // console.log("Filtered Activities:", activities);

  useEffect(() => {
    const fetchActivitiesData = async () => {
      await dispatch(fetchActivities());
    };

    fetchActivitiesData();
  }, [dispatch]);

  // Filter activities based on member's ministry if they don't have admin permissions
  const filteredActivities = activities.filter((activity: Activity) => {
  const isAdmin =
    member?.role === "admin" &&
    member?.hasPermission &&
    (member?.permissionLevel === "full" || member?.permissionLevel === "limited");

  if (isAdmin) {
    return true;
  } else {
    return (
      activity?.ministryId &&
      member?.ministry &&
      activity.ministryId === member.ministry
    );
  }
});


  return { activities: filteredActivities, isLoading, dispatch };
};
