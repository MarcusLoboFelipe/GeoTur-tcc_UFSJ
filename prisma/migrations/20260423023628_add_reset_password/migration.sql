-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "resetExpires" TIMESTAMP(3),
ADD COLUMN     "resetToken" TEXT;
