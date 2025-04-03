// Define the form data type
interface MinistryActivityFormData {
  title: string;
  subtitle: string;
  image: string;
  ministryId: string;
}

export const addMinistryActivity = async (
  formData: MinistryActivityFormData,
  adminId: string
) => {
  try {
    const res = await fetch("/api/admin/add-ministries-activities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, adminId }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({})); // Handle potential JSON parse errors
      throw new Error(errorData.message || "Failed to add activity");
    }

    return { success: true };
  } catch (error: unknown) {
    console.error(error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred.",
    };
  }
};
