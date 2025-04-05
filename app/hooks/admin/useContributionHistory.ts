// hooks/admin/useContributionHistory.ts
import { useEffect } from "react";
import { useAppSelector } from "@/app/redux/hooks";
import { useFetchContributions } from "@/app/hooks/admin/useFetchContributions";

export const useContributionHistory = (memberId: string) => {
  const contributions = useAppSelector(
    (state) => state.contribution.contributions
  );
  const isLoading = useAppSelector((state) => state.contribution.isLoading);

  const { refetch } = useFetchContributions(memberId);

  useEffect(() => {
    if (memberId && contributions.length === 0) {
      refetch();
    }
  }, [contributions, memberId, refetch]);

  return {
    contributions,
    isLoading,
  };
};
