// /app/components/settings/AddressForm.tsx

import { IChurchMember } from "@/app/types/user";
import useCountriesAndStates from "@/app/hooks/useCountriesAndStates";

const AddressForm = ({
  formData,
  handleChange,
}: {
  formData: IChurchMember;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}) => {


  const { countries, states, loading } = useCountriesAndStates(
    formData.address?.country || ""
  );

  return (
    <div>
      <h3 className="text-[14px] font-bold uppercase mb-2">Address</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="address.street"
          value={formData.address?.street}
          onChange={handleChange}
          placeholder="Street"
          className="input-field"
        />
        <input
          type="text"
          name="address.city"
          value={formData.address?.city}
          onChange={handleChange}
          placeholder="City"
          className="input-field"
        />

        {/* Country Select */}
        <select
          name="address.country"
          value={formData.address?.country}
          onChange={handleChange}
          className="input-field"
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

        {/* State Select */}
        <select
          name="address.state"
          value={formData.address?.state}
          onChange={handleChange}
          className="input-field"
          disabled={!states.length} // Disable if no states available
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

        <input
          type="text"
          name="address.zipCode"
          value={formData.address?.zipCode}
          onChange={handleChange}
          placeholder="Zip Code"
          className="input-field"
        />
      </div>
    </div>
  );
};

export default AddressForm;
