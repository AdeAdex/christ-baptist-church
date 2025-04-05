//  /app/hooks/admin/useActivityForm.ts




import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { addMinistryActivity } from "@/app/actions/admin/activityActions";
import { RootState } from "@/app/redux/store";
import { fetchMinistries } from "@/app/actions/admin/ministriesActions";
import { useAppDispatch } from "@/app/redux/hooks";
import { useSelector } from "react-redux";
import { addActivity } from "@/app/redux/slices/activitiesSlice";

/**
 * Custom hook for managing the form for ministry activity creation.
 */
interface MinistryActivityFormData {
  title: string;
  subtitle: string;
  image: string;
  ministryId: string;
  visibility: "private" | "public";
}

export const useActivityForm = (
  adminId: string | null,
  enqueueSnackbar: (message: string, options: { variant: "success" | "error" }) => void
) => {
  const [form, setForm] = useState<MinistryActivityFormData>({
    title: "",
    subtitle: "",
    image: "",
    ministryId: "",
    visibility: "private",
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // State for image preview
  const [base64Image, setBase64Image] = useState<string | null>(null); // State for base64 string

  const router = useRouter();
  const dispatch = useAppDispatch();

  const { ministries, isLoading } = useSelector((state: RootState) => state.ministries);

  // Fetch ministries if not available
  useEffect(() => {
    if (ministries.length === 0 && !isLoading) {
      dispatch(fetchMinistries());
    }
  }, [ministries, dispatch, isLoading]);

  // handleChange function to update form state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    // Handle different input types
    if (type === "select-one") {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  // Image change handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String); // Set the image preview
        setBase64Image(base64String); // Set the Base64 string for further use
        setForm((prevForm) => ({
          ...prevForm,
          image: base64String, // Update the form with the base64 image
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // handleSubmit function to submit the form
  const handleSubmit = async (e: React.FormEvent, closeModal: () => void) => {
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
            const addedActivity = result.newActivity.newActivity;
          
            // 🧠 Find the ministry name from Redux using the selected ministryId
            const ministry = ministries.find(m => m._id === addedActivity.ministry);
          
            // ✨ Manually attach the ministryName
            const activityWithMinistryName = {
              ...addedActivity,
              ministryName: ministry?.name || "N/A"
            };
          
            dispatch(addActivity(activityWithMinistryName));
          
            enqueueSnackbar("Activity added successfully!", { variant: "success" });
            closeModal(); // Close the modal
            setForm({ title: "", subtitle: "", image: "", ministryId: "", visibility: "private" }); // Clear the form
            router.refresh(); // Optional — if you want to update other areas
          }
           else {
            throw new Error(result.message || "Something went wrong.");
          }
        } catch (error: unknown) {
          setLoading(false);
          enqueueSnackbar(error instanceof Error ? error.message : "An unknown error occurred.", { variant: "error" });
        }
      };
      

  return {
    form,
    loading,
    isLoading, 
    imagePreview,
    base64Image,
    handleChange,
    handleSubmit,
    handleImageChange, // Expose the image change handler
  };
};
