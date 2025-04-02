//  /app/hooks/admin/addMinistry.tsx

import { enqueueSnackbar } from "notistack";

// Define the type for the response data
interface AddMinistryResponse {
  message: string;
  newMinistry: {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
}

export async function addMinistry(name: string): Promise<void> {
  try {
    const response = await fetch("/api/admin/add-ministry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    const data: AddMinistryResponse = await response.json();

    if (response.ok) {
      enqueueSnackbar("Ministry added successfully", { variant: "success" });
//       return data.newMinistry;
    } else {
      enqueueSnackbar(data.message, { variant: "error" });
    }
  }catch (error: unknown) {
        // Assert that the error is an instance of Error, then access error.message
        if (error instanceof Error) {
          enqueueSnackbar(`Error adding ministry: ${error.message}`, { variant: "error" });
        } else {
          enqueueSnackbar("An unknown error occurred while adding ministry", { variant: "error" });
        }
      }
    }
