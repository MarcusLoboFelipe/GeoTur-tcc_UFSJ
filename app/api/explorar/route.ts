import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const usuarioCookie = cookieStore.get("usuario");

  if (!usuarioCookie) return NextResponse.json([]);

  const usuario = JSON.parse(usuarioCookie.value);

  const seguindo = await prisma.seguidor.findMany({
    where: {
      seguidorId: usuario.id,
    },
    select: {
      seguindoId: true,
    },
  });

  const idsSeguindo = seguindo.map((s) => s.seguindoId);

  const pontos = await prisma.ponto.findMany({
    where: {
      usuarioId: { in: idsSeguindo }, 
    },
    include: {
      usuario: true,
      fotos: true,
      comentarios: {
        include: { usuario: true },
      },
    },
    orderBy: {
      dataCadastro: "desc",
    },
  });

  return NextResponse.json(pontos);
}