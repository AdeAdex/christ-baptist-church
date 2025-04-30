//  /app/(routes)/dashboard/ministries/page.tsx




"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMinistry } from "@/app/hooks/admin/addMinistry"; // Hook to add ministry
import { deleteMinistry } from "@/app/hooks/admin/deleteMinistry"; // Hook to delete ministry
import MinistryForm from "@/app/components/ministries/MinistryForm"; // Assuming the form is in this path
import { fetchMinistries } from "@/app/actions/admin/ministriesActions"; // Fetch ministries action
import { AppDispatch, RootState } from "@/app/redux/store"; // Import RootState for type safety
import Loader from "@/app/components/Loader";

export default function MinistriesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [isProcessing, setIsProcessing] = useState(false); // Track whether the API call is in progress
  const [editingMinistry, setEditingMinistry] = useState(null); // State for editing ministry
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false); // Manage delete confirmation
  const [ministryToDelete, setMinistryToDelete] = useState<{ id: string; name: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false); // Track delete process state

  const dispatch = useDispatch<AppDispatch>();
  const { ministries, isLoading } = useSelector((state: RootState) => state.ministries); // Get ministries from Redux state

  useEffect(() => {
    if (ministries.length === 0) {
      dispatch(fetchMinistries());
    }
  }, [dispatch, ministries.length]);

  const handleAddMinistry = async (name: string) => {
    setIsProcessing(true); // Set processing state to true when the API call starts
    try {
      await addMinistry(name); // Add ministry using the API hook
      dispatch(fetchMinistries()); // Fetch the updated ministries list
      setIsModalOpen(false); // Close the modal after adding the ministry
    } catch {
      // Error is handled by the hook
    } finally {
      setIsProcessing(false); // Reset processing state after the API call finishes
    }
  };

  const handleDeleteMinistry = async (ministryId: string) => {
    if (ministryId) {
      setIsDeleting(true); // Set deleting to true during the deletion process
      try {
        await deleteMinistry(ministryId); // Delete ministry using the API hook
        dispatch(fetchMinistries()); // Fetch the updated ministries list
        setIsDeleteConfirmOpen(false); // Close the confirmation dialog
        setMinistryToDelete(null); // Clear the ministry ID to delete
      } catch  {
        // Error is handled by the hook
      } finally {
        setIsDeleting(false); // Reset deleting state after the API call finishes
      }
    }
  };

  const openDeleteConfirmation = (ministryId: string, ministryName: string) => {
    setMinistryToDelete({ id: ministryId, name: ministryName });
    setIsDeleteConfirmOpen(true); // Open the delete confirmation dialog
  };

  const closeDeleteConfirmation = () => {
    setIsDeleteConfirmOpen(false);
    setMinistryToDelete(null); // Reset the ministry ID
  };

  // Close modal when clicking outside
  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  // Close delete confirmation when clicking outside
  const handleDeleteModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsDeleteConfirmOpen(false);
      setMinistryToDelete(null); // Reset the ministry ID
    }
  };

  return (
    <div className="py-4">
      <h1 className="text-2xl font-semibold mb-4">Ministries</h1>

      {/* Button to open the modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-primary-button hover:bg-primary-button-hover text-white px-4 py-2 rounded-md mb-4"
      >
        Add New Ministry
      </button>

      {/* List of existing ministries */}
      <div>
        {isLoading ? (
          <Loader /> // Show loader while fetching ministries
        ) : (
          <ul>
            {ministries.length === 0 ? (
              <p>No ministries found</p>
            ) : (
              ministries.map((ministry) => (
                <li key={ministry._id} className="border-b py-2 flex justify-between items-center">
                  <span>{ministry.name}</span>

                  {/* Delete buttons */}
                  <div>
                    <button
                      onClick={() => openDeleteConfirmation(ministry._id, ministry.name)} // Open delete confirmation
                      className="bg-red-500 text-white px-2 py-1 rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        )}
      </div>

      {/* Ministry Form Modal */}
      {isModalOpen && (
        <div onClick={handleModalClick} className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <MinistryForm
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleAddMinistry}
            isProcessing={isProcessing} // Pass the processing state to the form
            ministry={editingMinistry} // Pass the editing ministry data for editing
            setEditingMinistry={setEditingMinistry} // Allow clearing of editing state
          />
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmOpen && ministryToDelete && (
        <div onClick={handleDeleteModalClick} className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-[80%] lg:w-1/3">
            <h2 className="text-xl font-semibold mb-4">Are you sure you want to delete this ministry: <span className="text-orange-500">{ministryToDelete.name} ? </span></h2>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeDeleteConfirmation}
                className="bg-gray-400 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteMinistry(ministryToDelete?.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                disabled={isDeleting} // Disable the button while deleting
              >
                {isDeleting ? "Deleting..." : "Confirm"} {/* Show Deleting... message */}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
