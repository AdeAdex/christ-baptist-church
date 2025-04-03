//  /app/(auth)/[role]/[dashboard]/settings/page.tsx


"use client";

import { useState, useEffect } from "react";
import { Stepper, Button, Group } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { IChurchMember } from "@/app/types/user";
import { handleChange, handleSubmit } from "@/app/actions/members/updateAction";
import ProfilePicture from "@/app/components/settings/ProfilePicture";
import PersonalInformation from "@/app/components/settings/PersonalInformation";
import AddressForm from "@/app/components/settings/AddressForm";
import SocialMediaForm from "@/app/components/settings/SocialMediaForm";
import EmergencyContactForm from "@/app/components/settings/EmergencyContactForm";
import MembershipDetails from "@/app/components/settings/MembershipDetails";
import { useMember } from "@/app/context/MemberContext";

const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const { member } = useMember();
  const ministries = useAppSelector((state) => state.ministries.ministries);

  const [activeStep, setActiveStep] = useState(0);
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
        ...formData,
        ...member,
        dateOfBirth: member.dateOfBirth ? new Date(member.dateOfBirth) : undefined,
        baptismDate: member.baptismDate ? new Date(member.baptismDate) : undefined,
        confirmationDate: member.confirmationDate ? new Date(member.confirmationDate) : undefined,
        membershipStartDate: member.membershipStartDate ? new Date(member.membershipStartDate) : undefined,
      });
    }
  }, [member]);

  return (
    <div className="p-6 shadow-lg rounded-lg h-full">
      <h2 className="text-2xl font-semibold  dark:text-white mb-4">Edit Profile</h2>

      <Stepper active={activeStep} onStepClick={setActiveStep}>
        <Stepper.Step label="Profile Picture">
          <ProfilePicture previewUrl={previewUrl} formData={formData} setPreviewUrl={setPreviewUrl} setFormData={setFormData} />
        </Stepper.Step>

        <Stepper.Step label="Personal Information">
          <PersonalInformation formData={formData} handleChange={(e) => handleChange(e, setFormData)} />
        </Stepper.Step>

        <Stepper.Step label="Address">
          <AddressForm formData={formData} handleChange={(e) => handleChange(e, setFormData)} />
        </Stepper.Step>

        <Stepper.Step label="Membership Details">
          <MembershipDetails formData={formData} handleChange={(e) => handleChange(e, setFormData)} ministries={ministries.map((m) => m.name)} />
        </Stepper.Step>

        <Stepper.Step label="Social Media">
          <SocialMediaForm formData={formData} handleChange={(e) => handleChange(e, setFormData)} />
        </Stepper.Step>

        <Stepper.Step label="Emergency Contact">
          <EmergencyContactForm formData={formData} handleChange={(e) => handleChange(e, setFormData)} />
        </Stepper.Step>

        <Stepper.Completed>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-green-600">All steps completed!</h3>
            <p className="text-gray-500">Review your details and submit.</p>
          </div>
        </Stepper.Completed>
      </Stepper>

      <Group justify="flex-end" className="mt-6">
        {activeStep !== 0 && (
          <Button variant="default" onClick={() => setActiveStep((prev) => prev - 1)}>
            Back
          </Button>
        )}
        {activeStep < 5 ? (
          <Button onClick={() => setActiveStep((prev) => prev + 1)}>Next</Button>
        ) : (
          <></>
           <Button
             type="submit"
            disabled={isLoading}
             className={`px-4 py-2 rounded-lg transition ${isLoading ? "bg-gray-400 text-gray-700 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
             onClick={(e) => handleSubmit(e, formData, setIsLoading, dispatch, setPreviewUrl)}
           >
          {isLoading ? "Saving..." : "Save Changes"}
           </Button>
        )}
      </Group>
    </div>
  );
};

export default SettingsPage;
