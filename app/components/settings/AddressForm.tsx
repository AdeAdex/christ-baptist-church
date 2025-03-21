// /app/components/settings/AddressForm.tsx

import { useState, useEffect } from "react";
import { enqueueSnackbar } from "notistack";

import { IChurchMember } from "@/app/types/user";

const AddressForm = ({
  formData,
  handleChange,
}: {
  formData: IChurchMember;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}) => {

  const [countries, setCountries] = useState<
    { country: string; states: string[] }[]
  >([]);
  const [states, setStates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_KEY = process.env.NEXT_PUBLIC_COUNTRY_API_KEY;

    if (!API_KEY) {
      enqueueSnackbar("API key to fetch countries and state is missing.", {
        variant: "error",
      });
      return;
    }

    fetch("https://country-dial-code-api.vercel.app/api/countries", {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error("Invalid response format");
        }

        // Sort countries alphabetically
        const sortedCountries = data.sort((a, b) =>
          a.country.localeCompare(b.country)
        );
        setCountries(sortedCountries);
        setLoading(false);
      })
      .catch((err) => {
        enqueueSnackbar(`Error fetching countries: ${err.message}`, {
          variant: "error",
        });
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Update and sort states when country changes
    const selectedCountry = countries.find(
      (c) => c.country === formData.address?.country
    );
    if (selectedCountry) {
      setStates([...selectedCountry.states].sort((a, b) => a.localeCompare(b)));
    } else {
      setStates([]);
    }
  }, [formData.address?.country, countries]);

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
