import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function enviarEmail(destino: string, assunto: string, html: string) {
  await transporter.sendMail({
    from: `"GeoTur" <${process.env.EMAIL_USER}>`,
    to: destino,
    subject: assunto,
    html,
  });
}
