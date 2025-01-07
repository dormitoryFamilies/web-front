import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/admin") {
    if (request.cookies.get("role")?.value === "ROLE_ADMIN") {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (request.nextUrl.pathname === "/alarm") {
    if (request.cookies.get("role")?.value === "ROLE_MEMBER" || request.cookies.get("role")?.value === "ROLE_ADMIN") {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (request.nextUrl.pathname === "/board") {
    if (request.cookies.get("role")?.value === "ROLE_MEMBER" || request.cookies.get("role")?.value === "ROLE_ADMIN") {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (request.nextUrl.pathname === "/chat") {
    if (request.cookies.get("role")?.value === "ROLE_MEMBER" || request.cookies.get("role")?.value === "ROLE_ADMIN") {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (request.nextUrl.pathname === "/home") {
    if (request.cookies.get("role")?.value === "ROLE_MEMBER" || request.cookies.get("role")?.value === "ROLE_ADMIN") {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (request.nextUrl.pathname === "/mypage") {
    if (request.cookies.get("role")?.value === "ROLE_MEMBER" || request.cookies.get("role")?.value === "ROLE_ADMIN") {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (request.nextUrl.pathname === "/room-mate") {
    if (request.cookies.get("role")?.value === "ROLE_MEMBER" || request.cookies.get("role")?.value === "ROLE_ADMIN") {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/onboarding", "/admin", "/alarm", "/board", "/chat", "/home", "/mypage", "/room-mate"],
};
