import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { addMinistryActivity } from "@/app/actions/admin/activityActions";
import { RootState } from "@/app/redux/store";
import { fetchMinistries } from "@/app/actions/admin/ministriesActions"; // Adjust path if necessary
import { useAppDispatch } from "@/app/redux/hooks";
import { useSelector } from "react-redux";

export const useActivityForm = (
  adminId: string | null,
  enqueueSnackbar: (message: string, options: { variant: "success" | "error" }) => void
) => {
  const [form, setForm] = useState({ title: "", subtitle: "", image: "", ministryId: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
    const dispatch = useAppDispatch();
  

   const { ministries, isLoading } = useSelector((state: RootState) => state.ministries); // Get ministries from Redux state
 


  // Fetch ministries if not available
  useEffect(() => {
    if (ministries.length === 0 && !isLoading) {
      dispatch(fetchMinistries());
    }
  }, [ministries, dispatch, isLoading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminId) {
      enqueueSnackbar("You must be logged in as an admin to add an activity.", { variant: "error" });
      return;
    }

    setLoading(true);
    try {
      const result = await addMinistryActivity(form, adminId);
      setLoading(false);

      if (result.success) {
        enqueueSnackbar("Activity added successfully!", { variant: "success" });
        router.refresh();
      } else {
        throw new Error(result.message || "Something went wrong.");
      }
    } catch (error: unknown) {
      setLoading(false);
      enqueueSnackbar(error instanceof Error ? error.message : "An unknown error occurred.", { variant: "error" });
    }
  };

  return { form, loading, handleChange, handleSubmit };
};
