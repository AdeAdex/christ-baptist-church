export const registerAdmin = async (values: any) => {
        try {
          const res = await fetch("/api/admin/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          });
      
          const data = await res.json();
          if (!res.ok) throw new Error(data.message);
      
          return { success: true, message: data.message };
        } catch (error: unknown) {
          let errorMessage = "Something went wrong";
      
          if (error instanceof Error) {
            errorMessage = error.message;
          }
      
          return { success: false, message: errorMessage };
        }
      };
      