import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest){

  const usuario = req.cookies.get("usuario");

  if(!usuario && req.nextUrl.pathname.startsWith("/pontos")){
    return NextResponse.redirect(new URL("/login",req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/pontos/:path*"]
};