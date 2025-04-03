import { IChurchMember } from "@/app/types/user";

const SocialMediaForm = ({
  formData,
  handleChange,
  editMode,
}: {
  formData: IChurchMember;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  editMode?: boolean;
}) => {
  return (
    <div className="mt-5">
      <h3 className="text-[14px] font-bold uppercase mb-2">Social Media</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Facebook Input */}
        <label>
          Facebook
          <input
            type="text"
            name="socialMedia.facebook"
            value={formData.socialMedia?.facebook}
            onChange={handleChange}
            readOnly={!editMode}
            placeholder="Facebook"
            className={`p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full ${!editMode ? "cursor-not-allowed" : ""}`}
          />
        </label>

        {/* Twitter Input */}
        <label>
          Twitter
          <input
            type="text"
            name="socialMedia.twitter"
            value={formData.socialMedia?.twitter}
            onChange={handleChange}
            readOnly={!editMode}
            placeholder="Twitter"
            className={`p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full ${!editMode ? "cursor-not-allowed" : ""}`}
          />
        </label>

        {/* Instagram Input */}
        <label>
          Instagram
          <input
            type="text"
            name="socialMedia.instagram"
            value={formData.socialMedia?.instagram}
            onChange={handleChange}
            readOnly={!editMode}
            placeholder="Instagram"
            className={`p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full ${!editMode ? "cursor-not-allowed" : ""}`}
          />
        </label>

        {/* LinkedIn Input */}
        <label>
          LinkedIn
          <input
            type="text"
            name="socialMedia.linkedin"
            value={formData.socialMedia?.linkedin}
            onChange={handleChange}
            readOnly={!editMode}
            placeholder="LinkedIn"
            className={`p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full ${!editMode ? "cursor-not-allowed" : ""}`}
          />
        </label>

        {/* YouTube Input */}
        <label>
          YouTube
          <input
            type="text"
            name="socialMedia.youtube"
            value={formData.socialMedia?.youtube}
            onChange={handleChange}
            readOnly={!editMode}
            placeholder="YouTube"
            className={`p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full ${!editMode ? "cursor-not-allowed" : ""}`}
          />
        </label>
      </div>
    </div>
  );
};

export default SocialMediaForm;
