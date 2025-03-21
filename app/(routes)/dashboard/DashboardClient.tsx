// /app/dashboard/DashboardClient.tsx

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { setMember } from "@/app/redux/slices/authSlice";
import Image from "next/image";
import { useSnackbar } from "notistack";

const DashboardClient = ({ token }: { token: string | null }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const member = useAppSelector((state) => state.auth.member);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;

      try {
        const res = await fetch("/api/user/dashboard", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (data.success) {
          dispatch(
            setMember({
              member: data.user,
              token: data.user.token,
            })
          );

          enqueueSnackbar(`Welcome back, ${data.user.firstName}!`, { variant: "success" });
        } else {
          console.error("Error fetching user:", data.error);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    if (!member && token) {
      fetchUser();
    }
  }, [member, dispatch, token, enqueueSnackbar]);

  if (!member) {
    return <div className="text-center py-10 text-xl">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <div className="flex items-center space-x-4">
          {member.profilePicture ? (
            <Image src={member.profilePicture} alt="Profile" width={80} height={80} className="rounded-full" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-xl font-bold text-gray-600">
              {member.firstName}
            </div>
          )}
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
              {member.firstName} {member.lastName}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">{member.email}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Role: {member.role}</p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Personal Information</h2>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <p><strong>Gender:</strong> {member.gender}</p>
            <p><strong>Phone:</strong> {member.phoneNumber || "N/A"}</p>
            <p><strong>Date of Birth:</strong> {member.dateOfBirth ? new Date(member.dateOfBirth).toLocaleDateString() : "N/A"}</p>
            <p><strong>Nationality:</strong> {member.nationality || "N/A"}</p>
            <p><strong>Marital Status:</strong> {member.maritalStatus || "N/A"}</p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Church Membership</h2>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <p><strong>Ministry:</strong> {member.ministry || "N/A"}</p>
            <p><strong>Baptism Date:</strong> {member.baptismDate ? new Date(member.baptismDate).toLocaleDateString() : "N/A"}</p>
            <p><strong>Confirmation Date:</strong> {member.confirmationDate ? new Date(member.confirmationDate).toLocaleDateString() : "N/A"}</p>
            <p><strong>Status:</strong> {member.membershipStatus || "N/A"}</p>
            <p><strong>Start Date:</strong> {member.membershipStartDate ? new Date(member.membershipStartDate).toLocaleDateString() : "N/A"}</p>
          </div>
        </div>

        {member.address && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Address</h2>
            <p>{member.address.street}, {member.address.city}, {member.address.state}, {member.address.country}</p>
            <p><strong>Zip Code:</strong> {member.address.zipCode || "N/A"}</p>
          </div>
        )}

        {member.socialMedia && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Social Media</h2>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {member.socialMedia.facebook && <p><strong>Facebook:</strong> {member.socialMedia.facebook}</p>}
              {member.socialMedia.twitter && <p><strong>Twitter:</strong> {member.socialMedia.twitter}</p>}
              {member.socialMedia.instagram && <p><strong>Instagram:</strong> {member.socialMedia.instagram}</p>}
              {member.socialMedia.linkedin && <p><strong>LinkedIn:</strong> {member.socialMedia.linkedin}</p>}
            </div>
          </div>
        )}

        {member.emergencyContact && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Emergency Contact</h2>
            <p><strong>Name:</strong> {member.emergencyContact.name}</p>
            <p><strong>Relationship:</strong> {member.emergencyContact.relationship}</p>
            <p><strong>Phone:</strong> {member.emergencyContact.phoneNumber}</p>
          </div>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={() => {
              dispatch({ type: "auth/logout" });
              router.push("/login");
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardClient;
