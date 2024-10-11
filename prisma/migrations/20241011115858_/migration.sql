/*
  Warnings:

  - The `type` column on the `Person` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('EMPLOYEE', 'JOB_SEEKER', 'BUSINESS_MANAGER', 'SELF_FINANCING', 'RH', 'CADRE', 'TRAINING_MANAGER');

-- AlterTable
ALTER TABLE "Person" DROP COLUMN "type",
ADD COLUMN     "type" "Type";
