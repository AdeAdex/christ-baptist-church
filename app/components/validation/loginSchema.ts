import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .test("is-valid", "Enter a valid email, username, or phone number", (value) => {
      if (!value) return false;
      // Validate email, username (alphanumeric), or phone number (digits only)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const usernameRegex = /^[a-zA-Z0-9_]+$/;
      const phoneRegex = /^\d{10,15}$/; // Accepts 10-15 digit phone numbers
      return emailRegex.test(value) || usernameRegex.test(value) || phoneRegex.test(value);
    })
    .required("Email, username, or phone number is required"),
  
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
