import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req: NextRequest) {
  const authPages = ["/member/login", "/member/register"];
  const protectedPages = ["/dashboard", "/settings"];

  const sessionToken = req.cookies.get("authToken");
  const token = sessionToken?.value;
  const pathname = req.nextUrl.pathname;

  // ✅ Prevent infinite redirect loop on login & register pages
  const isAuthPage = authPages.includes(pathname);
  const isProtectedPage = protectedPages.includes(pathname);

  // ✅ Handle case where cookie exists but is empty
  if (sessionToken && !token) {
    console.log("Auth cookie is present but empty. Redirecting...");
    if (!isAuthPage) {
      return NextResponse.redirect(new URL("/member/login", req.url));
    }
  }

  // ✅ Redirect authenticated users away from login/register pages
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard/home", req.url));
  }

  // ✅ Redirect to login only if accessing a protected page AND not already on login/register
  if (!token && isProtectedPage && !isAuthPage) {
    return NextResponse.redirect(new URL("/member/login", req.url));
  }

  // ✅ Validate token if present
  if (token) {
    try {
      const { payload } = await jwtVerify(token, secretKey);
      const currentTimestamp = Math.floor(Date.now() / 1000);

      // ✅ Redirect to login if token has expired
      if (payload.exp && payload.exp < currentTimestamp) {
        console.log("Token has expired");
        if (!isAuthPage) {
          return NextResponse.redirect(new URL("/member/login", req.url));
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Invalid token:", error.message);
      } else {
        console.error("Unknown error during token verification:", error);
      }

      if (!isAuthPage) {
        return NextResponse.redirect(new URL("/member/login", req.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/(.*)", "/member/login", "/member/register"],
};
