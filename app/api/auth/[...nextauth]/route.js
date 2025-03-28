// app/api/auth/[...nextauth]/route.js

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import ChurchMember from "@/app/models/churchMember.model";
import ChurchAdmin from "@/app/models/churchAdmin.model"; // ✅ Import ChurchAdmin model
import { connectToDb } from "@/app/utils/database";
import { comparePassword } from "@/app/utils/bcrypt";
import { generateToken } from "@/app/utils/jwtUtils";
import { cookies } from "next/headers";
import { generateUsername } from "@/app/utils/generateUsername";
// import logActivity from "../../../utils/activityLogger";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    CredentialsProvider({
      credentials: {},
      async authorize(credentials) {
        try {
          await connectToDb();

          const isAdminRoute = credentials?.isAdminRoute === "true"; // ✅ Ensure correct boolean value

          return await handleAuthentication(
            credentials,
            null,
            "form",
            isAdminRoute
          );
        } catch (error) {
          console.error("Error during authorization:", error.message);
          throw new Error(error.message);
        }
      },
    }),
  ],
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  pages: {
    signIn: "/",
    error: "/member/login"
  },
  callbacks: {
    async session({ session }) {
      try {
        await connectToDb();

        // Find user in either ChurchMember or ChurchAdmin
        const sessionUser =
          (await ChurchMember.findOne({ email: session.user.email })) ||
          (await ChurchAdmin.findOne({ email: session.user.email })); // ✅ Check admins too

        if (sessionUser) {
          session.user._id = sessionUser._id.toString();
          session.user.firstName = sessionUser.firstName;
          session.user.lastName = sessionUser.lastName;
          session.user.userName = sessionUser.userName;
          session.user.profilePicture = sessionUser.profilePicture;
          session.user.isAdmin = sessionUser instanceof ChurchAdmin; // ✅ Correct admin flag check
        }

        return session;
      } catch (error) {
        console.error("Error retrieving user details:", error);
        return session;
      }
    },
    async signIn({ profile, account }) {
      try {
        if (account.provider !== "credentials") {
          await connectToDb();
          return await handleAuthentication(null, profile, account.provider);
        }
        return true;
      } catch (error) {
        console.error("Error occurred during signIn:", error);
        throw new Error(error.message);
      }
    },
  },
});

async function handleAuthentication(
  credentials,
  profile,
  provider,
  isAdminRoute = false
) {
  try {
    await connectToDb();

    if (credentials && credentials.email && credentials.password) {
      const { email, password } = credentials;
      // console.log("credentials", credentials);

      // Check if the user exists in ChurchMember
      const memberUser = await ChurchMember.findOne({
        $or: [{ email: email }, { userName: email }, { phoneNumber: email }],
      });

      // Check if the user exists in ChurchAdmin
      const adminUser = await ChurchAdmin.findOne({
        $or: [{ email: email }, { userName: email }],
      });

      // 🚨 Prevent cross-role login
      if (memberUser && adminUser) {
        throw new Error(
          "Account conflict detected: Your email exists in both member and admin records. Please contact support for assistance."
        );
      }
      if (isAdminRoute && memberUser) {
        throw new Error("Access denied: You do not have admin privileges.");
      }
      if (!isAdminRoute && adminUser) {
        console.error("Admin trying to log in from member route");
        throw new Error(
          "Admins must log in through the admin portal. Please use the correct login page."
        );
      }

      // Determine the correct user
      const user = memberUser || adminUser;
      if (!user) {
        throw new Error("Login failed: No account found with the provided credentials.");
      }


      // 🚨 Check email verification before allowing login
      if (!user.isEmailVerified) {
        throw new Error("Your email is not verified. Please check your inbox to verify your email.");
      }

      if (user.socialId && !user.password) {
        throw new Error(
          "This account was created using a social login (Google/Facebook). Please log in using the same method."
        );
      }

      const passwordMatch = await comparePassword(password, user.password);
      if (!passwordMatch) {
        throw new Error("Invalid credentials: The email or password entered is incorrect.");
      }

      const token = await generateToken({ email: user.email });
      const cookiesStore = await cookies();
      cookiesStore.set("authToken", token, {
        httpOnly: true,
        maxAge: 86400,
        path: "/",
        sameSite: "strict",
      });

      return {
        email: user.email,
        token,
        isAdmin: user instanceof ChurchAdmin, // ✅ Correctly detect admin role
        ...user.toObject(),
      };
    } else if (profile) {

      // console.log("✅ Profile received in handleAuthentication:", profile);
      if (!profile.email) {
        throw new Error("Authentication failed: No email address found in your profile.");
      }

      const adminExists = await ChurchAdmin.findOne({ email: profile.email });

      if (adminExists) {
        throw new Error(
          "Admin login restricted: Administrators must sign in using credentials, not Google/Facebook."
        );
      }

      let userExists = await ChurchMember.findOne({ email: profile.email });

      if (userExists && userExists.password) {
        throw new Error(
          "Account conflict: This email is already registered with a password. Please log in using your credentials."
        );
      }

      if (!userExists) {
        const nameParts = profile.name.split(" ");
        const lastName = nameParts.slice(1).join(" ");
        const firstName = nameParts[0];
        const profilePicture =
          profile.avatar_url ||
          (profile.picture && profile.picture.data
            ? profile.picture.data.url
            : profile.picture);
        const socialId = profile.id || profile.sub;

        const userName = await generateUsername(firstName, lastName);

        const newUser = new ChurchMember({
          email: profile.email,
          firstName,
          lastName,
          userName: userName,
          phoneNumber: profile.sub,
          profilePicture: profilePicture,
          socialId,
          password: null,
        });

        await newUser.save();
        userExists = await ChurchMember.findOne({ email: profile.email });
      }

      if (!userExists) {
        throw new Error(
          "Registration error: We were unable to save your account. Please try again later."
        );
      }


      // 🚨 Check email verification for social logins
      if (!userExists.isEmailVerified) {
        throw new Error("Your email is not verified. Please check your inbox to verify your email.");
      }

      const token = await generateToken({ email: userExists.email });
      const cookiesStore = await cookies();
      cookiesStore.set("authToken", token, {
        httpOnly: true,
        maxAge: 86400,
        path: "/",
      });

      return true;
    }
  } catch (error) {
    console.error("❌ Error in handleAuthentication:", error.message);
    throw new Error(error.message);
  }
}

export { handler as GET, handler as POST };
