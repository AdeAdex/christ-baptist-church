import { FormValues } from "../types/registration";

// app/actions/register.ts
export const registerUser = async (values: FormValues) => {
        try {
          const response = await fetch("/api/user/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          });
      
          const data = await response.json();
          if (!response.ok) throw new Error(data.message || "Registration failed");
      
          return { success: true, message: "Registration successful!" };
        } catch (error) {
          return {
            success: false,
            message: error instanceof Error ? error.message : "Unknown error occurred",
          };
        }
      };
      