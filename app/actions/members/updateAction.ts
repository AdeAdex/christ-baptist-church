//  /app/actions/updateAction.ts

"use client";

import { IChurchMember } from "@/app/types/user";
import { updateMember } from "@/app/redux/slices/authSlice";
import { AppDispatch } from "@/app/redux/store";
import { enqueueSnackbar } from "notistack";

/**
 * Handles file selection and updates the preview URL and form data.
 */
export const handleFileSelect = (
  e: React.ChangeEvent<HTMLInputElement>,
  setPreviewUrl: React.Dispatch<React.SetStateAction<string | null>>,
  setFormData: React.Dispatch<React.SetStateAction<IChurchMember>>
) => {
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setPreviewUrl(base64String);
      setFormData((prev) => ({
        ...prev,
        profilePicture: base64String,
      }));
    };
  }
};

/**
 * Handles form input changes and updates the form data.
 */
export const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  setFormData: React.Dispatch<React.SetStateAction<IChurchMember>>
) => {
  const { name, value } = e.target;

  if (name.startsWith("address.")) {
    const addressField = name.split(".")[1];
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [addressField]: value,
      },
    }));
  } else if (name.startsWith("emergencyContact.")) {
    const contactField = name.split(".")[1];
    setFormData((prev) => ({
      ...prev,
      emergencyContact: {
        ...(prev.emergencyContact ?? {
          name: "",
          relationship: "",
          phoneNumber: "",
        }),
        [contactField]: value,
      },
    }));
  } else if (name.startsWith("socialMedia.")) {
    const socialField = name.split(".")[1];
    setFormData((prev) => ({
      ...prev,
      socialMedia: {
        ...(prev.socialMedia ?? {}), // Ensure it's an object
        [socialField]: value,
      },
    }));
  } else {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};

/**
 * Handles form submission, sends data to API, and updates Redux.
 */
export const handleSubmit = async (
  e: React.FormEvent,
  formData: IChurchMember,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  dispatch: AppDispatch,
  setPreviewUrl: React.Dispatch<React.SetStateAction<string | null>>
) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const formDataToSend = new FormData();

    if (formData._id) {
      formDataToSend.append("userId", formData._id);
    }

    // Loop through formData and append values
    Object.keys(formData).forEach((key) => {
      const typedKey = key as keyof IChurchMember;
      const value = formData[typedKey];

      if (value instanceof Date) {
        formDataToSend.append(key, value.toISOString().split("T")[0]);
      } else if (typeof value === "object" && value !== null) {
        formDataToSend.append(key, JSON.stringify(value));
      } else if (value !== undefined) {
        formDataToSend.append(key, String(value));
      }
    });

    // Append profile picture (Base64)
    if (formData.profilePicture) {
      formDataToSend.append("profilePicture", formData.profilePicture);
    }

    const response = await fetch("/api/auth/update", {
      method: "PATCH",
      body: formDataToSend,
    });

    const data = await response.json();
    setIsLoading(false);

    if (data.success) {
      dispatch(updateMember(data.updatedUser));
      enqueueSnackbar("Profile updated successfully!", { variant: "success" });

      // Reset preview URL after successful update
      setPreviewUrl(null);
    } else {
      enqueueSnackbar(
        data.error || data.message || "Failed to update profile",
        { variant: "error" }
      );
    }
  } catch (error) {
    setIsLoading(false);
    let errorMessage = "An unexpected error occurred";

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }

    enqueueSnackbar(errorMessage, { variant: "error" });
  }
};
