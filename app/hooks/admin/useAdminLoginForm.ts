"use client";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginSchema } from "@/app/components/validation/members/loginSchema";
import { loginAdmin } from "@/app/actions/admin/loginAdmin";
import { enqueueSnackbar } from "notistack"; // Import snackbar
import { useAppDispatch } from "@/app/redux/hooks";

const useAdminLoginForm = () => {
  const [error, setError] = useState<string>("");
  const router = useRouter();

    const dispatch = useAppDispatch();
  

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setError("");
      try {
        await loginAdmin(values.email, values.password, enqueueSnackbar, setSubmitting, dispatch, router);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
          enqueueSnackbar(err.message, { variant: "error" }); // Show error in snackbar
        } else {
          setError("An unexpected error occurred");
          enqueueSnackbar("An unexpected error occurred", { variant: "error" });
        }
      }
      setSubmitting(false);
    },
  });

  return { formik, error };
};

export default useAdminLoginForm;
