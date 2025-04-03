"use client";

import { Activity } from "@/app/redux/slices/activitiesSlice";
import { Modal, Button } from "@mantine/core";
import Image from "next/image";

interface ActivityModalProps {
  opened: boolean;
  close: () => void;
  form: Activity;
  loading: boolean;
  imagePreview: string | null;
  ministries: { _id: string; name: string }[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, close: () => void) => void;
}

export default function ActivityModal({
  opened,
  close,
  form,
  loading,
  imagePreview,
  ministries,
  handleChange,
  handleImageChange,
  handleSubmit,
}: ActivityModalProps) {
  return (
    <Modal opened={opened} onClose={close} title="Add Ministry Activity">
      <form onSubmit={(e) => handleSubmit(e, close)} className="space-y-4 max-h-[80vh]">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full"
            required
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Subtitle</label>
          <input
            type="text"
            name="subtitle"
            value={form.subtitle}
            onChange={handleChange}
            className="p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input type="file" name="image" onChange={handleImageChange} accept="image/*" />
          {imagePreview && (
            <div className="mt-2 w-32 h-32 lg:w-full lg:h-64 relative overflow-hidden">
              <Image src={imagePreview} alt="Image Preview" width={500} height={500} className="object-cover" />
            </div>
          )}
        </div>

        {/* Ministry Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Ministry</label>
          <select
            name="ministryId"
            value={form.ministryId}
            onChange={handleChange}
            className="p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full"
            required
          >
            <option value="">Select a Ministry</option>
            {ministries.map((ministry) => (
              <option key={ministry._id} value={ministry._id}>
                {ministry.name}
              </option>
            ))}
          </select>
        </div>

        {/* Visibility Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Visibility</label>
          <select
            name="visibility"
            value={form.visibility}
            onChange={handleChange}
            className="p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full"
            required
          >
            <option value="private">Private</option>
            <option value="public">Public</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="submit" disabled={loading} className="bg-blue-500 text-white">
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
