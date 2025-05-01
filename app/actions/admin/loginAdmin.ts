//  /app/actions/admin/loginAdmin.ts

// "use client";

// import { signIn } from "next-auth/react";

// export const loginAdmin = async (
//   email: string,
//   password: string,
//   enqueueSnackbar: (message: string, options: { variant: "error" | "success" }) => void,
//   setSubmitting: (submitting: boolean) => void
// ) => {
//   try {
//     const res = await signIn("credentials", {
//       redirect: false,
//       email,
//       password,
//       isAdminRoute: true,
//     });

//     if (res?.error) {
//       enqueueSnackbar(res.error, { variant: "error" });
//       throw new Error(res.error);
//     } else {
//       enqueueSnackbar("Admin login successful!", { variant: "success" });
//       console.log("Admin login response:", res);
//     }
//   } catch (error) {
//     console.error("Admin login error:", error);
//     throw error;
//   } finally {
//     setSubmitting(false);
//   }
// };

import { signIn, getSession } from "next-auth/react";
import { AppDispatch } from "@/app/redux/store";
import { setMember } from "@/app/redux/slices/authSlice";
import { getCookie } from "typescript-cookie";
import { IChurchMember } from "@/app/types/user";
import { useRouter } from "next/navigation";

export const loginAdmin = async (
  email: string,
  password: string,
  enqueueSnackbar: (
    message: string,
    options: { variant: "error" | "success" }
  ) => void,
  setSubmitting: (submitting: boolean) => void,
  dispatch: AppDispatch,
  router?: ReturnType<typeof useRouter>
) => {
  try {
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      isAdminRoute: true,
    });

    if (res?.error) {
      enqueueSnackbar(res.error, { variant: "error" });
      throw new Error(res.error);
    } else {
      // enqueueSnackbar("Admin login successful!", { variant: "success" });

      // Wait for session to update
      const session = await getSession();
      const token = getCookie("authToken");
      console.log("Session:", session);
      console.log("Token:", token);

      if (token &&session?.user) {
        const user = session.user as {
          email: string;
          firstName: string;
          lastName: string;
          profilePicture: string;
          role: "admin" | "member";
        };
        const churchAdmin: IChurchMember = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          profilePicture: user.profilePicture,
        };

        // Dispatch the action
        dispatch(
          setMember({
            member: churchAdmin,
            token,
            role: user.role || "admin", // Use the role here
          })
        );
      }

      // console.log("Session user:", session?.user);

      if (router) {
        router.replace("/dashboard/home");
      }
    }
  } catch (error) {
    console.error("Admin login error:", error);
    enqueueSnackbar(
      error instanceof Error ? error.message : "An unknown error occurred.",
      { variant: "error" }
    );
    throw error;
  } finally {
    setSubmitting(false);
  }
};
