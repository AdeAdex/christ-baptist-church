"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { IChurchMember } from "@/app/types/user";

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

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!member)
    return <p className="text-center mt-10 text-red-500">Member not found</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">
        {member.firstName} {member.middleName ?? ""} {member.lastName}
      </h1>

      <div className="space-y-2">
        <p>
          <strong>Username:</strong> {member.userName}
        </p>
        <p>
          <strong>Email:</strong> {member.email}
        </p>
        <p>
          <strong>Phone:</strong> {member.phoneNumber}
        </p>
        <p>
          <strong>Gender:</strong> {member.gender}
        </p>
        <p>
          <strong>Date of Birth:</strong>{" "}
          {member.dateOfBirth
            ? new Date(member.dateOfBirth).toLocaleDateString()
            : "N/A"}
        </p>
        <p>
          <strong>Nationality:</strong> {member.nationality}
        </p>
        <p>
          <strong>Marital Status:</strong> {member.maritalStatus}
        </p>
        <p>
          <strong>Address:</strong>
          {member.address
            ? `${member.address.street ?? ""}, ${member.address.city ?? ""}, ${member.address.state ?? ""}, ${member.address.country ?? ""}`
            : "N/A"}
        </p>
        <p>
          <strong>Occupation:</strong> {member.occupation}
        </p>
        <p>
          <strong>Company:</strong> {member.company}
        </p>
        <p>
          <strong>Status:</strong> {member.membershipStatus}
        </p>
        <p>
          <strong>Permission Level:</strong> {member.permissionLevel}
        </p>
        <p>
          <strong>Permission Status:</strong> {member.permissionStatus}
        </p>
        <p>
          <strong>Joined:</strong>{" "}
          {member.membershipStartDate
            ? new Date(member.membershipStartDate).toLocaleDateString()
            : "N/A"}
        </p>
        <p>
          <strong>Has Contributed Today:</strong>{" "}
          {member.hasMadeContributionToday ? "Yes" : "No"}
        </p>
        {member.lastContributionDate && (
          <p>
            <strong>Last Contribution:</strong>{" "}
            {new Date(member.lastContributionDate).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
}
