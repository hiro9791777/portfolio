import { NextRequest, NextResponse } from "next/server";

const BASIC_USER = process.env.BASIC_AUTH_USER;
const BASIC_PASSWORD = process.env.BASIC_AUTH_PASSWORD;

export function proxy(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  if (!BASIC_USER || !BASIC_PASSWORD) {
    return NextResponse.next();
  }

  if (authHeader) {
    const authValue = authHeader.split(" ")[1];
    const [user, password] = atob(authValue).split(":");

    if (user === BASIC_USER && password === BASIC_PASSWORD) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Protected Area"',
    },
  });
}

export const config = {
  matcher: ["/works/:path*"],
};
