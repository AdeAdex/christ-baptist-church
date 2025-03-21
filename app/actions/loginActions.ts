//  /app/actions/loginActions.ts


import { signIn, getProviders } from "next-auth/react";
import { getCookie } from "typescript-cookie";
import { AppDispatch } from "@/app/redux/store";
import { Session } from "next-auth";
// import { IChurchMember } from "../types/user";

interface LoginValues {
  email: string;
  password: string;
}

export const handleLogin = async (
  values: LoginValues,
  dispatch: AppDispatch,
  session: Session | null,
  enqueueSnackbar: (message: string, options: { variant: "error" | "success" }) => void,
  setLoading: (loading: boolean) => void,
  setSubmitting: (submitting: boolean) => void
) => {
  setLoading(true);
  try {
    const res = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });


    if (res?.error) {
      enqueueSnackbar(res.error, { variant: "error" });
    } else {
      enqueueSnackbar("Login successful!", { variant: "success" });

      const token = getCookie("authToken");
      if (token && session?.user) {
      
        // dispatch(loginSuccess({ member: session.user, token }));
      }
      
    }
  } catch (error) {
    console.error("Login error:", error);
    enqueueSnackbar(
      error instanceof Error ? error.message : "An unknown error occurred.",
      { variant: "error" }
    );
  } finally {
    setLoading(false);
    setSubmitting(false);
  }
};

export const fetchAuthProviders = async (enqueueSnackbar: (message: string, options: { variant: "error" }) => void) => {
  try {
    return await getProviders();
  } catch (error) {
    console.error("Error fetching providers:", error);
    enqueueSnackbar(
      error instanceof Error ? error.message : "An unknown error occurred.",
      { variant: "error" }
    );
    return null;
  }
};
