import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const ponto = await prisma.ponto.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!ponto) {
    return NextResponse.json(
      { error: "Ponto não encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    ...ponto,
    dataCadastro: ponto.dataCadastro.toISOString().split("T")[0],
  });
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  const latitude = Number(body.latitude);
  const longitude = Number(body.longitude);

  const endereco = [
    body.rua,
    body.numero,
    body.bairro,
    body.cidade,
    body.estado,
    body.cep,
  ]
    .filter(Boolean)
    .join(", ");

  const pontoAtualizado = await prisma.ponto.update({
    where: {
      id: Number(id),
    },
    data: {
      nome: body.nome,
      descricao: body.descricao,
      endereco,
      latitude,
      longitude,
    },
  });

  return NextResponse.json({
    ...pontoAtualizado,
    dataCadastro: pontoAtualizado.dataCadastro
      .toISOString()
      .split("T")[0],
  });
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.ponto.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json({ ok: true });
}