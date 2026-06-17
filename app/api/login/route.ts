import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {

  const body = await req.json();

  const usuario = await prisma.usuario.findUnique({
    where: { email: body.email }
  });

  if (!usuario) {
    return NextResponse.json(
      { erro: "Usuário não encontrado" },
      { status: 401 }
    );
  }

  const senhaValida = await bcrypt.compare(
    body.senha,
    usuario.senha
  );

  if (!senhaValida) {
    return NextResponse.json(
      { erro: "Senha inválida" },
      { status: 401 }
    );
  }

  const response = NextResponse.json({
    nome: usuario.nome
  });

  response.cookies.set("usuario", JSON.stringify({
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email
  }));

  return response;
}

