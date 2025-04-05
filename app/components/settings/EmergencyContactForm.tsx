// /app/components/settings/EmergencyContactForm.tsx

import { IChurchMember } from "@/app/types/user";

const EmergencyContactForm = ({
  formData,
  handleChange,
  editMode,
  member,
  ministries,
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

  return (
    <div className="mt-5">
      <h3 className="text-[14px] font-bold uppercase mb-2">
        Emergency Contact{" "}
        {isChildrensMinistry && (
          <span>1 & 2 (for Children&apos;s Ministry)</span>
        )}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Emergency Contact 1 - Name */}
        <label>
          {isChildrensMinistry
            ? "Emergency Contact 1 - Name"
            : "Emergency Contact Name"}
          <input
            type="text"
            name="emergencyContact.name"
            value={formData.emergencyContact?.name}
            onChange={handleChange}
            readOnly={!editMode}
            placeholder="Contact Name"
            className={`p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full ${
              !editMode ? "cursor-not-allowed" : ""
            }`}
          />
        </label>

        {/* Emergency Contact 1 - Relationship */}
        <label>
          {isChildrensMinistry
            ? "Emergency Contact 1 - Relationship"
            : "Emergency Contact Relationship"}

          <input
            type="text"
            name="emergencyContact.relationship"
            value={formData.emergencyContact?.relationship}
            onChange={handleChange}
            readOnly={!editMode}
            placeholder="Relationship"
            className={`p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full ${
              !editMode ? "cursor-not-allowed" : ""
            }`}
          />
        </label>

        {/* Emergency Contact 1 - Phone */}
        <label>
          {isChildrensMinistry
            ? "Emergency Contact 1 - Phone"
            : "Emergency Contact Phone"}
          <input
            type="text"
            name="emergencyContact.phoneNumber"
            value={formData.emergencyContact?.phoneNumber}
            onChange={handleChange}
            readOnly={!editMode}
            placeholder="Phone Number"
            className={`p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full ${
              !editMode ? "cursor-not-allowed" : ""
            }`}
          />
        </label>
      </div>

      {isChildrensMinistry && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {/* Emergency Contact 2 - Name */}
          <label>
            Emergency Contact 2 - Name
            <input
              type="text"
              name="emergencyContact.name2"
              value={formData.emergencyContact?.name2 || ""}
              onChange={handleChange}
              readOnly={!editMode}
              placeholder="Name"
              className={`p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full ${
                !editMode ? "cursor-not-allowed" : ""
              }`}
            />
          </label>

          {/* Emergency Contact 2 - Relationship */}
          <label>
            Emergency Contact 2 - Relationship
            <input
              type="text"
              name="emergencyContact.relationship2"
              value={formData.emergencyContact?.relationship2 || ""}
              onChange={handleChange}
              readOnly={!editMode}
              placeholder="Relationship"
              className={`p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full ${
                !editMode ? "cursor-not-allowed" : ""
              }`}
            />
          </label>

          {/* Emergency Contact 2 - Phone */}
          <label>
            Emergency Contact 2 - Phone
            <input
              type="text"
              name="emergencyContact.phoneNumber2"
              value={formData.emergencyContact?.phoneNumber2 || ""}
              onChange={handleChange}
              readOnly={!editMode}
              placeholder="Phone Number"
              className={`p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full ${
                !editMode ? "cursor-not-allowed" : ""
              }`}
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default EmergencyContactForm;
