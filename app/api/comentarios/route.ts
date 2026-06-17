import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { cookies } from "next/headers";

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url);
  const pontoId = Number(searchParams.get("pontoId"));

  const comentarios = await prisma.comentario.findMany({
    where: {
      pontoId: pontoId
    },
    include: {
      usuario: true
    },
    orderBy: {
      id: "desc"
    }
  });

  return NextResponse.json(
    comentarios.map((c) => {

      const data = new Date(c.createdAt);

      const dataFormatada =
        data.getDate().toString().padStart(2, "0") +
        "/" +
        (data.getMonth() + 1).toString().padStart(2, "0") +
        "/" +
        data.getFullYear();

      return {
        ...c,
        createdAt: dataFormatada
      };
    })
  );
}

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const cookieStore = await cookies();
    const usuario = JSON.parse(cookieStore.get("usuario")?.value || "{}");

    if (!usuario?.id) {
      return NextResponse.json(
        { erro: "Usuário não autenticado" },
        { status: 401 }
      );
    }

    const comentario = await prisma.comentario.create({
      data: {
        texto: body.texto,
        pontoId: Number(body.pontoId),
        usuarioId: usuario.id
      }
    });

    return NextResponse.json(comentario);

  } catch (error) {

    return NextResponse.json(
      { erro: "Erro ao criar comentário" },
      { status: 500 }
    );

  }
}

