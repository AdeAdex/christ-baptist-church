// /app/components/settings/AddressForm.tsx



import { IChurchMember } from "@/app/types/user";
import useCountriesAndStates from "@/app/hooks/members/useCountriesAndStates";

const AddressForm = ({
  formData,
  handleChange,
  editMode,
}: {
  formData: IChurchMember;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  editMode: boolean;
}) => {

  const { countries, states, loading } = useCountriesAndStates(
    formData.address?.country || ""
  );

  return (
    <div className="mt-5">
      <h3 className="text-[14px] font-bold uppercase mb-2">Address</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Street Input */}
        <label>
          Street
          <input
            type="text"
            name="address.street"
            value={formData.address?.street}
            onChange={handleChange}
            readOnly={!editMode}
            placeholder="Street"
            className={`p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full ${!editMode ? "cursor-not-allowed" : ""}`}
          />
        </label>

        {/* City Input */}
        <label>
          City
          <input
            type="text"
            name="address.city"
            value={formData.address?.city}
            onChange={handleChange}
            readOnly={!editMode}
            placeholder="City"
            className={`p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full ${!editMode ? "cursor-not-allowed" : ""}`}
          />
        </label>

        {/* Country Select */}
        <label>
          Country
          <select
            name="address.country"
            value={formData.address?.country}
            onChange={handleChange}
            disabled={!editMode}
            className={`p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full ${!editMode ? "cursor-not-allowed" : ""}`}
          >
            <option value="">Select Country</option>
            {loading ? (
              <option>Loading...</option>
            ) : (
              countries.map((country, index) => (
                <option key={index} value={country.country}>
                  {country.country}
                </option>
              ))
            )}
          </select>
        </label>

        {/* State Select */}
        <label>
          State
          <select
            name="address.state"
            value={formData.address?.state}
            onChange={handleChange}
            className={`p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full ${!editMode ? "cursor-not-allowed" : ""}`}
            disabled={!states.length || !editMode} // Disable if no states available
          >
            <option value="">Select State</option>
            {states.length > 0 ? (
              states.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))
            ) : (
              <option>No states available</option>
            )}
          </select>
        </label>

        {/* Zip Code Input */}
        <label>
          Zip Code
          <input
            type="text"
            name="address.zipCode"
            value={formData.address?.zipCode}
            onChange={handleChange}
            readOnly={!editMode}
            placeholder="Zip Code"
            className={`p-3 rounded-md dark:bg-gray-700 bg-slate-100 w-full ${!editMode ? "cursor-not-allowed" : ""}`}
          />
        </label>
      </div>
    </div>
  );
};

export default AddressForm;
