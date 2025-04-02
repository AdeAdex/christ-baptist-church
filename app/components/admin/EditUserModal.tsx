"use client";

import { Modal, TextInput, Select, Button, Loader } from "@mantine/core";
import { IChurchMember } from "@/app/types/user";
import { ministries as dataMinistries } from "@/app/data/data";

interface EditUserModalProps {
  opened: boolean;
  onClose: () => void;
  formData: Partial<IChurchMember>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<IChurchMember>>>;
  handleUpdateUser: () => void;
  isUpdating: boolean;
}

export default function EditUserModal({
  opened,
  onClose,
  formData,
  setFormData,
  handleUpdateUser,
  isUpdating,
}: EditUserModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Edit User"
      centered
      size="lg"
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
        />

        <Select
          label="Ministry"
          data={dataMinistries.map((m) => ({
            label: m,
            value: m,
          }))}
          value={formData.ministry ?? ""}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, ministry: value || undefined }))
          }
          placeholder="Select a ministry"
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
