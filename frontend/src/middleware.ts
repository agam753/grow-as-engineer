import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface JwtPayload {
  exp: number;
  _id: string;
  username: string;
  email: string;
  fullName: string;
}

export function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get("accessToken")?.value;
    if (!token) {
      throw (new Error("No token found"), { status: 101 });
    }
    const decodedToken = jwtDecode<JwtPayload>(token);
    const expiryTime = decodedToken.exp * 1000;
    const currentTime = Date.now();

    if (currentTime >= expiryTime) {
      throw (new Error("Token expired"), { status: 101 });
    }
  } catch (error) {
    console.log(error);
    const loginUrl = new URL("/dashboard/login", request.nextUrl.origin);
    return NextResponse.redirect(loginUrl.toString());
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/jobs", "/dashboard/users", "/dashboard"],
};
