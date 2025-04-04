// "use client";

// import { useUserDirectory } from "@/app/hooks/admin/useUserDirectory";
// import { TextInput, Select } from "@mantine/core";
// import { FiSearch } from "react-icons/fi";
// import MembersList from "@/app/components/admin/MembersList";
// import EditMembersModal from "@/app/components/admin/EditMembersModal";

// export default function MembersDirectoryPage() {
//   const { searchTerm, setSearchTerm, selectedMinistry, setSelectedMinistry, ministryOptions, filteredUsers, editModal, closeEditModal, formData, setFormData, handleEditUser, handleUpdateUser, isUpdating } = useUserDirectory();

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Members Directory</h2>

//       <div className="flex space-x-4 mb-4">
//         <TextInput leftSection={<FiSearch />} placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-1/2" />
//         <Select data={ministryOptions} placeholder="Filter" value={selectedMinistry} onChange={(value) => setSelectedMinistry(value || "All")} className="w-1/2 md:w-1/3" />
//       </div>

//       <MembersList users={filteredUsers} onEditUser={handleEditUser} />
//       <EditMembersModal opened={editModal} onClose={closeEditModal} formData={formData} setFormData={setFormData} handleUpdateUser={handleUpdateUser} isUpdating={isUpdating} />
//     </div>
//   );
// }







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
    <div className="p-6">
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
