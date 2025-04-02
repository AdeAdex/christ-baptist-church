//  /app/actions/admin/membersActions.ts

import { setAlMembers, updateAlMember } from "@/app/redux/slices/allMembersSlice";
import { AppDispatch } from "@/app/redux/store";
import axios from "axios";
import { IChurchMember } from "@/app/types/user";
import { enqueueSnackbar } from "notistack";

// ✅ Fetch all members
export const fetchAllMembers = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get<{ allMembers: IChurchMember[] }>("/api/admin/get-all-members");

    // console.log("Fetched members:", response.data.allMembers); // Log fetched members
    dispatch(setAlMembers(response.data.allMembers));
  } catch (error: unknown) {
    console.error("Error fetching members:", error);
    enqueueSnackbar("Failed to load members", { variant: "error" });
  }
};

// ✅ Search members
export const searchMembers = (searchTerm: string) => async (dispatch: AppDispatch) => {
  try {
    if (!searchTerm.trim()) {
      dispatch(setAlMembers([])); // Clear users if no search term
      return;
    }

    const response = await axios.get<{ allMembers: IChurchMember[] }>(`/api/admin/get-all-members?search=${searchTerm}`);
    
    dispatch(setAlMembers(response.data.allMembers)); // Only set filtered members
  } catch (error: unknown) {
    console.error("Error searching members:", error);
    enqueueSnackbar("Failed to search members", { variant: "error" });
  }
};

// ✅ Update a member
export const updateAlMemberAdmin =
  (adminId: string, targetUserId: string, updates: Partial<IChurchMember>) =>
  async (dispatch: AppDispatch) => {
    // console.log("Updating user with ID:", targetUserId); // Log target user ID
    // console.log("Updates:", updates); // Log updates
    // console.log("Admin ID:", adminId); // Log admin ID  

    try {
      const response = await axios.patch<{ updatedUser: IChurchMember }>("/api/admin/update-member-or-admin", {
        adminId,
        targetUserId,
        updates,
      });

      dispatch(updateAlMember(response.data.updatedUser));
      enqueueSnackbar("User updated successfully", { variant: "success" });

      return response.data.updatedUser;
    } catch (error: unknown) {
      console.error("Error updating user:", error);
      if (axios.isAxiosError(error)) {
        enqueueSnackbar(error.response?.data?.message || "Failed to update user", { variant: "error" });
      } else {
        enqueueSnackbar("An unexpected error occurred", { variant: "error" });
      }
      throw error;
    }
  };
