"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { IChurchMember } from "@/app/types/user";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import Loader from "@/app/components/Loader";

export default function MemberProfilePage() {
  const { username } = useParams();
  const [member, setMember] = useState<IChurchMember | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await fetch(`/api/member/${username}`);
        const data = await res.json();
        if (res.ok) setMember(data.member);
      } catch (err) {
        console.error("Failed to fetch member", err);
      } finally {
        setLoading(false);
      }
    };

    if (username) fetchMember();
  }, [username]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[90vh]">
        <Loader />
      </div>
    );
  if (!member)
    return (
      <p className="text-center mt-10 text-red-500 font-medium">
        Member not found
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 pb-10">
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-2xl overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-40 relative">
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            {/* Profile Picture or Placeholder */}
            <div className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-900 bg-gray-200 dark:bg-gray-800 overflow-hidden flex items-center justify-center">
              {member.profilePicture ? (
                <Image
                  src={member.profilePicture}
                  alt="Profile"
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              ) : (
                <FaUserCircle className="text-gray-500" size={50} />
              )}
            </div>
          </div>
        </div>

        <div className="pt-16 pb-8 px-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {member.firstName} {member.middleName ?? ""} {member.lastName}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">@{member.userName}</p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 px-6 pb-10 text-sm text-gray-800 dark:text-gray-300">
          <ProfileField label="Email" value={member.email} />
          <ProfileField label="Phone" value={member.phoneNumber} />
          <ProfileField label="Gender" value={member.gender} />
          <ProfileField
            label="Date of Birth"
            value={
              member.dateOfBirth
                ? new Date(member.dateOfBirth).toLocaleDateString()
                : "N/A"
            }
          />
          <ProfileField label="Nationality" value={member.nationality} />
          <ProfileField label="Marital Status" value={member.maritalStatus} />
          <ProfileField
            label="Address"
            value={
              member.address
                ? `${member.address.street ?? ""}, ${member.address.city ?? ""}, ${member.address.state ?? ""}, ${member.address.country ?? ""}`
                : "N/A"
            }
          />
          <ProfileField label="Occupation" value={member.occupation} />
          <ProfileField label="Company" value={member.company} />
          <ProfileField label="Membership Status" value={member.membershipStatus} />
          <ProfileField label="Permission Level" value={member.permissionLevel} />
          <ProfileField label="Permission Status" value={member.permissionStatus} />
          <ProfileField
            label="Joined"
            value={
              member.membershipStartDate
                ? new Date(member.membershipStartDate).toLocaleDateString()
                : "N/A"
            }
          />
          <ProfileField
            label="Has Contributed Today"
            value={member.hasMadeContributionToday ? "Yes" : "No"}
          />
          {member.lastContributionDate && (
            <ProfileField
              label="Last Contribution"
              value={new Date(member.lastContributionDate).toLocaleDateString()}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function ProfileField({
  label,
  value,
}: {
  label: string;
  value: string | number | undefined;
}) {
  return (
    <div className="flex flex-col">
      <span className="text-gray-500 dark:text-gray-400 font-medium">{label}</span>
      <span className="font-semibold text-gray-700 dark:text-gray-100">{value}</span>
    </div>
  );
}
