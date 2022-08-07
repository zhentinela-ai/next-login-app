import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const jwt = request.cookies.get("myTokenName");

  // if (request.nextUrl.pathname.includes("/dashboard")) {}
  if (jwt === undefined) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const { paylaod } = await jwtVerify(
      jwt,
      new TextEncoder().encode("secret")
    );
    console.log(paylaod);
    return NextResponse.next();
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ['/dashboard:path*', '/', '/admin/:path*']
}