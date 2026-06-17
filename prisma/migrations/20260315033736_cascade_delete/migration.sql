-- DropForeignKey
ALTER TABLE "Comentario" DROP CONSTRAINT "Comentario_pontoId_fkey";

-- DropForeignKey
ALTER TABLE "Comentario" DROP CONSTRAINT "Comentario_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "Foto" DROP CONSTRAINT "Foto_pontoId_fkey";

-- DropForeignKey
ALTER TABLE "Foto" DROP CONSTRAINT "Foto_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "Ponto" DROP CONSTRAINT "Ponto_usuarioId_fkey";

-- AddForeignKey
ALTER TABLE "Ponto" ADD CONSTRAINT "Ponto_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_pontoId_fkey" FOREIGN KEY ("pontoId") REFERENCES "Ponto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Foto" ADD CONSTRAINT "Foto_pontoId_fkey" FOREIGN KEY ("pontoId") REFERENCES "Ponto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Foto" ADD CONSTRAINT "Foto_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
