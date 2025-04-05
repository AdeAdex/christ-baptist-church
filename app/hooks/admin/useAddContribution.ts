//  /app/hooks/admin/useAddContribution.ts

'use client'


import { useState } from "react";
import { addContributionAction } from "@/app/actions/admin/addContribution";
import { enqueueSnackbar } from "notistack";
import { useAppDispatch } from "@/app/redux/hooks";
import { setLoading, setSuccess, setError, addNewContribution } from "@/app/redux/slices/contributionSlice";
import { Contribution } from "@/app/types/contribution";

export const useAddContribution = () => {
  const dispatch = useAppDispatch();

  const addContribution = async (data: Contribution) => {
    dispatch(setLoading());  // Dispatch loading state to Redux
    try {
      const result = await addContributionAction(data);
      enqueueSnackbar(result.message || "Contribution added successfully", { variant: "success" });
      dispatch(addNewContribution(result.contribution)); // Dispatch the newly added contribution
      dispatch(setSuccess(result.message || "Contribution added successfully"));
      return result;
    } catch (error: unknown) {
        let errMsg = "Unknown error occurred";

      if (error instanceof Error) {
        errMsg = error.message;
      }

      enqueueSnackbar(errMsg, { variant: "error" });
      dispatch(setError(errMsg));


    } finally {
    }
  };

  return { addContribution };
};
