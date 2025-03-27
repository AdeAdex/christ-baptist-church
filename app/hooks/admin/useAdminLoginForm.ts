"use client";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginSchema } from "@/app/components/validation/members/loginSchema";
import { loginAdmin } from "@/app/actions/admin/loginAdmin";
import { enqueueSnackbar } from "notistack"; // Import snackbar

const useAdminLoginForm = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setError("");
      try {
        await loginAdmin(values.email, values.password, enqueueSnackbar, setSubmitting);
        router.push("/admin/dashboard");
      } catch (err: any) {
        setError(err.message);
        enqueueSnackbar(err.message, { variant: "error" }); // Show error in snackbar
      }
      setSubmitting(false);
    },
  });

  return { formik, error };
};

export default useAdminLoginForm;
