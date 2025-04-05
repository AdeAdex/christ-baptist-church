"use client";

import { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import Image from "next/image";

export default function SendBroadcastPage() {
  const { enqueueSnackbar } = useSnackbar();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [videoBase64, setVideoBase64] = useState<string | null>(null);  // Use this instead of videoFile


  // Convert the selected image to Base64
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result as string);
        setImagePreview(URL.createObjectURL(file)); // Generate preview for image
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle video file selection
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setVideoBase64(reader.result as string);  // Now store the video as base64
            setVideoPreview(URL.createObjectURL(file));  // Generate preview for video
          };
          reader.readAsDataURL(file);
        }
      };
      
      

      const handleSend = async () => {
        if (!subject || !message) {
          enqueueSnackbar("Please fill in subject and message.", { variant: "warning" });
          return;
        }
      
        setLoading(true);
        try {
          const videoUrl = videoPreview; // Use videoPreview URL or provide a link to hosted video
          const res = await axios.post("/api/admin/broadcast-email", {
            subject,
            message,
            image: imageBase64,  // Send image base64 string
            videoUrl,  // Send video URL (not base64)
          });
          enqueueSnackbar(res.data.message, { variant: "success" });
          setSubject("");
          setMessage("");
          setImagePreview(null);
          setVideoPreview(null);
          setImageBase64(null);
          setVideoBase64(null);  // Clear video base64 after sending
        } catch (err: unknown) {
          if (axios.isAxiosError(err)) {
            enqueueSnackbar(err.response?.data?.error || "Something went wrong.", { variant: "error" });
          } else {
            enqueueSnackbar("An unexpected error occurred.", { variant: "error" });
          }
        } finally {
          setLoading(false);
        }
      };
      
      

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Send Broadcast Email</h2>
      <input
        type="text"
        placeholder="Email Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full mb-4"
      />
      <textarea
        placeholder="Your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={6}
        className="p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full mb-4"
      />
      
      {/* Image Preview */}
      <div className="mb-4">
        {imagePreview && (
          <div className="relative w-full h-64 mb-2">
            <Image
              src={imagePreview}
              alt="Selected Image Preview"
              layout="fill"
              objectFit="contain"
              className="rounded-md"
            />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="p-3 rounded-md bg-slate-100"
        />
      </div>

      {/* Video Preview */}
      <div className="mb-4">
        {videoPreview && (
          <video controls className="w-full mb-2">
            <source src={videoPreview} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoChange}
          className="p-3 rounded-md bg-slate-100"
        />
      </div>

      <button
        onClick={handleSend}
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send Email"}
      </button>
    </div>
  );
}
