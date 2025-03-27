"use client";

import { useState, useEffect } from "react";
import { enqueueSnackbar } from "notistack";

interface Country {
  country: string;
  states: string[];
}

const useCountriesAndStates = (selectedCountry: string | null) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_KEY = process.env.NEXT_PUBLIC_COUNTRY_API_KEY;

    if (!API_KEY) {
      enqueueSnackbar("API key to fetch countries and states is missing.", {
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

  // Update states when selectedCountry changes
  useEffect(() => {
    if (selectedCountry) {
      const country = countries.find((c) => c.country === selectedCountry);
      setStates(country ? [...country.states].sort((a, b) => a.localeCompare(b)) : []);
    } else {
      setStates([]);
    }
  }, [selectedCountry, countries]);

  return { countries, states, loading };
};

export default useCountriesAndStates;
