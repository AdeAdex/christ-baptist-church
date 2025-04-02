import { IChurchMember } from "@/app/types/user";

const SocialMediaForm = ({
  formData,
  handleChange,
}: {
  formData: IChurchMember;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}) => {

  return (
    <div>
      <h3 className="text-[14px] font-bold uppercase mb-2">
        Social Media
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-4">
        <input
          type="text"
          name="socialMedia.facebook"
          value={formData.socialMedia?.facebook}
          onChange={handleChange}
          placeholder="Facebook"
          className="input-field p-3 rounded-md dark:bg-gray-700 bg-slate-100"
        />
        <input
          type="text"
          name="socialMedia.twitter"
          value={formData.socialMedia?.twitter}
          onChange={handleChange}
          placeholder="Twitter"
          className="input-field p-3 rounded-md dark:bg-gray-700 bg-slate-100"
        />
        <input
          type="text"
          name="socialMedia.instagram"
          value={formData.socialMedia?.instagram}
          onChange={handleChange}
          placeholder="Instagram"
          className="input-field p-3 rounded-md dark:bg-gray-700 bg-slate-100"
        />
        <input
          type="text"
          name="socialMedia.linkedin"
          value={formData.socialMedia?.linkedin}
          onChange={handleChange}
          placeholder="LinkedIn"
          className="input-field p-3 rounded-md dark:bg-gray-700 bg-slate-100"
        />
        <input
          type="text"
          name="socialMedia.youtube"
          value={formData.socialMedia?.youtube}
          onChange={handleChange}
          placeholder="YouTube"
          className="input-field p-3 rounded-md dark:bg-gray-700 bg-slate-100"
        />
      </div>
    </div>
  );
};

export default SocialMediaForm;
