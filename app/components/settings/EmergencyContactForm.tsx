// /app/components/settings/EmergencyContactForm.tsx

import { IChurchMember } from "@/app/types/user";

const EmergencyContactForm = ({
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
        Emergency Contact
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <input
          type="text"
          name="emergencyContact.name"
          value={formData.emergencyContact?.name}
          onChange={handleChange}
          placeholder="Contact Name"
          className="input-field p-3 rounded-md dark:bg-gray-700 bg-slate-100"
        />
        <input
          type="text"
          name="emergencyContact.relationship"
          value={formData.emergencyContact?.relationship}
          onChange={handleChange}
          placeholder="Relationship"
          className="input-field p-3 rounded-md dark:bg-gray-700 bg-slate-100"
        />
        <input
          type="text"
          name="emergencyContact.phoneNumber"
          value={formData.emergencyContact?.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
          className="input-field p-3 rounded-md dark:bg-gray-700 bg-slate-100"
        />
      </div>
    </div>
  );
};

export default EmergencyContactForm;
