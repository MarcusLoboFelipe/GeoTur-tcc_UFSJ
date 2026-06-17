import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const comentario = await prisma.comentario.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!comentario) {
    return NextResponse.json(
      { error: "Comentário não encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json(comentario);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  const comentario = await prisma.comentario.update({
    where: {
      id: Number(id),
    },
    data: {
      texto: body.texto,
    },
  });

  return NextResponse.json(comentario);
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.comentario.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json({ ok: true });
}