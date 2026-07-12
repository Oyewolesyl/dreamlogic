import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminToken, configuredPassword, passwordMatches } from "../../adminAuth";

export async function POST(request: Request) {
  if (!configuredPassword()) {
    return NextResponse.json({ error: "admin password is not configured" }, { status: 503 });
  }

  const body = await request.json().catch(() => ({}));
  if (!passwordMatches(String(body.password ?? ""))) {
    return NextResponse.json({ error: "invalid password" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, adminToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 12,
    path: "/"
  });
  return response;
}
