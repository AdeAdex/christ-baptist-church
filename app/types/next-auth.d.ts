// /app/types/next-auth.d.ts

declare module "next-auth" {
    interface Session {
      user: {
        _id: string;
        email: string;
        firstName: string;
        lastName: string;
        profilePicture: string;
        role: "member" | "admin";
        userName: string;
        isAdmin: boolean;
      };
      expires: string;
    }
}
