/*
  Warnings:

  - You are about to drop the column `type` on the `Ressource` table. All the data in the column will be lost.
  - Added the required column `type_id` to the `Ressource` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ressource" DROP COLUMN "type",
ADD COLUMN     "type_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Ressource_type" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Ressource_type_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ressource" ADD CONSTRAINT "Ressource_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "Ressource_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
