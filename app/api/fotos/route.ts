import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url);
  const pontoId = Number(searchParams.get("pontoId"));

  const fotos = await prisma.foto.findMany({
    where: { pontoId },
    include: { usuario: true },
    orderBy: { id: "desc" }
  });

  return NextResponse.json(fotos);
}

export async function POST(req: Request) {

  try {

    const formData = await req.formData();

    const file = formData.get("file") as File;
    const pontoId = Number(formData.get("pontoId"));

    if (!file) {
      return NextResponse.json(
        { erro: "Arquivo não enviado" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const usuario = JSON.parse(cookieStore.get("usuario")?.value || "{}");

    if (!usuario?.id) {
      return NextResponse.json(
        { erro: "Usuário não autenticado" },
        { status: 401 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const nomeArquivo = Date.now() + "_" + file.name;

    const caminho = path.join(
      process.cwd(),
      "public",
      "uploads",
      nomeArquivo
    );

    fs.writeFileSync(caminho, buffer);

    const foto = await prisma.foto.create({
      data: {
        url: `/uploads/${nomeArquivo}`,
        pontoId: pontoId,
        usuarioId: usuario.id
      }
    });

    return NextResponse.json(foto);

  } catch (error) {

    return NextResponse.json(
      { erro: "Erro ao salvar foto" },
      { status: 500 }
    );

  }
}