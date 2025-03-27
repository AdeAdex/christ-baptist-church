import React from "react";
import { IChurchMember } from "@/app/types/user";
import { occupations, ministries } from "@/app/data/data";

interface PersonalInformationProps {
  formData: IChurchMember;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const PersonalInformation: React.FC<PersonalInformationProps> = ({
  formData,
  handleChange,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-[14px] font-bold uppercase mb-2">
        Personal Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* First Name */}
        <label>
          First Name
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full"
          />
        </label>

        {/* Middle Name */}
        <label>
          Middle Name
          <input
            type="text"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            className="p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full"
          />
        </label>

        {/* Last Name */}
        <label>
          Last Name
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Username */}
        <label>
          Username
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className="p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full"
          />
        </label>

        {/* Email */}
        <label>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full"
          />
        </label>

        {/* Phone Number */}
        <label>
          Phone Number
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Gender */}
        <label>
          Gender
          <select
            name="gender"
            value={formData.gender || ""}
            onChange={handleChange}
            className="p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>

        {/* Date of Birth */}
        <label>
          Date of Birth
          <input
            type="date"
            name="dateOfBirth"
            value={
              formData.dateOfBirth
                ? formData.dateOfBirth.toISOString().split("T")[0]
                : ""
            }
            onChange={handleChange}
            className="p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full"
          />
        </label>

        {/* Nationality */}
        <label>
          Nationality
          <input
            type="text"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            className="p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Marital Status */}
        <label>
          Marital Status
          <select
            name="maritalStatus"
            value={formData.maritalStatus || ""}
            onChange={handleChange}
            className="p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full"
          >
            <option value="">Select Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
        </label>

        {/* Baptism Date */}
        <label>
          Baptism Date
          <input
            type="date"
            name="baptismDate"
            value={
              formData.baptismDate
                ? formData.baptismDate.toISOString().split("T")[0]
                : ""
            }
            onChange={handleChange}
            className="p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full"
          />
        </label>

        {/* Confirmation Date */}
        <label>
          Confirmation Date
          <input
            type="date"
            name="confirmationDate"
            value={
              formData.confirmationDate
                ? formData.confirmationDate.toISOString().split("T")[0]
                : ""
            }
            onChange={handleChange}
            className="p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Membership Start Date */}
        <label>
          Membership Start Date
          <input
            type="date"
            name="membershipStartDate"
            value={
              formData.membershipStartDate
                ? formData.membershipStartDate.toISOString().split("T")[0]
                : ""
            }
            onChange={handleChange}
            className="p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full"
          />
        </label>

       {/* Ministry */}
       <label>
          Ministry
          <select
            name="ministry"
            value={formData.ministry || ""}
            onChange={handleChange}
            className="p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full"
          >
            <option value="">Select Ministry</option>
            {ministries.map((ministry) => (
              <option key={ministry} value={ministry}>
                {ministry}
              </option>
            ))}
          </select>
        </label>

        {/* Occupation */}
        <label>
          Occupation
          <select
            name="occupation"
            value={formData.occupation || ""}
            onChange={handleChange}
            className="p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full"
          >
            <option value="">Select Occupation</option>
            {occupations.map((occupation) => (
              <option key={occupation} value={occupation}>
                {occupation}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Company */}
        <label>
          Company
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full"
          />
        </label>

        {/* Membership Status */}
        <label>
          Membership Status
          <select
            name="membershipStatus"
            value={formData.membershipStatus}
            onChange={handleChange}
            className="p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default PersonalInformation;
