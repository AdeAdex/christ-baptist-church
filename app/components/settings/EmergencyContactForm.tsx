// /app/components/settings/EmergencyContactForm.tsx

import { IChurchMember } from "@/app/types/user";

const EmergencyContactForm = ({
  formData,
  handleChange,
  editMode,
  member,
  ministries
}: {
  formData: IChurchMember;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  member: IChurchMember | null;
  editMode?: boolean;
  ministries: { _id: string; name: string }[]; 
}) => {



  const childrensMinistry = ministries.find(
    (ministry) => ministry.name === "Children's Ministry"
  );

  // Check if member.ministry matches the ID of the Children's Ministry
  const isChildrensMinistry = member?.ministry === childrensMinistry?._id;


  console.log("Ministry", isChildrensMinistry)


  return (
    <div className="mt-5">
      <h3 className="text-[14px] font-bold uppercase mb-2">
        Emergency Contact {isChildrensMinistry && <span>/ Guardian Contact (for Children's Ministry)</span> } 
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Emergency Contact Name Input */}
        <label>
          Contact Name
          <input
            type="text"
            name="emergencyContact.name"
            value={formData.emergencyContact?.name}
            onChange={handleChange}
            readOnly={!editMode}
            placeholder="Contact Name"
            className={`p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full ${!editMode ? "cursor-not-allowed" : ""}`}
          />
        </label>

        {/* Relationship Input */}
        <label>
          Relationship
          <input
            type="text"
            name="emergencyContact.relationship"
            value={formData.emergencyContact?.relationship}
            onChange={handleChange}
            readOnly={!editMode}
            placeholder="Relationship"
            className={`p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full ${!editMode ? "cursor-not-allowed" : ""}`}
          />
        </label>

        {/* Phone Number Input */}
        <label>
          Phone Number
          <input
            type="text"
            name="emergencyContact.phoneNumber"
            value={formData.emergencyContact?.phoneNumber}
            onChange={handleChange}
            readOnly={!editMode}
            placeholder="Phone Number"
            className={`p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full ${!editMode ? "cursor-not-allowed" : ""}`}
          />
        </label>
      </div>


      {isChildrensMinistry && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <label>
              Guardian Name
              <input
                type="text"
                name="emergencyContact.guardianName"
                value={formData.emergencyContact?.guardianName || ""}
                onChange={handleChange}
                readOnly={!editMode}
                placeholder="Guardian Name"
                className={`p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full ${
                  !editMode ? "cursor-not-allowed" : ""
                }`}
              />
            </label>

            <label>
              Guardian Relationship
              <input
                type="text"
                name="emergencyContact.guardianRelationship"
                value={formData.emergencyContact?.guardianRelationship || ""}
                onChange={handleChange}
                readOnly={!editMode}
                placeholder="Guardian Relationship"
                className={`p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full ${
                  !editMode ? "cursor-not-allowed" : ""
                }`}
              />
            </label>

            <label>
              Guardian Phone
              <input
                type="text"
                name="emergencyContact.guardianPhone"
                value={formData.emergencyContact?.guardianPhone || ""}
                onChange={handleChange}
                readOnly={!editMode}
                placeholder="Guardian Phone"
                className={`p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full ${
                  !editMode ? "cursor-not-allowed" : ""
                }`}
              />
            </label>
          </div>
        </>
      )}
    </div>
  );
};

export default EmergencyContactForm;
