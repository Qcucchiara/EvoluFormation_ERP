-- CreateEnum
CREATE TYPE "Type" AS ENUM ('EMPLOYEE', 'JOB_SEEKER', 'BUSINESS_MANAGER', 'SELF_FINANCING', 'RH', 'CADRE', 'TRAINING_MANAGER');

-- AlterTable
ALTER TABLE "Person" ADD COLUMN     "type" "Type";
