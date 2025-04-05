"use client";

import { useEffect } from "react";
import { fetchMemberContributionsAction } from "@/app/actions/admin/fetchMemberContributions";
import { useAppDispatch } from "@/app/redux/hooks";
import {
  setLoading,
  setSuccess,
  setError,
  setContributions,
} from "@/app/redux/slices/contributionSlice";
import { enqueueSnackbar } from "notistack";

export const useFetchContributions = (memberId: string) => {
  const dispatch = useAppDispatch();

  const fetchContributions = async () => {
    dispatch(setLoading());
    try {
      const { contributions, message } = await fetchMemberContributionsAction(memberId);
      dispatch(setContributions(contributions));
      dispatch(setSuccess(message));
      enqueueSnackbar(message, { variant: "success" });
    } catch (error: unknown) {
      let errMsg = "Failed to fetch contributions.";
      if (error instanceof Error) {
        errMsg = error.message;
      }
      enqueueSnackbar(errMsg, { variant: "error" });
      dispatch(setError(errMsg));
    } finally {
    }
  };

  useEffect(() => {
    if (memberId) {
      fetchContributions();
    }
  }, [memberId]);

  return {  refetch: fetchContributions };
};
