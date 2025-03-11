"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if not authenticated
  if (status === "loading") {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Welcome, {session.user?.name}!</p>

        <button
          onClick={() => signOut()}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
