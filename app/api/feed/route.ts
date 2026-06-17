import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { cookies } from "next/headers";

export async function GET() {

  const cookieStore = await cookies();
  const usuarioCookie = cookieStore.get("usuario");

  if (!usuarioCookie) {
    return NextResponse.json([]);
  }

  const usuario = JSON.parse(usuarioCookie.value);

  const pontos = await prisma.ponto.findMany({
    where: {
      usuarioId: usuario.id 
    },
    include: {
      usuario: true,
      fotos: true,
      comentarios: {
        include: {
          usuario: true
        }
      }
    },
    orderBy: {
      dataCadastro: "desc"
    }
  });

  return NextResponse.json(pontos);
}