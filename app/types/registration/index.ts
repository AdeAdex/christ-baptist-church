export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
}

export interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: string;
  address: Address;
}