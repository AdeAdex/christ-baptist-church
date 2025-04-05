// /app/components/contributions/ContributionModal.tsx
import React from "react";
import { Modal, TextInput, Select, Group, Button, Loader } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { FiSearch } from "react-icons/fi";
import MembersDirectoryWithSearch from "../admin/MembersDirectoryWithSearch";
import {
  typeOptions,
  statusOptions,
  paymentMethodOptions,
} from "@/app/data/data";
import { useUserDirectory } from "@/app/hooks/admin/useUserDirectory";
import { IChurchMember } from "@/app/types/user";
import { useScreenSize } from "@/app/hooks/useScreenSize";
import MemberSelection from "./MemberSelection";

// Define types for the props
interface ContributionModalProps {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  selectedMember: IChurchMember | null;
  setSelectedMember: React.Dispatch<React.SetStateAction<IChurchMember | null>>;
  showDirectory: boolean;
  setShowDirectory: React.Dispatch<React.SetStateAction<boolean>>;
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  week: string;
  setWeek: React.Dispatch<React.SetStateAction<string>>;
  monthYear: string | null;
//   setMonthYear: React.Dispatch<React.SetStateAction<string | null>>;
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  paymentMethod: string;
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  handleAddContribution: () => void;
  isLoading: boolean;
  handleMemberSelect: (user: IChurchMember) => void;
  handleMonthYearChange: (value: Date | null) => void;
}

const ContributionModal: React.FC<ContributionModalProps> = ({
  opened,
  setOpened,
  selectedMember,
  setSelectedMember,
  showDirectory,
  setShowDirectory,
  amount,
  setAmount,
  week,
  setWeek,
  monthYear,
//   setMonthYear,
  type,
  setType,
  status,
  setStatus,
  paymentMethod,
  setPaymentMethod,
  description,
  setDescription,
  handleAddContribution,
  isLoading,
  handleMemberSelect,
  handleMonthYearChange,
}) => {
  const {
    searchTerm,
    setSearchTerm,
    selectedMinistry,
    setSelectedMinistry,
    ministryOptions,
    filteredUsers,
    member,
  } = useUserDirectory();

  const screenSize = useScreenSize();

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Add Contribution"
      centered
      className="relative overflow-hidden"
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      transitionProps={{ transition: "rotate-left" }}
      size={
        screenSize === "mobile"
          ? "95%"
          : screenSize === "tablet"
            ? "95%"
            : "55rem"
      }
    >
      {showDirectory && (
        <MembersDirectoryWithSearch
          users={filteredUsers}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedMinistry={selectedMinistry}
          setSelectedMinistry={setSelectedMinistry}
          ministryOptions={ministryOptions}
          onButtonClick={handleMemberSelect}
          buttonLabel="Select Member"
          buttonIcon={<FiSearch />}
          selectedMember={selectedMember}
        />
      )}

      {selectedMember && (
        <div className="mb-4">
          <MemberSelection
            selectedMember={selectedMember}
            setSelectedMember={setSelectedMember}
            setShowDirectory={setShowDirectory}
          />
        </div>
      )}

      <div>
        <TextInput
          label="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <TextInput
          label="Week"
          value={week}
          onChange={(e) => setWeek(e.target.value)}
        />
        <DateInput
          label="Month/Year"
          value={monthYear ? new Date(`${monthYear} 1, 2025`) : null}
          onChange={handleMonthYearChange}
          valueFormat="MMMM YYYY"
        />
        <Select
          label="Type"
          value={type}
          onChange={(value) => setType(value || "")}
          placeholder="Select Contribution Type"
          data={typeOptions}
        />
        <Select
          label="Status"
          value={status}
          onChange={(value) => setStatus(value || "")}
          placeholder="Select Status"
          data={statusOptions}
        />
        <Select
          label="Payment Method"
          value={paymentMethod}
          onChange={(value) => setPaymentMethod(value || "")}
          placeholder="Select Payment Method"
          data={paymentMethodOptions}
        />
        <TextInput
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <Group align="right" className="mt-4">
        <Button onClick={handleAddContribution} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader />
              <span>Submitting...</span>
            </>
          ) : (
            "Submit Contribution"
          )}
        </Button>
      </Group>
    </Modal>
  );
};

export default ContributionModal;
