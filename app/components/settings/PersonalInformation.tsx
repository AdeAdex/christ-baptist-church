//  /app/components/settings/PersonalInformation.tsx

import React from "react";
import { IChurchMember } from "@/app/types/user";
import { occupations } from "@/app/data/data";

interface PersonalInformationProps {
  formData: IChurchMember;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  editMode: boolean;
}

const PersonalInformation: React.FC<PersonalInformationProps> = ({
  formData,
  handleChange,
  editMode,
}) => {
  
  return (
    <div className="space-y-4 mt-5">
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
            readOnly={!editMode}
            className={`p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full ${!editMode ? "cursor-not-allowed" : ""}`}
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
            readOnly={!editMode}
                        className={`p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full ${!editMode ? "cursor-not-allowed" : ""}`}

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
            readOnly={!editMode}
                        className={`p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full ${!editMode ? "cursor-not-allowed" : ""}`}

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
            readOnly={!editMode}
                        className={`p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full ${!editMode ? "cursor-not-allowed" : ""}`}

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
            readOnly={!editMode}
                        className={`p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full ${!editMode ? "cursor-not-allowed" : ""}`}

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
            readOnly={!editMode}
                        className={`p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full ${!editMode ? "cursor-not-allowed" : ""}`}

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
            disabled={!editMode}
                        className={`p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full ${!editMode ? "cursor-not-allowed" : ""}`}

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
                ? new Date(formData.dateOfBirth).toISOString().split("T")[0] // Ensure the date is in "YYYY-MM-DD" format
                : ""
            }
            onChange={handleChange}
            readOnly={!editMode}
                        className={`p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full ${!editMode ? "cursor-not-allowed" : ""}`}

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
            readOnly={!editMode}
                        className={`p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full ${!editMode ? "cursor-not-allowed" : ""}`}

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
            disabled={!editMode}
                        className={`p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full ${!editMode ? "cursor-not-allowed" : ""}`}

          >
            <option value="">Select Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
        </label>

        {/* Occupation */}
        <label>
          Occupation
          <select
            name="occupation"
            value={formData.occupation || ""}
            onChange={handleChange}
            disabled={!editMode}
                        className={`p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full ${!editMode ? "cursor-not-allowed" : ""}`}

          >
            <option value="">Select Occupation</option>
            {occupations.map((occupation) => (
              <option key={occupation} value={occupation}>
                {occupation}
              </option>
            ))}
          </select>
        </label>
         {/* Company */}
         <label>
          Company
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            readOnly={!editMode}
                        className={`p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full ${!editMode ? "cursor-not-allowed" : ""}`}

          />
        </label>
      </div>
    
    </div>
  );
};

export default PersonalInformation;
