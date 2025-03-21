//  /app/components/settings/ProfilePicture.tsx

import Image from "next/image";
import { FaCamera } from "react-icons/fa";
import maleAvatar from "@/public/images/male-avatar.png";
import femaleAvatar from "@/public/images/female-avatar.png";
import { IChurchMember } from "@/app/types/user";
import { handleFileSelect } from "@/app/actions/updateAction";

const ProfilePicture = ({ previewUrl, formData, setPreviewUrl, setFormData }: { 
  previewUrl: string | null; 
  formData: IChurchMember; 
  setPreviewUrl: React.Dispatch<React.SetStateAction<string | null>>;
  setFormData: React.Dispatch<React.SetStateAction<IChurchMember>>;
}) => (
  <div className="flex flex-col items-center">
    <label htmlFor="avatarInput" className="relative cursor-pointer">
      <Image src={previewUrl || formData.profilePicture || (formData.gender === "female" ? femaleAvatar : maleAvatar)} alt="Profile" width={128} height={128} className="rounded-full object-cover" />
      <FaCamera size={30} className="absolute bottom-2 right-2 p-1 bg-gray-500 text-white rounded-full" />
    </label>
    <input type="file" id="avatarInput" accept="image/*" className="hidden" onChange={(e) => handleFileSelect(e, setPreviewUrl, setFormData)} />
  </div>
);

export default ProfilePicture;
