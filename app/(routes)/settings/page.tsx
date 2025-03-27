//  /app/(routes)/settings/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { IChurchMember } from "@/app/types/user";
import { handleChange, handleSubmit } from "@/app/actions/members/updateAction";
import ProfilePicture from "@/app/components/settings/ProfilePicture";
import PersonalInformation from "@/app/components/settings/PersonalInformation";
import AddressForm from "@/app/components/settings/AddressForm";
import SocialMediaForm from "@/app/components/settings/SocialMediaForm";
import EmergencyContactForm from "@/app/components/settings/EmergencyContactForm";

const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const member = useAppSelector((state) => state.auth.member);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<IChurchMember>({
    _id: "",
    firstName: "",
    middleName: "",
    lastName: "",
    userName: "",
    email: "",
    phoneNumber: "",
    gender: undefined,
    dateOfBirth: undefined,
    nationality: "",
    maritalStatus: undefined,
    baptismDate: undefined,
    confirmationDate: undefined,
    ministry: "",
    occupation: "",
    company: "",
    membershipStartDate: undefined,
    membershipStatus: "active",
    profilePicture: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
    },
    emergencyContact: {
      name: "",
      relationship: "",
      phoneNumber: "",
    },
    socialMedia: {
      facebook: "",
      twitter: "",
      instagram: "",
      tiktok: "",
      linkedin: "",
      youtube: "",
    },
    isActive: true,
  });

  useEffect(() => {
    if (member) {
      setFormData({
        _id: member._id || "",
        firstName: member.firstName || "",
        middleName: member.middleName || "",
        lastName: member.lastName || "",
        userName: member.userName || "",
        email: member.email || "",
        phoneNumber: member.phoneNumber || "",
        gender: member.gender || undefined,
        dateOfBirth: member.dateOfBirth
          ? new Date(member.dateOfBirth)
          : undefined,
        nationality: member.nationality || "",
        maritalStatus: member.maritalStatus || undefined,
        baptismDate: member.baptismDate
          ? new Date(member.baptismDate)
          : undefined,
        confirmationDate: member.confirmationDate
          ? new Date(member.confirmationDate)
          : undefined,
        membershipStartDate: member.membershipStartDate
          ? new Date(member.membershipStartDate)
          : undefined,
        ministry: member.ministry || "",
        occupation: member.occupation || "",
        company: member.company || "",
        membershipStatus: member.membershipStatus || "active",
        profilePicture: member.profilePicture || "",
        address: {
          street: member.address?.street || "",
          city: member.address?.city || "",
          state: member.address?.state || "",
          country: member.address?.country || "",
          zipCode: member.address?.zipCode || "",
        },
        emergencyContact: member.emergencyContact || {
          name: "",
          relationship: "",
          phoneNumber: "",
        },
        socialMedia: member.socialMedia || {
          facebook: "",
          twitter: "",
          instagram: "",
          tiktok: "",
          linkedin: "",
          youtube: "",
        },
        isActive: member.isActive ?? true,
      });
    }
  }, [member]);

  return (
    <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
        Edit Profile
      </h2>

      <form
        onSubmit={(e) => handleSubmit(e, formData, setIsLoading, dispatch, setPreviewUrl)}
        className="flex flex-col gap-y-8"
      >
        <ProfilePicture
          previewUrl={previewUrl}
          formData={formData}
          setPreviewUrl={setPreviewUrl}
          setFormData={setFormData}
        />
        <PersonalInformation
          formData={formData}
          handleChange={(e) => handleChange(e, setFormData)}
        />
        <AddressForm
          formData={formData}
          handleChange={(e) => handleChange(e, setFormData)}
        />
        <SocialMediaForm
          formData={formData}
          handleChange={(e) => handleChange(e, setFormData)}
        />
        <EmergencyContactForm
          formData={formData}
          handleChange={(e) => handleChange(e, setFormData)}
        />

        <button
          type="submit"
          disabled={isLoading}
          className={`px-4 py-2 rounded-lg transition w-full md:w-1/4 ${isLoading ? "bg-gray-400 text-gray-700 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default SettingsPage;
