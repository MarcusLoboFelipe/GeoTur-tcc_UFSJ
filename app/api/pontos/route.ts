import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { cookies } from "next/headers";

export async function GET() {

  const cookieStore = await cookies();
  const usuario = JSON.parse(cookieStore.get("usuario")?.value || "{}");

  const pontos = await prisma.ponto.findMany({
    where: {
      usuarioId: usuario.id
    },
    orderBy: {
      id: "desc"
    }
  });

  return NextResponse.json(pontos);
}

export async function POST(req: Request) {

  const body = await req.json();

  const cookieStore = await cookies();
  const usuario = JSON.parse(cookieStore.get("usuario")?.value || "{}");


  const enderecoCompleto = `${body.rua}, ${body.numero}, ${body.bairro}, ${body.cidade}, ${body.estado}, ${body.cep}`;


  const ponto = await prisma.ponto.create({
    data: {
      nome: body.nome,
      descricao: body.descricao,
      endereco: enderecoCompleto,
      latitude: body.latitude,
      longitude: body.longitude,
      usuarioId: usuario.id
    }
  });

  return NextResponse.json(ponto);
}