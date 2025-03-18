import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req: NextRequest) {
  const authPages = ["/login", "/register"];
  const protectedPages = ["/dashboard"];

  const token = req.cookies.get("authToken")?.value;
  const pathname = req.nextUrl.pathname;

  // Redirect authenticated users away from login/register pages
  if (token && authPages.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // ✅ Redirect to login if trying to access a protected page without a token
  if (!token && protectedPages.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Validate token if present
  if (token) {
    try {
      const { payload } = await jwtVerify(token, secretKey);
      const currentTimestamp = Math.floor(Date.now() / 1000);

      // ✅ Redirect to login if token has expired
      if (payload.exp && payload.exp < currentTimestamp) {
        console.log("Token has expired");
        return NextResponse.redirect(new URL("/login", req.url));
      }
    } catch (error) {
      console.error("Invalid token:", error instanceof Error ? error.message : error);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/login", "/register"],
};
