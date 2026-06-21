import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { enviarEmail } from "../../../lib/email";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
const email = body.email;


    const usuario = await prisma.usuario.findUnique({
      where: { email: body.email },
    });

    if (!usuario) {
      return NextResponse.json({ sucesso: true });
    }

    const token = crypto.randomBytes(32).toString("hex");

    const expires = new Date(Date.now() + 1000 * 60 * 60);

    await prisma.usuario.update({
      where: { id: usuario.id },
      data: {
        resetToken: token,
        resetExpires: expires,
      },
    });
const link = `http://localhost:3000/resetar-senha?token=${token}`;
    
await enviarEmail(
  email,
  "Recuperação de senha - Minhas Memórias",
  `
  <div style="background:#f3f4f6; padding:40px 0; font-family:Arial, sans-serif;">

    <div style="max-width:500px; margin:0 auto; background:white; padding:30px; border-radius:10px; box-shadow:0 2px 8px rgba(0,0,0,0.05);">

      <h2 style="margin-bottom:20px;">Recuperação de senha</h2>

      <p style="margin-bottom:20px;">
        Você solicitou a redefinição da sua senha no <strong>Minhas Memórias</strong>.
      </p>

      <div style="text-align:center; margin:25px 0;">
        <a href="${link}" 
           style="background:#2563eb; color:white; padding:12px 20px; text-decoration:none; border-radius:6px; display:inline-block;">
          Redefinir senha
        </a>
      </div>

      <hr style="margin:25px 0; border:none; border-top:1px solid #e5e7eb;" />

      <p style="font-size:12px; color:#666;">
        Se você não solicitou esta ação, ignore este email.
      </p>

    </div>

  </div>
  `
);

    return NextResponse.json({ sucesso: true });

  } catch (error) {
    return NextResponse.json(
      { erro: "Erro ao processar solicitação" },
      { status: 500 }
    );
  }
}
