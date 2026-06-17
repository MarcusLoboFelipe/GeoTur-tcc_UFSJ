import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

function getUsuarioId(request: Request) {
  const cookie = request.headers.get("cookie");

  if (!cookie) return null;

  const usuarioCookie = cookie
    .split("; ")
    .find((row) => row.startsWith("usuario="));

  if (!usuarioCookie) return null;

  const dados = JSON.parse(
    decodeURIComponent(usuarioCookie.split("=")[1])
  );

  return dados.id;
}

export async function GET(request: Request) {
  const usuarioId = getUsuarioId(request);

  if (!usuarioId) {
    return NextResponse.json({ erro: "Não autorizado" }, { status: 401 });
  }

  const usuarios = await prisma.usuario.findMany({
    where: {
      NOT: { id: usuarioId }
    },
    select: {
      id: true,
      nome: true
    }
  });

  const seguindo = await prisma.seguidor.findMany({
    where: {
      seguidorId: usuarioId
    },
    select: {
      seguindoId: true
    }
  });

  return NextResponse.json({
    usuarios,
    seguindo: seguindo.map((s) => s.seguindoId)
  });
}

export async function POST(request: Request) {
  const usuarioId = getUsuarioId(request);

  if (!usuarioId) {
    return NextResponse.json({ erro: "Não autorizado" }, { status: 401 });
  }

  const body = await request.json();
  const { seguindoId } = body;

  if (!seguindoId) {
    return NextResponse.json({ erro: "ID inválido" }, { status: 400 });
  }

  await prisma.seguidor.create({
    data: {
      seguidorId: usuarioId,
      seguindoId
    }
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  const usuarioId = getUsuarioId(request);

  if (!usuarioId) {
    return NextResponse.json({ erro: "Não autorizado" }, { status: 401 });
  }

  const body = await request.json();
  const { seguindoId } = body;

  await prisma.seguidor.deleteMany({
    where: {
      seguidorId: usuarioId,
      seguindoId
    }
  });

  return NextResponse.json({ ok: true });
}