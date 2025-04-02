// /app/components/ministries/MinistryForm.tsx

"use client";

import { useState, useEffect } from "react";
import { Modal, TextInput, Button } from "@mantine/core";

interface MinistryFormProps {
  onClose: () => void;
  onSubmit: (name: string) => void;
  isProcessing: boolean;
  ministry: { _id: string; name: string } | null; // Handle the case when editing a ministry
  setEditingMinistry: (ministry: null) => void; // Function to reset editing state
}

export default function MinistryForm({ onClose, onSubmit, isProcessing, ministry, setEditingMinistry }: MinistryFormProps) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (ministry) {
      setName(ministry.name); // Populate form with the ministry data if editing
    } else {
      setName(""); // Reset name if creating new ministry
    }
  }, [ministry]);

  const handleSubmit = () => {
    if (name.trim()) {
      onSubmit(name); // Call the onSubmit function passed from the parent
      if (ministry) {
        setEditingMinistry(null); // Reset editing state if edited
      }
    }
  };

  return (
    <Modal opened onClose={() => !isProcessing && onClose()} title={ministry ? "Edit Ministry" : "Add Ministry"} centered>
      <TextInput
        label="Ministry Name"
        placeholder="Enter ministry name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button
        onClick={handleSubmit}
        fullWidth
        className="mt-4"
        disabled={isProcessing} // Disable the button while processing
      >
        {ministry ? "Update Ministry" : "Add Ministry"}
      </Button>
    </Modal>
  );
}
