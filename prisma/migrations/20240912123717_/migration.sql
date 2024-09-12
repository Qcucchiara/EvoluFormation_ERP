-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quality" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Person" (
    "id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "cities_of_activity" TEXT[],
    "civility" TEXT,
    "phone" TEXT,
    "birth_date" TEXT,
    "birth_city" TEXT,
    "city" TEXT,
    "street" TEXT,
    "postal_code" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company_has_contact" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "quality" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_has_contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "siret" TEXT,
    "street" TEXT,
    "postal_code" TEXT,
    "city" TEXT,
    "website_link" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Module_has_trainer" (
    "id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "module_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Module_has_trainer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Module" (
    "id" TEXT NOT NULL,
    "speciality_bpf_id" TEXT NOT NULL,
    "objective_bpf_id" TEXT NOT NULL,
    "training_objective_id" TEXT,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "website_link" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Speciality_bpf" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "number" INTEGER NOT NULL,

    CONSTRAINT "Speciality_bpf_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Objective_bpf" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "number" INTEGER NOT NULL,

    CONSTRAINT "Objective_bpf_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Training_objective" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Training_objective_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ressource" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "adress" TEXT,
    "postal_code" TEXT,
    "city" TEXT,
    "acquisition_date" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ressource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "company_id" TEXT,
    "person_id" TEXT,
    "module_id" TEXT,
    "ressource_id" TEXT,
    "title" TEXT,
    "content" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment_category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "is_unique" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Comment_category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Person_email_key" ON "Person"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Person_phone_key" ON "Person"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Module_speciality_bpf_id_key" ON "Module"("speciality_bpf_id");

-- CreateIndex
CREATE UNIQUE INDEX "Module_objective_bpf_id_key" ON "Module"("objective_bpf_id");

-- CreateIndex
CREATE UNIQUE INDEX "Module_training_objective_id_key" ON "Module"("training_objective_id");

-- CreateIndex
CREATE UNIQUE INDEX "Comment_category_name_key" ON "Comment_category"("name");

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company_has_contact" ADD CONSTRAINT "Company_has_contact_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company_has_contact" ADD CONSTRAINT "Company_has_contact_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Module_has_trainer" ADD CONSTRAINT "Module_has_trainer_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Module_has_trainer" ADD CONSTRAINT "Module_has_trainer_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_speciality_bpf_id_fkey" FOREIGN KEY ("speciality_bpf_id") REFERENCES "Speciality_bpf"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_objective_bpf_id_fkey" FOREIGN KEY ("objective_bpf_id") REFERENCES "Objective_bpf"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_training_objective_id_fkey" FOREIGN KEY ("training_objective_id") REFERENCES "Training_objective"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Comment_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_ressource_id_fkey" FOREIGN KEY ("ressource_id") REFERENCES "Ressource"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "Module"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;
