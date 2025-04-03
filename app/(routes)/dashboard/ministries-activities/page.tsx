//  /app/(route)/dashboard/ministries-activities/page.tsx



"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { useActivityForm } from "@/app/hooks/admin/useActivityForm";
import { useSnackbar } from "notistack"; // Import useSnackbar

export default function MinistryActivitiesPage() {
  const { ministries, isLoading } = useSelector((state: RootState) => state.ministries);
  const member = useSelector((state: RootState) => state.auth.member);

  // Access the snackbar functionality
  const { enqueueSnackbar } = useSnackbar(); // Get enqueueSnackbar function from useSnackbar

  // Use the custom hook
  const { form, loading, handleChange, handleSubmit } = useActivityForm(member?._id || null, enqueueSnackbar);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">Add Ministry Activity</h1>

      {isLoading ? (
        <p>Loading ministries...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Activity Title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="subtitle"
            placeholder="Subtitle"
            value={form.subtitle}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <select
            name="ministryId"
            value={form.ministryId}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Ministry</option>
            {ministries.map((m) => (
              <option key={m._id} value={m._id}>
                {m.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Activity"}
          </button>
        </form>
      )}
    </div>
  );
}
