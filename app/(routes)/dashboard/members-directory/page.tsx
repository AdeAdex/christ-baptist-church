// /app/(routes)/dashboard/members-directory/page.tsx

'use client';

import { useUserDirectory } from "@/app/hooks/admin/useUserDirectory";
import { FiEdit } from "react-icons/fi";
import MembersDirectoryWithSearch from "@/app/components/admin/MembersDirectoryWithSearch";
import EditMembersModal from "@/app/components/admin/EditMembersModal";

export default function MembersDirectoryPage() {
  const {
    searchTerm,
    setSearchTerm,
    selectedMinistry,
    setSelectedMinistry,
    ministryOptions,
    filteredUsers,
    editModal,
    closeEditModal,
    formData,
    setFormData,
    handleEditUser,
    handleUpdateUser,
    isUpdating,
  } = useUserDirectory();

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-4">Members Directory</h2>

      <MembersDirectoryWithSearch
        users={filteredUsers}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedMinistry={selectedMinistry}
        setSelectedMinistry={setSelectedMinistry}
        ministryOptions={ministryOptions}
        onButtonClick={handleEditUser}
        buttonLabel="Edit"
        buttonIcon={<FiEdit />}
      />

      <EditMembersModal
        opened={editModal}
        onClose={closeEditModal}
        formData={formData}
        setFormData={setFormData}
        handleUpdateUser={handleUpdateUser}
        isUpdating={isUpdating}
      />
    </div>
  );
}
