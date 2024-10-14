/*
  Warnings:

  - The `type` column on the `Person` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Person" DROP COLUMN "type",
ADD COLUMN     "type" TEXT;

-- DropEnum
DROP TYPE "Type";
