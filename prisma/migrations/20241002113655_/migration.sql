/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Ressource_type` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Ressource_type` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ressource_type" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Ressource_type_slug_key" ON "Ressource_type"("slug");
