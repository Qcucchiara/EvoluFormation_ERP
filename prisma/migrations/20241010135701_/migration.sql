/*
  Warnings:

  - You are about to drop the column `company_id` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `module_id` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `person_id` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `ressource_id` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `entity_id` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entity_type` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EntityType" AS ENUM ('COMPANY', 'RESSOURCE', 'MODULE', 'PERSON');

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_company_id_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_module_id_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_person_id_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_ressource_id_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "company_id",
DROP COLUMN "module_id",
DROP COLUMN "person_id",
DROP COLUMN "ressource_id",
ADD COLUMN     "entity_id" TEXT NOT NULL,
ADD COLUMN     "entity_type" "EntityType" NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "comment_company_fkey" FOREIGN KEY ("entity_id") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "comment_ressource_fkey" FOREIGN KEY ("entity_id") REFERENCES "Ressource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "comment_module_fkey" FOREIGN KEY ("entity_id") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "comment_person_fkey" FOREIGN KEY ("entity_id") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;
