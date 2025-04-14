// /app/components/admin/MembersDirectoryWithSearch.tsx


'use client';

import { TextInput, Select } from "@mantine/core";
import { FiSearch } from "react-icons/fi";
import MembersList from "@/app/components/admin/MembersList";
import { IChurchMember } from "@/app/types/user";

interface MembersDirectoryWithSearchProps {
  users: IChurchMember[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedMinistry: string;
  setSelectedMinistry: (ministry: string) => void;
  ministryOptions: { value: string; label: string }[];
  onButtonClick: (user: IChurchMember) => void; // Ensuring this is the correct callback for selecting members
  buttonLabel: string;
  buttonIcon: React.ReactNode;
    selectedMember?: IChurchMember | null; // Add selectedMember prop
  
}

export default function MembersDirectoryWithSearch({
  users,
  searchTerm,
  setSearchTerm,
  selectedMinistry,
  setSelectedMinistry,
  ministryOptions,
  onButtonClick,
  buttonLabel,
  buttonIcon,
  selectedMember
}: MembersDirectoryWithSearchProps) {
  return (
    <div className="p-6">
      <div className="flex space-x-4 mb-4">
        <TextInput
          leftSection={<FiSearch />}
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/2 dark:bg-slate-500"
        />
        <Select
          data={ministryOptions}
          placeholder="Filter"
          value={selectedMinistry}
          onChange={(value) => setSelectedMinistry(value || "All")}
          className="w-1/2 md:w-1/3"
          classNames={{
            input: 'dark:bg-gray-500', 
          }}
        />
      </div>

      <MembersList
        users={users}
        onEditUser={onButtonClick} // Passing the `onButtonClick` here as the action for the button click
        buttonLabel={buttonLabel}
        buttonIcon={buttonIcon}
        selectedMember={selectedMember} // Adding selectedMember prop to the component
      />
    </div>
  );
}
