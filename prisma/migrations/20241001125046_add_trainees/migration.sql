/*
  Warnings:

  - You are about to drop the `Company_has_contact` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Company_has_contact" DROP CONSTRAINT "Company_has_contact_company_id_fkey";

-- DropForeignKey
ALTER TABLE "Company_has_contact" DROP CONSTRAINT "Company_has_contact_person_id_fkey";

-- AlterTable
ALTER TABLE "Person" ADD COLUMN     "note" TEXT;

-- DropTable
DROP TABLE "Company_has_contact";

-- CreateTable
CREATE TABLE "Company_has_person" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "quality" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_has_person_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Company_has_person" ADD CONSTRAINT "Company_has_person_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company_has_person" ADD CONSTRAINT "Company_has_person_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
