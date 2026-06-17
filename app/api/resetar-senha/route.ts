import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token, senha } = body;

    const usuario = await prisma.usuario.findFirst({
      where: {
        resetToken: token,
        resetExpires: {
          gt: new Date(), 
        },
      },
    });

    if (!usuario) {
      return NextResponse.json(
        { erro: "Token inválido ou expirado." },
        { status: 400 }
      );
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    await prisma.usuario.update({
      where: { id: usuario.id },
      data: {
        senha: senhaHash,
        resetToken: null,
        resetExpires: null,
      },
    });

    return NextResponse.json({ sucesso: true });

  } catch (error) {
    return NextResponse.json(
      { erro: "Erro ao redefinir senha." },
      { status: 500 }
    );
  }
}