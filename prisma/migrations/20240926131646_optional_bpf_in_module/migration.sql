/*
  Warnings:

  - Changed the type of `amount` on the `Module` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Module" DROP CONSTRAINT "Module_objective_bpf_id_fkey";

-- DropForeignKey
ALTER TABLE "Module" DROP CONSTRAINT "Module_speciality_bpf_id_fkey";

-- AlterTable
ALTER TABLE "Module" ALTER COLUMN "speciality_bpf_id" DROP NOT NULL,
ALTER COLUMN "objective_bpf_id" DROP NOT NULL,
DROP COLUMN "amount",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL;

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_speciality_bpf_id_fkey" FOREIGN KEY ("speciality_bpf_id") REFERENCES "Speciality_bpf"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_objective_bpf_id_fkey" FOREIGN KEY ("objective_bpf_id") REFERENCES "Objective_bpf"("id") ON DELETE SET NULL ON UPDATE CASCADE;
