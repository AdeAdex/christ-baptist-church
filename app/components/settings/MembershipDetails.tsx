import React from "react";
import { IChurchMember } from "@/app/types/user";

interface MembershipDetailsProps {
  formData: IChurchMember;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  ministries: string[];
}

const MembershipDetails: React.FC<MembershipDetailsProps> = ({ formData, handleChange, ministries }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-[14px] font-bold uppercase mb-2">Membership Details</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Baptism Date */}
        <label>
          Baptism Date
          <input
            type="date"
            name="baptismDate"
            value={formData.baptismDate ? formData.baptismDate.toISOString().split("T")[0] : ""}
            onChange={handleChange}
            disabled
            className="p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full cursor-not-allowed"
          />
        </label>

        {/* Confirmation Date */}
        <label>
          Confirmation Date
          <input
            type="date"
            name="confirmationDate"
            value={formData.confirmationDate ? formData.confirmationDate.toISOString().split("T")[0] : ""}
            onChange={handleChange}
            disabled
            className="p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full cursor-not-allowed"
          />
        </label>

        {/* Membership Start Date */}
        <label>
          Membership Start Date
          <input
            type="date"
            name="membershipStartDate"
            value={formData.membershipStartDate ? formData.membershipStartDate.toISOString().split("T")[0] : ""}
            onChange={handleChange}
            disabled
            className="p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full cursor-not-allowed"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Ministry */}
        <label>
          Ministry
          <select
            name="ministry"
            value={typeof formData.ministry === "string" ? formData.ministry : formData.ministry?._id ?? ""}
            onChange={handleChange}
            disabled
            className="p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full cursor-not-allowed"
          >
            <option value="">Select Ministry</option>
            {ministries.map((ministry) => (
              <option key={ministry} value={ministry}>
                {ministry}
              </option>
            ))}
          </select>
        </label>

        {/* Membership Status */}
        <label>
          Membership Status
          <select
            name="membershipStatus"
            value={formData.membershipStatus}
            onChange={handleChange}
            disabled
            className="p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full cursor-not-allowed"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default MembershipDetails;
