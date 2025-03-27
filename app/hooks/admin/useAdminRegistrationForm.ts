import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import adminSchema from "@/app/components/validation/admin/adminRegistrationSchema";
import { registerAdmin } from "@/app/actions/admin/registerAdmin";
import { useState } from "react";

const useAdminRegistrationForm = () => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      secretKey: "",
    },
    validationSchema: adminSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setLoading(true);
      const result = await registerAdmin(values);

      if (result.success) {
        enqueueSnackbar(result.message, { variant: "success" });
        setTimeout(() => router.push("/admin/login"), 3000);
        resetForm();
      } else {
        enqueueSnackbar(result.message, { variant: "error" });
      }

      setLoading(false);
      setSubmitting(false);
    },
  });

  return { formik, loading };
};

export default useAdminRegistrationForm;
