/*
  Warnings:

  - You are about to drop the column `dataCadastro` on the `Comentario` table. All the data in the column will be lost.
  - You are about to drop the column `dataCadastro` on the `Foto` table. All the data in the column will be lost.
  - You are about to drop the column `bairro` on the `Ponto` table. All the data in the column will be lost.
  - You are about to drop the column `cep` on the `Ponto` table. All the data in the column will be lost.
  - You are about to drop the column `cidade` on the `Ponto` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `Ponto` table. All the data in the column will be lost.
  - You are about to drop the column `numero` on the `Ponto` table. All the data in the column will be lost.
  - You are about to drop the column `rua` on the `Ponto` table. All the data in the column will be lost.
  - You are about to drop the column `dataCadastro` on the `Usuario` table. All the data in the column will be lost.
  - Added the required column `usuarioId` to the `Comentario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioId` to the `Foto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endereco` to the `Ponto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioId` to the `Ponto` table without a default value. This is not possible if the table is not empty.
  - Made the column `latitude` on table `Ponto` required. This step will fail if there are existing NULL values in that column.
  - Made the column `longitude` on table `Ponto` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Comentario" DROP CONSTRAINT "Comentario_pontoId_fkey";

-- DropForeignKey
ALTER TABLE "Foto" DROP CONSTRAINT "Foto_pontoId_fkey";

-- AlterTable
ALTER TABLE "Comentario" DROP COLUMN "dataCadastro",
ADD COLUMN     "usuarioId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Foto" DROP COLUMN "dataCadastro",
ADD COLUMN     "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "usuarioId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Ponto" DROP COLUMN "bairro",
DROP COLUMN "cep",
DROP COLUMN "cidade",
DROP COLUMN "estado",
DROP COLUMN "numero",
DROP COLUMN "rua",
ADD COLUMN     "endereco" TEXT NOT NULL,
ADD COLUMN     "usuarioId" INTEGER NOT NULL,
ALTER COLUMN "latitude" SET NOT NULL,
ALTER COLUMN "longitude" SET NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "dataCadastro",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Ponto" ADD CONSTRAINT "Ponto_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_pontoId_fkey" FOREIGN KEY ("pontoId") REFERENCES "Ponto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Foto" ADD CONSTRAINT "Foto_pontoId_fkey" FOREIGN KEY ("pontoId") REFERENCES "Ponto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Foto" ADD CONSTRAINT "Foto_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
