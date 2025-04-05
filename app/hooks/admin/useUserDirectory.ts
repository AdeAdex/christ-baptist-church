"use client";

import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/app/redux/hooks";
import { searchMembers, updateAlMemberAdmin } from "@/app/actions/admin/membersActions";
import { fetchMinistries } from "@/app/actions/admin/ministriesActions";
import { useDisclosure } from "@mantine/hooks";
import { useSnackbar } from "notistack";
import { IChurchMember } from "@/app/types/user";

export function useUserDirectory() {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // Get logged-in admin and ministries
  const member = useAppSelector((state) => state.auth.member);
  const users = useAppSelector((state) => state.alMembers.members);
  const ministries = useAppSelector((state) => state.ministries.ministries);


  // console.log("Users", users)


  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMinistry, setSelectedMinistry] = useState("All");
  const [selectedUser, setSelectedUser] = useState<IChurchMember | null>(null);
  const [formData, setFormData] = useState<Partial<IChurchMember>>({});
  const [editModal, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (member?.role === "admin") {
      dispatch(fetchMinistries());
    }
  }, [dispatch, member]);

  useEffect(() => {
    if (searchTerm.trim()) {
      dispatch(searchMembers(searchTerm));
    }
  }, [dispatch, searchTerm]);



  const ministryOptions = [
    { value: "All", label: "All" }, // Explicitly define "All" as an object
    ...ministries.map((ministry) => ({
      value: ministry._id,
      label: ministry.name,
    })),
  ];
  

  const filteredUsers =
    selectedMinistry === "All"
      ? users
      : users.filter((user) => user.ministry === selectedMinistry);

  const handleEditUser = (user: IChurchMember) => {
    setSelectedUser(user);
    setFormData({
      baptismDate: user.baptismDate ? new Date(user.baptismDate) : undefined,
      confirmationDate: user.confirmationDate ? new Date(user.confirmationDate) : undefined,
      ministry: user.ministry ?? "",
      membershipStartDate: user.membershipStartDate ? new Date(user.membershipStartDate) : undefined,
      membershipStatus: user.membershipStatus ?? "active",
      permissionStatus: user.permissionStatus ?? "pending",
      permissionLevel: user.permissionLevel ?? "none",
      hasPermission: user.hasPermission ?? false,
      role: user.role ?? "member",
    });
    openEditModal();
  };

  const handleUpdateUser = async () => {
    if (!selectedUser || !selectedUser._id || !member?._id) return;

    setIsUpdating(true);
    try {
      await dispatch(updateAlMemberAdmin(member._id, selectedUser._id, formData));
      enqueueSnackbar("User updated successfully!", { variant: "success" });
      closeEditModal();
    } catch (error: unknown) {
      enqueueSnackbar(error instanceof Error ? error.message : "Update failed", { variant: "error" });
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    selectedMinistry,
    setSelectedMinistry,
    ministryOptions,
    filteredUsers,
    editModal,
    openEditModal,
    closeEditModal,
    selectedUser,
    formData,
    setFormData,
    handleEditUser,
    handleUpdateUser,
    isUpdating,
    member,
  };
}
