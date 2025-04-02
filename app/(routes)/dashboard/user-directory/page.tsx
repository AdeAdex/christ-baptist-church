"use client";

import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/app/redux/hooks";
import {
  searchMembers,
  updateAlMemberAdmin,
} from "@/app/actions/admin/membersActions";
import { fetchMinistries } from "@/app/actions/admin/ministriesActions";
import { useSnackbar } from "notistack";
import { IChurchMember } from "@/app/types/user";
import { FiSearch, FiEdit } from "react-icons/fi";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Select, TextInput, Button, Loader } from "@mantine/core";
import { ministries as dataMinistries } from "@/app/data/data";

// ✅ Define a proper type for formData
type FormDataType = {
  baptismDate: string | Date;
  confirmationDate: string | Date;
  ministry: string;
  membershipStartDate: string | Date;
  membershipStatus: string;
  permissionStatus: string;
  permissionLevel: string;
  hasPermission: boolean;
  role: string;
};



export default function UserDirectoryPage() {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // Get logged-in admin and ministries
  const member = useAppSelector((state) => state.auth.member);
  const users = useAppSelector((state) => state.alMembers.members);
  const ministries = useAppSelector((state) => state.ministries.ministries);

  // State for search and edit
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMinistry, setSelectedMinistry] = useState("");
  const [selectedUser, setSelectedUser] = useState<IChurchMember | null>(null);
  const [formData, setFormData] = useState<FormDataType>({
  baptismDate: "",
  confirmationDate: "",
  ministry: "",
  membershipStartDate: "",
  membershipStatus: "active",
  permissionStatus: "pending",
  permissionLevel: "none",
  hasPermission: false,
  role: "",
});

  const [editModal, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false);
    const [isUpdating, setIsUpdating] = useState(false);

  // Fetch ministries once
  useEffect(() => {
    if (member?.role === "admin") {
      dispatch(fetchMinistries());
    }
  }, [dispatch, member]);

  // Fetch users only when search term changes
  useEffect(() => {
    if (searchTerm.trim()) {
      dispatch(searchMembers(searchTerm));
    }
  }, [dispatch, searchTerm]);

  // Handle user selection for editing
  const handleEditUser = (user: IChurchMember) => {
    setSelectedUser(user);
    setFormData({
      baptismDate: user.baptismDate ? new Date(user.baptismDate).toISOString().split("T")[0] : "",
      confirmationDate: user.confirmationDate ? new Date(user.confirmationDate).toISOString().split("T")[0] : "",
      ministry:
    user.ministry && user.ministry.trim() !== ""
      ? user.ministry
      : ministries.length > 0
      ? ministries[0] // Default to first Redux ministry
      : dataMinistries.length > 0
      ? dataMinistries[0] // Otherwise, use first static ministry
      : "",
      membershipStartDate: user.membershipStartDate ? new Date(user.membershipStartDate).toISOString().split("T")[0] : "",
      membershipStatus: user.membershipStatus || "active",
      permissionStatus: user.permissionStatus || "pending",
      permissionLevel: user.permissionLevel || "none",
      hasPermission: user.hasPermission ?? false, // Ensure hasPermission is never undefined
      role: user.role || "",
    });
    openEditModal();
  };
  

  // Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle update submission
  const handleUpdateUser = async () => {
    if (!selectedUser || !selectedUser._id || !member?._id) return;

    const updatedData: IChurchMember = {
    ...selectedUser,
    ...formData,
    baptismDate: formData.baptismDate ? new Date(formData.baptismDate) : undefined,
    confirmationDate: formData.confirmationDate ? new Date(formData.confirmationDate) : undefined,
    membershipStartDate: formData.membershipStartDate ? new Date(formData.membershipStartDate) : undefined,
  };
    
  setIsUpdating(true);
  try {
    await dispatch(updateAlMemberAdmin(member._id, selectedUser._id, updatedData));
    enqueueSnackbar("User updated successfully!", { variant: "success" });
    closeEditModal();
    } catch (error: unknown) {
      if (error instanceof Error) {
        enqueueSnackbar(error.message, { variant: "error" });
      } else {
        enqueueSnackbar("Update failed due to an unknown error", { variant: "error" });
      }
    } finally {
      setIsUpdating(false); // Re-enable button
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">User Directory</h2>

      {/* Search and Filter */}
      <div className="flex space-x-4 mb-4">
        <TextInput
          leftSection={<FiSearch className="text-gray-400" />}
          placeholder="Search by Name, Email, Phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/2"
        />

        <Select
          data={
            ministries.length > 0 ? ministries : ["No ministries available"]
          }
          placeholder="Filter by Ministry"
          value={selectedMinistry}
          onChange={(value) => setSelectedMinistry(value || "")}
          className="w-1/3"
        />
      </div>

      {/* User List */}
      {searchTerm.trim() && users.length > 0 ? (
        <ul className="divide-y divide-gray-300">
          {users.map((user) => (
            <li
              key={user._id}
              className="py-3 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </div>
              <Button
                variant="outline"
                leftSection={<FiEdit />}
                onClick={() => handleEditUser(user)}
              >
                Edit
              </Button>
            </li>
          ))}
        </ul>
      ) : searchTerm.trim() ? (
        <p className="text-center text-gray-500">No users found.</p>
      ) : (
        <p className="text-center text-gray-500">
          Start typing to search for members.
        </p>
      )}

      {/* Edit User Dialog */}
      

<Modal
  opened={editModal}
  onClose={closeEditModal} // Clicking backdrop will close it
  title="Edit User"
  centered // Center the modal
  size="lg"
  classNames={{
    body: "p-6", // Add padding inside the modal
  }}
  overlayProps={{
    backgroundOpacity: 0.5, // Dark backdrop
    blur: 3, // Slight blur effect
  }}
  className="w-full sm:w-[90%] lg:w-1/2"
>
  {/* Responsive Grid: 1 column on mobile, 3 columns on large screens */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <TextInput
      label="Baptism Date"
      type="date"
      name="baptismDate"
      value={formData.baptismDate || ""}
      onChange={handleInputChange}
    />

    <TextInput
      label="Confirmation Date"
      type="date"
      name="confirmationDate"
      value={formData.confirmationDate || ""}
      onChange={handleInputChange}
    />

{/* <Select
  label="Ministry"
  data={(ministries.length > 0 ? ministries : dataMinistries)} 
  value={formData.ministry}
  onChange={(value) => setFormData((prev) => ({ ...prev, ministry: value }))}
  placeholder="Select a ministry"
/> */}


<Select
  label="Ministry"
  data={(ministries.length > 0 ? ministries : dataMinistries).map((m) => ({
    label: m,
    value: m,
  }))} 
  value={formData.ministry}
  onChange={(value) => setFormData((prev) => ({ ...prev, ministry: value }))} 
  placeholder="Select a ministry"
/>





    <TextInput
      label="Membership Start Date"
      type="date"
      name="membershipStartDate"
      value={formData.membershipStartDate || ""}
      onChange={handleInputChange}
    />

    <Select
      label="Membership Status"
      data={["active", "inactive", "suspended"]}
      name="membershipStatus"
      value={formData.membershipStatus || ""}
      onChange={(value) => setFormData((prev) => ({ ...prev, membershipStatus: value }))}
    />

    <Select
      label="Permission Status"
      data={["pending", "approved", "revoked", "banned"]}
      name="permissionStatus"
      value={formData.permissionStatus || ""}
      onChange={(value) => setFormData((prev) => ({ ...prev, permissionStatus: value }))}
    />

    <Select
      label="Permission Level"
      data={["full", "limited", "view-only", "none"]}
      name="permissionLevel"
      value={formData.permissionLevel || ""}
      onChange={(value) => setFormData((prev) => ({ ...prev, permissionLevel: value }))}
    />

    <Select
      label="Role"
      data={["admin", "member"]}
      name="role"
      value={formData.role || ""}
      onChange={(value) => setFormData((prev) => ({ ...prev, role: value }))}
    />

    <Select
      label="Has Permission"
      data={[
        { label: "Yes", value: "true" },
        { label: "No", value: "false" },
      ]}
      name="hasPermission"
      value={formData.hasPermission?.toString() ?? "false"}
      onChange={(value) => setFormData((prev) => ({ ...prev, hasPermission: value === "true" }))}
    />
  </div>

  <Button 
  onClick={handleUpdateUser} 
  fullWidth 
  className="mt-4"
  disabled={isUpdating} // Disable while updating
  leftSection={isUpdating ? <Loader size="xs" color="white" /> : null} // Show spinner
>
  {isUpdating ? "Saving..." : "Save Changes"} 
</Button>

</Modal>

    </div>
  );
}
