import * as Yup from "yup";

const registrationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot exceed 50 characters")
    .required("First name is required"),

  middleName: Yup.string().max(50, "Middle name cannot exceed 50 characters").notRequired(),

  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name cannot exceed 50 characters")
    .required("Last name is required"),

  userName: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username cannot exceed 20 characters")
    .notRequired(), // Username is now optional

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),

  gender: Yup.string()
    .oneOf(["male", "female"], "Invalid gender")
    .notRequired(),

  dateOfBirth: Yup.date()
    .max(new Date(), "Date of birth cannot be in the future")
    .notRequired(),

  phoneNumber: Yup.string()
    .matches(/^\d+$/, "Phone number must contain only digits")
    .min(10, "Invalid phone number")
    .max(15, "Phone number too long")
    .required("Phone number is required"),

  address: Yup.object().shape({
    street: Yup.string().max(100, "Street name is too long").notRequired(),
    city: Yup.string().max(50, "City name is too long").notRequired(),
    state: Yup.string().max(50, "State name is too long").notRequired(),
    country: Yup.string().max(50, "Country name is too long").notRequired(),
  }),
});

export default registrationSchema;


