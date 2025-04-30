// /app/(routes)/dashboard/contributions/page.tsx

"use client";

import { useContributionForm } from "@/app/hooks/admin/useContributionForm"; // Import custom hook for form logic
import ContributionHistory from "@/app/components/contributions/ContributionHistory"; // Import ContributionHistory component
import ContributionModal from "@/app/components/contributions/ContributionModal"; // Import ContributionModal component
import { Button } from "@mantine/core";

const AddContributionPage = () => {
  const {
    selectedMember,
    setSelectedMember,
    amount,
    setAmount,
    week,
    setWeek,
    monthYear,
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
    handleAddContribution,
    showDirectory,
    setShowDirectory,
    contributions,
    isLoading,
    member,
    handleMemberSelect, // Added missing function
    handleMonthYearChange,
  } = useContributionForm();

  return (
    <div className="w-full mx-auto py-4">
      {/* Button to open the modal */}
      {member?.role === "admin" &&
        member?.hasPermission &&
        (member?.permissionLevel === "full" ||
          member?.permissionLevel === "limited") && (
          <Button onClick={() => setOpened(true)} color="teal" fullWidth>
            Add Contribution
          </Button>
        )}

      {/* Contribution History for the member */}
      <ContributionHistory
        contributions={contributions}
        member={member}
        isLoading={isLoading}
      />

      {/* Modal for adding contributions */}
      <ContributionModal
        opened={opened}
        setOpened={setOpened}
        selectedMember={selectedMember}
        setSelectedMember={setSelectedMember}
        amount={amount}
        setAmount={setAmount}
        week={week}
        setWeek={setWeek}
        monthYear={monthYear}
        type={type}
        setType={setType}
        status={status}
        setStatus={setStatus}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        description={description}
        setDescription={setDescription}
        handleAddContribution={handleAddContribution}
        showDirectory={showDirectory}
        setShowDirectory={setShowDirectory}
        isLoading={isLoading} // Added missing prop
        handleMemberSelect={handleMemberSelect} // Added missing prop
        handleMonthYearChange={handleMonthYearChange}
      />
    </div>
  );
};

export default AddContributionPage;
