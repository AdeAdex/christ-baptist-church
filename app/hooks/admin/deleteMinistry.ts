import { enqueueSnackbar } from "notistack";

export async function deleteMinistry(ministryId: string): Promise<void> {
  try {
        const response = await fetch(`/api/admin/delete-ministry?id=${ministryId}`, {
                method: "DELETE",
              });
              

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Failed to delete ministry");
    }

    enqueueSnackbar("Ministry deleted successfully", { variant: "success" }); // Show success message
  } catch (error: unknown) {
    // Check if error is an instance of Error
    if (error instanceof Error) {
      enqueueSnackbar("Failed to delete ministry: " + error.message, { variant: "error" }); // Show error message
    } else {
      enqueueSnackbar("Failed to delete ministry", { variant: "error" }); // Fallback if it's not an Error instance
    }
    throw new Error(error instanceof Error ? error.message : "Error deleting ministry");
  }
}
