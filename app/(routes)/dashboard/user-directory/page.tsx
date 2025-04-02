"use client";

import { useUserDirectory } from "@/app/hooks/admin/useUserDirectory";
import UserList from "@/app/components/admin/UserList";
import EditUserModal from "@/app/components/admin/EditUserModal";
import { TextInput, Select } from "@mantine/core";
import { FiSearch } from "react-icons/fi";

export default function UserDirectoryPage() {
  const { searchTerm, setSearchTerm, selectedMinistry, setSelectedMinistry, ministryOptions, filteredUsers, editModal, closeEditModal, formData, setFormData, handleEditUser, handleUpdateUser, isUpdating } = useUserDirectory();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">User Directory</h2>

      <div className="flex space-x-4 mb-4">
        <TextInput leftSection={<FiSearch />} placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-1/2" />
        <Select data={ministryOptions} placeholder="Filter" value={selectedMinistry} onChange={(value) => setSelectedMinistry(value || "All")} className="w-1/3" />
      </div>

      <UserList users={filteredUsers} onEditUser={handleEditUser} />
      <EditUserModal opened={editModal} onClose={closeEditModal} formData={formData} setFormData={setFormData} handleUpdateUser={handleUpdateUser} isUpdating={isUpdating} />
    </div>
  );
}
