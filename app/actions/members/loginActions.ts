//  /app/actions/loginActions.ts


import { signIn, getProviders } from "next-auth/react";
import { getCookie } from "typescript-cookie";
import { AppDispatch } from "@/app/redux/store";
import { Session } from "next-auth";
import { setMember } from "../../redux/slices/authSlice";
import { IChurchMember } from "../../types/user";
import { useRouter } from "next/navigation";

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
  setSubmitting: (submitting: boolean) => void,
  router: ReturnType<typeof useRouter>
) => {
  setLoading(true);
  try {
    const res = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      isAdminRoute: false,
    });


    if (res?.error) {
      enqueueSnackbar(res.error, { variant: "error" });
    } else {
      enqueueSnackbar("Login successful!", { variant: "success" });

      const token = getCookie("authToken");
      if (token && session?.user) {
      
        // dispatch(setMember({ member: session.user, token }));
        const churchMember: IChurchMember = {
          firstName: session.user.name?.split(" ")[0] || "", // Extract first name from full name
          lastName: session.user.name?.split(" ").slice(1).join(" ") || "", // Extract last name
          email: session.user.email || "",
          profilePicture: session.user.image || "",
        };
      
        dispatch(setMember({ member: churchMember, token }));
      }
      
      router.push("/dashboard");
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



export const handleLoginError = (
  error: string,
  enqueueSnackbar: (message: string, options: { variant: "error" }) => void,
  router: ReturnType<typeof useRouter>,
  isAdmin: boolean = false
) => {
  enqueueSnackbar(error.replaceAll("%20", " "), { variant: "error" });

  // Redirect based on role
  router.replace(isAdmin ? "/admin/login" : "/members/login");
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
