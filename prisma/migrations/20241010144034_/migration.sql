/*
  Warnings:

  - You are about to drop the column `authTimeout` on the `IMAP` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "IMAP" DROP COLUMN "authTimeout";

-- CreateTable
CREATE TABLE "SMTP" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "host" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SMTP_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SMTP_userId_key" ON "SMTP"("userId");

-- AddForeignKey
ALTER TABLE "SMTP" ADD CONSTRAINT "SMTP_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
