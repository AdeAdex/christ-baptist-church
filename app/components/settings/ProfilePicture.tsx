//  /app/components/settings/ProfilePicture.tsx

import Image from "next/image";
import { FaCamera } from "react-icons/fa";
import maleAvatar from "@/public/images/male-avatar.png";
import femaleAvatar from "@/public/images/female-avatar.png";
import { IChurchMember } from "@/app/types/user";
import { handleFileSelect } from "@/app/actions/members/updateAction";

const ProfilePicture = ({
  previewUrl,
  formData,
  setPreviewUrl,
  setFormData,
  editMode
}: {
  previewUrl: string | null;
  formData: IChurchMember;
  setPreviewUrl: React.Dispatch<React.SetStateAction<string | null>>;
  setFormData: React.Dispatch<React.SetStateAction<IChurchMember>>;
  editMode: boolean;
}) => (
  <div className="mt-5">
    <h3 className="text-[14px] font-bold uppercase mb-2">Profile Picture</h3>
    <div className="flex flex-col items-center">
      <label htmlFor="avatarInput" className={`relative ${!editMode ? "cursor-not-allowed" : "cursor-pointer"}`}>
        <Image
          src={
            formData.profilePicture ||
            previewUrl ||
            (formData.gender === "female" ? femaleAvatar : maleAvatar)
          }
          alt="Profile"
          width={200}
          height={200}
          className="rounded-full object-cover"
        />
        <FaCamera
          size={30}
          className="absolute bottom-2 right-2 p-1 bg-gray-500 text-white rounded-full"
        />
      </label>
      <input
        type="file"
        id="avatarInput"
        accept="image/*"
        className="hidden"
        disabled={!editMode} 
        onChange={(e) => handleFileSelect(e, setPreviewUrl, setFormData)}
      />
    </div>
  </div>
);

export default ProfilePicture;
