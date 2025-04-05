// hooks/useContributionForm.ts

'use client'


import { useState, useEffect } from "react";
import { useFetchContributions } from "./useFetchContributions";
import { useAddContribution } from "@/app/hooks/admin/useAddContribution";
import { enqueueSnackbar } from "notistack";
import { useAppSelector } from "@/app/redux/hooks";
import { useUserDirectory } from "./useUserDirectory";
import { IChurchMember } from "@/app/types/user";

export const useContributionForm = () => {
  const [selectedMember, setSelectedMember] = useState<IChurchMember | null>(
        null
      );
  const [amount, setAmount] = useState("");
  const [week, setWeek] = useState<string>("");
  const [monthYear, setMonthYear] = useState<string | null>(null);
  const [type, setType] = useState("");
  const [status, setStatus] = useState("Pending");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [description, setDescription] = useState("");
  const [opened, setOpened] = useState(false);
  const [showDirectory, setShowDirectory] = useState(true);

   const {
      member,
    } = useUserDirectory();

    const { addContribution } = useAddContribution(); 

  const contributions = useAppSelector(
    (state) => state.contribution.contributions
  );
  const isLoading = useAppSelector((state) => state.contribution.isLoading);

  const { refetch } = useFetchContributions(member?._id || "");


  useEffect(() => {
    if (!contributions.length && selectedMember?._id) {
      refetch();
    }
  }, [contributions, selectedMember, refetch]);

  const handleAddContribution = async () => {
    if (
      !selectedMember ||
      !amount ||
      !week ||
      !monthYear ||
      !type ||
      !status ||
      !paymentMethod
    ) {
      enqueueSnackbar("Please fill all fields", { variant: "error" });
      return;
    }

    const parsedAmount = parseFloat(amount);
    const parsedWeek = parseInt(week, 10);
    if (isNaN(parsedAmount) || isNaN(parsedWeek) || parsedWeek < 1 || parsedWeek > 5) {
      enqueueSnackbar("Please enter a valid amount and week (1-5)", { variant: "error" });
      return;
    }

    try {
      if (!selectedMember || !selectedMember._id) {
        enqueueSnackbar("Please select a member", { variant: "error" });
        return;
      }

      const createdBy = {
        _id: member?._id || "",
        firstName: member?.firstName || "",
        lastName: member?.lastName || "",
      };

      await addContribution({
        memberId: selectedMember._id,
        amount: parsedAmount,
        week: parsedWeek,
        month: monthYear.split(" ")[0],
        year: parseInt(monthYear.split(" ")[1], 10),
        type,
        status,
        paymentMethod,
        description,
        createdBy,
      });

      setAmount("");
      setWeek("");
      setMonthYear("");
      setType("");
      setStatus("Pending");
      setPaymentMethod("");
      setDescription("");
      setOpened(false);
    } catch (error) {
      console.error("Error adding contribution:", error);
    }
  };

  const handleMemberSelect = (user: IChurchMember) => {
    setSelectedMember(user);
    setShowDirectory(false);
  };

  const handleMonthYearChange = (date: Date | null) => {
    if (date) {
      setMonthYear(`${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`);
    } else {
      setMonthYear("");
    }
  };

  return {
    selectedMember,
    setSelectedMember,
    amount,
    setAmount,
    week,
    setWeek,
    monthYear,
    setMonthYear,
    type,
    setType,
    status,
    setStatus,
    paymentMethod,
    setPaymentMethod,
    description,
    setDescription,
    opened,
    setOpened,
    showDirectory,
    setShowDirectory,
    handleAddContribution,
    handleMemberSelect,
    handleMonthYearChange,
    isLoading,
    contributions,
    member,
  };
};
