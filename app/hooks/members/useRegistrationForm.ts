// app/hooks/useRegistrationForm.ts
import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import registrationSchema from "@/app/components/validation/members/registrationSchema";
import { FormValues } from "@/app/types/registration";
import { registerUser } from "../../actions/members/register";
import useCountriesAndStates from "@/app/hooks/members/useCountriesAndStates";

const useRegistrationForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const { countries, states, loading: countryLoading } =
    useCountriesAndStates(selectedCountry);

  const formik = useFormik<FormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      gender: "",
      dateOfBirth: "",
      address: { street: "", city: "", state: "", country: "" },
    },
    validationSchema: registrationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setLoading(true);
      const result = await registerUser(values);
      
      if (result.success) {
        enqueueSnackbar(result.message, { variant: "success" });
        setTimeout(() => router.push("/members/login"), 3000);
        resetForm();
      } else {
        enqueueSnackbar(result.message, { variant: "error" });
      }

      setLoading(false);
      setSubmitting(false);
    },
  });

  // Handle country change
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country = e.target.value;
    setSelectedCountry(country);
    formik.setFieldValue("address.country", country);
    formik.setFieldValue("address.state", "");
  };

  // Handle state change
  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    formik.setFieldValue("address.state", e.target.value);
  };

  return {
    formik,
    loading,
    countries,
    states,
    countryLoading,
    handleCountryChange,
    handleStateChange,
  };
};

export default useRegistrationForm;
