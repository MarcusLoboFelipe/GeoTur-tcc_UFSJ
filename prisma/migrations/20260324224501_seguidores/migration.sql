/*
  Warnings:

  - You are about to drop the column `resetToken` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `resetTokenExp` on the `Usuario` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Usuario_resetToken_key";

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "resetToken",
DROP COLUMN "resetTokenExp";

-- CreateTable
CREATE TABLE "Seguidor" (
    "id" SERIAL NOT NULL,
    "seguidorId" INTEGER NOT NULL,
    "seguindoId" INTEGER NOT NULL,

    CONSTRAINT "Seguidor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Seguidor_seguidorId_seguindoId_key" ON "Seguidor"("seguidorId", "seguindoId");

-- AddForeignKey
ALTER TABLE "Seguidor" ADD CONSTRAINT "Seguidor_seguidorId_fkey" FOREIGN KEY ("seguidorId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seguidor" ADD CONSTRAINT "Seguidor_seguindoId_fkey" FOREIGN KEY ("seguindoId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
