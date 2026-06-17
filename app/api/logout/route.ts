import { NextResponse } from "next/server";

export async function POST() {

  const response = NextResponse.redirect(
    new URL("/login", "http://localhost:3000")
  );

  response.cookies.set("usuario", "", {
    expires: new Date(0),
    path: "/"
  });

  return response;
}