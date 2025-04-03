//  /app/(auth)/[role]/[dashboard]/settings/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Stepper, Button, Group, Loader } from "@mantine/core";
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
import "./settings.css";
import { BiSolidEdit } from "react-icons/bi";
import { FaSave } from "react-icons/fa";
import { fetchMinistries } from "@/app/actions/admin/ministriesActions";

// Stepper steps with string keys
const steps = [
  { key: "profilePicture", label: "Profile Picture" },
  { key: "personalInformation", label: "Personal Information" },
  { key: "address", label: "Address" },
  { key: "membershipDetails", label: "Membership Details" },
  { key: "socialMedia", label: "Social Media" },
  { key: "emergencyContact", label: "Emergency Contact" },
];

const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const { member } = useMember();
  const ministries = useAppSelector((state) => state.ministries.ministries);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Get stepper key from URL (default to the first step)
  const activeStepKey = searchParams.get("tab") || steps[0].key;
  const activeStepIndex = steps.findIndex((step) => step.key === activeStepKey);
  const [activeStep, setActiveStep] = useState(activeStepIndex);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        dateOfBirth: member.dateOfBirth
          ? new Date(member.dateOfBirth)
          : undefined,
        baptismDate: member.baptismDate
          ? new Date(member.baptismDate)
          : undefined,
        confirmationDate: member.confirmationDate
          ? new Date(member.confirmationDate)
          : undefined,
        membershipStartDate: member.membershipStartDate
          ? new Date(member.membershipStartDate)
          : undefined,
      });
    }

    if (ministries.length === 0) {
      dispatch(fetchMinistries());
    }
  }, [member, ministries, dispatch]);

  // Update URL and stepper state when changing steps
  const handleStepChange = (index: number) => {
    const newStepKey = steps[index].key;
    setActiveStep(index);
    router.replace(`${pathname}?tab=${newStepKey}`);
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    if (!editMode) {
      setEditMode(true); // Change icon to save (editMode is true)
    } else {
      // setIsSubmitting(true);
      handleSubmit(
        e,
        formData,
        dispatch,
        setPreviewUrl,
        setEditMode,
        setIsSubmitting
      ); // Submit the form when in save mode
    }
  };

  return (
    <div className="p-6 rounded-lg h-full">
      <h2 className="text-2xl font-semibold dark:text-white mb-4">
        Edit Profile
      </h2>

      <Stepper active={activeStep} onStepClick={handleStepChange}>
        {steps.map((step, index) => (
          <Stepper.Step key={index} label={step.label}>
            {index === 0 && (
              <ProfilePicture
                previewUrl={previewUrl}
                formData={formData}
                setPreviewUrl={setPreviewUrl}
                setFormData={setFormData}
                editMode={editMode}
              />
            )}
            {index === 1 && (
              <PersonalInformation
                formData={formData}
                handleChange={(e) => handleChange(e, setFormData)}
                editMode={editMode}
              />
            )}
            {index === 2 && (
              <AddressForm
                formData={formData}
                handleChange={(e) => handleChange(e, setFormData)}
                editMode={editMode}
              />
            )}
            {index === 3 && (
              <MembershipDetails
                formData={formData}
                handleChange={(e) => handleChange(e, setFormData)}
                ministries={ministries}
                editMode={editMode}
                role={member?.role}
              />
            )}
            {index === 4 && (
              <SocialMediaForm
                formData={formData}
                handleChange={(e) => handleChange(e, setFormData)}
                editMode={editMode}
              />
            )}
            {index === 5 && (
              <EmergencyContactForm
                formData={formData}
                handleChange={(e) => handleChange(e, setFormData)}
                editMode={editMode}
              />
            )}
          </Stepper.Step>
        ))}

        <Stepper.Completed>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-green-600">
              All steps completed!
            </h3>
            <p className="text-gray-500">Review your details and submit.</p>
          </div>
        </Stepper.Completed>
      </Stepper>

      <Group justify="center" className="mt-8">
        {activeStep !== 0 && (
          <Button
            variant="default"
            onClick={() => handleStepChange(activeStep - 1)}
          >
            Back
          </Button>
        )}
        {activeStep < steps.length - 1 ? (
          <Button onClick={() => handleStepChange(activeStep + 1)}>Next</Button>
        ) : (
          <></>
        )}
      </Group>

      <div className="edit-info-container">
        <div className={`edit-info-toggle ${isSubmitting ? 'cursor-not-allowed' : 'cursor-pointer'}`} onClick={handleButtonClick}>
          <input
            type="checkbox"
            className={`edit-info-input ${isSubmitting ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            checked={editMode}
            readOnly
            disabled={isSubmitting}
          />
          <span className="edit-info-button"></span>
          <span
            className={`${
              !editMode && !isSubmitting ? "blink-animation" : "scale-fade-animation"
            } flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full w-10 h-10 transition-all duration-300`}
          >
            {isSubmitting ? (
              <Loader size={32} /> // Show Loader when submitting
            ) : editMode ? (
              <FaSave size={32} color="blue" /> // Show Save icon when in edit mode
            ) : (
              <BiSolidEdit size={32} color="orangered" /> // Show Edit icon when not in edit mode
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
