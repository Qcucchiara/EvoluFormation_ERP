-- AlterTable
ALTER TABLE "Person" ADD COLUMN     "is_blacklisted" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Shortcuts" (
    "id" TEXT NOT NULL,
    "person_id" TEXT,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "icon" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Shortcuts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Shortcuts" ADD CONSTRAINT "Shortcuts_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;
