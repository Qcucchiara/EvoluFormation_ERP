// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

// generator client {
//   provider = "prisma-client-js"
// }

// datasource db {
//   provider = "postgresql"
//   url      = env("DATABASE_URL")
// }

// model Role {
//   id   String @id @default(uuid())
//   name String
// }

// model User {
//   id         String   @id @default(uuid())
//   email      String
//   password   String
//   role_id    String
//   created_at DateTime @default(now())
//   updated_at DateTime @updatedAt
// }

// model Company {
//   id               String    @id @default(uuid())
//   name             String
//   adress           String
//   postal_code      String
//   primary_email    String
//   secondary_emails String[]
//   primary_phone    String
//   secondary_phones String[]
//   city             String
//   link             String
//   created_at       DateTime  @default(now())
//   updated_at       DateTime  @updatedAt
//   student          Student[]
// }

// model Student {
//   id          String   @id @default(uuid())
//   company_id  String
//   first_name  String
//   last_name   String
//   email       String
//   phone       String
//   birth_date  String
//   birth_place String
//   created_at  DateTime @default(now())
//   updated_at  DateTime @updatedAt
//   Company     Company  @relation(fields: [company_id], references: [id])
// }

// model Formation {
//   id               String   @id @default(uuid())
//   name             String
//   default_duration String
//   default_cost     String
//   max_student      String
//   created_at       DateTime @default(now())
//   updated_at       DateTime @updatedAt
// }

// model Instructor {
//   id         String                     @id @default(uuid())
//   first_name String
//   last_name  String
//   email      String
//   phone      String
//   created_at DateTime                   @default(now())
//   updated_at DateTime                   @updatedAt
//   expertise  Instructor_has_Expertise[]
//   schedule   Schedule_section[]
// }

// model Instructor_has_Expertise {
//   id            String     @id @default(uuid())
//   instructor_id String
//   expertise_id  String
//   created_at    DateTime   @default(now())
//   updated_at    DateTime   @updatedAt
//   Instructor    Instructor @relation(fields: [instructor_id], references: [id])
//   Expertise     Expertise  @relation(fields: [expertise_id], references: [id])
// }

// model Expertise {
//   id         String                     @id @default(uuid())
//   name       String
//   created_at DateTime                   @default(now())
//   updated_at DateTime                   @updatedAt
//   instructor Instructor_has_Expertise[]
// }

// model Schedule_section {
//   id            String     @id @default(uuid())
//   instructor_id String
//   start         String
//   end           String
//   created_at    DateTime   @default(now())
//   updated_at    DateTime   @updatedAt
//   Instructor    Instructor @relation(fields: [instructor_id], references: [id])
// }

// model Prospect {
//   id         String   @id @default(uuid())
//   first_name String
//   last_name  String
//   civility   String
//   email      String
//   phone      String
//   is_paid    Boolean
//   created_at DateTime @default(now())
//   updated_at DateTime @updatedAt
// }

////////////////////////////////////////////////////////////////////////////////

// model User {
//   id       String @id @default(uuid())
//   email    String
//   wordpass String
// }

// model Company {
//   id                   String                 @id @default(uuid())
//   adress               String
//   postal_code          Int
//   city                 String
//   // siret siren ??
//   website_link         String?
//   created_at           DateTime               @default(now())
//   updated_at           DateTime               @updatedAt
//   Client               Client[]
//   Student              Student[]
//   Client_has_Formation Client_has_Formation[]
// }

// model Client {
//   id          String   @id @default(uuid())
//   courtesy    String
//   first_name  String
//   last_name   String
//   email       String
//   phone       String
//   is_student  Boolean  @default(false)
//   is_validate Boolean  @default(false)
//   birth_date  String?
//   city        String?
//   company_id  String?
//   funding_id  String?
//   status      String
//   about       String // beaucoup de caractères
//   created_at  DateTime @default(now())
//   updated_at  DateTime @updatedAt
//   company     Company? @relation(fields: [company_id], references: [id])
// }

// model Student {
//   id                    String                  @id @default(uuid())
//   company_id            String
//   first_name            String
//   last_name             String
//   created_at            DateTime                @default(now())
//   updated_at            DateTime                @updatedAt
//   company               Company                 @relation(fields: [company_id], references: [id])
//   Student_has_Formation Student_has_Formation[]
// }

// model Student_has_Formation {
//   id           String    @id @default(uuid())
//   student_id   String
//   formation_id String
//   student      Student   @relation(fields: [student_id], references: [id])
//   formation    Formation @relation(fields: [formation_id], references: [id])
// }

// model Client_has_Formation {
//   id           String    @id @default(uuid())
//   company_id   String
//   formation_id String
//   company      Company   @relation(fields: [company_id], references: [id])
//   formation    Formation @relation(fields: [formation_id], references: [id])
// }

// model Formation {
//   id                       String                     @id @default(uuid())
//   name                     String
//   default_duration         Float
//   default_cost             Float
//   max_students             Int
//   created_at               DateTime                   @default(now())
//   updated_at               DateTime                   @updatedAt
//   Instructor_has_Formation Instructor_has_Formation[]
//   Client_has_Formation     Client_has_Formation[]
//   Student_has_Formation    Student_has_Formation[]
// }

// model Instructor_has_Formation {
//   id            String     @id @default(uuid())
//   formation_id  String
//   instructor_id String
//   created_at    DateTime   @default(now())
//   updated_at    DateTime   @updatedAt
//   formation     Formation  @relation(fields: [formation_id], references: [id])
//   instructor    Instructor @relation(fields: [instructor_id], references: [id])
// }

// model Instructor {
//   id                       String                     @id @default(uuid())
//   first_name               String
//   last_name                String
//   fees_per_day             Float
//   created_at               DateTime                   @default(now())
//   updated_at               DateTime                   @updatedAt
//   Instructor_has_Expertise Instructor_has_Expertise[]
//   Instructor_has_Formation Instructor_has_Formation[]
// }

// model Schedule {
//   id String @id @default(uuid())
//   // data ...
// }

// model Instructor_has_Expertise {
//   id            String     @id @default(uuid())
//   instructor_id String
//   expertise_id  String
//   created_at    DateTime   @default(now())
//   updated_at    DateTime   @updatedAt
//   instructor    Instructor @relation(fields: [instructor_id], references: [id])
//   expertise     Expertise  @relation(fields: [expertise_id], references: [id])
// }

// model Expertise {
//   id                       String                     @id @default(uuid())
//   name                     String
//   created_at               DateTime                   @default(now())
//   updated_at               DateTime                   @updatedAt
//   Instructor_has_Expertise Instructor_has_Expertise[]
// }

// model Funding {
//   id         String   @id @default(uuid())
//   // data ...
//   created_at DateTime @default(now())
//   updated_at DateTime @updatedAt
// }
