import * as Yup from "yup";

const adminSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot exceed 50 characters")
    .required("First name is required"),

  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name cannot exceed 50 characters")
    .required("Last name is required"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  phoneNumber: Yup.string()
    .matches(/^\d{10,15}$/, "Phone number must be between 10 and 15 digits")
    .required("Phone number is required"),

  secretKey: Yup.string().required("Secret key is required"),
});

export default adminSchema;
