import { Module } from "@nestjs/common";
import { PersonModule } from "./person/person.module";
import { RoleModule } from "./role/role.module";
import { CompanyModule } from "./company/company.module";
import { CommentModule } from "./comment/comment.module";
import { CommentCategoryModule } from "./comment_category/comment_category.module";
import { ResourceModule } from "./resource/resource.module";
import { ModuleModule } from "./module/module.module";
import { SpecialityBpfModule } from "./speciality_bpf/speciality_bpf.module";
import { ObjectiveBpfModule } from "./objective_bpf/objective_bpf.module";
import { TrainingObjectiveModule } from "./training_objective/training_objective.module";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { RessourceTypeModule } from "./ressource_type/ressource_type.module";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // MongooseModule.forRoot(process.env.MONGO_URL, {
    //   dbName: process.env.MONGO_DATABASE,
    // }),
    PersonModule,
    RoleModule,
    CompanyModule,
    CommentModule,
    CommentCategoryModule,
    ResourceModule,
    ModuleModule,
    SpecialityBpfModule,
    ObjectiveBpfModule,
    TrainingObjectiveModule,
    PrismaModule,
    AuthModule,
    RessourceTypeModule,
  ],
})
export class AppModule {}
