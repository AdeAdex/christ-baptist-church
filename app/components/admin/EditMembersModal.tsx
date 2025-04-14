"use client";

import { Modal, TextInput, Select, Button, Loader } from "@mantine/core";
import { IChurchMember } from "@/app/types/user";
import { useAppSelector } from "@/app/redux/hooks";

interface EditMembersModalProps {
  opened: boolean;
  onClose: () => void;
  formData: Partial<IChurchMember>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<IChurchMember>>>;
  handleUpdateUser: () => void;
  isUpdating: boolean;
}

export default function EditMembersModal({
  opened,
  onClose,
  formData,
  setFormData,
  handleUpdateUser,
  isUpdating,
}: EditMembersModalProps) {
  const ministries = useAppSelector((state) => state.ministries.ministries);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Edit User"
      centered
      size="lg"
      classNames={{
        header: 'dark:!bg-gray-900',      
        content: 'dark:!bg-gray-900',    
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <TextInput
          label="Baptism Date"
          type="date"
          name="baptismDate"
          value={
            formData.baptismDate
              ? formData.baptismDate.toISOString().split("T")[0]
              : ""
          }
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              baptismDate: new Date(e.target.value),
            }))
          }
          classNames={{
            input: "dark:bg-gray-700 bg-slate-100 focus:border-0 focus:ring-0",
          }}
        />

        <TextInput
          label="Confirmation Date"
          type="date"
          name="confirmationDate"
          value={
            formData.confirmationDate
              ? formData.confirmationDate.toISOString().split("T")[0]
              : ""
          }
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              confirmationDate: new Date(e.target.value),
            }))
          }
          classNames={{
            input: "dark:bg-gray-700 bg-slate-100 focus:border-0 focus:ring-0",
          }}
        />

        <Select
          label="Ministry"
          data={ministries.map((m) => ({
            label: m.name,
            value: m._id,
          }))}
          value={
            typeof formData.ministry === "string"
              ? formData.ministry
              : (formData.ministry?._id ?? "")
          } // Ensure we pass a string or empty string
          onChange={
            (value) =>
              setFormData((prev) => ({ ...prev, ministry: value || undefined })) // Set ministry as string or undefined
          }
          placeholder="Select a ministry"
          classNames={{
            input: "dark:bg-gray-700 bg-slate-100 focus:border-0 focus:ring-0",
            dropdown: "dark:bg-gray-700 bg-slate-100",
            option: "hover:!bg-gray-200 dark:hover:!bg-gray-800",
          }}
        />

        <TextInput
          label="Membership Start Date"
          type="date"
          name="membershipStartDate"
          value={
            formData.membershipStartDate
              ? formData.membershipStartDate.toISOString().split("T")[0]
              : ""
          }
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              membershipStartDate: new Date(e.target.value),
            }))
          }
          classNames={{
            input: "dark:bg-gray-700 bg-slate-100 focus:border-0 focus:ring-0",
          }}
        />

        <Select
          label="Membership Status"
          data={["active", "inactive", "suspended"]}
          name="membershipStatus"
          value={formData.membershipStatus ?? ""}
          onChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              membershipStatus:
                (value as "active" | "inactive" | "suspended") || "active",
            }))
          }
          classNames={{
            input: "dark:bg-gray-700 bg-slate-100 focus:border-0 focus:ring-0",
            dropdown: "dark:bg-gray-700 bg-slate-100",
            option: "hover:!bg-gray-200 dark:hover:!bg-gray-800",
          }}
        />

        <Select
          label="Permission Status"
          data={["pending", "approved", "revoked", "banned"]}
          name="permissionStatus"
          value={formData.permissionStatus ?? ""}
          onChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              permissionStatus:
                (value as "pending" | "approved" | "revoked" | "banned") ||
                "pending",
            }))
          }
          classNames={{
            input: "dark:bg-gray-700 bg-slate-100 focus:border-0 focus:ring-0",
            dropdown: "dark:bg-gray-700 bg-slate-100",
            option: "hover:!bg-gray-200 dark:hover:!bg-gray-800",
          }}
        />

        <Select
          label="Permission Level"
          data={["full", "limited", "view-only", "none"]}
          name="permissionLevel"
          value={formData.permissionLevel ?? ""}
          onChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              permissionLevel:
                (value as "full" | "limited" | "view-only" | "none") || "none",
            }))
          }
          classNames={{
            input: "dark:bg-gray-700 bg-slate-100 focus:border-0 focus:ring-0",
            dropdown: "dark:bg-gray-700 bg-slate-100",
            option: "hover:!bg-gray-200 dark:hover:!bg-gray-800",
          }}
        />

        <Select
          label="Role"
          data={["admin", "member"]}
          name="role"
          value={formData.role ?? undefined}
          onChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              role: value as "admin" | "member",
            }))
          }
          classNames={{
            input: "dark:bg-gray-700 bg-slate-100 focus:border-0 focus:ring-0",
            dropdown: "dark:bg-gray-700 bg-slate-100",
            option: "hover:!bg-gray-200 dark:hover:!bg-gray-800",
          }}
        />

        <Select
          label="Has Permission"
          data={[
            { label: "Yes", value: "true" },
            { label: "No", value: "false" },
          ]}
          name="hasPermission"
          value={formData.hasPermission?.toString() ?? "false"}
          onChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              hasPermission: value === "true",
            }))
          }
          classNames={{
            input: "dark:bg-gray-700 bg-slate-100 focus:border-0 focus:ring-0",
            dropdown: "dark:bg-gray-700 bg-slate-100",
            option: "hover:!bg-gray-200 dark:hover:!bg-gray-800",
          }}
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
  );
}
